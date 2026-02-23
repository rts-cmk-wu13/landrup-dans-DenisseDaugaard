"use server"

import { deleteJSON } from "@/lib/dal/general";
import { cookies } from "next/headers";
import {redirect} from "next/navigation";

export async function deleteUserFromActivity(activityId) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const userId = cookieStore.get("userId")?.value;

    if (!token || !userId) return {
        ok: false,
        data: null,
        text: "Manglende token eller bruger-id"
    };

    const url = `http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`;
    const response = await deleteJSON(url, token);

    if(response.ok) {
        //console.log("User successfully deleted from activity");
        redirect("/landrupdans/profile");
    }

    if(!response.ok) {
        return{
            ok: false,
            data: null,
            text: "Der skete en fejl ved sletning fra holdet, prøv igen senere"
        }
    }

    if(response.status === 500) {
        return{
            ok: false,
            data: null,
            text: "Der skete en fejl på serveren. Prøv igen senere."
        }
    }
    
}