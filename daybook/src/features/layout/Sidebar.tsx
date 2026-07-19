import { X } from "lucide-react";
import { ApodCard } from "../apod/components/ApodCard";
import { useSidebar } from "./context/SidebarContext";

export function Sidebar() {
    const { sidebarOpen, handleToggleSidebar } = useSidebar();

    return (
        <>
            {sidebarOpen && <div className="fixed inset-0 bg-overlay-drawer z-9999 lg:hidden" onClick={handleToggleSidebar} />}
            <aside
                className={`fixed top-0 ${sidebarOpen ? "right-0" : "-right-120"} w-100 h-screen p-6 bg-bg shadow-drawer transition-[right] duration-300 ease-in-out overflow-y-auto z-9999 lg:sticky lg:top-24 lg:right-auto lg:w-auto lg:h-auto lg:p-0 lg:bg-transparent lg:shadow-none lg:transition-none lg:z-auto`}
            >
                <button
                    type="button"
                    className="mb-4 ml-auto flex items-center justify-center w-9 h-9 text-subtle border border-hairline rounded-full cursor-pointer hover:text-accent hover:border-accent lg:hidden"
                    onClick={handleToggleSidebar}
                    aria-label="Close Sidebar"
                >
                    <X size={16} />
                </button>
                <div className="flex flex-col gap-4">
                    {/* WeatherCard goes here once the weather feature is built. */}
                    <ApodCard />
                </div>
            </aside>
        </>
    );
}
