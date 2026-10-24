import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherWidgetProps {
  weather: WeatherData | null;
  loading?: boolean;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather, loading }) => {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white border border-slate-100 p-3.5 flex items-center justify-center animate-pulse text-xs text-slate-400 shadow-xs">
        Loading matchday weather...
      </div>
    );
  }

  if (!weather || !weather.isAvailable) {
    return (
      <div className="rounded-2xl bg-white border border-slate-100 p-3.5 flex items-center justify-between text-xs text-slate-500 shadow-xs">
        <span className="font-semibold text-[#0a1c3d]">Matchday Weather</span>
        <span className="text-slate-400 italic">Forecast updates near kickoff</span>
      </div>
    );
  }

  const getConditionIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes('sun') || c.includes('clear')) return <Sun className="w-5 h-5 text-amber-500" />;
    if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return <CloudRain className="w-5 h-5 text-sky-500" />;
    return <Cloud className="w-5 h-5 text-slate-400" />;
  };

  return (
    <div 
      id="matchday-weather-widget"
      className="rounded-2xl bg-white border border-slate-100 p-3.5 flex items-center justify-between shadow-xs transition-all"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
          {getConditionIcon(weather.condition)}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-black text-[#0a1c3d]">{weather.tempCelsius}°C</span>
            <span className="text-xs text-slate-600 font-medium">• {weather.condition}</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            {weather.stadiumName}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-right">
        <div className="flex flex-col items-end text-[11px] text-slate-600 font-medium">
          <div className="flex items-center gap-1 text-sky-700">
            <Droplets className="w-3.5 h-3.5 text-sky-500" />
            <span>{weather.rainProbability}% rain</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-[10px]">
            <Wind className="w-3 h-3" />
            <span>{weather.windSpeedMph} mph</span>
          </div>
        </div>
      </div>
    </div>
  );
};
