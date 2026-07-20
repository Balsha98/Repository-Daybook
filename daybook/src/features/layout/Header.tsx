import { BookOpen } from "lucide-react";
import { DesktopDateControl } from "../date-control/components/DesktopDateControl";
import { TodayIndicator } from "../date-control/components/TodayIndicator";
import { MobileDateButton } from "../date-control/components/MobileDateButton";
import { BookmarkButton } from "../bookmarks/components/BookmarkButton";
import { BookmarksPanel } from "../bookmarks/components/BookmarksPanel";
import { ThemeButton } from "../theme/components/ThemeButton";

export function Header() {
    const handleScrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <header className="sticky top-0 bg-bg/80 backdrop-blur-sm border-b border-hairline z-9998">
            <div className="relative flex items-center justify-between max-w-350 mx-auto py-5 px-4 xs:px-8">
                <button type="button" className="flex items-center gap-2 cursor-pointer" onClick={handleScrollToTop} aria-label="Scroll to Top">
                    <div className="flex items-center justify-center w-8 h-8 bg-accent rounded-md">
                        <BookOpen size={16} strokeWidth={2.4} className="text-on-accent" />
                    </div>
                    <span className="hidden text-[24px] font-bold lg:inline">Daybook</span>
                </button>
                <DesktopDateControl />
                <div className="flex items-center gap-2">
                    <TodayIndicator />
                    <MobileDateButton />
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
