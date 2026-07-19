import { X } from "lucide-react";
import type { ReactNode } from "react";

export type PopoverPropsType = {
    title: string;
    onClose: () => void;
    children: ReactNode;
};

export function Popover({ title, onClose, children }: PopoverPropsType) {
    return (
        <div className={`bg-card shadow-popover border border-hairline rounded-xl`}>
            <header className="flex items-center justify-between py-4 px-4 border-b border-hairline">
                <span className="text-sm font-bold">{title}</span>
                <button type="button" onClick={onClose} className="text-subtle hover:text-accent cursor-pointer" aria-label="Close">
                    <X size={16} />
                </button>
            </header>
            <div className="max-h-[480px] overflow-y-auto">{children}</div>
        </div>
    );
}
