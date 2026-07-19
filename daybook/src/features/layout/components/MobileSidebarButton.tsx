import { PanelRight } from "lucide-react";
import { IconButton } from "../../../components/IconButton/IconButton";
import { useSidebar } from "../context/SidebarContext";

export function MobileSidebarButton() {
    const { sidebarOpen, handleToggleSidebar } = useSidebar();

    return (
        <IconButton active={sidebarOpen} onClick={handleToggleSidebar} className="lg:hidden" aria-label="Toggle Sidebar">
            <PanelRight size={16} />
        </IconButton>
    );
}
