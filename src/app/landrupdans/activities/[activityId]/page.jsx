import { getJSON } from "@/lib/dal/general";
import { getUserById } from "@/lib/dal/users/userById";
import { cookies } from "next/headers";
import ActivityDetailsCard from "@/app/components/landrupdans-pages/activities/ActivityDetailsCard";
import ErrorMessage from "@/app/components/errors/ErrorMesage";

export default async function ActivityDetails({ params }) {
    const { activityId } = await params;

    if(!activityId || isNaN(activityId)) {
        return(
            <ErrorMessage
            title="Aktivitet ikke fundet" 
            message="Der opstod en fejl under indlæsningen af aktiviteten. Prøv igen senere."
            href="/landrupdans/activities"
            linkText="Gå tilbage til aktiviteter"
            />
        )
    }

    const ActivityUrl = `http://localhost:4000/api/v1/activities/${activityId}`;
   
    const res = await getJSON(ActivityUrl);
    if(!res.ok) {
    console.log("☠️ Error fetching activity details:", res.text);
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
    //console.log(activityId);

    
    const cookiesStored = await cookies();
    //console.log('🤺', data);

    const userId = cookiesStored.get("userId")?.value;
    const userToken = cookiesStored.get("token")?.value;

    const UserUrl = `http://localhost:4000/api/v1/users/${userId}`;
    const user = await getUserById(UserUrl, userToken);
    const userData = user.data;
    //console.log('👧', userData);

    const isSignedInToActivity = userData.activities.some(activity => activity.id === data.id);
    const isTooYoung = Number(userData.age) < Number(data.minAge);
    const isTooOld = Number(userData.age) > Number(data.maxAge);
    const isUserInAge = !isTooYoung && !isTooOld;
    //console.log(isUserInAge, '✅✅');
    
    
    const isLoggedIn = cookiesStored.has("token") && !cookiesStored.get("role");
    const isInstructor = cookiesStored.get("role")?.value === "instructor";

    return(
        <article className="flex flex-col">
            {data ? <ActivityDetailsCard data={data} 
            isLoggedIn={isLoggedIn} 
            isInstructor={isInstructor} 
            isUserInAge={isUserInAge}
            isSignedInToActivity={isSignedInToActivity}
            />
             : <p>Loading...</p>}
        </article>
    )

}