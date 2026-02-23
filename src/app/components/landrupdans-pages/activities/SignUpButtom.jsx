"use client"
import { useActionState } from "react"
import { SignUpToAnActivity } from "./action"

export default function SignUpButton() {

    const [state, formAction, isPending] = useActionState(SignUpToAnActivity)
    const initialState = {
        serverResponse:{}
    }

    return(
        <form noValidate action={formAction}>
            <button 
            className="disabled:opacity-50 absolute right-12 top-[45%] mt-4 px-4 py-2 bg-[var(--background)] text-white rounded" 
            disabled={isPending}>{isPending ? "Tilmelding i gang..." : "Tilmeld"}</button>

        {initialState?.serverResponse?.message && (
            <p className="text-red-500">{state.serverResponse.message}</p>
        )}
        </form>
    )
}