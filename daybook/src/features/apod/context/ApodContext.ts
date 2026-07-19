import { createContext, useContext } from "react";

export type ApodMediaType = "image" | "video";

export type ApodDataType = {
    title: string;
    explanation: string;
    url: string;
    hdurl: string | null;
    thumbnailUrl: string | null;
    mediaType: ApodMediaType;
};

export type ApodContextType = {
    apodData: ApodDataType | null;
    isLoading: boolean;
    error: string | null;
    apodModalOpen: boolean;
    handleToggleApodModal: () => void;
};

export const ApodContext = createContext<ApodContextType | null>(null);

export const useApod = function () {
    const context = useContext(ApodContext);

    // Guard clause.
    if (!context) throw new Error("useApod must be used within an ApodProvider.");

    return context;
};
