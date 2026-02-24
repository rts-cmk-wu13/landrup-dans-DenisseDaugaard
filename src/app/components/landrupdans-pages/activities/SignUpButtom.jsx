"use client";

import { useActionState } from "react";
import { SignUpToAnActivity } from "./action";

export default function SignUpButton({ activityId }) {
  const initialState = { serverResponse: {} };

  const [state, formAction, isPending] =
    useActionState(SignUpToAnActivity, initialState);

  return (
    <form noValidate action={formAction}>
      <input type="hidden" name="activityId" value={activityId} />

    {!isPending && !state?.serverResponse?.message && (
       <button
        className="absolute right-12 top-[45%] mt-4 px-4 py-2 bg-[var(--background)] text-white rounded"
        type="submit"
      >
        Tilmeld
      </button>
    )}

      {isPending && !state?.serverResponse?.message && (
       <button
        className="disabled:opacity-50 absolute right-12 top-[45%] mt-4 px-4 py-2 bg-[var(--background)] text-white rounded"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Tilmelding i gang..." : "Tilmeld"}
      </button> 
      )}

      {state?.serverResponse?.message && (
        <p className="text-red-500 absolute left-20 bg-red-100/90 rounded p-2 top-[45%]">{state.serverResponse.message}</p>
      )}

    </form>
  );
}