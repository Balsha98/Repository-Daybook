import { Moon, Sun } from "lucide-react";
import { IconButton } from "../../../components/IconButton/IconButton";
import { useTheme } from "../context/ThemeContext";

export function ThemeButton() {
    const { theme, handleToggleTheme } = useTheme();

    return (
        <IconButton onClick={handleToggleTheme} aria-label="Toggle Theme">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </IconButton>
    );
}
