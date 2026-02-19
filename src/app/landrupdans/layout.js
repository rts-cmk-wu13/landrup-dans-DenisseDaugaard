import Footer from "../components/landrupdans-pages/Footer";

export default function LandrupDansLayout({ children }) {
    
    return (
        <>
        <main className="flex-grow">
            {children}
        </main>
        <Footer />
        </>
    );
}