import { FaUserLarge } from "react-icons/fa6";
export default function ClassList({ usersForThisActivity }) {
    return(
        <ul className="mt-8">
        {usersForThisActivity.map(user => (
            <li key={`${user.activityId}-${user.userId}`} 
                className="flex justify-between bg-[var(--background)] text-[var(--light-blue)] border rounded-md py-2 px-4 mb-4">
                <span className="flex gap-2 items-center">
                    <FaUserLarge /> {user.firstname} {user.lastname}
                </span>
                <span>{user.age} år</span>
            </li>
        ))}
        </ul>
    )
}