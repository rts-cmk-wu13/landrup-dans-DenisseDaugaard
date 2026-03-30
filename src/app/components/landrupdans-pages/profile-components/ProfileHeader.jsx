import SessionDurationMessage from "@/app/components/landrupdans-pages/profile-components/SessionDurationMessage";

export default function ProfileHeader({children}) {
    return(
            <header className="grid grid-cols-3 p-4 text-2xl">
                <h1 className="col-2">Min profil</h1>
                {children}
            </header>
    )
}