"use client";

import { useActionState, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";

export default function UpdateActivityForm({ initialState, updateActivity, id }) {
  const [state, formAction, isPending] = useActionState(updateActivity, initialState);

  // holds which fields are currently editable
  const [enabled, setEnabled] = useState(() => new Set());

  const toggleField = (fieldName) => {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(fieldName)) next.delete(fieldName);
      else next.add(fieldName);
      return next;
    });
  };

  const isEnabled = (fieldName) => enabled.has(fieldName);

  const inputClass = (fieldName) =>
    isEnabled(fieldName) ? "bg-white rounded mr-2 p-4 text-black w-full" : "";

  return (
    <article>
 
      <form noValidate action={formAction}>
        <input type="hidden" name="id" value={id} />
        <div className="relative flex flex-col mb-12">
          <label className="font-semibold" htmlFor="name">Hold Navn:</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Holdnavn"
            readOnly
            defaultValue={state?.values?.name ?? ""}
          />
          {state?.errors?.name && (
            <span className="error_response mt-2 absolute left-0 -bottom-12">{state.errors.name}</span>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="relative flex flex-col mb-12">
          <label className="font-semibold" htmlFor="description">Beskrivelse:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Beskrivelse"
            readOnly={!isEnabled("description")}
            className={inputClass("description")}
            defaultValue={state?.values?.description ?? ""}
          />
          {state?.errors?.description && (
            <span className="error_response mt-2 absolute left-0 -bottom-12">{state.errors.description}</span>
          )}
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={() => toggleField("description")}
          >
            <MdOutlineModeEditOutline />
          </button>
        </div>

        {/* Repeat for the rest */}
        {/* Example: weekday */}
        <div className="relative flex flex-col mb-12">
          <label className="font-semibold" htmlFor="weekday">Ugedag:</label>
          <input
            id="weekday"
            type="text"
            name="weekday"
            placeholder="Ugedag"
            readOnly={!isEnabled("weekday")}
            className={inputClass("weekday")}
            defaultValue={state?.values?.weekday ?? ""}
          />
          {state?.errors?.weekday && (
            <span className="error_response mt-2 absolute left-0 -bottom-12">{state.errors.weekday}</span>
          )}
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={() => toggleField("weekday")}
          >
            <MdOutlineModeEditOutline />
          </button>
        </div>
        <div className="relative flex flex-col mb-12">
          <label className="font-semibold" htmlFor="time">Tidspunkt:</label>
          <input
            id="time"
            type="time"
            name="time"
            placeholder="Tidspunkt"
            readOnly={!isEnabled("time")}
            className={inputClass("time")}
            defaultValue={state?.values?.time ?? ""}
          />
          {state?.errors?.time && (
            <span className="error_response mt-2 absolute left-0 -bottom-12">{state.errors.time}</span>
          )}
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={() => toggleField("time")}
          >
            <MdOutlineModeEditOutline />
          </button>
        </div>
        <div className="relative flex flex-col mb-12">
          <label className="font-semibold" htmlFor="minAge">Minimumsalder:</label>
          <input
            id="minAge"
            type="number"
            name="minAge"
            placeholder="Minimumsalder"
            readOnly={!isEnabled("minAge")}
            className={inputClass("minAge")}
            defaultValue={state?.values?.minAge ?? ""}
          />
          {state?.errors?.minAge && (
            <span className="error_response mt-2 absolute left-0 -bottom-12">{state.errors.minAge}</span>
          )}
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={() => toggleField("minAge")}
          >
            <MdOutlineModeEditOutline />
          </button>
        </div>
        <div className="relative flex flex-col mb-12">
          <label className="font-semibold" htmlFor="maxAge">Maksimumsalder:</label>
          <input
            id="maxAge"
            type="number"
            name="maxAge"
            placeholder="Maksimumsalder"
            readOnly={!isEnabled("maxAge")}
            className={inputClass("maxAge")}
            defaultValue={state?.values?.maxAge ?? ""}
          />
          {state?.errors?.maxAge && (
            <span className="error_response mt-2 absolute left-0 -bottom-12">{state.errors.maxAge}</span>
          )}
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={() => toggleField("maxAge")}
          >
            <MdOutlineModeEditOutline />
          </button>
        </div>
        <div className="relative flex flex-col mb-12">
          <label className="font-semibold" htmlFor="maxParticipants">Maksimum deltagere:</label>
          <input
            id="maxParticipants"
            type="number"
            name="maxParticipants"
            placeholder="Maksimum deltagere"
            readOnly={!isEnabled("maxParticipants")}
            className={inputClass("maxParticipants")}
            defaultValue={state?.values?.maxParticipants}
          />
          {state?.errors?.maxParticipants && (
            <span className="error_response mt-2 absolute left-0 -bottom-12">{state.errors.maxParticipants}</span>
          )}
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={() => toggleField("maxParticipants")}
          >{isEnabled("maxParticipants") ? "Lås felt" : <MdOutlineModeEditOutline />}
            
          </button>
        </div>

        {/* FILE (important: don't use defaultValue on file inputs) */}
        <div className="relative flex flex-col mb-12">
          <label htmlFor="file">Hold billede:</label>
          <input
            id="file"
            type="file"
            name="file"
            readOnly={!isEnabled("file")}
            className={inputClass("file")}
          />
          {state?.errors?.file && (
            <span className="error_response mt-2 absolute left-0 -bottom-12">{state.errors.file}</span>
          )}
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={() => toggleField("file")}
          >
            <MdOutlineModeEditOutline />
          </button>
        </div>

        <button
          className="btn p-2 mt-4 bg-white disabled:bg-gray-300 disabled:opacity-50 text-black text-sm flex justify-self-center"
          disabled={isPending}
          type="submit"
          
        >
          {isPending ? "Vent..." : "Opdater hold"}
        </button>

        {state?.serverMessage?.error && (
          <span className="error_response mt-2">{state.serverMessage.error}</span>
        )}
      </form>
    </article>
  );
}