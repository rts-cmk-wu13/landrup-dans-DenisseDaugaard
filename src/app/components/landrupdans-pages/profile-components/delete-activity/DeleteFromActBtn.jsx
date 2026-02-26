import { RiDeleteBin6Line } from "react-icons/ri";

export default function DeleteFromActBtn({activity, openModal}) {

    return(
        <>
       <button onClick={openModal} className="btn text-xs bg-red-500 text-[var(--foreground)]">
        <RiDeleteBin6Line className="text-lg"/>
        </button>
        </>
    )
}