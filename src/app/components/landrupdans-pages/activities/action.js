"use server";

import { cookies } from "next/headers";
import { postJSON } from "@/lib/dal/general";
import { redirect } from "next/navigation";
import { getCookiesValues } from "@/lib/dal/users/cookieStore";

export async function SignUpToAnActivity(_, formData) {
  const { token, userId, userActivities } = await getCookiesValues(); 
  const cookieStore = await cookies();

  const activityId = formData.get("activityId");
  //console.log(activityId, '🤓');
  

  if (!token || !userId) {
    return {
      serverResponse: { message: "Er du logget ind? Log ind og prøv igen." },
    };
  }

  const url = `http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`;

  const response = await postJSON(url, {}, token);

  if (!response.ok) {
    //console.log('☠️', response);
    return {
      serverResponse: {
        message: "Der skete en fejl ved tilmelding. Prøv igen senere.",
      },
    };
  }

  //console.log(' 🤺 here is the activity' , response);
  

  // Update the userActivities cookie with the new activity ID

  if (!userActivities.includes(Number(activityId))) {
  
      const updatedActivities = [...userActivities, Number(activityId)];
     cookieStore.set("userActivities", JSON.stringify(updatedActivities));
  }

  redirect("/landrupdans/profile");
}