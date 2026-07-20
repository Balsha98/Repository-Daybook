import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { DateContext, type DateContextType } from "../../date-control/context/DateContext";
import { useApod } from "../context/ApodContext";
import { ApodProvider } from "./ApodProvider";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function ApodTitle() {
    const { apodData } = useApod();

    return <span data-testid="title">{apodData?.title ?? "Loading..."}</span>;
}

// Only `date` matters for this test — the rest of DateContextType is stubbed.
function Harness() {
    const [date, setDate] = useState(new Date(2024, 0, 1));

    const dateContextValue: DateContextType = {
        date,
        dateInputValue: "",
        dateInputError: null,
        isToday: false,
        dateModalOpen: false,
        handleChangeDay: () => {},
        handleDateInputChange: () => {},
        handleDateInputBlur: () => {},
        handleToggleDateModal: () => {},
    };

    return (
        <DateContext.Provider value={dateContextValue}>
            <ApodProvider>
                <ApodTitle />
                <button onClick={() => setDate(new Date(2024, 0, 2))}>Next Day</button>
            </ApodProvider>
        </DateContext.Provider>
    );
}

describe("ApodProvider race condition guard", function () {
    it("ignores a stale response that resolves after a newer request", async function () {
        server.use(
            http.get("https://api.nasa.gov/planetary/apod", async ({ request }) => {
                const requestedDate = new URL(request.url).searchParams.get("date");

                // The Jan 1 request is slow — it resolves *after* the Jan 2 request below.
                if (requestedDate === "2024-01-01") {
                    await delay(100);

                    return HttpResponse.json({ title: "Old Picture", explanation: "", url: "", media_type: "image" });
                }

                return HttpResponse.json({ title: "New Picture", explanation: "", url: "", media_type: "image" });
            }),
        );

        const user = userEvent.setup();

        render(<Harness />);

        // Trigger the second (faster) request while the first is still in flight.
        await user.click(screen.getByRole("button", { name: "Next Day" }));

        await waitFor(() => expect(screen.getByTestId("title")).toHaveTextContent("New Picture"));

        // Give the slow, stale Jan 1 response time to resolve too — it must not overwrite the newer data.
        await new Promise((resolve) => setTimeout(resolve, 150));

        expect(screen.getByTestId("title")).toHaveTextContent("New Picture");
    });
});
