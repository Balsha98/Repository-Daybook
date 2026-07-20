import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./features/theme/providers/ThemeProvider";
import { BookmarksProvider } from "./features/bookmarks/providers/BookmarksProvider";
import { DateProvider } from "./features/date-control/providers/DateProvider";
import { AlmanacProvider } from "./features/almanac/providers/AlmanacProvider";
import { ApodProvider } from "./features/apod/providers/ApodProvider";
import { WeatherProvider } from "./features/weather/providers/WeatherProvider";
import { SidebarProvider } from "./features/layout/providers/SidebarProvider";
import { App } from "./app/App";
import "./app/theme.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <BookmarksProvider>
                <DateProvider>
                    <AlmanacProvider>
                        <ApodProvider>
                            <WeatherProvider>
                                <SidebarProvider>
                                    <App />
                                </SidebarProvider>
                            </WeatherProvider>
                        </ApodProvider>
                    </AlmanacProvider>
                </DateProvider>
            </BookmarksProvider>
        </ThemeProvider>
    </StrictMode>,
);
