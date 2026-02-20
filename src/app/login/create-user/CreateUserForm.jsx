"use client"
import { useActionState } from "react"
import { CreateUser } from "./action"


export default function CreateUserForm(){

    const initialState = {
       values: { 
        name: "",
        lastname: "",
        username: "", 
        age: "",
        password: "",
        confirmPassword: "",
       },
       errors: {},
     };
   
     const [state, formAction, isPending] = useActionState(CreateUser, initialState);
     //console.log(state);
     

    return(
         <form noValidate action={formAction}>
            <div>
                <div className="relative flex flex-col mb-6">
                <input
                    type="text"
                    name="name"
                    placeholder="Fornavn"
                    className="bg-white rounded mr-2 p-4 text-black w-full"
                    defaultValue={state?.values?.name ?? ""}
                    />
                    {state?.errors?.name && (
                <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.name}</span>)}
                </div>
                <div className="relative flex flex-col mb-6">
                <input
                    type="text"
                    name="lastname"
                    placeholder="Efternavn"
                    className="bg-white rounded mr-2 p-4 text-black w-full"
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
                    className="bg-white rounded mr-2 p-4 text-black w-full"
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
                    className="bg-white rounded mr-2 p-4 text-black w-full"
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
                    className="bg-white rounded mr-2 p-4 text-black w-full"
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
                    className="bg-white rounded mr-2 p-4 text-black w-full"
                    defaultValue={state?.values?.confirmPassword ?? ""}
                    />
                    {state?.errors?.confirmPassword && (
                <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.confirmPassword}</span>)}
                </div>
                {state?.errors?.error && (
                  <span className="error_response mt-2 ">{state.errors.error}</span>
                )}
            
                <button
                    className="btn p-4 mt-4 bg-white disabled:bg-gray-300 disabled:opacity-50 text-black text-sm flex justify-self-center"
                    disabled={isPending}
                    type="submit"
                    >
                    {isPending ? "Vent..." : "Opret bruger"}
                </button>
            </div>


      </form>
    )

}