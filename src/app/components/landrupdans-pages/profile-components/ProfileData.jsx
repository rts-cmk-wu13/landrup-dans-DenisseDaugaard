import { FaUserLarge } from "react-icons/fa6";

export default function ProfileData({firstname, lastname, role}) {
    return(
         <section className="bg-[var(--foreground)] w-full flex flex-col items-center gap-4 p-6 text-center">
            <FaUserLarge className="text-[var(--background)] text-[3rem]"  />
                <div>
                    <h2 className="text-[var(--light-gray)]">{firstname} {lastname}</h2>
                    <p className="text-[var(--light-gray)]">{role}</p>
                </div>
        </section>
    )
}