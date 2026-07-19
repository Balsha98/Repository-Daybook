import { ChevronLeft, ChevronRight } from "lucide-react";
import type { KeyboardEvent } from "react";
import { IconButton } from "../../../components/IconButton/IconButton";
import { getOrdinalSuffix } from "../../../utils/date";
import { useSelectedDate } from "../context/DateContext";

const WEEKDAY_MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long" });

export function DesktopDateControl() {
    const { date, dateInputValue, handleChangeDay, handleDateInputChange, handleDateInputBlur } = useSelectedDate();

    const day = date.getDate();

    const handleDateInputKeyDown = function (event: KeyboardEvent<HTMLInputElement>) {
        // Guard clause.
        if (event.key !== "Enter") return;

        event.currentTarget.blur();
    };

    return (
        <div className="absolute top-1/2 left-1/2 hidden items-center gap-3 -translate-x-1/2 -translate-y-1/2 lg:flex">
            <IconButton onClick={() => handleChangeDay(-1)} aria-label="Previous Day">
                <ChevronLeft size={16} />
            </IconButton>
            <div className="flex items-baseline gap-2">
                <span className="text-lg font-semibold">
                    {WEEKDAY_MONTH_FORMATTER.format(date)} {day}
                    <sup className="text-xs">{getOrdinalSuffix(day)}</sup>
                </span>
                <span className="text-sm text-subtle">{date.getFullYear()}</span>
            </div>
            <IconButton onClick={() => handleChangeDay(1)} aria-label="Next Day">
                <ChevronRight size={16} />
            </IconButton>
            <input
                type="text"
                className="w-30 h-9 text-[14px] text-center border border-hairline rounded-lg focus:outline-none focus:border-accent hover:border-accent"
                onChange={(event) => handleDateInputChange(event.target.value)}
                onKeyDown={handleDateInputKeyDown}
                onBlur={handleDateInputBlur}
                placeholder="MM/DD/YYYY"
                value={dateInputValue}
                name="date"
            />
        </div>
    );
}
