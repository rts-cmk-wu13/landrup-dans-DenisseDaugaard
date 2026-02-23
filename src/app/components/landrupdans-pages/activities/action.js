"use server";

import { cookies } from "next/headers";
import { postJSON } from "@/lib/dal/general";
import { redirect } from "next/navigation";

export async function SignUpToAnActivity() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userId = cookieStore.get("userId")?.value;

  

  if (!token || !userId) {
    return {
      serverResponse: { message: "Du er ikke logget ind. Log ind og prøv igen." },
    };
  }

  const activityId = 1;
  const url = `http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`;

  const response = await postJSON(url, {}, token);

  if (!response.ok) {
    return {
      serverResponse: {
        message: response.data?.message || "Der skete en fejl ved tilmelding. Prøv igen senere.",
      },
    };
  }

  redirect("/landrupdans/profile");
}