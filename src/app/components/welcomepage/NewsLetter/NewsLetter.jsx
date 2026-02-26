"use client";
import { useActionState } from "react";
import { getNewsLetter } from "./action.js";

export default function NewsLetter() {
  const initialState = {
    values: { email: "" },
    errors: {},
    serverMessage:{}
  };

  const [state, formAction, isPending] = useActionState(getNewsLetter, initialState);
  //console.log(state);
  
  return (
    <section className="p-4">
      <h1 className="main_title">Nyhedsbrev</h1>
      <p className="mb-4">Få direkte besked når vi har sæsonstart eller afholder arrangementer.</p>

      <form noValidate action={formAction} className="flex flex-col">
        <div className="flex items-center">
            <div className="relative flex flex-col">
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="bg-white rounded mr-2 p-4 text-black"
                defaultValue={state?.values?.email ?? ""}
                />
                {state?.errors?.email && (
            <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.email}</span>)}
            </div>
            <button
                className="rounded p-4 bg-white disabled:bg-gray-300 disabled:opacity-50 text-black text-sm"
                disabled={isPending}
                type="submit"
                >
                {isPending ? "Vent..." : "Tilmeld"}
            </button>
        </div>

        {state?.serverMessage?.error && (
          <span className="error_response mt-2">{state.serverMessage.error}</span>
        )}
    
        {state?.serverMessage?.success && (
          <span className="success_response mt-2">{state.serverMessage.success}</span>
        )}

      </form>
    </section>
  );
}