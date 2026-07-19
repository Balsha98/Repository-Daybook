import { LuLinkedin } from "react-icons/lu";
import { FiGithub } from "react-icons/fi";

const SOCIALS = [
    { label: "LinkedIn", href: "https://linkedin.com/in/balsha-bazovich", Icon: LuLinkedin },
    { label: "GitHub", href: "https://github.com/Balsha98", Icon: FiGithub },
];

const SOURCES = [
    { label: "NASA APOD API", href: "https://api.nasa.gov/" },
    { label: "OpenWeatherMap API", href: "https://api.openweathermap.org/" },
    { label: "ByAbbe On This Day API", href: "https://byabbe.se/on-this-day/" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-hairline">
            <div className="flex flex-col gap-10 max-w-350 mx-auto py-10 px-4 xs:flex-row xs:items-start xs:justify-between xs:px-8">
                <div className="flex flex-col items-center gap-3 xs:items-start">
                    <div className="flex flex-col items-center gap-1 xs:items-start">
                        <span className="text-lg font-bold">Daybook</span>
                        <p className="max-w-xs text-[14px] text-subtle">A personal almanac for the day you're living in.</p>
                    </div>
                    <ul className="flex items-center gap-2">
                        {SOCIALS.map(({ label, href, Icon }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    rel="noreferrer"
                                    className="flex items-center justify-center h-9 w-9 border border-hairline rounded-full hover:text-accent hover:border-accent"
                                    aria-label={label}
                                    target="_blank"
                                >
                                    <Icon size={16} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col items-center gap-2 xs:items-end">
                    <span className="text-[12px] font-bold uppercase text-subtle">Sources</span>
                    <ul className="flex flex-col items-center gap-1 xs:items-end">
                        {SOURCES.map((source) => (
                            <li key={source.label}>
                                <a href={source.href} rel="noreferrer" className="text-[14px] text-subtle hover:text-accent" target="_blank">
                                    {source.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="border-t border-hairline">
                <div className="flex flex-col items-center gap-2 max-w-350 mx-auto py-4 px-4 text-[12px] text-subtle xs:flex-row xs:justify-between xs:px-8">
                    <p>© {currentYear} Daybook. All rights reserved.</p>
                    <p>Made for the curious, by Balša.</p>
                </div>
            </div>
        </footer>
    );
}
