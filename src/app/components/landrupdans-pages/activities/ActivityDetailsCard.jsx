import Image from "next/image";
import Link from "next/link";
import SignUpButton from "./SignUpButtom";

export default function ActivityDetailsCard({ data, isLoggedIn, isInstructor, isUserInAge, isSignedInToActivity }) {

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

        <section className="p-6 flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">{data.name}</h2>
            <span>{data.minAge} - {data.maxAge} år</span>
            <span className="font-semibold">{data.weekday} {data.time}</span>
            <p>{data.description}</p>
        </section>

        {isLoggedIn && isUserInAge && !isSignedInToActivity && <SignUpButton activityId={data.id}/>}  
        {/* {console.log(isLoggedIn)}  */}

        {isLoggedIn && !isUserInAge && <p 
        className="absolute left-12 p-2 rounded top-[45%] bg-red-500/80 text-white font-semibold">
            Du desværre opfylder ikke alderskravet for denne aktivitet.</p>
        }

        {isLoggedIn && isSignedInToActivity && 
        <p className="absolute left-12 p-2 rounded top-[45%] bg-green-500/80 text-white font-semibold">
            Du er allerede tilmeldt denne aktivitet.</p>
        }

        {isInstructor && (
            <Link href={`/landrupdans/profile`} className=" absolute right-12 top-[5%] mt-4 px-4 py-2 bg-[var(--background)] text-white rounded">Rediger</Link>
        )}
        </>
    )
}