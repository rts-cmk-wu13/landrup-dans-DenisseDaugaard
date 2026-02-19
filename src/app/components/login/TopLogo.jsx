import Image from "next/image"

export default function TopLogo() {
    return(
         <section className="flex flex-col gap-8 mt-10">
            <Image src="/app_images/logo.svg" alt="Login image" 
            width={60} 
            height={60} 
            className="mx-auto"/>
            <Image src="/app_images/title.svg" alt="Login image" 
            width={300} 
            height={300} 
            className="flex justify-self-start"/>
        </section>
    )
}