import { buildWeatherIconUrl } from "../api";
import { useWeather } from "../context/WeatherContext";

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat("en-US", { weekday: "short" });

export function WeatherCard() {
    const { isLoading, error, weatherData, forecast } = useWeather();

    return (
        <div className="p-5 border border-hairline rounded-xl">
            <header className="flex flex-col gap-1">
                <span className="text-xs font-bold tracking-wide uppercase text-subtle">Weather</span>
                {weatherData && !isLoading && !error && <span className="text-md font-semibold">{weatherData.name}</span>}
            </header>
            {error && !isLoading && <p className="pt-3 text-sm text-subtle">{error}</p>}
            {isLoading && <div className="h-24 mt-3 bg-hover-bg rounded-lg animate-pulse" />}
            {weatherData && !isLoading && !error && (
                <div className="flex flex-col gap-4">
                    <div className="flex items-end justify-between pt-3">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                                <img className="w-16 h-16" src={buildWeatherIconUrl(weatherData.icon)} alt={weatherData.description} />
                                <span className="text-4xl font-semibold">{Math.round(weatherData.temp)}°</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-md font-semibold">{weatherData.description}</span>
                                <span className="text-sm text-subtle">Feels like {Math.round(weatherData.feelsLike)}°</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-hairline">
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xs font-bold uppercase tracking-wide text-subtle">High</span>
                            <span className="text-sm font-semibold">{Math.round(weatherData.tempMax)}°</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xs font-bold uppercase tracking-wide text-subtle">Low</span>
                            <span className="text-sm font-semibold">{Math.round(weatherData.tempMin)}°</span>
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
                                    <img src={buildWeatherIconUrl(day.icon)} className="w-10 h-10 rounded" alt={WEEKDAY_FORMATTER.format(day.date)} />
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-sm font-semibold">{Math.round(day.tempMax)}°</span>
                                        <span className="text-xs text-subtle">{Math.round(day.tempMin)}°</span>
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
