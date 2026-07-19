import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./features/theme/providers/ThemeProvider";
import { BookmarksProvider } from "./features/bookmarks/providers/BookmarksProvider";
import { DateProvider } from "./features/date-control/providers/DateProvider";
import { ApodProvider } from "./features/apod/providers/ApodProvider";
import { SidebarProvider } from "./features/layout/providers/SidebarProvider";
import { App } from "./app/App";
import "./app/theme.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <BookmarksProvider>
                <DateProvider>
                    <ApodProvider>
                        <SidebarProvider>
                            <App />
                        </SidebarProvider>
                    </ApodProvider>
                </DateProvider>
            </BookmarksProvider>
        </ThemeProvider>
    </StrictMode>,
);
