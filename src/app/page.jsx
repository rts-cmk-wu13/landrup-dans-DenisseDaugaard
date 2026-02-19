import Contact from "./components/welcomepage/Contact/Contact";
import Grups from "./components/welcomepage/Grups/Grups";
import Hero from "./components/welcomepage/Hero";
import NewsLetter from "./components/welcomepage/NewsLetter/NewsLetter.jsx";
import Testimonials from "./components/welcomepage/Testimonials/Testimonials";

export default function Home() {
  return (
    <div className="wrapper">
      <main className="w-full">
        <Hero/>
        <Grups/>
        <NewsLetter/>
        <Testimonials/>
        <Contact/>
      </main>
    </div>
  );
}
