import { classes } from "../data/classes";
import GrupCard from "./GrupCard";
import Link from "next/link";

export default function Grups(){
    //console.log(classes); 
    return(
        <article className="flex flex-col justify-center p-8">
            <h1 className="main_title">Vores holdtyper</h1>
            <section className="gap-4">
                {classes.map((classItem) =>(
                    <GrupCard key={classItem.id} title={classItem.title} description={classItem.description} imageSrc={classItem.imageSrc} />
                ))}

                <Link href="/landrupdans/activities" 
                className="self-center mt-6 py-2 bg-[var(--primary)] text-xl underline rounded-lg hover:bg-[var(--primary-dark)] transition-colors duration-300">
                    Se alle vores hold
                </Link>
            </section>
        </article>
    )
}