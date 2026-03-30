"use server"
import { z } from "zod"
import { postJSON } from "@/lib/dal/general"
import { loginScheme } from "@/lib/scheme"
import { redirect } from "next/navigation"
import { cookies } from "next/headers";
import { getUserById } from "@/lib/dal/users/userById"
import { getJSON } from "@/lib/dal/general"


export async function loginUser(prevState, formData) {

    const url = "http://localhost:4000/auth/token";
    
    const username = formData.get("username");
    const password = formData.get("password");
    const cookieStore = await cookies();
    
        if(username === prevState.values.username){
            //console.log('skip request no data sent');
            return prevState
        }
    
         const result = loginScheme.safeParse({
                username,
                password,
            });
    
            if(!result.success){
                return{
                    values:{username: "", password: ""},
                    errors:z.flattenError(result.error).fieldErrors, // erros from zod showed in the -> form client side/ browser.
                }
            }
            // console.log(result); 
    
           const response = await postJSON(url, 
            { username: result.data.username, 
                password: result.data.password 
            });

            if(response.status === 404){
                return {
                    values: { username: "", password: "" },
                    serverMessage:{ error:"Resouces ikke fundet. Kontakt administrator"},
                }
            }

            if(response.status === 401){
                return {
                    values: { username: "", password: "" },
                    serverMessage:{ error:"Ugyldigt brugernavn eller adgangskode" || response.text},
                }
            }
           
           if(!response.ok){
            //console.log('❌', response);
               return {
                   values: { username: "", password: "" },
                  serverMessage:{ error: `${response.text}, prøv igen senere` || "ugyldigt brugernavn eller adgangskode" },
                };
            }

            console.log('📩', response.data);


            const { token, userId, role, validUntil } = response.data;
            
            cookieStore.set("token", token);
            cookieStore.set("userId", userId);
            cookieStore.set("expirationTime", validUntil); 
            
            if (role === "instructor"){
                cookieStore.set("role", "Instruktør");
                const activitiesResponse = await getJSON("http://localhost:4000/api/v1/activities");

                    if(!activitiesResponse.ok){
                        return{
                            data: null,
                            serverMessage:{ error:"Fejl ved hentning af aktiviteter. Prøv igen senere."},
                        }
                    }
                const activitiesData = await activitiesResponse.data;
                cookieStore.set("instructorActivities", JSON.stringify(activitiesData?.filter(activity => activity.instructorId === Number(userId)) || []));
            }

            if (role === "default") cookieStore.set("role", "Medlem");
            
            const userData = await getUserById(`http://localhost:4000/api/v1/users/${userId}`);
            if(!userData.ok){
                return{
                    data: null,
                    serverMessage:{ error:"Fejl ved hentning af brugerdata. Prøv igen senere."},
                }
            }
            console.log(userData.data);

            if(userData.data.age && userData.data.role !== 'instructor'){
                cookieStore.set("age", userData.data.age.toString());
                cookieStore.set ("userActivities", JSON.stringify(userData.data.activities?.map(activity => activity.id)) || []);
            }
        
            cookieStore.set("firstname", userData.data.firstname);
            cookieStore.set("lastname", userData.data.lastname);


            return redirect("/landrupdans/profile");


}