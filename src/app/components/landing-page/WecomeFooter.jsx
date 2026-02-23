import Image from "next/image";

export default function WecomeFooter() {
    return(
<section  className="py-4 text-center my-8">
        <div>
            <Image src="/app_images/logo.svg" 
            alt="Landrup Dans Logo" 
            width={50} 
            height={50} 
            className="mx-auto my-2" />
            <span className="font-semibold text-lg mt-2">Landrup Dans</span>
        </div>
        <div className="flex flex-col mt-4">
            <span>
                Pulsen 8 . 4000 Roskilde
            </span>
            <span>
                Tlf. 3540 4550
            </span>
        </div>
</section>

    )
}