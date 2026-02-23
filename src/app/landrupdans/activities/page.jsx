import SearchBar from "@/app/components/landrupdans-pages/searchbar/SearchBar"
import { getJSON } from "@/lib/dal/general"
import ActivityCard from "@/app/components/landrupdans-pages/activities/ActivityCard"
import ErrorMessage from "@/app/components/errors/ErrorMesage"

export default async function Activities() {

    const url ="http://localhost:4000/api/v1/activities"

    const activities = await getJSON(url);
    const data = activities.data;
    //console.log(data);

    if(!data) {
        return(
            <ErrorMessage
            title="Ingen aktiviteter fundet"
            message="Der opstod en fejl under indlæsningen af aktiviteterne. Prøv igen senere."
            href="/"
            linkText="Gå tilbage til forsiden"
            />
        )
    }

    return(
        <article className="p-6">
            <div className="flex">
              <SearchBar/>
            </div>
            <h1 className="main_title">Aktiviteter</h1>

            <section>
                {data?.map(activity => (
                    <ActivityCard key={activity.id} data={activity} />
                ))}
            </section>
        </article>
    )
}