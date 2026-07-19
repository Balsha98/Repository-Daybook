import { useState, type ReactNode } from "react";
import { addDays, formatDateForInput, isSameDay, isToday as checkIsToday, parseInputDate } from "../../../utils/date";
import { DateContext } from "../context/DateContext";

const DATE_INPUT_FORMAT_ERROR = "Please enter a date in MM/DD/YYYY format.";

export function DateProvider({ children }: { children: ReactNode }) {
    const [date, setDate] = useState<Date>(new Date());
    const [dateInputValue, setDateInputValue] = useState<string>(formatDateForInput(new Date()));
    const [dateInputError, setDateInputError] = useState<string | null>(null);
    const [dateModalOpen, setDateModalOpen] = useState(false);

    const handleChangeDay = function (amount: number) {
        const nextDate = addDays(date, amount);
        setDateInputValue(formatDateForInput(nextDate));
        setDateInputError(null);
        setDate(nextDate);
    };

    const handleDateInputChange = function (value: string) {
        setDateInputValue(value);
        setDateInputError(null);
    };

    const handleDateInputBlur = function () {
        const parsedDate = parseInputDate(dateInputValue);

        // Guard clause.
        if (!parsedDate) return setDateInputError(DATE_INPUT_FORMAT_ERROR);

        setDateInputError(null);

        // Guard clause.
        if (isSameDay(parsedDate, date)) return;

        setDateInputValue(formatDateForInput(parsedDate));
        setDate(parsedDate);
    };

    const handleToggleDateModal = () => setDateModalOpen((v) => !v);

    return (
        <DateContext.Provider
            value={{
                date,
                dateInputValue,
                dateInputError,
                isToday: checkIsToday(date),
                dateModalOpen,
                handleChangeDay,
                handleDateInputChange,
                handleDateInputBlur,
                handleToggleDateModal,
            }}
        >
            {children}
        </DateContext.Provider>
    );
}
