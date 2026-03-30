"use client"

import { useActionState } from "react"

export default function CreateAndUpdateActivityForm({initialState, createActivity}) {

    const [state, formAction, isPending] = useActionState(createActivity, initialState);

    return( 
        <article>
            <form noValidate action={formAction}>
                 <div className="relative flex flex-col mb-6">
                    <input
                        type="text"
                        name="name"
                        placeholder="Holdnavn"
                        className="bg-white rounded mr-2 p-4 text-black w-full"
                        defaultValue={state?.values?.name ?? ""}
                        />
                        {state?.errors?.name && (
                    <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.name}</span>)}
                </div>
                 <div className="relative flex flex-col mb-6">
                    <textarea
                        name="description"
                        placeholder="Beskrivelse"
                        className="bg-white rounded mr-2 p-4 text-black w-full"
                        defaultValue={state?.values?.description ?? ""}
                        />
                        {state?.errors?.description && (
                    <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.description}</span>)}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative flex flex-col mb-6">
                        <input
                            type="text"
                            name="weekday"
                            placeholder="Ugedag"
                            className="bg-white rounded mr-2 p-4 text-black w-full"
                            defaultValue={state?.values?.weekday ?? ""}
                            />
                            {state?.errors?.weekday && (
                        <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.weekday}</span>)}
                    </div>
                    <div className="relative flex flex-col mb-6">
                        <input
                            type="time"
                            name="time"
                            placeholder="Tidspunkt"
                            className="bg-white rounded mr-2 p-4 text-black w-full"
                            defaultValue={state?.values?.time ?? ""}
                            />
                            {state?.errors?.time && (
                        <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.time}</span>)}
                    </div>
                    <div className="relative flex flex-col mb-6">
                        <input
                            type="number"
                            name="minAge"
                            placeholder="Minimum alder"
                            className="bg-white rounded mr-2 p-4 text-black w-full"
                            defaultValue={state?.values?.minAge ?? ""}
                            />
                            {state?.errors?.minAge && (
                        <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.minAge}</span>)}
                    </div>
                    <div className="relative flex flex-col mb-6">
                        <input
                            type="number"
                            name="maxAge"
                            placeholder="Maximum alder"
                            className="bg-white rounded mr-2 p-4 text-black w-full"
                            defaultValue={state?.values?.maxAge ?? ""}
                            />
                            {state?.errors?.maxAge && (
                        <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.maxAge}</span>)}
                    </div>
                </div>
                    <div className="relative flex flex-col mb-6">
                        <input
                            type="number"
                            name="maxParticipants"
                            placeholder="Maximum deltagere"
                            className="bg-white rounded mr-2 p-4 text-black w-full"
                            defaultValue={state?.values?.maxParticipants ?? ""}
                            />
                            {state?.errors?.maxParticipants && (
                        <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.maxParticipants}</span>)}
                    </div>
                <div className="relative flex flex-col mb-6">
                        <label htmlFor="file">Hold billede:</label>
                        <input
                            type="file"
                            name="file"
                            className="bg-white rounded mr-2 p-4 text-black w-full"
                            defaultValue={state?.values?.file ?? ""}
                            />
                            {state?.errors?.file && (
                        <span className="error_response mt-2 absolute left-0 -bottom-6">{state?.errors?.file}</span>)}
                    </div>
                    <button
                    className="btn p-4 mt-4 bg-white disabled:bg-gray-300 disabled:opacity-50 text-black text-sm flex justify-self-center"
                    disabled={isPending}
                    type="submit"
                    >
                    {isPending ? "Vent..." : "Opret hold"}
                </button>
                {state?.serverMessage?.error && (
                  <span className="error_response mt-2 ">{state.serverMessage.error}</span>
                )}
                {/* {state?.serverMessage?.success && (
                  <span className="success_response mt-2 ">{state.serverMessage.success}</span>
                )} */}
            </form>
        </article>
    )
}