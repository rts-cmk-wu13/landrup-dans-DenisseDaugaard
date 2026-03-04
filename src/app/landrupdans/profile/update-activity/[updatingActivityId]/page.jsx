import { getCookiesValues } from "@/lib/dal/users/cookieStore";
import UpdateActivityForm from "./UpdateActivityForm";
import { updateActivity } from "./action";
import { id } from "zod/v4/locales";


export default async function UpdateActivityPage({params}) {
    const { updatingActivityId } = await params;
    const { instructorActivities } = await getCookiesValues();

    // Find the activity to update based on the ID from the URL
    const activityToUpdate = instructorActivities?.find(activity => activity.id === Number(updatingActivityId));
    // console.log(activityToUpdate);
    

    if (!activityToUpdate) {
        return (
            <p>Aktiviteten kunne ikke findes. Prøv venligst igen.</p>
        )
    }

    const initialState = {
        values: {
            name: activityToUpdate.name,
            description: activityToUpdate.description,
            weekday: activityToUpdate.weekday,
            time: activityToUpdate.time,
            minAge: activityToUpdate.minAge,
            maxAge: activityToUpdate.maxAge,
            maxParticipants: activityToUpdate.maxParticipants,
            file: null,
            id: activityToUpdate?.id
        },
        errors: {},
        serverMessage: {}
    }

    return(
        <article className="p-8">
            <h1 className="text-2xl font-semibold mb-6">Opdater {activityToUpdate.name} hold</h1>
            <UpdateActivityForm initialState={initialState} updateActivity={updateActivity} id={activityToUpdate.id} />
        </article>
    )
}