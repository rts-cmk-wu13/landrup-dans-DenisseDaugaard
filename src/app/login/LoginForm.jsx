"use client"
import { useActionState } from "react"
import { loginUser } from "./action";

export default function LoginForm(){

    const initialState = {
       values: { username: "", password: "" },
       errors: {},
     };
   
     const [state, formAction, isPending] = useActionState(loginUser, initialState);
     //console.log(state);
    
    return(
        <>
        <form noValidate action={formAction}>
            <div>
                <div className="relative flex flex-col mb-6">
                <input
                    type="text"
                    name="username"
                    placeholder="Brugernavn"
                    className="bg-white rounded mr-2 p-4 text-black w-full"
                    defaultValue={state?.values?.username ?? ""}
                    />
                    {state?.errors?.username && (
                <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.username}</span>)}
                </div>
                <div className="relative flex flex-col mb-6">
                <input
                    type="password"
                    name="password"
                    placeholder="Adgangskode"
                    className="bg-white rounded mr-2 p-4 text-black w-full"
                    defaultValue={state?.values?.password ?? ""}
                    />
                    {state?.errors?.password && (
                <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.password}</span>)}
                </div>
                {state?.errors?.error && (
                  <span className="error_response mt-2 ">{state.errors.error}</span>
                )}
            
                <button
                    className="btn p-4 mt-4 bg-white disabled:bg-gray-300 disabled:opacity-50 text-black text-sm flex justify-self-center"
                    disabled={isPending}
                    type="submit"
                    >
                    {isPending ? "Vent..." : "Log ind"}
                </button>
            </div>

        </form>
        </>
    )

}