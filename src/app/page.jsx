
import Hero from "./components/landing-page/Hero";
import WecomeFooter from "./components/landing-page/WecomeFooter";
import AppMain from "./components/welcomepage/AppMain";
import {cookies} from "next/headers";
import { redirect } from "next/navigation";


export default async function LandingPage() {

  const cookieStore = await cookies();
  if(cookieStore.get("token")){
    redirect("/landrupdans/profile")
  }


  return (
    <div className="wrapper">
      <main className="w-full">
        <AppMain children={<Hero/>}/>
      </main>
       <WecomeFooter/>
    </div>
  );
}
