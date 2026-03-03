"use server";

import ErrorMessage from "@/app/components/errors/ErrorMesage";
import ProfileCard from "@/app/components/landrupdans-pages/profile-components/ProfileCard"
import { getUserById } from "@/lib/dal/users/userById"
import { notFound } from "next/navigation";
import { getCookiesValues } from "@/lib/dal/users/cookieStore";


export default async function Calendar(){

    const { expirationTime, userId} = await getCookiesValues();
    const data = await getUserById(userId);
    
        if(!data.ok){
            return(
              <ErrorMessage
                title="Fejl"
                message="Der opstod en fejl ved hentning af brugerdata. Prøv venligst igen senere."
                href="/login"
                linkText="Gå til login"
                />
            )
        }

    //console.log(data.data);
  
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