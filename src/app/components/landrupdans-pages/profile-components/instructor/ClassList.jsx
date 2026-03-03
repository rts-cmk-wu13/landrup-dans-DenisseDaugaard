import { FaUserLarge } from "react-icons/fa6";
export default function ClassList({ activity}) {
    return(

        <section className="p-6">
            <ul className="mt-8">
            {activity?.users.map((user, index) => (
                <li key={`${index}-${user.userId}`} 
                    className="flex justify-between bg-[var(--foreground)] text-[var(--background)] border rounded-[0.5rem] py-2 px-4 mb-4">
                    <span className="flex gap-2 items-center">
                        <FaUserLarge /> {user.firstname} {user.lastname}
                    </span>
                    <span>{user.age} år</span>
                </li>
            ))}
            </ul>
        </section>
    )
}