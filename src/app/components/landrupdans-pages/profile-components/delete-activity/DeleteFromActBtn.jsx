
import { MdOutlineDelete } from "react-icons/md";
export default function DeleteFromActBtn({openModal}) {

    return(
        <>
       <button onClick={openModal} className="rounded-[0.75rem] px-3 bg-red-500 text-[var(--foreground)]">
        <MdOutlineDelete className="text-2xl"/>
        </button>
        </>
    )
}