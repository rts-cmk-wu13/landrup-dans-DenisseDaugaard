
export default function LandrupDansLayout({ children }) {
    
    return (
        <div className="wrapper">
            <main>
                {children}
            </main>
            <footer className="bg-white">
                here will be the footer
            </footer>
        </div>
    );
}