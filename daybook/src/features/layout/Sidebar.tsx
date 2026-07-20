import { X } from "lucide-react";
import { WeatherCard } from "../weather/components/WeatherCard";
import { ApodCard } from "../apod/components/ApodCard";
import { useSidebar } from "./context/SidebarContext";

export function Sidebar() {
    const { sidebarOpen, handleToggleSidebar } = useSidebar();

    return (
        <>
            {sidebarOpen && <div className="fixed inset-0 bg-overlay-drawer z-9998 lg:hidden" onClick={handleToggleSidebar} />}
            <aside
                className={`fixed top-0 ${sidebarOpen ? "right-0" : "-right-180"} w-120 h-screen p-6 bg-bg shadow-drawer transition-[right] duration-300 ease-in-out overflow-y-auto z-9998 lg:sticky lg:top-28 lg:right-auto lg:w-auto lg:h-auto lg:p-0 lg:bg-transparent lg:shadow-none lg:transition-none lg:z-auto`}
            >
                <div className="mb-4 flex items-end justify-between lg:hidden">
                    <span className="text-lg font-bold">Weather & APOD</span>
                    <button
                        type="button"
                        className="flex items-center justify-center w-9 h-9 text-subtle border border-hairline rounded-full cursor-pointer hover:text-accent hover:border-accent"
                        onClick={handleToggleSidebar}
                        aria-label="Close Sidebar"
                    >
                        <X size={16} />
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    <WeatherCard />
                    <ApodCard />
                </div>
            </aside>
        </>
    );
}
