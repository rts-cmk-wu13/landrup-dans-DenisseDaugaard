import { getJSON } from "@/lib/dal/general";
import ActivityDetailsCard from "@/app/components/landrupdans-pages/activities/ActivityDetailsCard";
import ErrorMessage from "@/app/components/errors/ErrorMesage";
import { getCookiesValues } from "@/lib/dal/users/cookieStore";

export default async function ActivityDetails({ params }) {
    const { activityId } = await params;


    const ActivityUrl = `http://localhost:4000/api/v1/activities/${activityId}`;
   
    const res = await getJSON(ActivityUrl);
    if(!res.ok) {
    //console.log("☠️ Error fetching activity details:", res.text);
        return(
            <ErrorMessage
            title="Aktivitet ikke fundet"
            message="Der opstod en fejl under indlæsningen af aktiviteten. Prøv igen senere."
            href="/landrupdans/activities"
            linkText="Gå tilbage til aktiviteter"
            />
        )
    }

    const data = res?.data;
    if(!data){
        return(
            <ErrorMessage
            title="Denne aktivitet findes ikke!"
            message="Den aktivitet du prøver at tilgå eksistere ikke !"
            href="/landrupdans/activities"
            linkText="Gå tilbage til aktiviteter"
            />
        )
    }

    //console.log(data);
    const { token, role, age, userActivities, userId } = await getCookiesValues();
    //console.log('this are my activities', userActivities);
    
    //console.log('this is the user data ', myData);
    

    const isSignedInToActivity = userActivities?.some(activityId => activityId === data.id);
    const isTooYoung = Number(age) < Number(data?.minAge);
    const isTooOld = Number(age) > Number(data?.maxAge);
    const isUserInAge = !isTooYoung && !isTooOld;
    //console.log(isUserInAge, '✅✅');
    
    
    const isLoggedIn = token && role === "Medlem";

    const isInstructor = role === "Instruktør" && Number(userId) === Number(data.instructorId);

    return(
        <article className="flex flex-col">
            {data && <ActivityDetailsCard data={data} 
            isLoggedIn={isLoggedIn} 
            isInstructor={isInstructor} 
            isUserInAge={isUserInAge}
            isSignedInToActivity={isSignedInToActivity}
            />
           }
        </article>
    )

}