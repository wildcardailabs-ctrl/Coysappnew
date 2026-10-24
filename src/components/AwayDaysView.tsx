import React, { useState } from 'react';
import { 
  Search, MapPin, Check, CheckCircle2, ChevronRight, 
  Beer, Navigation, Shield, Compass, Star, ExternalLink, ShieldAlert 
} from 'lucide-react';
import { Venue, PubVenue } from '../types';
import { AwaySurvivalGuide } from './AwaySurvivalGuide';

interface AwayDaysViewProps {
  stadiums: Venue[];
  visitedGroundIds: string[];
  onToggleVisited: (stadiumId: string) => void;
  onSelectStadium: (stadium: Venue) => void;
}

export const AwayDaysView: React.FC<AwayDaysViewProps> = ({
  stadiums,
  visitedGroundIds,
  onToggleVisited,
  onSelectStadium
}) => {
  const [mainViewMode, setMainViewMode] = useState<'directory' | 'survival'>('directory');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStadiums = stadiums.filter((s) => {
    const isVisited = visitedGroundIds.includes(s.id);
    const matchesCategory =
      filterCategory === 'All'
        ? true
        : filterCategory === 'Visited'
        ? isVisited
        : filterCategory === 'London'
        ? s.city === 'London' && s.id !== 'tottenham-hotspur-stadium'
        : filterCategory === 'Europe'
        ? s.country !== 'England'
        : (s.league || '').toLowerCase().includes(filterCategory.toLowerCase());

    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Premier League', 'London', 'Europe', 'Visited'];

  return (
    <div id="away-days-screen" className="space-y-4 pb-16 animate-in fade-in duration-300">
      {/* Title & Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0a1c3d] tracking-tight">
            Away Days & Stadium Directory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete intelligence on away allocations, designated pubs, transport, and groundhopper tracking.
          </p>
        </div>

        {/* View Mode Toggle: Grounds Directory vs Away Section Survival */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setMainViewMode('directory')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              mainViewMode === 'directory'
                ? 'bg-white text-[#0a1c3d] shadow-xs'
                : 'text-slate-600 hover:text-[#0a1c3d]'
            }`}
          >
            Grounds Directory
          </button>
          <button
            onClick={() => setMainViewMode('survival')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              mainViewMode === 'survival'
                ? 'bg-[#0284c7] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0a1c3d]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Away Survival Guide
          </button>
        </div>
      </div>

      {/* VIEW 1: AWAY SECTION SURVIVAL GUIDE */}
      {mainViewMode === 'survival' ? (
        <AwaySurvivalGuide />
      ) : (
        <>
          {/* Search Input in clean master style */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="away-days-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stadiums, clubs, cities..."
              className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-12 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 text-xs font-semibold">
            {categories.map((cat) => {
              const isSelected = filterCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  id={`away-filter-${cat.toLowerCase()}`}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0284c7] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-[#0a1c3d] hover:bg-slate-50 border border-slate-200/80 shadow-xs'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Groundhopper Summary Banner in deep midnight navy */}
          <div className="p-4 rounded-3xl bg-[#071938] text-white flex items-center justify-between shadow-md border border-[#0f2a58]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#4ea8de]">
                <Compass className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider">
                  Groundhopper Passport
                </h3>
                <p className="text-xs text-slate-300">
                  You have ticked off <strong className="text-[#4ea8de] font-black">{visitedGroundIds.length}</strong> of {stadiums.length} grounds with Spurs
                </p>
              </div>
            </div>

            <button
              onClick={() => setMainViewMode('survival')}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#4ea8de] text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Safety & Pubs Guide</span>
            </button>
          </div>

          {/* Stadium Cards List in crisp white */}
          <div className="space-y-3">
            {filteredStadiums.map((stadium) => {
              const isVisited = visitedGroundIds.includes(stadium.id);

              return (
                <div
                  key={stadium.id}
                  id={`away-stadium-${stadium.id}`}
                  onClick={() => onSelectStadium(stadium)}
                  className="group relative rounded-2xl sm:rounded-3xl bg-white border border-slate-100 hover:border-slate-200 overflow-hidden cursor-pointer shadow-xs hover:shadow-md active:scale-[0.99] transition-all"
                >
                  {/* Card Banner */}
                  <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                    <img
                      src={stadium.image}
                      alt={stadium.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Visited Toggle Checkbox Button */}
                <button
                  id={`stadium-visited-btn-${stadium.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleVisited(stadium.id);
                  }}
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md transition-all cursor-pointer ${
                    isVisited
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/90 backdrop-blur-xs text-slate-800 hover:bg-white'
                  }`}
                >
                  {isVisited ? (
                    <>
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Visited</span>
                    </>
                  ) : (
                    <span>+ Tick Ground</span>
                  )}
                </button>

                {/* Country / City Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white border border-white/20">
                    {stadium.city}, {stadium.country}
                  </span>
                </div>

                {/* Stadium Name, Club, and Official Badge */}
                <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-end justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white leading-tight drop-shadow-sm">
                      {stadium.name}
                    </h3>
                    <span className="text-xs text-slate-200 font-medium">
                      {stadium.club}
                    </span>
                  </div>

                  {stadium.clubBadge && (
                    <div className="w-9 h-9 rounded-xl bg-white p-1.5 border border-slate-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <img
                        src={stadium.clubBadge}
                        alt={stadium.club}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-4 space-y-2.5">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block">Capacity</span>
                    <span className="font-bold text-[#0a1c3d]">{stadium.capacity.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 block">Away Allocation</span>
                    <span className="font-bold text-[#0284c7] line-clamp-1">{stadium.awaySection}</span>
                  </div>
                </div>

                {/* Designated Away Pubs Snippet */}
                {stadium.awayPubsRecommended && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <Beer className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span className="line-clamp-1">
                      <strong className="text-[#0a1c3d]">Away Pubs: </strong>
                      {stadium.awayPubsRecommended}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-bold text-[#0284c7] group-hover:underline flex items-center gap-1">
                    <span>View Complete Away Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>

                  <a
                    id={`stadium-quick-directions-${stadium.id}`}
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(stadium.name + ' ' + stadium.postcode)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-[#0a1c3d] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <Navigation className="w-3 h-3 text-[#0284c7]" />
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
        </>
      )}
    </div>
  );
};
