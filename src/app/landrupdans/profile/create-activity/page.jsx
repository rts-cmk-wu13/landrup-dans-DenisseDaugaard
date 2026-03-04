"use client"

import { createActivity } from "./action";
import CreateAndUpdateActivityForm from "./CreateActivityForm";

export default function CreateActivityPage(){
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