"use server";

import { updateActivityScheme } from "@/lib/instructorScheme";
import { instructorScheme } from "@/lib/instructorScheme";
import  z  from "zod";
import { updateActivityReq } from "@/lib/dal/instructor/updateActivityReq";
import { redirect } from "next/navigation";
import { getCookiesValues } from "@/lib/dal/users/cookieStore";
import {cookies} from "next/headers";


export async function updateActivity(prevState, formData) {
    
    const { instructorActivities} = await getCookiesValues();
    
    const cookieStore = await cookies();
    const inputData = Object.fromEntries(formData);
    const prevValues = prevState?.values || {};
    const url = `http://localhost:4000/api/v1/activities/${inputData.id}`; // Assuming name is unique identifier for the activity, adjust if it's not the case
    console.log('this is my ID !!!!!', inputData.id);

    //console.log('prevValues: 🧩', prevValues);
    //console.log('inputData: 🧩🧩', inputData);

    
    const values = {
        name: prevValues.name, // name is required and cannot be changed, so we take it from prevValues
        description: prevValues.description !==  inputData.description ? inputData.description : null,
        weekday: prevValues.weekday !==  inputData.weekday ? inputData.weekday : null,
        time: prevValues.time !==  inputData.time ? inputData.time : null,
        minAge: prevValues.minAge !==  Number(inputData.minAge) ? inputData.minAge : null,
        maxAge: prevValues.maxAge !==  Number(inputData.maxAge) ? inputData.maxAge : null,
        maxParticipants: prevValues.maxParticipants !==  Number(inputData.maxParticipants) ? inputData.maxParticipants : null,
        file: inputData.file && inputData.file.size > 0 ? inputData.file : null, // Only include file if a new one is uploaded 
    }

    // console.log('this are the values', values);
    const finalValues = { ...values }
    Object.keys(finalValues).forEach(key => { // Remove keys with null values to avoid sending them in the request
        if (finalValues[key] === null ) {
            delete finalValues[key];
        }
    });

    console.log('this are the final values after removing nulls ↩️', finalValues);

    const result = updateActivityScheme.safeParse(finalValues);

    if(!result.success) {
        return{
            ok:false,
            errors: z.flattenError(result.error).fieldErrors,
            values: prevState?.values, // Keep previous values in the form
        }
    }

    const validatedData = result.data;
    //console.log('validation success ✅', validatedData);

    const res = await updateActivityReq(url, validatedData);
    if (!res.ok) {
        console.log('this is the error res: 🛑❌', res);
        
        return{
            values,
            serverMessage: {error: res.text || "Noget gik galt ved oprettelsen af holdet"}
        }
    }
    
    // Add the new activity to the existing list, [] if instructorActivities is undefined, start with an empty array
    const updateActivities = instructorActivities.filter(activity => activity.id !== Number(inputData.id)); // Remove the old version of the activity
    updateActivities.push(res.data); // Add the updated activity to the list    
    cookieStore.set("instructorActivities", JSON.stringify(updateActivities)); // Update the cookie with the new list of activities

    
    console.log('this is the res: 😁✅ ', res);
    redirect ("/landrupdans/activities") // Redirect to activities page on success

    // return {
    //     values: {}, // Clear form values on success
    //     serverMessage: {success: "Holdet blev oprettet succesfuldt!"}
    // }

}