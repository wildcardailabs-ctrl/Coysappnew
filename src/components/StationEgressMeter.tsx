import React, { useState } from 'react';
import { 
  Train, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Footprints, 
  MapPin, 
  Compass, 
  ShieldAlert,
  Beer,
  Zap,
  Info
} from 'lucide-react';
import { STATION_EGRESS_DATABASE, StationEgressInfo } from '../data/egressData';

interface StationEgressMeterProps {
  stadiumName?: string;
}

export const StationEgressMeter: React.FC<StationEgressMeterProps> = ({
  stadiumName = 'Tottenham Hotspur Stadium'
}) => {
  const [phase, setPhase] = useState<'post-match' | 'pre-match'>('post-match');
  const [selectedStationId, setSelectedStationId] = useState<string>('white-hart-lane');

  const selectedStation = STATION_EGRESS_DATABASE.find(s => s.id === selectedStationId) || STATION_EGRESS_DATABASE[0];

  return (
    <div id="station-egress-meter" className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-[#0a1c3d] tracking-tight">
              Station Queue & Egress Wait-Time Meter
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Queue Tracker
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time bottleneck queues at White Hart Lane, Northumberland Park & Seven Sisters
          </p>
        </div>

        {/* Phase Switcher: Post-Match vs Pre-Match */}
        <div className="inline-flex p-0.5 rounded-xl bg-slate-100 border border-slate-200/80 self-start sm:self-auto">
          <button
            onClick={() => setPhase('post-match')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              phase === 'post-match'
                ? 'bg-[#0a1c3d] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0a1c3d]'
            }`}
          >
            Post-Match Egress
          </button>
          <button
            onClick={() => setPhase('pre-match')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              phase === 'pre-match'
                ? 'bg-[#0a1c3d] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0a1c3d]'
            }`}
          >
            Pre-Match Arrival
          </button>
        </div>
      </div>

      {/* Smart Advice Banner: "Concourse vs Station" */}
      {phase === 'post-match' ? (
        <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-950">
          <Beer className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-amber-900 block">
              Matchday Crowd Hack: Stay for Concourse Pints
            </span>
            <p className="text-amber-800 leading-relaxed">
              White Hart Lane queues peak for 35–45 minutes right after final whistle. Concourse bars (Goal Line Bar & Beavertown) remain open for up to 90 mins post-match with TVs showing post-game highlights. One slow post-match pint clears the queue entirely.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-sky-50/90 border border-sky-200/80 flex items-start gap-3 text-xs text-sky-950">
          <CheckCircle2 className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-sky-900 block">
              Smooth Inbound Access
            </span>
            <p className="text-sky-800 leading-relaxed">
              Arrival trains are running frequently. White Hart Lane & Northumberland Park passenger flows are fluid. Allow at least 20 mins to clear security search lines on Tottenham High Road.
            </p>
          </div>
        </div>
      )}

      {/* Station Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {STATION_EGRESS_DATABASE.map((st) => {
          const waitMins = phase === 'post-match' ? st.postMatchQueueMinutes : st.preMatchQueueMinutes;
          const totalJourneyWait = waitMins + st.walkMinutesFromStadium;
          const isSelected = selectedStationId === st.id;

          const badgeColor = waitMins > 20 
            ? 'text-rose-700 bg-rose-50 border-rose-200' 
            : waitMins > 10 
            ? 'text-amber-700 bg-amber-50 border-amber-200' 
            : 'text-emerald-700 bg-emerald-50 border-emerald-200';

          return (
            <button
              key={st.id}
              onClick={() => setSelectedStationId(st.id)}
              className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                isSelected 
                  ? 'border-[#0284c7] bg-sky-50/30 shadow-xs ring-1 ring-[#0284c7]/30' 
                  : 'border-slate-200/80 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Train className="w-4 h-4 text-[#0a1c3d]" />
                    <span className="font-bold text-xs sm:text-sm text-[#0a1c3d]">
                      {st.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                    {st.line}
                  </span>
                </div>

                {/* Live Wait Pill */}
                <div className="text-right">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black border ${badgeColor}`}>
                    <Clock className="w-3 h-3" />
                    {waitMins}m queue
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {st.walkMinutesFromStadium}m walk
                  </span>
                </div>
              </div>

              {/* Progress Meter Bar */}
              <div className="mt-3 space-y-1">
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      waitMins > 20 
                        ? 'bg-rose-500' 
                        : waitMins > 10 
                        ? 'bg-amber-500' 
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, (waitMins / 40) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>Walking: {st.walkMinutesFromStadium}m</span>
                  <span>Total delay to platform: ~{totalJourneyWait}m</span>
                </div>
              </div>

              {/* Holding Pen indicator */}
              {st.holdingPensActive && phase === 'post-match' && (
                <div className="mt-2 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 inline-flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Street holding pens active
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Station Deep-Dive */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-[#0a1c3d]">
            <Compass className="w-4 h-4 text-[#0284c7]" />
            <span>Station Strategy: {selectedStation.name}</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            {selectedStation.frequency}
          </span>
        </div>

        <p className="text-slate-700 leading-relaxed font-medium">
          {phase === 'post-match' ? selectedStation.postMatchStrategy : selectedStation.crowdAdvice}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Direct To:</span>
          {selectedStation.destinations.map((d, i) => (
            <span key={i} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 text-[10px] font-medium">
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
