import { X } from "lucide-react";
import { useEffect, type MouseEvent, type ReactNode } from "react";

export type ModalPropsType = {
    title?: string;
    onClose: () => void;
    children: ReactNode;
    className?: string;
};

export function Modal({ title, onClose, children, className = "" }: ModalPropsType) {
    const handleCardClick = (event: MouseEvent) => event.stopPropagation();

    useEffect(function () {
        document.body.style.overflow = "hidden";

        return function () {
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-overlay-modal z-9999" onClick={onClose}>
            <div className={`max-h-[80vh] bg-card shadow-modal border border-hairline rounded-2xl overflow-y-auto ${className}`} onClick={handleCardClick}>
                {title ? (
                    <>
                        <div className="flex items-center justify-between py-4 px-4 border-b border-hairline">
                            <span className="text-base font-bold">{title}</span>
                            <button type="button" className="text-subtle hover:text-accent cursor-pointer" onClick={onClose} aria-label="Close">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="py-6 px-4">{children}</div>
                    </>
                ) : (
                    children
                )}
            </div>
        </div>
    );
}
