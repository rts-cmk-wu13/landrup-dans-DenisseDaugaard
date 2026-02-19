"use client";
import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { FaListUl } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import { usePathname } from "next/navigation";


export default function Footer(){

    const pathname = usePathname();
 
    const isActive = (path) => pathname === path ? "text-black" : "text-[var(--light-gray)]";
    return(
        <footer className="  fixed bottom-0 left-0 right-0 z-50
        bg-[#F2F2F2] border-t border-[#D9D9D9]
        pb-[env(safe-area-inset-bottom)]">

             <nav className="mx-auto max-w-md">
                <ul className="flex items-center justify-around py-2">
                    <li>
                        <Link href="/">
                        <div className={`flex flex-col items-center ${isActive("/")}`}>
                            <FiHome size={24} />
                            <span className="ml-2">Home</span>
                        </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/landrupdans/activities">
                        <div className={`flex flex-col items-center ${isActive("/landrupdans/activities")}`}>
                            <FaListUl size={24} />
                            <span className="ml-2">Aktiviteter</span>
                        </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/landrupdans/profile">
                        <div className={`flex flex-col items-center ${isActive("/landrupdans/profile")}`}>
                            <FaUserLarge size={24} />
                            <span className="ml-2">Profil</span>
                        </div>
                        </Link>
                    </li>
                </ul>
             </nav>
        </footer>
    )
}