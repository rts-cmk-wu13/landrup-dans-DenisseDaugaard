"use client"
import { useActionState } from "react" 
import { getNewsLetter } from "./action.js"


export default function NewsLetter(){
    const inicialState = {
         values:{
        email:"",
    },
    errors:{},
    }

    const [state, formAction, Ispending] = useActionState( getNewsLetter, inicialState)

    return(
        <section className="p-4">
            <h1 className="main_title">Nyhedsbrev</h1>
            <p>Få direkte besked når vi har sæsonstart eller afholder arrangementer.</p>

            <form noValidate  action={formAction} method="post" className="flex flex-col items-start">
                <div>
                    <input  type="email" placeholder="Email"
                    className="bg-white rounded mt-4 mr-2 p-4 text-black" defaultValue={state.values.email ?? ""}/>
                    <span className="error_response">{state.errors.errors}</span>
                    <button className="rounded bg-[var(--foreground)] text-black p-4">Tilmeld</button>
                </div>
            </form>
        </section>
    )
}