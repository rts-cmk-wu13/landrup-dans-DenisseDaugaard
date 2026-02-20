import { getJSON } from "@/lib/dal/general";
import ActivityDetailsCard from "@/app/components/landrupdans-pages/activities/ActivityDetailsCard";

export default async function ActivityDetails({ params }) {
    const { activityId } = await params;
    const url = `http://localhost:4000/api/v1/activities/${activityId}`;
   
    const activity = await getJSON(url);
    const data = activity.data;
    //console.log(data);
    
    return(
        <article className="flex flex-col">
            {data ? <ActivityDetailsCard data={data} /> : <p>Loading...</p>}
        </article>
    )

}