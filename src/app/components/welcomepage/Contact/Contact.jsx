"use client";
import { useActionState } from "react";
import { sendMessage } from "./action.js";

export default function Contact() {
  const initialState = {
    values: {
        name: "",
        email: "",
        message:"",
     },
    errors: {},
    serverMessage:{},
  };

  const [state, formAction, isPending] = useActionState(sendMessage, initialState);
  //console.log(state);
  
  return (
    <section className="p-8">
      <h1 className="main_title">Kontakt os</h1>

      <form noValidate action={formAction}>
        <div className="">
            <div className="relative flex flex-col mb-8">
            <input
                type="text"
                name="name"
                placeholder="Navn"
                className="bg-white rounded mr-2 p-4 text-black"
                defaultValue={state?.values?.name ?? ""}
                />
                {state?.errors?.name && (
            <span className="error_response mt-2 absolute left-0 -bottom-6">{state.errors.name}</span>)}
            </div>

            <div className="relative flex flex-col mb-8">
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="bg-white rounded mr-2 p-4 text-black"
                defaultValue={state?.values?.email ?? ""}
                />
                {state?.errors?.email && (
            <span className="error_response mt-2 absolute left-0 -bottom-6">{state.errors.email}</span>)}
            </div>

            <div className="relative flex flex-col mb-8">
            <textarea
                name="message"
                placeholder="Besked"
                rows={7}
                className="bg-white rounded mr-2 p-4 text-black"
                defaultValue={state?.values?.message ?? ""}
                />
                {state?.errors?.message && (
            <span className="error_response mt-2 absolute left-0 -bottom-6">{state.errors.message}</span>)}
            </div>
            {state?.serverMessage?.error && (
              <span className="error_response mt-2 mb-4">{state.serverMessage.error}</span>
            )}
        
            {state?.serverMessage?.success && (
              <span className="success_response mb-4">{state.serverMessage.success}</span>
            )}

            <button
                className="btn flex justify-self-center bg-white disabled:bg-gray-300 disabled:opacity-50 text-black text-sm"
                disabled={isPending}
                type="submit"
                >
                {isPending ? "Vent..." : "Send besked"}
            </button>
        </div>


      </form>
    </section>
  );
}