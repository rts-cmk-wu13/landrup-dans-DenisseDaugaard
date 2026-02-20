import { getJSON } from "@/lib/dal/general";
import { cookies } from "next/headers";
import ActivityDetailsCard from "@/app/components/landrupdans-pages/activities/ActivityDetailsCard";

export default async function ActivityDetails({ params }) {
    const { activityId } = await params;
    const url = `http://localhost:4000/api/v1/activities/${activityId}`;
   
    const activity = await getJSON(url);
    const data = activity.data;
    const cookiesStored = await cookies();
    //console.log(data);
    
    const isLoggedIn = cookiesStored.has("token") && !cookiesStored.get("role");
    const isInstructor = cookiesStored.get("role")?.value === "instructor";

    return(
        <article className="flex flex-col">
            {data ? <ActivityDetailsCard data={data} isLoggedIn={isLoggedIn} isInstructor={isInstructor} /> : <p>Loading...</p>}
        </article>
    )

}