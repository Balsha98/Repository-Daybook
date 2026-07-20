import { buildFlagUrl, buildWeatherIconUrl } from "../api";
import { useWeather, type TempUnitType } from "../context/WeatherContext";

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat("en-US", { weekday: "short" });

const formatTemp = (fahrenheit: number, unit: TempUnitType): string => `${Math.round(unit === "C" ? ((fahrenheit - 32) * 5) / 9 : fahrenheit)}°`;

export function WeatherCard() {
    const { isLoading, error, location, weatherData, forecast, tempUnit, handleSetTempUnit } = useWeather();

    return (
        <div className="p-5 border border-hairline rounded-xl">
            <header className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold tracking-wide uppercase text-subtle">Weather</span>
                    {location && !isLoading && !error && (
                        <div className="flex items-center gap-1">
                            <span className="text-md font-semibold">{location.name}</span>
                            <img
                                className="w-6"
                                src={buildFlagUrl(location.country)}
                                onError={(event) => {
                                    event.currentTarget.style.display = "none";
                                }}
                                alt={location.country}
                            />
                        </div>
                    )}
                </div>
                <div className="flex items-center bg-hover-bg rounded-full">
                    <button
                        type="button"
                        className={`py-0.5 px-2 text-xs font-semibold rounded-full transition-colors cursor-pointer ${tempUnit === "F" ? "text-on-accent bg-accent" : "text-subtle hover:text-accent"}`}
                        onClick={() => handleSetTempUnit("F")}
                    >
                        °F
                    </button>
                    <button
                        type="button"
                        className={`py-0.5 px-2 text-xs font-semibold rounded-full transition-colors cursor-pointer ${tempUnit === "C" ? "text-on-accent bg-accent" : "text-subtle hover:text-accent"}`}
                        onClick={() => handleSetTempUnit("C")}
                    >
                        °C
                    </button>
                </div>
            </header>
            {error && !isLoading && <p className="pt-3 text-sm text-subtle">{error}</p>}
            {isLoading && <div className="h-24 mt-3 bg-hover-bg rounded-lg animate-pulse" />}
            {weatherData && !isLoading && !error && (
                <div className="flex flex-col gap-4">
                    <div className="flex items-end justify-between pt-3">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                                <img className="w-16 h-16" src={buildWeatherIconUrl(weatherData.icon)} alt={weatherData.description} />
                                <span className="text-4xl font-semibold">{formatTemp(weatherData.temp, tempUnit)}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-md font-semibold">{weatherData.description}</span>
                                <span className="text-sm text-subtle">Feels like {formatTemp(weatherData.feelsLike, tempUnit)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-hairline">
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xs font-bold uppercase tracking-wide text-subtle">High</span>
                            <span className="text-sm font-semibold">{formatTemp(weatherData.tempMax, tempUnit)}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xs font-bold uppercase tracking-wide text-subtle">Low</span>
                            <span className="text-sm font-semibold">{formatTemp(weatherData.tempMin, tempUnit)}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xs font-bold uppercase tracking-wide text-subtle">Humidity</span>
                            <span className="text-sm font-semibold">{weatherData.humidity}%</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xs font-bold uppercase tracking-wide text-subtle">Wind</span>
                            <span className="text-sm font-semibold">{Math.round(weatherData.windSpeed)} mph</span>
                        </div>
                    </div>
                    {forecast.length > 0 && (
                        <ul className="grid grid-cols-5 gap-2 pt-4 border-t border-hairline">
                            {forecast.map((day) => (
                                <li key={day.date.getTime()} className="flex flex-col items-center gap-1">
                                    <span className="text-xs font-bold uppercase tracking-wide text-subtle">{WEEKDAY_FORMATTER.format(day.date)}</span>
                                    <img className="w-10 h-10 rounded" src={buildWeatherIconUrl(day.icon)} alt={WEEKDAY_FORMATTER.format(day.date)} />
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-sm font-semibold">{formatTemp(day.tempMax, tempUnit)}</span>
                                        <span className="text-xs text-subtle">{formatTemp(day.tempMin, tempUnit)}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
