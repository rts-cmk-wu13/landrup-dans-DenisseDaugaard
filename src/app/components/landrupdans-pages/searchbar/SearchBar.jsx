"use client"; // this component needs to be client-side because it uses state and effects.

import { useEffect, useState } from "react"; 
// useState → stores component state
//useState → stores component state
import { RiSearchLine } from "react-icons/ri";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
//useRouter() → programmatically change the route
//usePathname() → get current page path
//useSearchParams() → get current query parameters

/* pathname → /activities
search param → q=tango */

export default function SearchBar() {
  const [isActive, setIsActive] = useState(false);

  const router = useRouter();  // for navigating to new URLs -> router.push("/activities?q=phone")
  const pathname = usePathname();
  const searchParams = useSearchParams(); // /activities?q=tango&page=2, then ↩️

  const submittedQ = (searchParams.get("q") ?? "")// /activities?q=tango, then submittedQ = "  tango  "
  const [q, setQ] = useState(submittedQ); // stores the current value of the search input

  useEffect(() => { // This runs whenever submittedQ changes.
    setQ(submittedQ) // example ?q=tango → ?q=ballet 
  }, [submittedQ])  // Without this, the input might get out of sync with the URL.

  const onSubmit = (e) => {
    e.preventDefault(); // this avoids the default form submission behavior, which would cause a page reload.
    const query = q.trim(); // remove leading and trailing whitespace from the search query
    const params = new URLSearchParams(searchParams.toString());
    //Creates a mutable copy of the current URL parameters so we can modify it without affecting the original searchParams object.
    //?page=2&q=tango → params = URLSearchParams { "page" => "2", "q" => "tango" }

    if (!query) params.delete("q"); // If query empty → remove ?q= from URL, --> /activities?q= → /activities
    else params.set("q", query);

    router.push(`${pathname}?${params.toString()}`); // Navigates to the new URL with the updated query parameters. -> /activities?q=tango&page=2 → /activities?q=ballet&page=2 or /activities?q= → /activities
  };

  const handleToggle = () => {
  const next = !isActive;   // flips the current state of the search bar (active/inactive)
  setIsActive(next); // updates the state to reflect the new active/inactive status

  if (!next) { // If the search bar is being deactivated, we want to clear the search query.
    setQ(""); // Clear the input field immediately for better UX.
    const params = new URLSearchParams(searchParams.toString());// Create a mutable copy of the current search parameters.
    params.delete("q"); //return the URL to its base state without the search query, e.g., /activities?q=tango → /activities
    router.push(pathname); // no trailing "?"
  }
};

  return (
    <div className="relative w-full mt-4 mb-4">
      <form onSubmit={onSubmit}>
        <input
          value={isActive ? q : ""}
          disabled={!isActive}
          onChange={(e) => setQ(e.target.value)} // handle input changes by updating the state variable `q` with the current value of the input field.
          type="search"
          placeholder={isActive ? "Søg..." : ""}
          className={`${isActive ? "search_active" : "search_inactive"} w-full transition-all duration-300`}
        />
      </form>

      <RiSearchLine
        onClick={handleToggle}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-white cursor-pointer"
        size={26}
      />
    </div>
  );
}