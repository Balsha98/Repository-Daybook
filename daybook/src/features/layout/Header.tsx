import { BookOpen } from "lucide-react";
import { BookmarkButton } from "../bookmarks/components/BookmarkButton";
import { BookmarksPanel } from "../bookmarks/components/BookmarksPanel";
import { ThemeButton } from "../theme/components/ThemeButton";

export function Header() {
    return (
        <header className="sticky top-0 z-9998 bg-bg/80 backdrop-blur-[8px] border-b border-hairline">
            <div className="flex items-center justify-between max-w-[1400px] mx-auto py-5 px-8">
                <div className="flex items-center gap-2">
                    <div className="flex w-[32px] h-[32px] items-center justify-center bg-accent rounded-md">
                        <BookOpen size={16} strokeWidth={2.4} className="text-on-accent" />
                    </div>
                    <span className="font-bold text-[24px]">Daybook</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <BookmarkButton />
                        <BookmarksPanel />
                    </div>
                    <ThemeButton />
                </div>
            </div>
        </header>
    );
}
