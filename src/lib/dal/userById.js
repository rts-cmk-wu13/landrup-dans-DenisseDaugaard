
import { cookies } from "next/headers"; 

export async function getUserById() {

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    const id = cookieStore.get("userId")?.value
    
     try{

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
    
    return {
      ok: false,
      status: 500,
      data: null, 
      text: "Det var ikke muligt at hente brugerdata, prøv at logge ind igen." || String(error)};
  }
 

}