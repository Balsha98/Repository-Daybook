import { useState, type ReactNode } from "react";
import { addDays, formatDateForInput, isToday as checkIsToday, parseInputDate } from "../../../utils/date";
import { DateContext } from "../context/DateContext";

export function DateProvider({ children }: { children: ReactNode }) {
    const [date, setDate] = useState<Date>(new Date());
    const [dateInputValue, setDateInputValue] = useState<string>(formatDateForInput(new Date()));
    const [dateModalOpen, setDateModalOpen] = useState(false);

    const handleChangeDay = function (amount: number) {
        const nextDate = addDays(date, amount);
        setDateInputValue(formatDateForInput(nextDate));
        setDate(nextDate);
    };

    const handleDateInputChange = (value: string) => setDateInputValue(value);

    const handleDateInputBlur = function () {
        const parsedDate = parseInputDate(dateInputValue);

        // Guard clause.
        if (!parsedDate) return setDateInputValue(formatDateForInput(date));

        setDateInputValue(formatDateForInput(parsedDate));
        setDate(parsedDate);
    };

    const handleToggleDateModal = () => setDateModalOpen((v) => !v);

    return (
        <DateContext.Provider
            value={{
                date,
                dateInputValue,
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
