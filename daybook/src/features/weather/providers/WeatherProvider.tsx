import { useEffect, useState, type ReactNode } from "react";
import { fetchCurrentWeather, fetchForecast, getCurrentPosition } from "../api";
import { WeatherContext, type ForecastDayType, type WeatherDataType } from "../context/WeatherContext";

export function WeatherProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
    const [forecast, setForecast] = useState<ForecastDayType[]>([]);

    useEffect(function () {
        let cancelled = false;

        const loadWeather = async function () {
            setIsLoading(true);
            setError(null);

            try {
                const position = await getCurrentPosition();

                // Guard clause.
                if (cancelled) return;

                const { latitude, longitude } = position.coords;

                const [currentWeather, forecastDays] = await Promise.all([fetchCurrentWeather(latitude, longitude), fetchForecast(latitude, longitude)]);

                // Guard clause.
                if (cancelled) return;

                setWeatherData(currentWeather);
                setForecast(forecastDays);
            } catch (e) {
                // Guard clause.
                if (cancelled) return;

                setError(e instanceof Error ? e.message : "Couldn't load the weather.");
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        loadWeather();

        return function () {
            cancelled = true;
        };
    }, []);

    return <WeatherContext.Provider value={{ isLoading, error, weatherData, forecast }}>{children}</WeatherContext.Provider>;
}
