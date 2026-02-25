import { FaUserLarge } from "react-icons/fa6";
import LogoutButton from "@/app/login/logout/LogoutButton";
import SessionDurationMessage from "@/app/landrupdans/profile/SessionDurationMessage";
import { cookies } from "next/headers";
import ActivityCard from "@/app/components/landrupdans-pages/profile-components/ClassCard";


export default async function ProfileCard({data, usersInfo,}) {
    const cookieStore = await cookies();
    const sessionDuration = Number(cookieStore?.get("expirationTime")?.value) || 0;
    //console.log(sessionDuration)
        const formattedDuration = new Date(sessionDuration).toLocaleString("da-DK", {
            dateStyle:"long",
            timeStyle:"short"
        }
    )
    //console.log(data);

    return(
        <article className="flex flex-col">
            <header className="grid grid-cols-3 p-4 text-2xl">
                <h1 className="col-2">Min profil</h1>
                <SessionDurationMessage 
                title="Session Varighed" 
                message={`Din session udløber ${formattedDuration}.`}
                style="right-4 text-sm bg-red-500/90 p-2 rounded-lg transition-all duration-300 translate-y-2/3"/>
            </header>

            <section className="bg-[var(--foreground)] w-full flex flex-col items-center gap-4 p-6 text-center">
                <FaUserLarge className="text-[var(--background)] text-[3rem]"  />
                <div>
                    <h2 className="text-[var(--light-gray)]">{data.firstname} {data.lastname}</h2>
                    <p className="text-[var(--light-gray)]">{data.role === "default" ? "Medlem" : data.role}</p>
                </div>
            </section>

            <section className="p-6">
                <h2 className="text-xl mb-4">Tilmeldte hold</h2>
                {data.activities.map((activity, index) => (
                    <ActivityCard key={index} activity={activity} index={index} usersInfo={usersInfo}  />
                ))}
            </section>
            <LogoutButton />
        </article>
    )
}