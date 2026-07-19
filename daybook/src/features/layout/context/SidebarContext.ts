import { createContext, useContext } from "react";

export type SidebarContextType = {
    sidebarOpen: boolean;
    handleToggleSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextType | null>(null);

export const useSidebar = function () {
    const context = useContext(SidebarContext);

    // Guard clause.
    if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");

    return context;
};
