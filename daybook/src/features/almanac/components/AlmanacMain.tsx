import { useSelectedDate } from "../../date-control/context/DateContext";
import { MobileSidebarButton } from "../../layout/components/MobileSidebarButton";
import { getOrdinalSuffix } from "../../../utils/date";

const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", { month: "long" });

export function AlmanacMain() {
    const { date } = useSelectedDate();

    const day = date.getDate();

    return (
        <main>
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
        </main>
    );
}
