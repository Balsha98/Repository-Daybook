import { useEffect, useState, type ReactNode } from "react";
import { BookmarksContext, getBookmarkKey, type BookmarkedItemType } from "../context/BookmarksContext";

const BOOKMARKS_STORAGE_KEY = "daybook-bookmarks";

const getInitialBookmarks = function (): Record<string, BookmarkedItemType> {
    const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);

    // Guard clause.
    if (!stored) return {};

    try {
        return JSON.parse(stored);
    } catch {
        return {};
    }
};

export function BookmarksProvider({ children }: { children: ReactNode }) {
    const [bookmarks, setBookmarks] = useState<Record<string, BookmarkedItemType>>(getInitialBookmarks);
    const [bookmarksPanelOpen, setBookmarksPanelOpen] = useState(false);

    const handleToggleBookmarksPanel = () => setBookmarksPanelOpen((v) => !v);

    const handleToggleBookmark = function (item: BookmarkedItemType) {
        const key = getBookmarkKey(item);

        setBookmarks(function (v) {
            const currentBookmarks = { ...v };

            // Guard clause.
            if (currentBookmarks[key]) {
                delete currentBookmarks[key];
                return currentBookmarks;
            }

            currentBookmarks[key] = item;

            return currentBookmarks;
        });
    };

    const handleRemoveBookmark = function (key: string) {
        setBookmarks(function (v) {
            const next = { ...v };

            delete next[key];

            return next;
        });
    };

    const handleClearBookmarks = () => setBookmarks({});

    useEffect(
        function () {
            localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
        },
        [bookmarks],
    );

    return (
        //prettier-ignore
        <BookmarksContext.Provider
            value={{ 
                bookmarks, 
                bookmarksPanelOpen, 
                handleToggleBookmarksPanel, 
                handleToggleBookmark, 
                handleRemoveBookmark, 
                handleClearBookmarks 
            }}
        >
            {children}
        </BookmarksContext.Provider>
    );
}
