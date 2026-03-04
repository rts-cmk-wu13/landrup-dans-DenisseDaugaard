"use server";

import { instructorScheme } from "@/lib/instructorScheme";
import  z  from "zod";
import { createActivityReq } from "@/lib/dal/instructor/createActivityReq";
import { redirect } from "next/navigation";
import { getCookiesValues } from "@/lib/dal/users/cookieStore";
import {cookies} from "next/headers";

export async function createActivity(_, formData) {
    
    const { instructorActivities} = await getCookiesValues();
    const cookieStore = await cookies();
    const url = "http://localhost:4000/api/v1/activities";
    const inputData = Object.fromEntries(formData);
    const values = {
        name: inputData.name ?? "",
        description: inputData.description ?? "",
        weekday: inputData.weekday ?? "",
        time: inputData.time ?? "",
        minAge: inputData.minAge ?? "",
        maxAge: inputData.maxAge ?? "",
        maxParticipants: inputData.maxParticipants ?? "",
        file: inputData.file ?? null
    }

    const result = instructorScheme.safeParse(values);

        if (!result.success) {
            console.log('validation failed ☠️', result.error);
            return {
                values,
                errors: z.flattenError(result.error).fieldErrors
            }; 
        } 
        console.log('validation success 😁✅', result.data);

    // const res = await createActivityReq(url, values);
    // if (!res.ok) {
    //     return{
    //         values,
    //         serverMessage: {error: res.text || "Noget gik galt ved oprettelsen af holdet"}
    //     }
    // }
    
    // // Add the new activity to the existing list, [] if instructorActivities is undefined, start with an empty array
    // const newActivities = [...(instructorActivities || []), res.data]; 
    // cookieStore.set("instructorActivities", JSON.stringify(newActivities)); // Update the cookie with the new list of activities

    
    // console.log('this is the res: 😁✅ ', res);
    // redirect ("/landrupdans/activities") // Redirect to activities page on success
    // // return {
    // //     values: {}, // Clear form values on success
    // //     serverMessage: {success: "Holdet blev oprettet succesfuldt!"}
    // // }

}