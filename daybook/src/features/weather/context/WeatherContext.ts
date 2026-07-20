import { createContext, useContext } from "react";

export type TempUnitType = "F" | "C";

export type WeatherDataType = {
    temp: number;
    feelsLike: number;
    description: string;
    tempMin: number;
    tempMax: number;
    humidity: number;
    windSpeed: number;
    icon: string;
};

export type LocationDataType = {
    name: string;
    country: string;
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
    location: LocationDataType | null;
    weatherData: WeatherDataType | null;
    forecast: ForecastDayType[];
    tempUnit: TempUnitType | null;
    handleSetTempUnit: (unit: TempUnitType) => void;
};

export const WeatherContext = createContext<WeatherContextType | null>(null);

export const useWeather = function () {
    const context = useContext(WeatherContext);

    // Guard clause.
    if (!context) throw new Error("useWeather must be used within a WeatherProvider.");

    return context;
};
