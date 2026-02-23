import Contact from "./Contact/Contact";
import Grups from "./Grups/Grups";
import NewsLetter from "./NewsLetter/NewsLetter.jsx";
import Testimonials from "./Testimonials/Testimonials";


export default function AppMain({children}) {
    return (
        <main className="w-full">
            {children}
            <Grups/>
            <NewsLetter/>
            <Testimonials/>
            <Contact/>
        </main>
    )

}