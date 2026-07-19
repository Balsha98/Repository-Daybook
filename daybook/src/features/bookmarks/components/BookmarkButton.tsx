import { Star } from "lucide-react";
import { IconButton } from "../../../components/IconButton/IconButton";
import { useBookmarks } from "../context/BookmarksContext";

export function BookmarkButton() {
    const { bookmarks, bookmarksPanelOpen, handleToggleBookmarksPanel } = useBookmarks();

    const bookmarkCount = Object.keys(bookmarks).length;
    const hasBookmarks = bookmarkCount > 0;

    return (
        <div className="relative">
            <IconButton active={bookmarksPanelOpen} onClick={handleToggleBookmarksPanel} aria-label="Bookmarks">
                <Star size={16} fill={hasBookmarks ? "currentColor" : "none"} />
            </IconButton>
            {hasBookmarks && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 min-w-4 px-1 text-[10px] font-bold text-on-accent bg-accent rounded-full">
                    {bookmarkCount}
                </span>
            )}
        </div>
    );
}
