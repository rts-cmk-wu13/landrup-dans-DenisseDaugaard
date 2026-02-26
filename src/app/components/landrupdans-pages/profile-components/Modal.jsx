"use client"
import { useRef } from "react";
import { TbMessageChatbot } from "react-icons/tb";

export default function Modal({ title, message, handleSubmit, style }) {
    
    const modalRef = useRef(null);

    const handleClose = () => {
        if (modalRef.current) {
            modalRef.current.close();
        }
    }

    const handleOpen = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    }

    return(
        <>
        <TbMessageChatbot onClick={handleOpen} className="flex justify-self-center" />
        <div className="relative">
            <dialog id="myModal" ref={modalRef} className={`absolute ${style} backdrop:bg-black/50 backdrop-blur-sm rounded-lg p-6 z-50`}>
                <button onClick={handleClose}>Close</button>
                <section>
                    <h2>{title}</h2>
                    <p>{message}</p>

                    <div>
                        <button onClick={handleSubmit}>Ok</button>
                    </div>
                </section>
            </dialog>
        </div>
        </>
    )
}
