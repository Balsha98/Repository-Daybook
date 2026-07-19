import { useSelectedDate } from "../../date-control/context/DateContext";
import { MobileSidebarButton } from "../../layout/components/MobileSidebarButton";
import { getOrdinalSuffix } from "../../../utils/date";
import { useAlmanac } from "../context/AlmanacContext";
import { AlmanacSection } from "./AlmanacSection";

const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", { month: "long" });

export function AlmanacMain() {
    const { date } = useSelectedDate();
    const { isLoading, error, events, births, deaths } = useAlmanac();

    const day = date.getDate();

    return (
        <main className="flex flex-col gap-14">
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-accent">On This Day</p>
                    <h1 className="text-4xl font-bold leading-none">
                        {MONTH_FORMATTER.format(date)} {day}
                        <sup className="text-lg">{getOrdinalSuffix(day)}</sup>
                    </h1>
                </div>
                <MobileSidebarButton />
            </div>
            {isLoading && <p className="text-sm text-subtle">Loading almanac entries…</p>}
            {error && !isLoading && <p className="text-sm text-subtle">{error}</p>}
            {!isLoading && !error && (
                <div className="flex flex-col gap-12">
                    <AlmanacSection title="Notable Events" entries={events} />
                    <AlmanacSection title="Notable Births" entries={births} />
                    <AlmanacSection title="Notable Deaths" entries={deaths} />
                </div>
            )}
        </main>
    );
}
