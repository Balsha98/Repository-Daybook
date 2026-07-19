import { createContext, useContext } from "react";
import { getAlmanacEntryKey, type AlmanacEntryType } from "../../almanac/context/AlmanacContext";

export type BookmarkedItemType = AlmanacEntryType;

export type BookmarksContextType = {
    bookmarks: Record<string, BookmarkedItemType>;
    bookmarksPanelOpen: boolean;
    handleToggleBookmarksPanel: () => void;
    handleToggleBookmark: (item: BookmarkedItemType) => void;
    handleRemoveBookmark: (key: string) => void;
    handleClearBookmarks: () => void;
};

export const getBookmarkKey = getAlmanacEntryKey;

export const BookmarksContext = createContext<BookmarksContextType | null>(null);

export const useBookmarks = function () {
    const context = useContext(BookmarksContext);

    // Guard clause.
    if (!context) throw new Error("useBookmarks must be used within a BookmarksProvider.");

    return context;
};
