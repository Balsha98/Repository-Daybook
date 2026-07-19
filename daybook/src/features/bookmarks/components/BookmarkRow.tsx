import { X } from "lucide-react";
import type { MouseEvent } from "react";
import { useAlmanac } from "../../almanac/context/AlmanacContext";
import { getBookmarkKey, type BookmarkedItemType } from "../context/BookmarksContext";

export type BookmarkRowPropsType = {
    item: BookmarkedItemType;
    onRemove: (key: string) => void;
};

export function BookmarkRow({ item, onRemove }: BookmarkRowPropsType) {
    const key = getBookmarkKey(item);
    const { handleSelectEntry } = useAlmanac();

    const handleRowClick = () => handleSelectEntry(item);

    const handleRemoveClick = function (event: MouseEvent) {
        event.stopPropagation();
        onRemove(key);
    };

    return (
        <div className="flex items-center gap-3 py-3 px-4 border-b last:border-b-0 border-hairline cursor-pointer hover:bg-hover-bg" onClick={handleRowClick}>
            <div className="flex items-center gap-2 truncate">
                <span className="inline-block text-sm font-bold text-accent">{item.year}</span>
                <p className="flex-1 text-sm truncate">{item.description}</p>
            </div>
            <button type="button" onClick={handleRemoveClick} className="shrink-0 text-subtle cursor-pointer hover:text-accent" aria-label="Remove Bookmark">
                <X size={14} />
            </button>
        </div>
    );
}
