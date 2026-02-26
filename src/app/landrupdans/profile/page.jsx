import ErrorMessage from "@/app/components/errors/ErrorMesage";
import ProfileCard from "@/app/components/landrupdans-pages/profile-components/ProfileCard"
import { getUserById } from "@/lib/dal/users/userById"
import { getJSON } from "@/lib/dal/general";
import { notFound } from "next/navigation"
import { cookies } from "next/headers";


export default async function Calendar(){

    const data = await getUserById();
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

    //console.log(data);
    const cookieStore = await cookies();
    const expirationTime = Number(cookieStore.get("expirationTime")?.value);
    // console.log(expirationTime);
    // console.log(new Date().getTime());

    const activitiesIds = data?.data?.activities?.map(activity => activity.id) || [];
    const activities = await Promise.all(
        activitiesIds.map(id =>
            getJSON(`http://localhost:4000/api/v1/activities/${id}`)
        )
    )

    const activitiesData = activities.map(res => res.data);
    const usersInfo = activitiesData.flatMap(({ id: activityId, users }) =>
        (users ?? []).map(({ id: userId, firstname, lastname, age }) => ({
            activityId,
            userId,
            firstname,
            lastname,
            age,
        }))
    );
        //console.log(usersInfo);

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
        <ProfileCard data={data?.data} usersInfo={usersInfo} />
        </>
    )
}