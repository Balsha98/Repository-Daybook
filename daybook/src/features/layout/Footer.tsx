import { LuLinkedin } from "react-icons/lu";
import { TbBrandGithubFilled } from "react-icons/tb";

const SOCIALS = [
    { label: "LinkedIn", href: "https://linkedin.com/in/balsha-bazovich", Icon: LuLinkedin },
    { label: "GitHub", href: "https://github.com/Balsha98", Icon: TbBrandGithubFilled },
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
            <div className="flex items-start justify-between max-w-350 mx-auto py-10 px-8">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
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
                <div className="flex flex-col items-end gap-2">
                    <span className="text-[12px] font-bold uppercase text-subtle">Sources</span>
                    <ul className="flex flex-col items-end gap-1">
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
                <div className="flex items-center justify-between max-w-350 mx-auto py-4 px-8 text-[12px] text-subtle">
                    <p>© {currentYear} Daybook. All rights reserved.</p>
                    <p>Made for the curious, by Balša.</p>
                </div>
            </div>
        </footer>
    );
}
