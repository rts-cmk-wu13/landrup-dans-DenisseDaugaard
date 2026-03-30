"use client";

import { useSearchParams } from "next/navigation";
import SearchBar from "@/app/components/landrupdans-pages/searchbar/SearchBar";
import ActivityCard from "@/app/components/landrupdans-pages/activities/ActivityCard";

export default function ActivitiesClient({ data }) {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();

  const filtered = !q
    ? data
    : data.filter((activity) => {
        const haystack = [
          activity.name,
          activity.description,
          activity.weekday,
          activity.time,
          activity.minAge,
          activity.maxAge,
        ]
          .filter((v) => v !== undefined && v !== null)
          .join(" ")
          .toLowerCase();

        return haystack.includes(q);
      });

  return (
    <article className="p-8">
      <div className="flex">
        <SearchBar />
      </div>

      <h1 className="main_title">Aktiviteter</h1>

      {!filtered.length && q && (
        <p className="text-gray-400 mt-4">Ingen resultater for: "{q}"</p>
      )}

      <section>
        {filtered.map((activity) => (
          <ActivityCard key={activity.id} data={activity} />
        ))}
      </section>
    </article>
  );
}