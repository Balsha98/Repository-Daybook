import { formatDateForOnThisDay } from "../../utils/date";
import type { AlmanacEntryType, AlmanacEntryTypeName, WikipediaSummaryType } from "./context/AlmanacContext";

const ON_THIS_DAY_BASE_URL = "https://byabbe.se/on-this-day";
const WIKIPEDIA_SUMMARY_BASE_URL = "https://en.wikipedia.org/api/rest_v1/page/summary";

const ON_THIS_DAY_KEYS: Record<AlmanacEntryTypeName, "events" | "births" | "deaths"> = {
    event: "events",
    birth: "births",
    death: "deaths",
};

type OnThisDayApiEntryType = {
    year: string;
    description: string;
    wikipedia: { title: string; wikipedia: string }[];
};

type OnThisDayApiResponseType = {
    date: string;
    wikipedia: string;
    events?: OnThisDayApiEntryType[];
    births?: OnThisDayApiEntryType[];
    deaths?: OnThisDayApiEntryType[];
};

export const fetchOnThisDay = async function (date: Date, type: AlmanacEntryTypeName): Promise<AlmanacEntryType[]> {
    const responseKey = ON_THIS_DAY_KEYS[type];
    const response = await fetch(`${ON_THIS_DAY_BASE_URL}/${formatDateForOnThisDay(date)}/${responseKey}.json`);

    // Guard clause.
    if (!response.ok) throw new Error("Failed to fetch on-this-day entries.");

    const data: OnThisDayApiResponseType = await response.json();
    const entries = data[responseKey] ?? [];

    return entries
        .map(function (entry): Omit<AlmanacEntryType, "index"> {
            return {
                type,
                year: entry.year,
                description: entry.description,
                links: entry.wikipedia.map(function (link) {
                    return { title: link.title, link: link.wikipedia };
                }),
            };
        })
        .sort((a, b) => Number(a.year) - Number(b.year))
        .map((entry, index) => ({ ...entry, index }));
};

type WikipediaSummaryApiResponseType = {
    title: string;
    extract: string;
    originalimage?: { source: string };
};

export const fetchWikipediaSummary = async function (title: string): Promise<WikipediaSummaryType> {
    const response = await fetch(`${WIKIPEDIA_SUMMARY_BASE_URL}/${encodeURIComponent(title)}`);

    // Guard clause.
    if (!response.ok) throw new Error("Failed to fetch the Wikipedia summary.");

    const data: WikipediaSummaryApiResponseType = await response.json();

    return {
        title: data.title,
        extract: data.extract,
        imageUrl: data.originalimage?.source ?? null,
    };
};
