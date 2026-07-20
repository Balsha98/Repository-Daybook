import { useEffect, useState, type ReactNode } from "react";
import { fetchCurrentWeather, fetchForecast, fetchLocation, getCurrentPosition } from "../api";
import { WeatherContext, type ForecastDayType, type LocationDataType, type TempUnitType, type WeatherDataType } from "../context/WeatherContext";

export function WeatherProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<LocationDataType | null>(null);
    const [weatherData, setWeatherData] = useState<WeatherDataType | null>(null);
    const [forecast, setForecast] = useState<ForecastDayType[]>([]);
    const [tempUnit, setTempUnit] = useState<TempUnitType | null>(null);

    const handleSetTempUnit = (unit: TempUnitType) => setTempUnit(unit);

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

                const [locationData, currentWeather, forecastData] = await Promise.all([
                    fetchLocation(latitude, longitude),
                    fetchCurrentWeather(latitude, longitude),
                    fetchForecast(latitude, longitude),
                ]);

                // Guard clause.
                if (cancelled) return;

                setLocation(locationData);
                setTempUnit(locationData.country === "US" ? "F" : "C");
                setWeatherData(currentWeather);
                setForecast(forecastData);
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

    return (
        <WeatherContext.Provider value={{ isLoading, error, weatherData, forecast, location, tempUnit, handleSetTempUnit }}>{children}</WeatherContext.Provider>
    );
}
