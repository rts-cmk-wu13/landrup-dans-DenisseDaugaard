import { getJSON } from "@/lib/dal/general";
import { getUserById } from "@/lib/dal/users/userById";
import { cookies } from "next/headers";
import ActivityDetailsCard from "@/app/components/landrupdans-pages/activities/ActivityDetailsCard";
import { is } from "zod/v4/locales";

export default async function ActivityDetails({ params }) {
    const { activityId } = await params;
    const ActivityUrl = `http://localhost:4000/api/v1/activities/${activityId}`;
   
    const activity = await getJSON(ActivityUrl);
    const data = activity.data;
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