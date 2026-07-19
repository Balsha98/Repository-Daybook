import { createContext, useContext } from "react";

export type AlmanacEntryTypeName = "event" | "birth" | "death";

export type AlmanacLinkType = {
    title: string;
    link: string;
};

export type AlmanacEntryType = {
    type: AlmanacEntryTypeName;
    year: string;
    description: string;
    links: AlmanacLinkType[];
};

export type WikipediaSummaryType = {
    title: string;
    extract: string;
    imageUrl: string | null;
};

export type AlmanacContextType = {
    isLoading: boolean;
    error: string | null;
    events: AlmanacEntryType[];
    births: AlmanacEntryType[];
    deaths: AlmanacEntryType[];
    selectedEntry: AlmanacEntryType | null;
    handleSelectEntry: (entry: AlmanacEntryType) => void;
    handleCloseEntryModal: () => void;
};

export const getAlmanacEntryKey = (entry: Pick<AlmanacEntryType, "type" | "year" | "links" | "description">): string =>
    `${entry.type}|${entry.year}|${entry.links[0]?.title ?? entry.description}`;

export const AlmanacContext = createContext<AlmanacContextType | null>(null);

export const useAlmanac = function () {
    const context = useContext(AlmanacContext);

    // Guard clause.
    if (!context) throw new Error("useAlmanac must be used within an AlmanacProvider.");

    return context;
};
