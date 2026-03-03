
import LogoutButton from "@/app/login/logout/LogoutButton";
import ActivityCard from "@/app/components/landrupdans-pages/profile-components/user/ActivityCard";
import { getCookiesValues } from "@/lib/dal/users/cookieStore";
import { InstructorClassCard } from "./instructor/InstructorClassCard";
import ProfileHeader from "./ProfileHeader";
import ProfileData from "./ProfileData";
import SessionDurationMessage from "./SessionDurationMessage";


export default async function ProfileCard({data}) {
    //console.log('data:', data);
    
    const {expirationTime, role, firstname, lastname } = await getCookiesValues();
    
    const sessionDuration = Number(expirationTime) || 0;
    //console.log(sessionDuration)
    const formattedDuration = new Date(sessionDuration).toLocaleString("da-DK", {
            dateStyle:"long",
            timeStyle:"short"
    });
    //console.log(data);
    const isInstructor = role === "Instruktør";

    return(
        <article className="flex flex-col">

            <ProfileHeader children={
                 <SessionDurationMessage 
                title="Session Varighed" 
                message={`Din session udløber ${formattedDuration}.`}
                style="right-4 text-sm bg-red-500/90 p-2 rounded-lg transition-all duration-300 translate-y-2/3"
                />
            } />
            <ProfileData role={role} firstname={firstname} lastname={lastname}/>

            <section className="p-6">
                {isInstructor ? (
                    <>
                        <InstructorClassCard />
                    </>
                ):(
                    <>
                        <ActivityCard data={data}/>
                    </> 
                )}
            </section>
            <LogoutButton />
        </article>
    )
}