"use client";

import { useEffect, useMemo, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import Link from "next/link";

export default function SearchBar({ data = [] }) {
  const [isActive, setIsActive] = useState(false);
  const [q, setQ] = useState("");
  const [submittedQ, setSubmittedQ] = useState(""); // the query we actually searched for
  const [searchResults, setSearchResults] = useState([]);

  // --- 1) Search in ALL data fields (including nested objects/arrays)
  const stringifyForSearch = (value) => {
    if (value == null) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    if (Array.isArray(value)) return value.map(stringifyForSearch).join(" ");
    if (typeof value === "object") return Object.values(value).map(stringifyForSearch).join(" ");
    return "";
  };
  console.log(stringifyForSearch(data));
  

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  // --- 2) When search is not active, clear and hide the value + results
  useEffect(() => {
    if (!isActive) {
      setQ("");
      setSubmittedQ("");
      setSearchResults([]);
    }
  }, [isActive]);

  const onSubmit = (e) => {
    e.preventDefault();

    const query = q.trim();
    console.log("Submitting search for:", query);
    setSubmittedQ(query);

    if (!query) {
      setSearchResults([]);
      return;
    }

    const lower = query.toLowerCase();

    const results = data.filter((item) =>
      stringifyForSearch(item).toLowerCase().includes(lower)
    );
    console.log(results);   
    setSearchResults(results);
  };

 
  

  const showDropdown = isActive && submittedQ; // show feedback only after a submit
  const noResults = showDropdown && searchResults.length === 0;

  return (
    <div className="relative w-full mt-4 mb-4">
      <form onSubmit={onSubmit}>
        <input
          value={isActive ? q : ""}          // (also ensures it's not visible when inactive)
          disabled={!isActive}
          onChange={(e) => setQ(e.target.value)}
          type="search"
          placeholder={isActive ? "Søg..." : ""} // optional
          className={`${isActive ? "search_active" : "search_inactive"} w-full transition-all duration-300`}
        />
      </form>

      {showDropdown && searchResults.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 z-10">
          {searchResults.map((result) => (
            <li
              key={result.id}
              className="p-2 bg-[var(--light-blue)] text-gray-500 border-b border-gray-200"
            >
              <Link href={`/landrupdans/activities/${result.id}`}>
                {result.name ?? "Unnamed"}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* 3) Not found message for the submitted query */}
      {noResults && (
        <p className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded mt-1 z-10 p-2 text-gray-500">
          Ingen resultater: "{submittedQ}" blev ikke fundet
        </p>
      )}

      <RiSearchLine
        onClick={handleToggle}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white cursor-pointer"
        size={26}
      />
    </div>
  );
}