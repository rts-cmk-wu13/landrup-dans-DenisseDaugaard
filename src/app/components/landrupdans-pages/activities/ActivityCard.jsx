import Image from "next/image";
import Link from "next/link";

export default function ActivityCard({ data }) {
  return (
    <Link href={`/landrupdans/activities/${data.id}`} className="relative block w-[300px] h-[300px] rounded-3xl rounded-br-none  overflow-hidden mb-8">
    
      <Image
        src={data.asset.url}
        alt={data.name}
        fill
        className="object-cover"
        unoptimized
      />


      <div className="absolute bottom-0 w-full bg-gray-800/80 p-6 rounded-3xl rounded-br-none rounded-tl-none">
        <h2 className="text-white text-2xl font-semibold">
          {data.name}
        </h2>
        <p className="text-white/80 text-lg mt-1">
          {data.minAge} - {data.maxAge} år
        </p>
      </div>

    </Link>
  );
}