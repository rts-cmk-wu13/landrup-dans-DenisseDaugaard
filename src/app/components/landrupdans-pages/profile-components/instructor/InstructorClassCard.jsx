"use client";
import { FaRegEdit } from "react-icons/fa";
import DeleteModal from "../delete-activity/DeleteModal";
import DeleteFromActBtn from "../delete-activity/DeleteFromActBtn";
import Link from "next/link";
import { useRef, useState } from "react";

export function InstructorClassCard({ instructorActivities, isInstructor }) {
  const [selectActitvity, setSelectActivity] = useState(null);
  const modalRef = useRef(null);

  const openModal = (activity) => {
    setSelectActivity(activity);
    modalRef.current?.showModal();
  };

  return (
    <section>
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl mb-4">Mine hold</h2>
        <Link
          href="/landrupdans/profile/create-activity"
          className="rounded-[0.5rem] bg-white text-[var(--background)] text-xl px-4 py-2"
        >
          +
        </Link>
      </div>

      {instructorActivities ? (
        <>
          {instructorActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-[var(--light-blue)] rounded-[0.75rem] p-4 text-[var(--background)] mb-6"
            >
              <h2 className="text-xl font-semibold">{activity.name}</h2>
              <p className="mt-2">
                {activity.weekday} {activity.time}
              </p>

              <span className="flex justify-between mt-2">
                <p>Max. deltagere: {activity.maxParticipants}</p>
                <p>Tilmeldte: {activity.users?.length || 0}</p>
              </span>

              <div className="mt-4 flex justify-between">
                <Link
                  href={`/landrupdans/profile/${activity.id}`}
                  className="btn bg-[var(--background)] text-[var(--foreground)]"
                >
                  Deltagerliste
                </Link>

                <div className="flex gap-2">
                  <Link
                    href={`/landrupdans/profile/update-activity/${activity.id}`}
                    className="inline-flex items-center rounded-[0.75rem] px-3 bg-[var(--background)] text-[var(--foreground)]"
                  >
                    <FaRegEdit className="text-2xl" />
                  </Link>

                  <DeleteFromActBtn openModal={() => openModal(activity)} />
                </div>
              </div>
            </div>
          ))}

          <DeleteModal
            actId={selectActitvity?.id}
            message={`Er du sikker på, at du vil slette holdet "${selectActitvity?.name}"?. Alle tilmeldte brugere vil blive fjernet fra holdet, og denne handling kan ikke fortrydes.`}
            title={`Slet hold: ${selectActitvity?.name}`}
            style="w-10/12 mx-auto my-auto"
            modalRef={modalRef}
            isInstructor={isInstructor}
          />
        </>
      ) : (
        <p>Du har ingen hold tilknyttet din profil.</p>
      )}
    </section>
  );
}