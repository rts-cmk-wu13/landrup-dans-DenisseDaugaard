
export default function DeleteFromActBtn({activity, openModal}) {

    return(
        <>
       <button onClick={openModal} className="btn text-xs bg-red-500 text-[var(--foreground)]">
        Slet fra hold
        </button>
        </>
    )
}