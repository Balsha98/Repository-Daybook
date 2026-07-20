import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { useSelectedDate } from "../context/DateContext";
import { DateProvider } from "./DateProvider";

function Harness() {
    const { date, dateInputValue, dateInputError, handleDateInputChange, handleDateInputBlur } = useSelectedDate();

    const [previousDate, setPreviousDate] = useState(date);
    const [dateChangeCount, setDateChangeCount] = useState(0);

    // Guard clause.
    if (date !== previousDate) {
        setDateChangeCount((v) => v + 1);
        setPreviousDate(date);
    }

    return (
        <div>
            <span data-testid="date-change-count">{dateChangeCount}</span>
            <input value={dateInputValue} onChange={(event) => handleDateInputChange(event.target.value)} onBlur={handleDateInputBlur} aria-label="date" />
            <span data-testid="error">{dateInputError}</span>
        </div>
    );
}

describe("DateProvider handleDateInputBlur", function () {
    it("does not change the date reference when blurring without editing the already-selected day", async function () {
        render(
            <DateProvider>
                <Harness />
            </DateProvider>,
        );

        const input = screen.getByLabelText("date");

        await userEvent.click(input);
        await userEvent.tab();

        expect(screen.getByTestId("date-change-count")).toHaveTextContent("0");
    });

    it("shows an inline error and leaves the typed text in place for an invalid format", async function () {
        render(
            <DateProvider>
                <Harness />
            </DateProvider>,
        );

        const input = screen.getByLabelText("date");

        await userEvent.clear(input);
        await userEvent.type(input, "not a date");
        await userEvent.tab();

        expect(screen.getByTestId("error")).toHaveTextContent("Please enter a date in MM/DD/YYYY format.");
        expect(input).toHaveValue("not a date");
    });

    it("does change the date reference when a genuinely different valid date is entered", async function () {
        render(
            <DateProvider>
                <Harness />
            </DateProvider>,
        );

        const input = screen.getByLabelText("date");

        await userEvent.clear(input);
        await userEvent.type(input, "01/01/2020");
        await userEvent.tab();

        expect(screen.getByTestId("date-change-count")).toHaveTextContent("1");
        expect(screen.getByTestId("error")).toHaveTextContent("");
    });
});
