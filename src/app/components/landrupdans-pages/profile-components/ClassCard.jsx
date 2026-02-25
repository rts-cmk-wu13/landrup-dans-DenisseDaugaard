"use client";
import DeleteFromActBtn from "./delete-activity/DeleteFromActBtn";
import DeleteModal from "./delete-activity/DeleteModal";
import { useRef, useState } from "react";
import ClassList from "./ClassList";

export default function ActivityCard({ activity, usersInfo, }) {
  const [isListOpen, setIsListOpen] = useState(false);

  const toggleList = () => setIsListOpen(prev => !prev);

  const modalRef = useRef(null);
  const openModal = () => modalRef.current?.showModal();

  const id = activity.id;
  const usersForThisActivity = usersInfo.filter(user => user.activityId === id);
     //this filters the usersInfo array to only include users that are associated 
     //with the current activity, based on matching activityId with the id of the activity being rendered.
    //console.log(usersForThisActivity);
    
  return (
  
    <>
     <section className="bg-[var(--light-blue)] rounded-[0.75rem] p-4 text-[var(--background)] mb-6">
        <h3 className="text-xl font-semibold mb-4">{activity.name}</h3>
        <p className="mb-4">
          {activity.weekday} {activity.time}
        </p>

        <div className="flex justify-between">
          <button
            className="btn text-xs text-white bg-[var(--background)]"
            onClick={toggleList}
          >
            {isListOpen ? "Skjul hold" : "Vis hold"}
          </button>

          <DeleteFromActBtn activity={activity} openModal={openModal} />
        </div>

        {isListOpen && (
          <section className="mt-4 transition-all duration-500 ease-in-out">
            {usersForThisActivity && (
              <ClassList usersForThisActivity={usersForThisActivity} />
            )}
          </section>
        )}
      </section>

      <DeleteModal
        actId={id}
        modalRef={modalRef}
        title={"Slet fra hold"}
        message={`Er du sikker på at du vil slette dig fra ${activity.name}?`}
        style="w-10/12 mx-auto my-auto"/>
    </>

  );
}