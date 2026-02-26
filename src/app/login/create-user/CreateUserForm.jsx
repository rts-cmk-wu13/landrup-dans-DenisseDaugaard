"use client"
import { useActionState } from "react"
import { CreateUser } from "./action"
import Link from "next/link";


export default function CreateUserForm(){

    const initialState = {
       values: { 
        firstname: "",
        lastname: "",
        username: "", 
        age: "",
        password: "",
        confirmPassword: "",
       },
       errors: {},
       serverResponse:{}
     };
     
     const [state, formAction, isPending] = useActionState(CreateUser, initialState);
     const isSuccess = Boolean(state?.serverResponse?.success);
     const inputClass = `transition-all duration-300 ${isSuccess ? "opacity-50 blur-sm pointer-events-none" : ""}`;
     

    return(
         <form noValidate action={formAction} >
            <div>
                <div className="relative flex flex-col mb-6">
                <input
                    type="text"
                    name="firstname"
                    placeholder="Fornavn"
                    className={`bg-white rounded mr-2 p-4 text-black w-full ${inputClass}`}
                    defaultValue={state?.values?.firstname ?? ""}
                    />
                    {state?.errors?.firstname && (
                <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.firstname}</span>)}
                </div>
                <div className="relative flex flex-col mb-6">
                <input
                    type="text"
                    name="lastname"
                    placeholder="Efternavn"
                    className={`bg-white rounded mr-2 p-4 text-black w-full ${inputClass}`}
                    defaultValue={state?.values?.lastname ?? ""}
                    />
                    {state?.errors?.lastname && (
                <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.lastname}</span>)}
                </div>
                <div className="relative flex flex-col mb-6">
                <input
                    type="text"
                    name="username"
                    placeholder="Brugernavn"
                    className={`bg-white rounded mr-2 p-4 text-black w-full ${inputClass}`}
                    defaultValue={state?.values?.username ?? ""}
                    />
                    {state?.errors?.username && (
                <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.username}</span>)}
                </div>
                <div className="relative flex flex-col mb-6">
                <input
                    type="number"
                    name="age"
                    placeholder="Alder"
                    className={`bg-white rounded mr-2 p-4 text-black w-full ${inputClass}`}
                    defaultValue={state?.values?.age ?? ""}
                    />
                    {state?.errors?.age && (
                <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.age}</span>)}
                </div>
                <div className="relative flex flex-col mb-6">
                <input
                    type="password"
                    name="password"
                    placeholder="Adgangskode"
                    className={`bg-white rounded mr-2 p-4 text-black w-full ${inputClass}`}
                    defaultValue={state?.values?.password ?? ""}
                    />
                    {state?.errors?.password && (
                <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.password}</span>)}
                </div>
                <div className="relative flex flex-col mb-6">
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Bekræft adgangskode"
                    className={`bg-white rounded mr-2 p-4 text-black w-full ${inputClass}`}
                    defaultValue={state?.values?.confirmPassword ?? ""}
                    />
                    {state?.errors?.confirmPassword && (
                <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.confirmPassword}</span>)}
                </div>
                {state?.serverResponse?.error && (
                  <span className="error_response mt-2 ">{state.serverResponse.error}</span>
                )}

                {state?.serverResponse?.success && (
                  <span className="success_response mt-2 ">{state.serverResponse.success}</span>
                )}

                {state?.serverResponse?.success && !isPending ?(
                    <Link href="/login" className="btn p-4 mt-4 bg-white text-black text-sm flex justify-self-center">
                    Gå til login
                    </Link>
                ):(
                     <button
                    className="btn p-4 mt-4 bg-white disabled:bg-gray-300 disabled:opacity-50 text-black text-sm flex justify-self-center"
                    disabled={isPending}
                    type="submit"
                    >
                    {isPending ? "Vent..." : "Opret bruger"}
                </button>
                )}

            </div>
      </form>
    )

}