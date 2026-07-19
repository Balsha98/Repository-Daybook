import { useSelectedDate } from "../context/DateContext";

export function TodayIndicator() {
    const { isToday } = useSelectedDate();

    // Guard clause.
    if (!isToday) return null;

    return <span className="flex items-center h-9 px-4 text-[14px] font-semibold text-on-accent bg-accent rounded-full">Today</span>;
}
