import { classes } from "../data/classes";
import GrupCard from "./GrupCard";
export default function Grups(){
    //console.log(classes); 
    return(
        <article className="flex flex-col justify-center p-4">
            <h1 className="main_title">Vores holdtyper</h1>
            <section className="gap-4">
                {classes.map((classItem) =>(
                    <GrupCard key={classItem.id} title={classItem.title} description={classItem.description} imageSrc={classItem.imageSrc} />
                ))}
            </section>
        </article>
    )
}