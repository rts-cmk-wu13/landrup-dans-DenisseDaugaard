import { getCookiesValues } from "@/lib/dal/users/cookieStore";
import ErrorMessage from "@/app/components/errors/ErrorMesage";
import ProfileHeader from "@/app/components/landrupdans-pages/profile-components/ProfileHeader";
import ProfileData from "@/app/components/landrupdans-pages/profile-components/ProfileData";
import ClassList from "@/app/components/landrupdans-pages/profile-components/instructor/ClassList";

export default async function ActivityUsersList({params}) {
    const { activityId } = await params;
    
    const {role, firstname, lastname, instructorActivities, userId} = await getCookiesValues();
    // console.log(activityId);
    //console.log(userId);
    
    //console.log(instructorActivities);
    const activity = instructorActivities.filter(act => act.id === Number(activityId) 
    && act.instructorId === Number(userId));
    //console.log(activity);
    

    if(role !== "Instruktør"){
        return(
            <ErrorMessage
            title="Adgang nægtet"
            message="Du har ikke adgang til denne side. Denne side er kun tilgængelig for instruktører."
            href="/landrupdans/profile"
            linkText="Gå tilbage til profil"
            />
        )
    }

    return(
        <>
        <ProfileHeader/>
        <ProfileData firstname={firstname} lastname={lastname} role={role}/>
        <ClassList activity={activity[0]} />
        </>
        
    )
    
}