import { Footer } from "../features/layout/Footer";
import { Header } from "../features/layout/Header";

export function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Footer />
        </div>
    );
}
