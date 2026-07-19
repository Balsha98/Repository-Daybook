import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext, type ThemeType } from "../context/ThemeContext";

const THEME_STORAGE_KEY = "daybook-theme";

const getInitialTheme = function (): ThemeType {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);

    // Guard clause.
    if (stored === "light" || stored === "dark") return stored;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<ThemeType>(getInitialTheme);

    const handleToggleTheme = () => setTheme((v) => (v === "light" ? "dark" : "light"));

    useEffect(
        function () {
            document.documentElement.dataset.theme = theme;
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        },
        [theme],
    );

    return <ThemeContext.Provider value={{ theme, handleToggleTheme }}>{children}</ThemeContext.Provider>;
}
