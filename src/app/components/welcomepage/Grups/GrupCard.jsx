import Image from "next/image"

export default function GrupCard({title, description, imageSrc}){
    return(
        <div className="grup_card mb-8">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <Image src={imageSrc} alt={title} width={350} height={210} loading="lazy" />
        <p>{description}</p>
        </div>
    )
}