const ORDINAL_SUFFIXES = ["th", "st", "nd", "rd"];

export const addDays = (date: Date, amount: number): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);

export const isSameDay = (a: Date, b: Date): boolean => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const isToday = (date: Date): boolean => isSameDay(date, new Date());

export const isFutureDate = function (date: Date): boolean {
    const today = new Date();
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    return date.getTime() > todayMidnight.getTime();
};

export const formatDateForInput = function (date: Date): string {
    const paddedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const paddedDay = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${paddedMonth}/${paddedDay}/${year}`;
};

export const formatDateForApod = function (date: Date): string {
    const year = date.getFullYear();
    const paddedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const paddedDay = String(date.getDate()).padStart(2, "0");

    return `${year}-${paddedMonth}-${paddedDay}`;
};

export const formatDateForOnThisDay = (date: Date): string => `${date.getMonth() + 1}/${date.getDate()}`;

export const getOrdinalSuffix = function (day: number): string {
    const numException = day % 100;

    // Guard clause.
    if (numException >= 11 && numException <= 13) return "th";

    return ORDINAL_SUFFIXES[day % 10] ?? "th";
};

export const parseInputDate = function (value: string): Date | null {
    const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value);

    // Guard clause.
    if (!match) return null;

    const month = Number(match[1]);
    const day = Number(match[2]);
    const year = Number(match[3]);

    const date = new Date(year, month - 1, day);

    const isValidDate = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

    // Guard clause.
    if (!isValidDate) return null;

    return date;
};
