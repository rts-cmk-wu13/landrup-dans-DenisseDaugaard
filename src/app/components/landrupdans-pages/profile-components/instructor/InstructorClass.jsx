import ClassList from "../ClassList";

export default function InstructorClass({activities}) {
    return(
        <section className="p-6">
            <h2 className="text-xl mb-4">Dine hold</h2>
            <ClassList activities={activities} />
        </section>
    )
}