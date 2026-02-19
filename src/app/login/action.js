"use server"
import { z } from "zod"
import { postJSON } from "@/lib/dal/general"
import { loginScheme } from "@/lib/scheme"
import { redirect } from "next/navigation"
import { cookies } from "next/headers";


export async function loginUser(prevState, formData) {

    const url = "http://localhost:4000/auth/token"
    
    const username = formData.get("username")
    const password = formData.get("password")
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
    
           
           if(response.status === 401){
               return {
                   values: { username: "", password: "" },
                  errors: { error:"Ugyldigt brugernavn eller adgangskode"},
                };
            }
            
            if(response.data === null){
                return {
                    values: { username: "", password: "" },
                   errors: { error:"Der skete en fejl ved indlæsning af data, prøv igen senere."},
                 };
            }
            console.log('📩', response.data);

            cookieStore.set("token", response?.data?.token);
            cookieStore.set("userId", response?.data?.userId);

            return redirect("landrupdans/profile") 


}