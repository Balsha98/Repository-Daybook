import { createContext, useContext } from "react";

export type BookmarkedItemType = {
    type: "event" | "birth" | "death";
    year: number;
    text: string;
    detail: string;
    hasImage: boolean;
};

export type BookmarksContextType = {
    bookmarks: Record<string, BookmarkedItemType>;
    bookmarksPanelOpen: boolean;
    handleToggleBookmarksPanel: () => void;
    handleToggleBookmark: (item: BookmarkedItemType) => void;
    handleRemoveBookmark: (key: string) => void;
};

export const getBookmarkKey = (item: Pick<BookmarkedItemType, "type" | "year" | "text">): string => `${item.type}-${item.year}-${item.text}`;

export const BookmarksContext = createContext<BookmarksContextType | null>(null);

export const useBookmarks = function () {
    const context = useContext(BookmarksContext);

    // Guard clause.
    if (!context) throw new Error("useBookmarks must be used within a BookmarksProvider.");

    return context;
};
