import { createContext, useContext } from "react";

export type WeatherDataType = {
    temp: number;
    name: string;
    feelsLike: number;
    description: string;
    tempMin: number;
    tempMax: number;
    humidity: number;
    windSpeed: number;
    icon: string;
};

export type ForecastDayType = {
    date: Date;
    tempMin: number;
    tempMax: number;
    icon: string;
};

export type WeatherContextType = {
    isLoading: boolean;
    error: string | null;
    weatherData: WeatherDataType | null;
    forecast: ForecastDayType[];
};

export const WeatherContext = createContext<WeatherContextType | null>(null);

export const useWeather = function () {
    const context = useContext(WeatherContext);

    // Guard clause.
    if (!context) throw new Error("useWeather must be used within a WeatherProvider.");

    return context;
};
