import Image from "next/image"


export default function HomeHeader(){
    return(
        <header className="w-full flex flex-col items-center justify-center p-8">
          <div>
           <Image
           src="./app_images/logo.svg"
           alt="Logo"
           width={50}
           height={50}
           />
           <Image
           src="./app_images/title.svg"
           alt="Title"
           width={100}
           height={100}
           />

          </div>
        </header>
    )
}