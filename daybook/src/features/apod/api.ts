import { formatDateForApod, isFutureDate } from "../../utils/date";
import type { ApodDataType } from "./context/ApodContext";

const APOD_BASE_URL = "https://api.nasa.gov/planetary/apod";

type ApodApiResponseType = {
    title: string;
    explanation: string;
    url: string;
    hdurl?: string;
    thumbnail_url?: string;
    media_type: "image" | "video";
};

export const fetchApod = async function (date: Date): Promise<ApodDataType> {
    // Guard clause.
    if (isFutureDate(date)) throw new Error("No APOD available for future dates.");

    const params = new URLSearchParams({
        date: formatDateForApod(date),
        thumbs: "true",
        api_key: import.meta.env.VITE_NASA_API_KEY,
    });

    const response = await fetch(`${APOD_BASE_URL}?${params.toString()}`);

    // Guard clause.
    if (!response.ok) throw new Error("Failed to fetch the Astronomy Picture of the Day.");

    const data: ApodApiResponseType = await response.json();

    return {
        title: data.title,
        explanation: data.explanation,
        url: data.url,
        hdurl: data.hdurl ?? null,
        thumbnailUrl: data.thumbnail_url ?? null,
        mediaType: data.media_type,
    };
};
