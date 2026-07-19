import { useEffect, useState, type ReactNode } from "react";
import { useSelectedDate } from "../../date-control/context/DateContext";
import { fetchApod } from "../api";
import { ApodContext, type ApodDataType } from "../context/ApodContext";

export function ApodProvider({ children }: { children: ReactNode }) {
    const { date } = useSelectedDate();

    const [apodData, setApodData] = useState<ApodDataType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [apodModalOpen, setApodModalOpen] = useState(false);

    const handleToggleApodModal = () => setApodModalOpen((v) => !v);

    useEffect(
        function () {
            let cancelled = false;

            const loadApod = async function () {
                setIsLoading(true);
                setError(null);

                try {
                    const data = await fetchApod(date);

                    // Guard clause.
                    if (cancelled) return;

                    setApodData(data);
                } catch (e) {
                    // Guard clause.
                    if (cancelled) return;

                    setError(e instanceof Error ? e.message : "Couldn't load the Astronomy Picture of the Day.");
                } finally {
                    if (!cancelled) setIsLoading(false);
                }
            };

            loadApod();

            return function () {
                cancelled = true;
            };
        },
        [date],
    );

    return <ApodContext.Provider value={{ apodData, isLoading, error, apodModalOpen, handleToggleApodModal }}>{children}</ApodContext.Provider>;
}
