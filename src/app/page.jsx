import Grups from "./components/welcomepage/Grups/Grups";
import Hero from "./components/welcomepage/Hero";
import NewsLetter from "./components/welcomepage/NewsLetter/NewsLetter.jsx";

export default function Home() {
  return (
    <div className="wrapper">
      <main className="w-full">
        <Hero/>
        <Grups/>
        <NewsLetter/>
      </main>
    </div>
  );
}
