import Image from "next/image";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import Link from "next/link";

export default function Hero(){
    return(
    <div className="hero h-[380px] h-[700px]" style={{backgroundImage:"url('/app_images/heroimg.jpg')", backgroundSize:"cover", backgroundPosition:"center"}}>
       <section className="flex flex-col gap-4">
        <Image
        src="/app_images/logo.svg"
        alt="Logo"
        width={64}
        height={64}
        className="mx-auto mt-12"
        loading="lazy"
        />
        <Image
        src="/app_images/title.svg"
        alt="Title"
        width={300}
        height={300}
        className="flex justify-self-start mt-6"
        loading="lazy"
        />
       </section>

       <div className="mt-[16rem] flex flex-col items-center justify-center gap-8 mb-12">
         <Link href="/login">
           <button className="btn bg-[var(--foreground)] text-black">Log ind her</button>
         </Link>
            <MdKeyboardDoubleArrowDown className="text-black text-5xl animate-bounce ml-4"/>
       </div>
    </div>
    )
}