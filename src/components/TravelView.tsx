import React, { useState } from 'react';
import { 
  ArrowLeft, Train, Navigation, AlertCircle, CheckCircle2, 
  Clock, MapPin, ExternalLink, Car, Bus, Footprints, Compass 
} from 'lucide-react';
import { Venue, TransitLineStatus, PubVenue } from '../types';
import { TransportService } from '../services/transportApi';
import { InteractiveMatchMap } from './InteractiveMatchMap';
import { PUBS_DATABASE } from '../data/pubsData';
import { StationEgressMeter } from './StationEgressMeter';

interface TravelViewProps {
  venue: Venue;
  onBack?: () => void;
  transitUpdates: TransitLineStatus[];
  onSelectPub?: (pub: PubVenue) => void;
}

export const TravelView: React.FC<TravelViewProps> = ({ venue, onBack, transitUpdates, onSelectPub }) => {
  const [selectedMode, setSelectedMode] = useState<'train' | 'tube' | 'bus' | 'car' | 'coach'>('train');
  const [originInput, setOriginInput] = useState('Central London (Kings Cross / Liverpool St)');
  const [calculatedRoute, setCalculatedRoute] = useState(() => 
    TransportService.calculateRoute(originInput, venue.coordinates, venue.name)
  );

  const relevantPubs = PUBS_DATABASE.filter(p => p.stadiumId === venue.id);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!originInput.trim()) return;
    const route = TransportService.calculateRoute(originInput, venue.coordinates, venue.name);
    setCalculatedRoute(route);
  };

  return (
    <div id="travel-view-container" className="space-y-4 pb-12 animate-in fade-in duration-300">
      {/* View Header */}
      <div className="flex items-center justify-between">
        {onBack ? (
          <button
            id="travel-back-btn"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0284c7] hover:text-sky-700 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}
        <h2 className="text-base sm:text-lg font-bold text-[#0a1c3d] tracking-tight">
          Getting To {venue.name}
        </h2>
        <div className="w-10" />
      </div>

      {/* Mode Selector Tabs in master segmented style */}
      <div className="flex items-center justify-between p-1 rounded-2xl bg-slate-100 border border-slate-200/80 overflow-x-auto scrollbar-none shadow-xs">
        {[
          { id: 'train', label: 'Train', icon: Train },
          { id: 'tube', label: 'Tube', icon: Navigation },
          { id: 'bus', label: 'Bus', icon: Bus },
          { id: 'car', label: 'Car', icon: Car },
          { id: 'coach', label: 'Coach', icon: Footprints }
        ].map((mode) => {
          const Icon = mode.icon;
          const isSelected = selectedMode === mode.id;
          return (
            <button
              key={mode.id}
              id={`travel-mode-${mode.id}`}
              onClick={() => setSelectedMode(mode.id as any)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white text-[#0a1c3d] shadow-xs'
                  : 'text-slate-500 hover:text-[#0a1c3d]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* Live Interactive Map with Leaflet in clean white card */}
      <div className="space-y-2 rounded-2xl sm:rounded-3xl bg-white border border-slate-100 p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0a1c3d]">
            <Compass className="w-4 h-4 text-[#0284c7]" />
            <span>Live Matchday Map</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Real-time GPS
          </span>
        </div>
        <InteractiveMatchMap
          venue={venue}
          pubs={relevantPubs}
          onSelectPub={onSelectPub}
          heightClass="h-72 sm:h-80"
        />
      </div>

      {/* Nearest Stations & Walking Routes Card in crisp white */}
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-100 p-4 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Nearest Stations & Walking Routes
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {venue.nearestStations.map((station, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0a1c3d]">
                  <Train className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0a1c3d]">{station.name}</h4>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {station.lines[0]}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#0284c7] block">
                  {station.walkTime}
                </span>
                <span className="text-[9px] text-slate-400">
                  {station.distance}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Station Queue & Egress Wait-Time Meter */}
      <StationEgressMeter stadiumName={venue.name} />

      {/* Live Travel Updates (TfL / National Rail) */}
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-100 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#0a1c3d] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live TfL & Rail Travel Status
          </h3>
          <span className="text-[10px] text-slate-400 font-medium">Official Feeds</span>
        </div>

        <div className="divide-y divide-slate-100">
          {transitUpdates.map((item) => (
            <div key={item.id} className="py-2.5 flex items-center justify-between first:pt-0 last:pb-0">
              <div className="flex items-center gap-2.5">
                {item.status === 'Good service' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                )}
                <div>
                  <span className="text-xs font-bold text-[#0a1c3d] block">{item.name}</span>
                  {item.reason && (
                    <p className="text-[10px] text-amber-700 line-clamp-1">{item.reason}</p>
                  )}
                </div>
              </div>

              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  item.status === 'Good service'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Journey Planner Form & Route Output */}
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-100 p-4 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#0a1c3d] mb-2">
          Calculate Your Route
        </h3>

        <form onSubmit={handleCalculate} className="space-y-3">
          <div>
            <label className="text-[10px] font-bold text-slate-500 block mb-1">
              Starting Location / Station
            </label>
            <div className="flex items-center gap-2">
              <input
                id="travel-origin-input"
                type="text"
                value={originInput}
                onChange={(e) => setOriginInput(e.target.value)}
                placeholder="e.g. London Kings Cross, Euston, Stansted Airport"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] focus:bg-white transition-all shadow-xs"
              />
              <button
                id="travel-calculate-btn"
                type="submit"
                className="py-2 px-4 rounded-xl bg-[#4ea8de] hover:bg-[#38bdf8] text-[#071938] font-black text-xs transition-colors shadow-xs"
              >
                Route
              </button>
            </div>
          </div>
        </form>

        {calculatedRoute && (
          <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <div>
                <span className="text-xs font-bold text-[#0a1c3d]">{calculatedRoute.summary}</span>
                <span className="text-[10px] text-slate-500 block">{calculatedRoute.crowdLevel}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-[#0284c7] block">{calculatedRoute.duration}</span>
                <span className="text-[10px] text-slate-400">{calculatedRoute.distance}</span>
              </div>
            </div>

            {/* Turn-by-turn steps */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Turn-by-Turn Instructions
              </span>
              {calculatedRoute.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-700 flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* Direct Google Maps Navigation Link */}
            <div className="pt-2 border-t border-slate-200/80 flex gap-2">
              <a
                id="travel-turn-by-turn-google-maps"
                href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originInput)}&destination=${encodeURIComponent(venue.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-[#4ea8de] text-[#071938] font-black text-xs flex items-center justify-center gap-1.5 hover:bg-[#38bdf8] transition-colors shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
