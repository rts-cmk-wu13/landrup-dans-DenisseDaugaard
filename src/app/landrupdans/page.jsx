import AppMain from "../components/welcomepage/AppMain"
import Footer from "../components/landrupdans-pages/Footer"
import HomeHeader from "@/app/components/welcomepage/HomeHeader"

export default function Home() {

    return(
        <div className="wrapper">
            <HomeHeader />
            <main className="w-full">
             <AppMain />
            </main>
            <Footer />
        </div>
    )
}