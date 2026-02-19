import {newsLetterScheme} from "@/lib/scheme.js"
import z from "zod"
import { postJSON } from "@/lib/general"
export async function getNewsLetter(prevState, formData){

    const url = "http://localhost:4000/api/v1/newsletter"
    const email = formData.get("email")
    // console.log('📩',email);

    if(email === prevState.values.email){
        return prevState
    }

     const result = newsLetterScheme.safeParse({
            email,
        });

        if(!result.success){
            return{
                values:{email},
                errors:z.flattenError(result.error).fieldErrors, // erros from zod showed in the -> form client side/ browser.
            }
        }
        // console.log(result); 

       const response = await postJSON(url, { email: result.data.email });

        if (!response.ok) {
            console.log('❌', response.status, response.data, response.text);
            return {
                values: { email },
                errors: { error:"Det var ikke muligt at tilmelde, prøv igen senere."},
            };
        }

        if(response.ok){
            console.log('😁', response.status );
            // change to a toast notification or something else that is not an error message, since this is a success message.
             return {
                values: { email: "" },
                errors: { success:"Tilmeldt nyhedsbrev!" },
            }; 
        }
        
        return response.data
}
        
