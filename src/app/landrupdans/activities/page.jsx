import ActivitiesClient from "@/app/components/landrupdans-pages/activities/ActivitiesClient";
import { getJSON } from "@/lib/dal/general";
import ErrorMessage from "@/app/components/errors/ErrorMesage";

export default async function Activities() {
  const url = "http://localhost:4000/api/v1/activities";
  const activities = await getJSON(url, { next: { revalidate: 3600 } });
  //console.log(activities);

  const data = activities?.data; // adjust if your API wraps: { data: [...] }
  
  if (!data) {
    return (
      <ErrorMessage
        title="Ingen aktiviteter fundet"
        message="Der opstod en fejl under indlæsningen af aktiviteterne. Prøv igen senere."
        href="/"
        linkText="Gå tilbage til forsiden"
      />
    );
  }

  return <ActivitiesClient data={data} />;
}