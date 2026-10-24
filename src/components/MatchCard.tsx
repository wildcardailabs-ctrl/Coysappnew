import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, ArrowRight, Radio } from 'lucide-react';
import { Fixture } from '../types';

interface MatchCardProps {
  fixture: Fixture;
  onViewGuide: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ fixture, onViewGuide }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    mins: number;
    secs: number;
  }>({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, fixture.kickoffTimestamp - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, mins, secs });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [fixture.kickoffTimestamp]);

  const isLive = fixture.status === 'LIVE';

  return (
    <div 
      id="home-next-match-card"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1f4a] via-[#132257] to-[#071330] p-5 sm:p-6 text-white shadow-xl shadow-[#071330]/30 border border-white/10 transition-all"
    >
      {/* Top Header Row: Centered Titles + Top Right Home/Away Pill */}
      <div className="relative flex items-center justify-center mb-4">
        <div className="text-center">
          <h2 className="text-base sm:text-lg font-black text-white tracking-tight leading-tight font-display">
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 text-rose-400">
                <Radio className="w-4 h-4 animate-pulse" />
                Live Match
              </span>
            ) : (
              'Next Match'
            )}
          </h2>
          <span className="text-xs sm:text-sm font-semibold text-[#38bdf8] block mt-0.5">
            {fixture.competition}
          </span>
        </div>

        {/* Top-Right Badge matching master reference */}
        <div className="absolute right-0 top-0">
          <span className={`px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase border ${
            fixture.isHome 
              ? 'bg-white/10 text-white border-white/15' 
              : 'bg-[#c5a059]/20 text-[#fef9c3] border-[#c5a059]/40'
          }`}>
            {fixture.isHome ? 'HOME' : 'AWAY'}
          </span>
        </div>
      </div>

      {/* Teams Row: Spurs & Opponent with clean crests and "V" */}
      <div className="relative flex items-center justify-around py-3 px-2 sm:px-6">
        {/* Home Team */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center p-2 rounded-2xl bg-white border border-slate-100 mb-2 shadow-md shadow-black/20">
            <img
              src={fixture.homeTeam.crest}
              alt={fixture.homeTeam.name}
              className="max-h-11 max-w-11 object-contain"
              loading="lazy"
            />
          </div>
          <span className="text-sm sm:text-base font-black text-white tracking-tight">
            {fixture.homeTeam.shortName}
          </span>
          {isLive && fixture.score && (
            <span className="text-2xl font-black text-white mt-1">{fixture.score.home}</span>
          )}
        </div>

        {/* Center Versus "V" */}
        <div className="px-3 flex flex-col items-center justify-center">
          {isLive ? (
            <div className="flex flex-col items-center">
              <span className="text-xl font-black text-[#4ea8de]">VS</span>
              <span className="text-[11px] font-bold text-rose-400 mt-1">{fixture.liveMinute}'</span>
            </div>
          ) : (
            <span className="text-xl sm:text-2xl font-black text-white/80 tracking-widest">
              V
            </span>
          )}
        </div>

        {/* Away Team */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center p-2 rounded-2xl bg-white border border-slate-100 mb-2 shadow-md shadow-black/20">
            <img
              src={fixture.awayTeam.crest}
              alt={fixture.awayTeam.name}
              className="max-h-11 max-w-11 object-contain"
              loading="lazy"
            />
          </div>
          <span className="text-sm sm:text-base font-black text-white tracking-tight">
            {fixture.awayTeam.shortName}
          </span>
          {isLive && fixture.score && (
            <span className="text-2xl font-black text-white mt-1">{fixture.score.away}</span>
          )}
        </div>
      </div>

      {/* Date, Time & Stadium Row */}
      <div className="relative flex flex-col items-center gap-1.5 mt-2 pt-2 text-center">
        <div className="flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm font-medium text-slate-200">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-white/70" />
            {fixture.date}
          </span>
          <span className="text-white/40">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-white/70" />
            {fixture.kickoffTime}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-white/70" />
          <span>{fixture.venue.name}</span>
        </div>
      </div>

      {/* Thin Horizontal Divider */}
      <div className="border-t border-white/10 my-4" />

      {/* 4 Countdown Timer Blocks matching master reference */}
      {!isLive && fixture.status !== 'FINISHED' && (
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3 mb-4">
          {[
            { value: String(timeLeft.days).padStart(2, '0'), label: 'DAYS' },
            { value: String(timeLeft.hours).padStart(2, '0'), label: 'HRS' },
            { value: String(timeLeft.mins).padStart(2, '0'), label: 'MINS' },
            { value: String(timeLeft.secs).padStart(2, '0'), label: 'SECS' }
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl bg-[#071533]/80 border border-white/10 text-center shadow-inner"
            >
              <span className="text-2xl sm:text-3xl font-black text-white font-mono leading-none tracking-tight">
                {item.value}
              </span>
              <span className="text-[10px] font-black text-slate-300 tracking-wider uppercase mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Primary CTA Button: VIEW MATCHDAY GUIDE → */}
      <button
        id="btn-view-matchday-guide"
        onClick={onViewGuide}
        className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#38bdf8] to-[#0284c7] hover:from-[#0284c7] hover:to-[#0369a1] text-[#071330] hover:text-white font-black text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#0284c7]/20 transition-all cursor-pointer tap-spring"
      >
        <span>VIEW MATCHDAY GUIDE</span>
        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};
