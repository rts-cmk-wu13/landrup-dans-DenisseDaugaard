import ErrorMessage from "@/app/components/errors/ErrorMesage";
import ProfileCard from "@/app/components/landrupdans-pages/profile-components/ProfileCard"
import { getUserById } from "@/lib/dal/users/userById"
import { notFound } from "next/navigation"
import { cookies } from "next/headers";

export default async function Calendar(){

    const data = await getUserById();
    //console.log(data);
    const cookieStore = await cookies();
    const expirationTime = Number(cookieStore.get("expirationTime")?.value);
    // console.log(expirationTime);
    // console.log(new Date().getTime());
    

    if(expirationTime < new Date().getTime()){
        return(
            <ErrorMessage
            title="Session udløbet"
            message="Din session er udløbet. Log venligst ind igen."
            href="/login"
            linkText="Gå til login"
            />
        )
    }

  if(data.status === 500){ 
        return(
            <ErrorMessage
            title="Fejl"
            message={data.text} 
            href="/login"
            linkText="Gå til login"
            />
        )
  }

  if(!data.data) return notFound();

    return(
        <>
        <ProfileCard data={data?.data} />
        </>
    )
}