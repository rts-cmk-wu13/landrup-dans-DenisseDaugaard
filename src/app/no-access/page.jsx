import Link from "next/link";

export default function NoAccessPage() {
    return(
        <main className="p-8 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-5xl font-bold text-red-500 mb-6">Ingen adgang</h1>
          <h3 className="text-2xl">For at få adgang til dette indhold skal du logge ind</h3>
          <Link href="/login" className="text-blue-500 underline mt-4">Gå til login side</Link>
        </main>
    )
}
