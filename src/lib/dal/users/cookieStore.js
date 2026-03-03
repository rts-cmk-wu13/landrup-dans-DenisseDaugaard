import { cookies } from "next/headers";

export async function getCookiesValues() {
    const cookieStore = await cookies();
    return {
        token: cookieStore.get("token")?.value || null,
        expirationTime: cookieStore.get("expirationTime")?.value || null,
        age: cookieStore.get("age")?.value || null,
        firstname: cookieStore.get("firstname")?.value || null,
        lastname: cookieStore.get("lastname")?.value || null,
        role: cookieStore.get("role")?.value || null,
        userId: cookieStore.get("userId")?.value || null,
        userActivities: cookieStore.get("userActivities")?.value ? JSON.parse(cookieStore.get("userActivities").value) : [],
        instructorActivities: cookieStore.get("instructorActivities")?.value ? JSON.parse(cookieStore.get("instructorActivities").value) : [],
    }
};