"use client";
import DeleteFromActBtn from "../delete-activity/DeleteFromActBtn";
import DeleteModal from "../delete-activity/DeleteModal";
import { useRef } from "react";
import Link from "next/link";
import React from "react";

export default function ActivityCard({data, activity}) {

  const modalRef = useRef(null);
  const openModal = () => modalRef.current?.showModal();

  const id = activity?.id ;
    
  return (
    <>
      <h2 className="text-xl mb-4">{data.activities.length > 0 ? "Tilmeldte hold" : "Ingen tilmeldte hold"}</h2>

      {data.activities.map((activity, index) => (
      <React.Fragment key={index}>
        <section className="bg-[var(--light-blue)] rounded-[0.75rem] p-4 text-[var(--background)] mb-6">
  
          <h3 className="text-xl font-semibold mb-4">{activity.name}</h3>
          <p className="mb-4">
            {activity.weekday} {activity.time}
          </p>
  
          <div className="flex justify-between">
       
            <Link href={`/landrupdans/activities/${activity.id}`}  className="btn text-xs text-white bg-[var(--background)]">
              Vis hold
            </Link>

            <DeleteFromActBtn activity={activity} openModal={openModal} />
          </div>
  
  
        </section>
  
        <DeleteModal
          actId={id}
          modalRef={modalRef}
          title={"Slet fra hold"}
          message={`Er du sikker på at du vil slette dig fra ${activity.name}?`}
          style="w-10/12 mx-auto my-auto"/>
      </React.Fragment>
      ))}
    </>
  );
}