import { ChevronLeft, ChevronRight } from "lucide-react";
import type { KeyboardEvent } from "react";
import { IconButton } from "../../../components/IconButton/IconButton";
import { Modal } from "../../../components/Modal/Modal";
import { getOrdinalSuffix } from "../../../utils/date";
import { useSelectedDate } from "../context/DateContext";

const WEEKDAY_MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long" });

//prettier-ignore
export function DateSelectionModal() {
    const {
        date,
        dateInputValue,
        dateModalOpen,
        handleChangeDay,
        handleDateInputChange,
        handleDateInputBlur,
        handleToggleDateModal,
    } = useSelectedDate();

    // Guard clause.
    if (!dateModalOpen) return null;

    const day = date.getDate();

    const handleDateInputKeyDown = function (event: KeyboardEvent<HTMLInputElement>) {
        // Guard clause.
        if (event.key !== "Enter") return;

        event.currentTarget.blur();
    };

    return (
        <Modal title="Choose a Date" className="w-full max-w-[320px]" onClose={handleToggleDateModal}>
            <div className="flex flex-col items-center gap-4">
                <div className="flex w-full items-center justify-between">
                    <IconButton onClick={() => handleChangeDay(-1)} aria-label="Previous Day">
                        <ChevronLeft size={16} />
                    </IconButton>
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-semibold">
                            {WEEKDAY_MONTH_FORMATTER.format(date)} {day}
                            <sup>{getOrdinalSuffix(day)}</sup>
                        </span>
                        <span className="text-sm text-subtle">{date.getFullYear()}</span>
                    </div>
                    <IconButton onClick={() => handleChangeDay(1)} aria-label="Next Day">
                        <ChevronRight size={16} />
                    </IconButton>
                </div>
                <input
                    type="text"
                    className="w-full h-10 text-[14px] text-center border border-hairline rounded-lg focus:outline-none focus:border-accent hover:border-accent"
                    onChange={(event) => handleDateInputChange(event.target.value)}
                    onKeyDown={handleDateInputKeyDown}
                    onBlur={handleDateInputBlur}
                    placeholder="MM/DD/YYYY"
                    value={dateInputValue}
                />
            </div>
        </Modal>
    );
}
