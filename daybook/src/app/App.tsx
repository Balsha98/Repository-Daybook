import { DateSelectionModal } from "../features/date-control/components/DateSelectionModal";
import { ApodDetailModal } from "../features/apod/components/ApodDetailModal";
import { Header } from "../features/layout/Header";
import { AlmanacMain } from "../features/almanac/components/AlmanacMain";
import { Sidebar } from "../features/layout/Sidebar";
import { Footer } from "../features/layout/Footer";

export function App() {
    return (
        <div className="min-h-screen">
            <DateSelectionModal />
            <ApodDetailModal />
            <Header />
            <div className="grid grid-cols-1 items-start gap-12 w-full max-w-350 mx-auto py-16 px-8 lg:grid-cols-[1fr_400px]">
                <AlmanacMain />
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
}
