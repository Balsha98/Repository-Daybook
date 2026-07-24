# Daybook - Modernized Almanac

A modernized almanac web application. For any date you pick, Daybook shows historical events, notable births, and notable deaths that happened "on this day," alongside a sidebar with the current weather (plus a 5-day forecast) and NASA's Astronomy Picture of the Day (APOD). Entries can be bookmarked for later, and the application supports light/dark theming.

## Demo

A live version is deployed at [daybookalmanac.vercel.app](https://daybookalmanac.vercel.app).

## Overview

- Greeted with a **loading screen** on first visit that fades out once the almanac, weather, and APOD data have all finished loading.
- Browse historical **events, births, and deaths** for any date, with quick-jump navigation between the three sections.
- Click into any entry for a detail view that contains **Wikipedia summary** of the topic.
- **Bookmark** entries to a persistent list (saved to `localStorage`), with one-click removal or clearing the whole list.
- See the **current weather** for your location (auto-detected via the browser's Geolocation API), a 5-day forecast, and a °F/°C toggle.
- Browse NASA's **Astronomy Picture of the Day** for any date.
- Switch between **light and dark themes** (persisted, and defaults to your OS preference).
- Fully responsive: the sidebar collapses into an off-canvas drawer on smaller screens.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS v4** - CSS-First Configuration via `@theme` (no `tailwind.config.ts`)
- **LucideReact** + **ReactIcons** - Icon Set
- **ESLint** - Linting

## Why Vite & Tailwind

**Vite** was chosen over a framework like Next.js or Remix mainly because of the shape of this application: there's no backend, no multiple pages/routing, and no server-side rendering; just a single static page that calls a handful of external APIs from the client. A framework built around routing, server components, and API routes would have been overkill for that; Vite, however, is a good build tool. It also supports a TypeScript codebase with no additional setup, which is ultimately a lot easier to read through and understand than Vanilla JS.

**Tailwind** was chosen for how well it fits a component-based architecture: styles live directly alongside the elements they affect, so there's no separate stylesheet to keep track of, no class-naming scheme to invent, and no specificity conflicts between unrelated components. Tailwind's latest version drops defines variables as CSS custom properties inside of `@theme` (see `src/app/theme.css`), which, for example, made it straightforward to build this project's light/dark theming system; swapping an entire palette is just toggling which set of `--db-*` variables is active, with Tailwind's utility classes picking up the change automatically.

## APIs Used

| API                                                                                         | Used For                                        | Auth               |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------ |
| [Browser Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) | Gets the user's coordinates for the weather.    | Browser Permission |
| [byabbe.se On This Day](https://byabbe.se/on-this-day/)                                     | Historical events, births, and deaths.          | None               |
| [Wikipedia REST Summary API](https://en.wikipedia.org/api/rest_v1/)                         | Summary shown in the entry detail view.         | None               |
| [NASA APOD API](https://api.nasa.gov/)                                                      | Astronomy Picture of the Day for any past date. | API Key            |
| [OpenWeatherMap Current Weather](https://openweathermap.org/current)                        | Current conditions for the user's location.     | API Key            |
| [OpenWeatherMap 5 Day Forecast](https://openweathermap.org/forecast5)                       | 5-day forecast, one reading per day (noon).     | API Key            |
| [OpenWeatherMap Reverse Geocoding](https://openweathermap.org/api/geocoding-api)            | Resolves coordinates to a city and country.     | API Key            |
| [flagsapi.com](https://flagsapi.com/)                                                       | Country flag icon next to the location.         | None               |

## Running It Locally

**Prerequisites:** Node.js & npm

```bash
# Move into the application directory.
cd daybook

# Install dependencies.
npm i

# Copy the env template and fill in your API keys (see below).
cp .env.example .env

# Start the dev server.
npm run dev
```

Other available scripts (run from `daybook/`):

```bash
npm run build    # Type-check (tsc -b) and produce a production build in dist/.
npm run preview  # Preview the production build locally.
npm run lint     # Run ESLint.
```

## Running It With Docker

An alternative to the npm-based setup above, for developing inside a container. Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
# Move into the application directory.
cd daybook

# Copy the env template and fill in your API keys (see below).
cp .env.example .env

# Build the image and start the dev server.
docker compose up --build
```

Then open [http://localhost:5173](http://localhost:5173). Source files are bind-mounted into the container, so edits made on the host are picked up live (HMR is enabled). On subsequent runs, `--build` isn't needed unless `package.json` or the `Dockerfile` itself changed; plain `docker compose up` reuses the existing image.

This setup is dev-only; it isn't used for the Vercel deployment described under Deployment below.

## Environment Variables

Inside `daybook/`, copy `.env.example` to `.env` and fill in your own keys:

```bash
VITE_NASA_API_KEY=
VITE_OPENWEATHER_API_KEY=
```

- `VITE_NASA_API_KEY` - get a free key at [api.nasa.gov](https://api.nasa.gov/).
- `VITE_OPENWEATHER_API_KEY` - get a free key at [openweathermap.org/api](https://openweathermap.org/api).

Both are prefixed with `VITE_` so Vite inlines them into the client bundle.

## Testing

Tests run on [Vitest](https://vitest.dev/), with [React Testing Library](https://testing-library.com/react) for rendering/querying components and [MSW](https://mswjs.io/) for mocking network requests. Test files are colocated next to what they test (e.g. `DateProvider.test.tsx` sits beside `DateProvider.tsx`) rather than mirrored into a separate `tests/` folder.

```bash
npm test           # Watch mode - re-runs affected tests as files change.
# or
npm test -- run    # Run once and exit (e.g. for CI).
```

Test files are excluded from the production build's type-check (`tsconfig.app.json`) and instead covered by their own `tsconfig.test.json`, so `npm run build` never depends on test-only packages being installed.

## Project Structure

Feature-Based Architecture - each domain owns its own components, context, provider, and API calls, rather than one global store.

```
Repository-Daybook/
├── daybook/
│   └── src/
│       ├── app/                     # Application shell (App.tsx), global CSS/theme tokens.
│       ├── components/              # Generic, reusable UI with no domain knowledge.
│       │   ├── IconButton/
│       │   ├── Modal/
│       │   └── Popover/
│       ├── features/
│       │   ├── almanac/             # On-this-day events/births/deaths, entry detail modal.
│       │   ├── apod/                # NASA Astronomy Picture of the Day.
│       │   ├── bookmarks/           # Bookmarking + localStorage persistence.
│       │   ├── date-control/        # Date navigation (desktop nav, mobile modal).
│       │   ├── layout/              # Header, Footer, Sidebar.
│       │   ├── loading/             # Full-screen splash shown until initial data is ready.
│       │   ├── theme/               # Light/dark theme toggle.
│       │   └── weather/             # Current weather + 5-day forecast.
│       │       └── <feature>/
│       │           ├── components/
│       │           ├── context/     # React context + hook (once a feature needs one).
│       │           ├── providers/   # The provider component backing that context.
│       │           └── api.ts       # External data fetching for that feature.
│       ├── test/                    # Vitest setup (jest-dom matchers, DOM cleanup).
│       ├── utils/                   # Framework-agnostic utilities (date parsing/formatting).
│       └── main.tsx                 # Providers composition + application entry point.
└── README.md
```

## Architecture

No prop-drilling and no single global store; state is split per feature, and each feature that needs shared state exposes it through its own **Context** and **Provider** pair instead of threading props down through several component levels.

- **`context/<Feature>Context.ts`** - defines the context's TypeScript type, creates the `Context` object, and exports a `use<Feature>()` hook that reads it (throwing a clear error if a component tries to use it outside its provider). Components call this hook directly wherever they need that feature's data, no matter how deep they are in the tree.
- **`providers/<Feature>Provider.tsx`** - the component that actually owns the `useState`/`useEffect` calls, computes the context value, and renders `<Context.Provider>`. This is the only place a feature's state actually lives.
- **`api.ts`** - a feature's external data fetching lives here, kept separate from the provider. It's responsible only for calling the external APIs and mapping the raw response into the feature's own typed shape; the provider calls into it (usually from inside a `useEffect`) and owns the resulting loading/error/data state.

All providers are composed once in `main.tsx`, wrapping the whole application. This keeps each feature self-contained and easy to reason about in isolation; the `weather` feature, for example, has no knowledge of `almanac`'s state, and a component several levels deep (like `WeatherCard`) can read exactly the data it needs via `useWeather()` without every component in between having to pass it along.

## Deployment

The production build (`npm run build`, from `daybook/`) outputs a static `dist/` folder, deployable to any static host. This project is deployed on [Vercel](https://vercel.com/); if you fork it there, make sure to:

- Set the project's Root Directory to `daybook` (since the application isn't at the repo root).
- Add `VITE_NASA_API_KEY` and `VITE_OPENWEATHER_API_KEY` under Environment Variables.

## Nice-To-Haves

- **Additional Accent Color Themes** - the design tokens already support swapping the accent color; only one is wired up today.
- **Remembering the °F/°C Choice** - the temperature unit isn't persisted between visits (unlike theme/bookmarks, which are).
- **Bookmarking APOD Entries** - currently only almanac entries can be bookmarked; extending this to APOD would be a nice-to-have.
- **Pagination for Almanac Entries** - Almanac sections currently render every fetched entry at once; it generally is a long list of data rows.
- **AI-Generated Entry Art** - sending an entry's data to an AI image model to generate a picture of the event/person.

## Design

The initial prototype and design handoff document were put together with Claude Design before development began.

## Contact

If you enjoyed my work or have any questions, feel free to reach out!

[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://bazovich.dev)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:balsa.bazovic@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/balsha-bazovich)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Balsha98)

## License

Personal project - all rights reserved.
