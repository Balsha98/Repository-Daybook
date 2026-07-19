import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Modal } from "../../../components/Modal/Modal";
import { fetchWikipediaSummary } from "../api";
import { getAlmanacEntryKey, useAlmanac, type AlmanacEntryType, type AlmanacEntryTypeName, type WikipediaSummaryType } from "../context/AlmanacContext";

const ENTRY_TYPE_LABELS: Record<AlmanacEntryTypeName, string> = {
    event: "Event",
    birth: "Birth",
    death: "Death",
};

type EntryDetailModalContentPropsType = {
    entry: AlmanacEntryType;
    onClose: () => void;
};

function EntryDetailModalContent({ entry, onClose }: EntryDetailModalContentPropsType) {
    const [activeTitle, setActiveTitle] = useState<string | null>(entry.links[0]?.title ?? null);
    const [summary, setSummary] = useState<WikipediaSummaryType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(
        function () {
            let cancelled = false;

            // Guard clause.
            if (!activeTitle) return;

            const loadSummary = async function () {
                setIsLoading(true);
                setError(null);
                setSummary(null);

                try {
                    const data = await fetchWikipediaSummary(activeTitle);

                    // Guard clause.
                    if (cancelled) return;

                    setSummary(data);
                } catch {
                    // Guard clause.
                    if (cancelled) return;

                    setError("Couldn't load the summary for this topic.");
                } finally {
                    if (!cancelled) setIsLoading(false);
                }
            };

            loadSummary();

            return function () {
                cancelled = true;
            };
        },
        [activeTitle],
    );

    const activeLink = entry.links.find((link) => link.title === activeTitle);

    return (
        <Modal onClose={onClose} className="w-full max-w-160">
            <div className="relative">
                {summary?.imageUrl && !isLoading && (
                    <img src={summary.imageUrl} alt={summary.title} className="w-full aspect-video object-cover rounded-t-2xl" />
                )}
                <button
                    type="button"
                    className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 text-subtle bg-card border border-hairline rounded-full transition-colors cursor-pointer hover:text-accent hover:border-accent"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <X size={16} />
                </button>
            </div>
            <div className="flex flex-col gap-3 p-8">
                <header className="flex flex-col gap-3">
                    <span className="text-xs font-bold uppercase tracking-wide text-accent">
                        {ENTRY_TYPE_LABELS[entry.type]} · {entry.year}
                    </span>
                    <h2 className="text-2xl font-bold">{entry.description}</h2>
                </header>
                {entry.links.length > 1 && (
                    <div className="relative">
                        <ul className="flex gap-2 no-scrollbar overflow-x-auto">
                            {entry.links.map((link) => {
                                //prettier-ignore
                                const activeClasses = link.title === activeTitle ? "text-accent border-accent" : "text-subtle border-hairline hover:text-accent hover:border-accent";

                                return (
                                    <li key={link.title} className="shrink-0">
                                        <button
                                            type="button"
                                            className={`py-1 px-3 text-xs whitespace-nowrap border rounded-full cursor-pointer ${activeClasses}`}
                                            onClick={() => setActiveTitle(link.title)}
                                        >
                                            {link.title}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                        <span className="absolute top-0 right-0 w-6 h-full bg-linear-to-l from-card to-transparent pointer-events-none" />
                    </div>
                )}
                {isLoading && <p className="text-sm text-subtle">Loading summary…</p>}
                {error && !isLoading && <p className="text-sm text-subtle">{error}</p>}
                <div className="flex flex-col gap-2">
                    {summary && !isLoading && !error && <p className="text-md leading-[1.6] text-subtle">{summary.extract}</p>}
                    {activeLink && (
                        <a href={activeLink.link} rel="noreferrer" className="w-fit text-sm text-accent hover:underline" target="_blank">
                            View on Wikipedia
                        </a>
                    )}
                </div>
            </div>
        </Modal>
    );
}

export function EntryDetailModal() {
    const { selectedEntry, handleCloseEntryModal } = useAlmanac();

    // Guard clause.
    if (!selectedEntry) return null;

    return <EntryDetailModalContent key={getAlmanacEntryKey(selectedEntry)} entry={selectedEntry} onClose={handleCloseEntryModal} />;
}
