import { DateSelectionModal } from "../features/date-control/components/DateSelectionModal";
import { EntryDetailModal } from "../features/almanac/components/EntryDetailModal";
import { ApodDetailModal } from "../features/apod/components/ApodDetailModal";
import { Header } from "../features/layout/Header";
import { AlmanacMain } from "../features/almanac/components/AlmanacMain";
import { Sidebar } from "../features/layout/Sidebar";
import { Footer } from "../features/layout/Footer";

export function App() {
    return (
        <div className="min-h-screen">
            <DateSelectionModal />
            <EntryDetailModal />
            <ApodDetailModal />
            <Header />
            <div className="grid grid-cols-1 items-start gap-12 w-full max-w-350 mx-auto py-12 px-4 lg:grid-cols-[1fr_400px] xs:px-8 xs:py-16">
                <AlmanacMain />
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
}
