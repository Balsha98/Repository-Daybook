import type { ForecastDayType, LocationDataType, WeatherDataType } from "./context/WeatherContext";

const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
const REVERSE_GEOCODE_BASE_URL = "https://api.openweathermap.org/geo/1.0/reverse";
const WEATHER_ICON_BASE_URL = "https://openweathermap.org/payload/api/media/file";
const FLAG_BASE_URL = "https://flagsapi.com";

type CurrentWeatherApiResponseType = {
    main: { temp: number; feels_like: number; temp_min: number; temp_max: number; humidity: number };
    weather: { description: string; icon: string }[];
    wind: { speed: number };
};

type ForecastEntryType = {
    main: { temp_min: number; temp_max: number };
    weather: { icon: string }[];
    dt_txt: string;
};

type ForecastApiResponseType = {
    list: ForecastEntryType[];
};

type ReverseGeocodeApiResponseType = { name: string; country: string }[];

const capitalizeFirstLetter = function (value: string): string {
    const uppercased = value.split(" ").map((v) => v[0].toUpperCase() + v.slice(1));

    return uppercased.join(" ");
};

export const buildWeatherIconUrl = (icon: string): string => `${WEATHER_ICON_BASE_URL}/${icon}.png`;

export const buildFlagUrl = (country: string): string => `${FLAG_BASE_URL}/${country}/shiny/64.png`;

export const getCurrentPosition = function (): Promise<GeolocationPosition> {
    return new Promise(function (resolve, reject) {
        // Guard clause.
        if (!navigator.geolocation) return reject(new Error("Geolocation isn't supported by this browser."));

        navigator.geolocation.getCurrentPosition(resolve, function (positionError) {
            if (positionError.code === positionError.PERMISSION_DENIED) {
                return reject(new Error("Location access was denied. Enable location permissions to see the weather."));
            }

            reject(new Error("Couldn't determine your location."));
        });
    });
};

export const fetchCurrentWeather = async function (lat: number, lon: number): Promise<WeatherDataType> {
    const params = new URLSearchParams({
        lat: String(lat),
        lon: String(lon),
        units: "imperial",
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    });

    const response = await fetch(`${WEATHER_BASE_URL}?${params.toString()}`);

    // Guard clause.
    if (!response.ok) throw new Error("Failed to fetch the current weather.");

    const data: CurrentWeatherApiResponseType = await response.json();

    return {
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        description: capitalizeFirstLetter(data.weather[0].description),
        icon: data.weather[0].icon,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
    };
};

export const fetchForecast = async function (lat: number, lon: number): Promise<ForecastDayType[]> {
    const params = new URLSearchParams({
        lat: String(lat),
        lon: String(lon),
        units: "imperial",
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    });

    const response = await fetch(`${FORECAST_BASE_URL}?${params.toString()}`);

    // Guard clause.
    if (!response.ok) throw new Error("Failed to fetch the weather forecast.");

    const data: ForecastApiResponseType = await response.json();

    return data.list
        .filter((entry) => entry.dt_txt.endsWith("12:00:00"))
        .slice(0, 5)
        .map(function (entry): ForecastDayType {
            const [year, month, day] = entry.dt_txt
                .split(" ")[0]
                .split("-")
                .map((v) => Number(v));

            return {
                date: new Date(year, month - 1, day),
                tempMin: entry.main.temp_min,
                tempMax: entry.main.temp_max,
                icon: entry.weather[0].icon,
            };
        });
};

export const fetchLocation = async function (lat: number, lon: number): Promise<LocationDataType> {
    const params = new URLSearchParams({
        lat: String(lat),
        lon: String(lon),
        limit: "1",
        appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    });

    const response = await fetch(`${REVERSE_GEOCODE_BASE_URL}?${params.toString()}`);

    // Guard clause.
    if (!response.ok) throw new Error("Failed to fetch the location name.");

    const data: ReverseGeocodeApiResponseType = await response.json();

    // Guard clause.
    if (!data[0]) throw new Error("No location found for these coordinates.");

    return {
        name: data[0].name,
        country: data[0].country,
    };
};
