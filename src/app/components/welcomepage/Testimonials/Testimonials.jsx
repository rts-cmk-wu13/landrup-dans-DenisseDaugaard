import { getJSON } from "@/lib/general"
import Carousel from "./Carousel";

export default async function Testimonials(){

    const url = "http://localhost:4000/api/v1/testimonials"
    const { data, ok } = await getJSON(url)
    console.log('data: 👩‍💻', data);
    
    if (!ok || !data) {
        return null
    }

    if(data){
        return(
        <article className="bg-[var(--secundary-background)]">
            <h1 className="main_title text-center">Det siger vores kunder om os</h1>
            <Carousel data={data}/>
        </article>
        )
    }
}