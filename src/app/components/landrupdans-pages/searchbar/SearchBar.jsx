"use client";

import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const [isActive, setIsActive] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const submittedQ = (searchParams.get("q") ?? "").trim();
  const [q, setQ] = useState(submittedQ);

  useEffect(() => {
    setQ(submittedQ)
  }, [submittedQ])

  const onSubmit = (e) => {
    e.preventDefault();
    const query = q.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (!query) params.delete("q");
    else params.set("q", query);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleToggle = () => {
  const next = !isActive;   // what it will become
  setIsActive(next);

  if (!next) {
    setQ("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname); // ✅ no trailing "?"
  }
};

  return (
    <div className="relative w-full mt-4 mb-4">
      <form onSubmit={onSubmit}>
        <input
          value={isActive ? q : ""}
          disabled={!isActive}
          onChange={(e) => setQ(e.target.value)}
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