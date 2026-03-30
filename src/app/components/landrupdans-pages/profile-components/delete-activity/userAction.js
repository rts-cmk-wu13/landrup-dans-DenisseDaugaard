"use server"

import { deleteJSON } from "@/lib/dal/general";
import { cookies } from "next/headers";
import {redirect} from "next/navigation";
import { getCookiesValues } from "@/lib/dal/users/cookieStore";
import { revalidatePath } from "next/cache";

export async function deleteUserFromActivity(activityId) {
    const { token, userId, userActivities } = await getCookiesValues();
    console.log(activityId);
    
    const cookieStore = await cookies();

    if (!token || !userId) return {
        ok: false,
        data: null,
        text: "Manglende token eller bruger-id"
    };

    const url = `http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`;
    const response = await deleteJSON(url, token);

    if(!response.ok) {
        return{
            ok: false,
            data: null,
            text: "Der skete en fejl ved sletning fra holdet, prøv igen senere"
        }
    }

        console.log("User successfully deleted from activity");
        //console.log("📜❌", response);

        // this works because the cookie is an aray of ids, like [1,7]
        const updatedActivities = userActivities.filter(id => id !== Number(activityId));
        // this will update the cookie with the new list of activities after deletion
         cookieStore.set("userActivities", JSON.stringify(updatedActivities));
    revalidatePath("/landrupdans/profile");    
    // redirect("/landrupdans/profile");
        
    return{ 
        ok: true,
        data: null,
        text: "Du er blevet slettet fra aktiviteten"
    }
    
    // returning something will prevent of my response being empty and causing an error 
    // in the frontend when trying to access response.ok, 
    // because if the response is empty, response.ok will be undefined 
    // and will throw an error when trying to access it.
}