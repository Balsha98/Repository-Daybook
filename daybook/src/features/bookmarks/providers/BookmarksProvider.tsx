import { useState, type ReactNode } from "react";
import { BookmarksContext, getBookmarkKey, type BookmarkedItemType } from "../context/BookmarksContext";

export function BookmarksProvider({ children }: { children: ReactNode }) {
    const [bookmarks, setBookmarks] = useState<Record<string, BookmarkedItemType>>({});
    const [bookmarksPanelOpen, setBookmarksPanelOpen] = useState(false);

    const handleToggleBookmarksPanel = () => setBookmarksPanelOpen((v) => !v);

    const handleToggleBookmark = function (item: BookmarkedItemType) {
        const key = getBookmarkKey(item);

        setBookmarks(function (v) {
            const next = { ...v };

            // Guard clause.
            if (next[key]) {
                delete next[key];
                return next;
            }

            next[key] = item;

            return next;
        });
    };

    const handleRemoveBookmark = function (key: string) {
        setBookmarks(function (v) {
            const next = { ...v };

            delete next[key];

            return next;
        });
    };

    return (
        <BookmarksContext.Provider value={{ bookmarks, bookmarksPanelOpen, handleToggleBookmarksPanel, handleToggleBookmark, handleRemoveBookmark }}>
            {children}
        </BookmarksContext.Provider>
    );
}
