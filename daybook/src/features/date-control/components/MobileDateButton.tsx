import { useSelectedDate } from "../context/DateContext";

const MOBILE_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

export function MobileDateButton() {
    const { date, handleToggleDateModal } = useSelectedDate();

    return (
        <button
            type="button"
            className="flex items-center h-9 px-4 text-[14px] font-semibold border border-hairline rounded-full hover:text-accent hover:border-accent lg:hidden"
            onClick={handleToggleDateModal}
            aria-label="Choose Date"
        >
            {MOBILE_DATE_FORMATTER.format(date)}
        </button>
    );
}
