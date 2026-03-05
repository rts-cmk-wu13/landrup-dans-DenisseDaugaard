"use server"

import { deleteJSON } from "@/lib/dal/general";
import { cookies } from "next/headers";
import {redirect} from "next/navigation";
import { getCookiesValues } from "@/lib/dal/users/cookieStore";
import { revalidatePath } from "next/cache";


export async function deleteActivity(activityId) {
    const { token, userId, instructorActivities, role } = await getCookiesValues();
    console.log('Activity to delete 🪪:', activityId);
    
    const cookieStore = await cookies();

    if (!token || !userId || role !== "Instruktør") return {
        ok: false,
        data: null,
        text: "Manglende token, bruger-id eller utilstrækkelige rettigheder"
    };

    const url = `http://localhost:4000/api/v1/activities/${activityId}`;
    const response = await deleteJSON(url, token);

    if(!response.ok) {
        console.log('delete failed ', response);
        
        return{
            ok: false,
            data: null,
            text: "Der skete en fejl ved sletning fra holdet, prøv igen senere"
        }
    }

        console.log("User successfully deleted from activity");
        //console.log("📜❌", response);

        // we need (activity) because is an array of objects, like [{id:1, name:"salsa"}, {id:7, name:"tango"}]
       const updatedActivities = instructorActivities.filter(
        (activity) => Number(activity.id) !== Number(activityId));

       cookieStore.set("instructorActivities", JSON.stringify(updatedActivities));
         
      revalidatePath("/landrupdans/profile");
      return{
        ok: true,
        data: null,
        text: "Aktiviteten er slettet"
      }
        // use revalidatePath to refresh the page after deletion, so the deleted activity is no longer visible without needing a full page reload
}       // use redirect to navigate back to the profile page after deletion, but revalidatePath is more efficient for just refreshing the data on the same page without a full reload
