import { BookOpen } from "lucide-react";
import { useState, type TransitionEvent } from "react";
import { useAlmanac } from "../../almanac/context/AlmanacContext";
import { useWeather } from "../../weather/context/WeatherContext";
import { useApod } from "../../apod/context/ApodContext";

export function LoadingScreen() {
    const { isLoading: isAlmanacLoading } = useAlmanac();
    const { isLoading: isWeatherLoading } = useWeather();
    const { isLoading: isApodLoading } = useApod();

    const isDataReady = !isAlmanacLoading && !isWeatherLoading && !isApodLoading;

    const [wasDataReady, setWasDataReady] = useState(isDataReady);
    const [isExiting, setIsExiting] = useState(false);
    const [isMounted, setIsMounted] = useState(true);

    // Guard clause.
    if (isDataReady !== wasDataReady) {
        setWasDataReady(isDataReady);

        if (isDataReady) setIsExiting(true);
    }

    const handleTransitionEnd = function (event: TransitionEvent<HTMLDivElement>) {
        // Guard clause.
        if (event.propertyName !== "opacity") return;

        setIsMounted(false);
    };

    // Guard clause.
    if (!isMounted) return null;

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-bg transition-opacity duration-500 ease-in-out ${isExiting ? "opacity-0" : "opacity-100"} z-9999`}
            onTransitionEnd={handleTransitionEnd}
        >
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 border border-hairline rounded-full" />
                    <div className="absolute inset-0 border border-transparent border-t-accent rounded-full animate-spin" />
                    <span className="absolute inset-0 flex items-center justify-center text-accent">
                        <BookOpen size={18} strokeWidth={2.4} />
                    </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-bold uppercase tracking-wide text-subtle">Gathering Today's Almanac</span>
                    <span className="text-xs text-subtle opacity-80">Fetching events, weather, and the sky of today.</span>
                </div>
            </div>
        </div>
    );
}
