import {newsLetterScheme} from "@/lib/scheme.js"
import z from "zod"
import { postJSON } from "@/lib/dal/general"
export async function getNewsLetter(prevState, formData){

    const url = "http://localhost:4000/api/v1/newsletter";
    const email = formData.get("email");

    if(email === prevState?.values?.email){
        return prevState
    }

     const result = newsLetterScheme.safeParse({
            email,
        });

        if(!result.success){
            return{
                values:{email: ""},
                errors:z.flattenError(result.error).fieldErrors, // erros from zod showed in the -> form client side/ browser.
            }
        }
        // console.log(result); 

       const response = await postJSON(url, { email: result.data.email });

       if(response.status === 404){
           return{
               values: { email: "" },
               serverMessage: { error:"Ressourcen ikke fundet, kontakt administrator"},
           }
       }

        if (!response.ok) {
            //console.log('❌',response);
            return {
                values: { email: "" },
                serverMessage: { error:` ${response.text} ,prøve igen senere` || "Der var ikke muligt at tilmelde, prøv igen senere" },
            };
        }


        if(response.ok){
            //console.log('😁', response);
             return {
                values: { email: "" },
                serverMessage: { success:"Tilmeldt nyhedsbrev!" },
            }; 
        }

        return response.data
}
        
