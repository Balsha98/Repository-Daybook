import { getAlmanacEntryKey, type AlmanacEntryType } from "../context/AlmanacContext";
import { AlmanacRow } from "./AlmanacRow";

export type AlmanacSectionPropsType = {
    id: string;
    title: string;
    entries: AlmanacEntryType[];
};

export function AlmanacSection({ id, title, entries }: AlmanacSectionPropsType) {
    return (
        <section id={id} className="flex flex-col gap-2 scroll-mt-24">
            <h2 className="text-lg font-bold uppercase tracking-wide text-subtle">{title}</h2>
            <ul className="flex flex-col">
                {entries.map((entry) => (
                    <AlmanacRow key={getAlmanacEntryKey(entry)} entry={entry} />
                ))}
            </ul>
        </section>
    );
}
