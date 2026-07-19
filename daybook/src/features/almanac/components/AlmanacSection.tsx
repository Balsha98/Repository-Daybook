import { getAlmanacEntryKey, type AlmanacEntryType } from "../context/AlmanacContext";
import { AlmanacRow } from "./AlmanacRow";

export type AlmanacSectionPropsType = {
    title: string;
    entries: AlmanacEntryType[];
};

export function AlmanacSection({ title, entries }: AlmanacSectionPropsType) {
    return (
        <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold uppercase tracking-wide text-subtle">{title}</h2>
            <ul className="flex flex-col">
                {entries.map((entry) => (
                    <AlmanacRow key={getAlmanacEntryKey(entry)} entry={entry} />
                ))}
            </ul>
        </section>
    );
}
