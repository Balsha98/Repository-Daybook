import { useState, type ReactNode } from "react";
import { SidebarContext } from "../context/SidebarContext";

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleToggleSidebar = () => setSidebarOpen((v) => !v);

    return <SidebarContext.Provider value={{ sidebarOpen, handleToggleSidebar }}>{children}</SidebarContext.Provider>;
}
