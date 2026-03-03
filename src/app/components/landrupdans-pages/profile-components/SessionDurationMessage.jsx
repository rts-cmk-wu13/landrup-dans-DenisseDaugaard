"use client"
import { useState } from "react";
import { TbMessageChatbot } from "react-icons/tb";

export default function Modal({ title, message,style }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(prev => !prev);
    }

    return(
        <>
        <TbMessageChatbot onClick={handleToggle} className="relative flex justify-self-center" />
        {isOpen && (
        <div className={`absolute ${style}`}>
            <section>
                <h2 className="text-center">{title}</h2>
                <p>{message}</p>
            </section>
        </div>
        )}
        </>
    )
}
