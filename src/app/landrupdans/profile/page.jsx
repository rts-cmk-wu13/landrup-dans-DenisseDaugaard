import ErrorMessage from "@/app/components/errors/ErrorMesage";
import ProfileCard from "@/app/components/landrupdans-pages/profile-components/ProfileCard"
import { getUserById } from "@/lib/dal/users/userById"
import { notFound } from "next/navigation"

export default async function Calendar(){

    const data = await getUserById();
    //console.log(data);
   
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