"use client";
import DeleteFromActBtn from "../delete-activity/DeleteFromActBtn";
import DeleteModal from "../delete-activity/DeleteModal";
import { useRef , useState} from "react";
import Link from "next/link";


export default function ActivityCard({ data}) {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const modalRef = useRef(null);
  const openModal = (activity) => {
    setSelectedActivity(activity);
    modalRef.current?.showModal();
  };
  
  return (
    <>
      <h2 className="text-xl mb-4">{data?.length > 0 ? "Tilmeldte hold" : "Ingen tilmeldte hold"}</h2>

      {data?.activities?.map((activity, index) => (
        <section key={index} className="bg-[var(--light-blue)] rounded-[0.75rem] p-4 text-[var(--background)] mb-6">
  
          <section className="bg-[var(--light-blue)] rounded-[0.75rem] p-2 text-xl text-[var(--background)] mb-6">
    
            <h3 className="text-2xl font-semibold mb-4">{activity.name}</h3>
            <p className="mb-4">
        {activity.weekday} {activity.time}
            </p>
            <div className="flex justify-between">
              <Link href={`/landrupdans/activities/${activity.id}`}  className="btn text-xl text-white bg-[var(--background)]">
                Vis hold
              </Link>
              <DeleteFromActBtn openModal={() => openModal(activity)} />
            </div>
          </section>
      </section>
      ))}
      
      <DeleteModal
        actId={selectedActivity?.id}
        modalRef={modalRef}
        title={"Slet fra hold"}
        message={`Er du sikker på at du vil slette dig fra ${selectedActivity?.name}?`}
        style="w-10/12 mx-auto my-auto"/>
    </>
  );
}