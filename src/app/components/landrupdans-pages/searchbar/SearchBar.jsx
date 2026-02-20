"use client";

import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";


export default function SearchBar(){

    const [q, setQ] = useState("");
    const [isActive, setIsActive] = useState(false);

    const handleFocus = () => {
        console.log('show search input ');
        setIsActive((prev) => !prev);
    }


    const onSubmit = (e) => {
        e.preventDefault();
        console.log(q);
    }

    return(
    <div className="relative w-full mt-4 mb-4">
        <form onSubmit={onSubmit}>
            <input
            value={q}
            disabled={!isActive}
            onChange={(e) => setQ(e.target.value)}
            type="text"
            className={` ${isActive ? "search_active" : "search_inactive"} w-full transition-all duration-300`}
            />
        </form>

        <RiSearchLine
            onClick={handleFocus}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white"
            size={26}
        />
    </div>
    )
}