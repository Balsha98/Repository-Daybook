import { useState } from "react";
import { LayoutList } from "lucide-react";
import { useSelectedDate } from "../../date-control/context/DateContext";
import { MobileSidebarButton } from "../../layout/components/MobileSidebarButton";
import { IconButton } from "../../../components/IconButton/IconButton";
import { Popover } from "../../../components/Popover/Popover";
import { getOrdinalSuffix } from "../../../utils/date";
import { useAlmanac } from "../context/AlmanacContext";
import { AlmanacSection } from "./AlmanacSection";

const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", { month: "long" });

const ALMANAC_NAV_SECTIONS = [
    { id: "events", label: "Events" },
    { id: "births", label: "Births" },
    { id: "deaths", label: "Deaths" },
];

export function AlmanacMain() {
    const { date } = useSelectedDate();
    const { isLoading, error, events, births, deaths } = useAlmanac();

    const [navPopoverOpen, setNavPopoverOpen] = useState(false);

    const day = date.getDate();

    const handleToggleNavPopover = () => setNavPopoverOpen((v) => !v);

    const handleScrollToSection = function (id: string) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

        setNavPopoverOpen(false);
    };

    return (
        <main className="flex flex-col gap-14">
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-accent">On This Day</p>
                    <h1 className="text-4xl font-bold leading-none">
                        {MONTH_FORMATTER.format(date)} {day}
                        <sup className="text-lg">{getOrdinalSuffix(day)}</sup>
                    </h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="hidden items-center gap-2 sm:flex">
                        {ALMANAC_NAV_SECTIONS.map((section) => (
                            <button
                                key={section.id}
                                type="button"
                                className="py-1 px-3 text-xs font-semibold border border-hairline rounded-full cursor-pointer hover:text-accent hover:border-accent"
                                onClick={() => handleScrollToSection(section.id)}
                            >
                                {section.label}
                            </button>
                        ))}
                    </div>
                    <div className="relative sm:hidden">
                        <IconButton active={navPopoverOpen} onClick={handleToggleNavPopover} aria-label="Toggle Section Navigation">
                            <LayoutList size={16} />
                        </IconButton>
                        {navPopoverOpen && (
                            <div className="absolute top-12 -right-2 w-48">
                                <Popover title="Sections" onClose={handleToggleNavPopover}>
                                    <ul className="flex flex-col">
                                        {ALMANAC_NAV_SECTIONS.map((section) => (
                                            <li key={section.id} className="border-b last:border-b-0 border-hairline">
                                                <button
                                                    type="button"
                                                    className="w-full py-3 px-4 text-xs font-semibold text-center cursor-pointer hover:bg-hover-bg"
                                                    onClick={() => handleScrollToSection(section.id)}
                                                >
                                                    {section.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </Popover>
                            </div>
                        )}
                    </div>
                    <MobileSidebarButton />
                </div>
            </div>
            {isLoading && <p className="text-sm text-subtle">Loading almanac entries…</p>}
            {error && !isLoading && <p className="text-sm text-subtle">{error}</p>}
            {!isLoading && !error && (
                <div className="flex flex-col gap-12">
                    <AlmanacSection id="events" title="Notable Events" entries={events} />
                    <AlmanacSection id="births" title="Notable Births" entries={births} />
                    <AlmanacSection id="deaths" title="Notable Deaths" entries={deaths} />
                </div>
            )}
        </main>
    );
}
