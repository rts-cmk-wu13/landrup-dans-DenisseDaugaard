import Footer from "../components/landrupdans-pages/Footer";

export default function LandrupDansLayout({ children }) {
    
    return (
    <div className="relative mx-auto max-w-md min-h-dvh">
        <main className="pb-20">{children}</main>
        <Footer />
    </div>
    );
}