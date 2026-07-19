import { createContext, useContext } from "react";

export type DateContextType = {
    date: Date;
    dateInputValue: string;
    isToday: boolean;
    dateModalOpen: boolean;
    handleChangeDay: (amount: number) => void;
    handleDateInputChange: (value: string) => void;
    handleDateInputBlur: () => void;
    handleToggleDateModal: () => void;
};

export const DateContext = createContext<DateContextType | null>(null);

export const useSelectedDate = function () {
    const context = useContext(DateContext);

    // Guard clause.
    if (!context) throw new Error("useSelectedDate must be used within a DateProvider.");

    return context;
};
