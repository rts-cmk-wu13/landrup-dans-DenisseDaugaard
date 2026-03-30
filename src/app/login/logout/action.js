"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function LogoutAction() {
    const cookieStore = await cookies();

    if(!cookieStore.has("token"))return;

    //console.log('action called');
    console.log(cookieStore);
    
    Array.from(cookieStore.getAll()).forEach(element  => {
        if(!element.name.startsWith("__next")){
            cookieStore.delete(element);
        }
    });


    redirect("/login");
    
}
