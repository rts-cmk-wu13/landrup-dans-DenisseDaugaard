import { getJSON } from "@/lib/dal/general";
import { getCookiesValues } from "@/lib/dal/users/cookieStore";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import Link from "next/link";

export async function InstructorClassCard() {

  const { userId } = await getCookiesValues();

  const response = await getJSON("http://localhost:4000/api/v1/activities");
  //console.log(userId);
  
  const data = await response.data;
  //console.log(data);
  
  const activities = data?.filter(activity => activity.instructorId === Number(userId));
  //console.log(activities);
  

  return (
    <section /* className="hidden" */>
        <div className="flex justify-between mb-4 items-center">
            <h2 className="text-xl mb-4">Mine hold</h2>
            <Link href="/landrupdans/profile/create-activity" className="rounded-[0.5rem] bg-white text-[var(--background)] text-xl px-4 py-2">+</Link>
        </div>
        {activities ? (
        <>
            {activities.map((activity) => (
                <div key={activity.id} className="bg-[var(--light-blue)] rounded-[0.75rem] p-4 text-[var(--background)] mb-6">
                    <h2 className="text-xl font-semibold">{activity.name}</h2>
                    <p className="mt-2">{activity.weekday} {activity.time}</p>
                    <span className="flex justify-between mt-2">
                        <p>Max. deltagere: {activity.maxParticipants}</p>
                        <p>Tilmeldte: {activity.users.length}</p>
                    </span>

                    <div className="mt-4 flex justify-between">
                        <Link href={`/landrupdans/profile/${activity.id}`} className="btn bg-[var(--background)] text-[var(--foreground)]">Deltagerliste</Link>
                        <div className="flex gap-2">
                            <button className="rounded px-3 bg-[var(--background)] text-[var(--foreground)]">
                                <FaRegEdit  className="text-2xl"/>
                            </button>
                            <button className="rounded px-3 bg-[var(--background)] text-[var(--foreground)]">
                                <MdOutlineDelete className="text-2xl"/>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </> 
        ) : (
            <p>Du har ingen hold tilknyttet din profil.</p>
        )}
    </section>
  )

}
