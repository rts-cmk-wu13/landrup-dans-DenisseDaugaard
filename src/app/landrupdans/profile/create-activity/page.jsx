import { getCookiesValues } from "@/lib/dal/users/cookieStore";

import { createActivity } from "./action";
import CreateAndUpdateActivityForm from "./CreateActivityForm";
import ErrorMessage from "@/app/components/errors/ErrorMesage";

export default async function CreateActivityPage(){
    const { role } = await getCookiesValues();
        if (role !== "Instruktør") {
            return (
                <ErrorMessage 
                title="Adgang nægtet"
                  href="/landrupdans/profile"
                linkText="Tilbage til din profil"
                message="Du har ikke tilladelse til at oprette hold."
                />
            )
        }

    const initialState = {
        values: { 
        name: "",
        description: "",
        weekday: "",
        time: "",
        minAge: "",
        maxAge: "",
        maxParticipants: "",
        file: null
        },
        errors: {},
        serverMessage:{}
    }

    return( 
        <article className="p-8">
            <h1 className="text-2xl font-semibold mb-6">Opret hold</h1>
            <CreateAndUpdateActivityForm initialState={initialState} createActivity={createActivity} />
        </article>
    )
}