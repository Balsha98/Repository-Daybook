import { Star } from "lucide-react";
import type { MouseEvent } from "react";
import { useBookmarks } from "../../bookmarks/context/BookmarksContext";
import { getAlmanacEntryKey, useAlmanac, type AlmanacEntryType } from "../context/AlmanacContext";

export type AlmanacRowPropsType = {
    entry: AlmanacEntryType;
};

export function AlmanacRow({ entry }: AlmanacRowPropsType) {
    const { handleSelectEntry } = useAlmanac();
    const { bookmarks, handleToggleBookmark } = useBookmarks();

    const isBookmarked = Boolean(bookmarks[getAlmanacEntryKey(entry)]);

    const handleRowClick = () => handleSelectEntry(entry);

    const handleBookmarkClick = function (event: MouseEvent) {
        event.stopPropagation();
        handleToggleBookmark(entry);
    };

    return (
        <div className="flex items-start gap-5 py-4 px-3 border-t border-hairline cursor-pointer hover:bg-hover-bg" onClick={handleRowClick}>
            <div className="flex gap-8">
                <span className="shrink-0 text-md font-bold text-accent">{entry.year}</span>
                <p className="flex-1 text-md leading-[1.6] line-clamp-2">{entry.description}</p>
            </div>
            <button
                type="button"
                className={`shrink-0 ${isBookmarked ? "text-accent" : "text-subtle"} cursor-pointer hover:text-accent`}
                onClick={handleBookmarkClick}
                aria-label="Bookmark Entry"
            >
                <Star size={16} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
        </div>
    );
}
