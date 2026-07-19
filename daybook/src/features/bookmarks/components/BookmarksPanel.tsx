import { Popover } from "../../../components/Popover/Popover";
import { useBookmarks } from "../context/BookmarksContext";
import { BookmarkRow } from "./BookmarkRow";

export function BookmarksPanel() {
    const { bookmarks, bookmarksPanelOpen, handleToggleBookmarksPanel, handleRemoveBookmark } = useBookmarks();

    // Guard clause.
    if (!bookmarksPanelOpen) return null;

    const bookmarkEntries = Object.entries(bookmarks);

    return (
        <div className="absolute top-12 -right-2 w-100  ">
            <Popover title="Saved Bookmarks" onClose={handleToggleBookmarksPanel}>
                {bookmarkEntries.length === 0 ? (
                    <p className="py-4 px-4 text-sm text-left text-subtle">Nothing saved yet. Click the bookmark icon on any entry to have it appear here.</p>
                ) : (
                    <ul className="flex flex-col">
                        {bookmarkEntries.map(([key, item]) => (
                            <BookmarkRow key={key} item={item} onRemove={handleRemoveBookmark} />
                        ))}
                    </ul>
                )}
            </Popover>
        </div>
    );
}
