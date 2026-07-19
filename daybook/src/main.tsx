import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BookmarksProvider } from "./features/bookmarks/providers/BookmarksProvider";
import { ThemeProvider } from "./features/theme/providers/ThemeProvider";
import { App } from "./app/App";
import "./app/theme.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <BookmarksProvider>
                <App />
            </BookmarksProvider>
        </ThemeProvider>
    </StrictMode>,
);
