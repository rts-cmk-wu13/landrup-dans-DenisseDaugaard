"use server"

import { deleteJSON } from "@/lib/dal/general";
import { cookies } from "next/headers";
import {redirect} from "next/navigation";
import { getCookiesValues } from "@/lib/dal/users/cookieStore";

export async function deleteUserFromActivity(activityId) {
    const { token, userId, userActivities } = await getCookiesValues();
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
        const updatedActivities = userActivities.filter(id => id !== Number(activityId));
        // this will update the cookie with the new list of activities after deletion
         cookieStore.set("userActivities", JSON.stringify(updatedActivities));
         
    redirect("/landrupdans/profile");
    
}