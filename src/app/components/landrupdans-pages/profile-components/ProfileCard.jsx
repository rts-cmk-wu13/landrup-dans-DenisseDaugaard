import { FaUserLarge } from "react-icons/fa6";
import LogoutButton from "@/app/login/logout/LogoutButton";
export default function ProfileCard({data}) {
    return(
        <article className="flex flex-col">
            <header className="flex justify-center p-4 text-2xl">
                <h1>Min profil</h1>
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
                <div key={index} className="bg-[var(--light-blue)] rounded-[0.75rem] p-4 text-[var(--background)]">
                    <h3 className="text-xl font-semibold mb-4">{activity.name}</h3>
                    <p className="mb-4">{activity.weekday.charAt(0).toUpperCase() + activity.weekday}  {activity.time} </p>
                    <button className="btn bg-[var(--background)] text-[var(--foreground)]">Vis hold</button>
                </div>
                ))}
            </section>
            <LogoutButton />
        </article>
    )
}