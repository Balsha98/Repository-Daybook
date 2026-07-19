import { createContext, useContext } from "react";

export type ThemeType = "light" | "dark";

export type ThemeContextType = {
    theme: ThemeType;
    handleToggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = function () {
    const context = useContext(ThemeContext);

    // Guard clause.
    if (!context) throw new Error("useTheme must be used within a ThemeProvider.");

    return context;
};
