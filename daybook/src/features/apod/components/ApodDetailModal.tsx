import { X } from "lucide-react";
import { Modal } from "../../../components/Modal/Modal";
import { useApod } from "../context/ApodContext";

export function ApodDetailModal() {
    const { apodData, apodModalOpen, handleToggleApodModal } = useApod();

    // Guard clause.
    if (!apodModalOpen || !apodData) return null;

    return (
        <Modal onClose={handleToggleApodModal} className="w-full max-w-180">
            <div className="relative">
                {apodData.mediaType === "video" ? (
                    <iframe title={apodData.title} src={apodData.url} className="w-full aspect-video rounded-t-2xl" allowFullScreen />
                ) : (
                    <img className="w-full aspect-video object-cover rounded-t-2xl" src={apodData.hdurl ?? apodData.url} alt={apodData.title} />
                )}
                <button
                    type="button"
                    className="absolute top-4 right-4 flex items-center justify-center w-9 h-9 text-subtle bg-card border border-hairline rounded-full transition-colors cursor-pointer hover:text-accent hover:border-accent"
                    onClick={handleToggleApodModal}
                    aria-label="Close"
                >
                    <X size={16} />
                </button>
            </div>
            <div className="flex flex-col gap-3 p-8">
                <h2 className="text-2xl font-bold leading-snug">{apodData.title}</h2>
                <p className="text-md leading-relaxed text-subtle">{apodData.explanation}</p>
            </div>
        </Modal>
    );
}
