import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./features/theme/providers/ThemeProvider";
import { BookmarksProvider } from "./features/bookmarks/providers/BookmarksProvider";
import { DateProvider } from "./features/date-control/providers/DateProvider";
import { App } from "./app/App";
import "./app/theme.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <BookmarksProvider>
                <DateProvider>
                    <App />
                </DateProvider>
            </BookmarksProvider>
        </ThemeProvider>
    </StrictMode>,
);
