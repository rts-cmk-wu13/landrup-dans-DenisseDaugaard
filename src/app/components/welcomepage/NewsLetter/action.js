import {newsLetterScheme} from "@/lib/scheme.js"
import { postJSON } from "@/lib/general"
export async function getNewsLetter(prevState, formData){

    const url = "http://localhost:4000/api/v1/newsletter"
    const email = formData.get("email")
    console.log(email);
    
}