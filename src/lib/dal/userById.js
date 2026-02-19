
import { cookies } from "next/headers"; 

export async function getUserById() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const id = cookieStore.get("userId")?.value
    console.log('🍪', id, token);
    

     try{

//   if(!id) {
//     throw new Error("Det var ikke muligt at finde brugerdata, prøv igen senere");
//   }
//   if(!(/^\d+$/.test(id))) {
//     throw new Error("Det id, der blev brugt, er ikke et tal, angiv venligst et gyldigt id");
//   }

    const url = `http://localhost:4000/api/v1/users/${id}`;
    const res = await fetch(url,{
        headers: {

            Authorization: `Bearer ${token}`
        },
        cache: "no-store", // helpful in dev
    });

    const contentType = res.headers.get("content-type") || "";
    let data = null;
    
    if (!res.ok) {
      throw new Error("Noget gik galt ved hentning af brugerdata, prøv at logge ind igen senere");
    }

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    } 


    return { ok: res.ok, status: res.status, data };
  } catch (error) {
    console.log("☠️ Error fetching user data:", error.message);
    
    return {
      ok: false,
      data: null, 
      text: String(error)};
  }
 

}