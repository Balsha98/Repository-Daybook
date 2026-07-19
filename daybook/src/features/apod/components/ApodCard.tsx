import { ExternalLink } from "lucide-react";
import { useApod } from "../context/ApodContext";

export function ApodCard() {
    const { apodData, isLoading, error, handleToggleApodModal } = useApod();

    const cardImageSrc = apodData?.mediaType === "video" ? apodData.thumbnailUrl : apodData?.url;

    return (
        <div className="p-5 border border-hairline rounded-xl cursor-pointer hover:bg-hover-bg" onClick={handleToggleApodModal}>
            <div className="flex items-center justify-between pb-3">
                <span className="text-xs font-bold tracking-wide uppercase text-subtle">NASA Picture of the Day</span>
                <button type="button" className="text-subtle cursor-pointer hover:text-accent" aria-label="Open Full View">
                    <ExternalLink size={16} />
                </button>
            </div>
            {error && !isLoading && <p className="text-sm text-subtle">{error}</p>}
            {isLoading && <div className="w-full aspect-4/3 bg-hover-bg rounded-lg animate-pulse" />}
            {apodData && !isLoading && !error && (
                <>
                    <div className="flex flex-col gap-3">
                        {cardImageSrc && <img src={cardImageSrc} alt={apodData.title} className="w-full aspect-4/3 object-cover rounded-lg" />}
                        <div className="flex flex-col gap-1">
                            <h4 className="truncate text-md font-semibold">{apodData.title}</h4>
                            <p className="text-sm text-subtle line-clamp-3">{apodData.explanation}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
