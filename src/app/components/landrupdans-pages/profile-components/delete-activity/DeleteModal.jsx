"use client";

import { useState } from "react";
import { deleteUserFromActivity } from "./action";

export default function DeleteModal({ title, message, style, modalRef, actId}) {
    const [errorMessage, setErrorMessage] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const handleClose = () => {
        if (modalRef.current) {
            modalRef.current.close();
        }
    }
    
      const handleSubmitAndClose = async () => {
        if (!actId) {
            setErrorMessage("Aktivitets ID mangler");
            return;
        }

        setIsDeleting(true);
        const response = await deleteUserFromActivity(actId);
        
        if (!response?.ok) {
            setErrorMessage(response?.text || "Der skete en fejl");
            setIsDeleting(false);
            return;
        }
        handleClose();
    }


    return(
        <>
        <div className="relative">
            <dialog id="myModal" ref={modalRef} className={`absolute ${style} backdrop:bg-black/50 backdrop-blur-sm rounded-lg p-2  z-50`}>
                <section className="text-center">
                    <h2 className="font-semibold mb-2">{title}</h2>
                    <p>{message}</p>

                     {errorMessage && (
                        <p className="text-red-500 mt-2">
                            {errorMessage}
                        </p>
                    )}

                    <div className="flex gap-4 justify-center mt-4">
                        {errorMessage && (
                            <button className="btn bg-gray-500 text-white" onClick={handleClose}>Luk</button>
                        )}
                        {isDeleting && (
                        <button className="btn disabled:bg-gray-500 bg-red-500 text-white" onClick={handleSubmitAndClose} disabled={isDeleting}>
                            {isDeleting ? "Sletter..." : "Ja, slet"}
                        </button>
                        )}

                        {!isDeleting && !errorMessage && (
                            <>
                            <button className="btn bg-green-500 text-white" onClick={handleClose}>Nej</button>
                            <button className="btn disabled:bg-gray-500 bg-red-500 text-white" onClick={handleSubmitAndClose} disabled={isDeleting}>
                            {isDeleting ? "Sletter..." : "Ja, slet"}
                            </button>
                            </>
                        )}
    
                    </div>
                </section>
            </dialog>
        </div>
        </>
    )
}
