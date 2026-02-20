"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function LogoutAction() {
    const cookieStore = await cookies();

    if(!cookieStore.has("token"))return;

    console.log('action called');

    cookieStore.delete("token");
    cookieStore.delete("userId");

    redirect("/login");
    
}
