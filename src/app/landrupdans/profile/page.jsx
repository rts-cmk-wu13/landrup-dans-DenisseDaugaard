import ProfileCard from "@/app/components/landrupdans-pages/profile-components/ProfileCard"
import { getUserById } from "@/lib/dal/userById"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function Calendar(){

    const data = await getUserById();
    console.log(data);
   
  if(data.status !== 200) {
    return(
      <main>
        <h1 className="font-bold text-xl mb-8">Blog Page</h1>
        <div>
          <h2 className="text-5xl text-red-200">Oooops i did a boo boo 💥☠️</h2>
          <p className="text-red-500">Error: {data.message}</p>
          <Link href="/" className="text-blue-500 underline">Go back home</Link>
        </div>
      </main>
    )
  }

  if(!data.data) return notFound();

    return(
        <ProfileCard data={data?.data} />
    )
}