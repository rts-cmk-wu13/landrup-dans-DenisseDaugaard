import { postJSON} from "@/lib/general";
import {contactScheme} from "@/lib/scheme";
import z, { url } from "zod";


export async function sendMessage(prevState, formData) {

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const url = "http://localhost:4000/api/v1/messages";

    console.log(name, email,message);
    

    if(name === prevState.values.name 
        && email === prevState.values.email 
        && message === prevState.values.message){
            console.log("Same data, skipping validation and API call");
        return prevState
    }

    const result = contactScheme.safeParse({
        name,
        email,
        message,
    });

    if(!result.success){
        return{
        values:{name, email, message},
        errors:z.flattenError(result.error).fieldErrors, // erros from zod showed in the -> form client side/ browser.
        }
    }

    const response = await postJSON(url, 
        {   
            name: result.data.name,
            email: result.data.email ,
            message: result.data.message,
        });

        if (!response.ok) {
            console.log('❌', response.status, response.data, response.text);
            return {
                values: { name:"", email: "", message: "" },
                errors: { error:"Det var ikke muligt at sende beskeden, prøv igen senere."},
            };
        }

        if(response.ok){
            console.log('😁', response.status );
            // change to a toast notification or something else that is not an error message, since this is a success message.
             return {
                values: { name: "", email: "", message: "" },
                errors: { success:"Beskeden blev sendt!" },
            }; 
        }
        
        return response.data

}