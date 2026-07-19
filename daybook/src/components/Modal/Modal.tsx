import { X } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";

export type ModalPropsType = {
    title: string;
    onClose: () => void;
    children: ReactNode;
    className?: string;
};

export function Modal({ title, onClose, children, className = "" }: ModalPropsType) {
    const handleCardClick = (event: MouseEvent) => event.stopPropagation();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-overlay-modal z-9999" onClick={onClose}>
            <div className={`max-h-[80vh] bg-card shadow-modal border border-hairline rounded-2xl overflow-y-auto ${className}`} onClick={handleCardClick}>
                <div className="flex items-center justify-between py-6 px-6 border-b border-hairline">
                    <span className="text-base font-bold">{title}</span>
                    <button type="button" className="text-subtle hover:text-accent" onClick={onClose} aria-label="Close">
                        <X size={16} />
                    </button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}
