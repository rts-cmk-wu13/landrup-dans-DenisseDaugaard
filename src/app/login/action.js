"use server"
import { z } from "zod"
import { postJSON } from "@/lib/dal/general"
import { loginScheme } from "@/lib/scheme"
import { redirect } from "next/navigation"
import { cookies } from "next/headers";


export async function loginUser(prevState, formData) {

    const url = "http://localhost:4000/auth/token";
    
    const username = formData.get("username");
    const password = formData.get("password");
    const cookieStore = await cookies();
    
        if(username === prevState.values.username){
            console.log('skip request no data sent');
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
            console.log('❌', response);
               return {
                   values: { username: "", password: "" },
                  serverMessage:{ error: `${response.text}, prøv igen senere` || "ugyldigt brugernavn eller adgangskode" },
                };
            }

            //console.log('📩', response.data);

            const { token, userId, role, validUntil } = response.data;

            cookieStore.set("token", token);
            cookieStore.set("userId", userId);
            cookieStore.set("expirationTime", validUntil);    
            
            if (role === "instructor") {
            cookieStore.set("role", role);
            }
            
            return redirect("/landrupdans/profile");


}