"use client"
import DeleteFromActBtn from "./delete-activity/DeleteFromActBtn";
import DeleteModal from "../../modals/DeleteModal";
import { useRef } from "react";

export default function ActivityCard({activity}) {

    const errors = {};

    const modalRef = useRef(null);
    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    }

    return(
        <>
            <div className="bg-[var(--light-blue)] rounded-[0.75rem] p-4 text-[var(--background)] mb-6">
                {errors.delete && <p className="text-red-500 mb-2">{errors.delete}</p>}
                <h3 className="text-xl font-semibold mb-4">{activity.name}</h3>
                <p className="mb-4">{activity.weekday}  {activity.time} </p>
                <DeleteFromActBtn activity={activity} openModal={openModal} />
            </div>

            <DeleteModal
            actId={activity.id}
            modalRef={modalRef}
            title={"Slet fra hold"} 
            message={`Er du sikker på at du vil slette dig fra ${activity.name}?`} 
            style="w-10/12 mx-auto my-auto"
            />
        </>
    )
}