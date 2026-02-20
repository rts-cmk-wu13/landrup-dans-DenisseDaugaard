import Image from "next/image";
import Link from "next/link";

export default function ActivityDetailsCard({ data, isLoggedIn, isInstructor }) {

    return(
        <>
        <figure className="relative w-full h-[400px] overflow-hidden">
            <Image
                src={data.asset.url}
                alt={data.name}
                width={400}
                height={400}
                unoptimized
                loading="eager"
                className="object-cover w-full h-full"
            />
        </figure>

        <section className="p-6">
            <h2 className="text-2xl font-semibold">{data.name}</h2>
            <span>{data.minAge} - {data.maxAge} år</span>
            <p>{data.description}</p>
        </section>

        {isLoggedIn && (
            <button className=" absolute right-12 top-[40%] mt-4 px-4 py-2 bg-[var(--background)] text-white rounded">Tilmeld</button>
        )}
        {isInstructor && (
            <Link href={`/landrupdans/profile`} className=" absolute right-12 top-[50%] mt-4 px-4 py-2 bg-[var(--background)] text-white rounded">Rediger</Link>
        )}
        </>
    )
}