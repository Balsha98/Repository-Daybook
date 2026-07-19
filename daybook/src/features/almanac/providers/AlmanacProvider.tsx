import { useEffect, useState, type ReactNode } from "react";
import { useSelectedDate } from "../../date-control/context/DateContext";
import { fetchOnThisDay } from "../api";
import { AlmanacContext, type AlmanacEntryType } from "../context/AlmanacContext";

export function AlmanacProvider({ children }: { children: ReactNode }) {
    const { date } = useSelectedDate();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [events, setEvents] = useState<AlmanacEntryType[]>([]);
    const [births, setBirths] = useState<AlmanacEntryType[]>([]);
    const [deaths, setDeaths] = useState<AlmanacEntryType[]>([]);
    const [selectedEntry, setSelectedEntry] = useState<AlmanacEntryType | null>(null);

    const handleSelectEntry = (entry: AlmanacEntryType) => setSelectedEntry(entry);

    const handleCloseEntryModal = () => setSelectedEntry(null);

    useEffect(
        function () {
            let cancelled = false;

            const loadAlmanac = async function () {
                setIsLoading(true);
                setError(null);

                try {
                    const [eventsData, birthsData, deathsData] = await Promise.all([
                        fetchOnThisDay(date, "event"),
                        fetchOnThisDay(date, "birth"),
                        fetchOnThisDay(date, "death"),
                    ]);

                    // Guard clause.
                    if (cancelled) return;

                    setEvents(eventsData);
                    setBirths(birthsData);
                    setDeaths(deathsData);
                } catch {
                    // Guard clause.
                    if (cancelled) return;

                    setError("Couldn't load the almanac entries for this date.");
                } finally {
                    if (!cancelled) setIsLoading(false);
                }
            };

            loadAlmanac();

            return function () {
                cancelled = true;
            };
        },
        [date],
    );

    return (
        <AlmanacContext.Provider value={{ isLoading, error, events, births, deaths, selectedEntry, handleSelectEntry, handleCloseEntryModal }}>
            {children}
        </AlmanacContext.Provider>
    );
}
