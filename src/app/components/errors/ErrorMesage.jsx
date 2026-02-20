import Link from "next/link";

export default function ErrorMessage({ title, message, href, linkText }) {
    return(
        <main className="p-8 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-5xl font-bold text-red-500 mb-6">{title}</h1>
          <h3 className="text-2xl">{message}</h3>
          <Link href={href} className="text-blue-500 underline mt-4">{linkText}</Link>
        </main>
    )
}
