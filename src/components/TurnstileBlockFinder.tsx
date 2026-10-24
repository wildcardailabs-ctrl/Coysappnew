import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Beer, 
  Utensils, 
  Accessibility, 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { STADIUM_BLOCK_DATABASE, lookupBlock, BlockMapping } from '../data/turnstileData';

interface TurnstileBlockFinderProps {
  onSelectOutletName?: (name: string) => void;
}

export const TurnstileBlockFinder: React.FC<TurnstileBlockFinderProps> = ({ onSelectOutletName }) => {
  const [inputVal, setInputVal] = useState('254');
  const [selectedBlock, setSelectedBlock] = useState<BlockMapping>(() => lookupBlock('254')!);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const result = lookupBlock(inputVal);
    if (result) setSelectedBlock(result);
  };

  const handleQuickSelect = (blockNum: string) => {
    setInputVal(blockNum);
    const result = lookupBlock(blockNum);
    if (result) setSelectedBlock(result);
  };

  const popularBlocks = ['254', '248', '102', '110', '114', '451', '522'];

  return (
    <div id="turnstile-block-finder" className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-[#0a1c3d] tracking-tight">
              Turnstile & Block Entrance Locator
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-sky-50 text-[#0284c7] text-[10px] font-bold border border-sky-200">
              Interactive
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Check your ticket block to find the exact entrance gates, step-free access, and closest pints
          </p>
        </div>
      </div>

      {/* Input Form & Quick Chips */}
      <div className="space-y-2.5">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="turnstile-block-input"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Enter Block (e.g. 254, 102, 114)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0a1c3d] placeholder-slate-400 focus:outline-none focus:border-[#0284c7] focus:bg-white transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[#0a1c3d] hover:bg-[#0284c7] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            Locate Gate
          </button>
        </form>

        {/* Quick Block Selection Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-bold text-slate-400 shrink-0 uppercase tracking-wider">Quick:</span>
          {popularBlocks.map((b) => (
            <button
              key={b}
              onClick={() => handleQuickSelect(b)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedBlock.blockNumber === b 
                  ? 'bg-[#0a1c3d] text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Block {b}
            </button>
          ))}
        </div>
      </div>

      {/* Block Result Card */}
      {selectedBlock && (
        <div className="rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50/50 via-white to-slate-50 p-4 space-y-3.5">
          {/* Header Row: Block & Turnstile Gate */}
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0284c7] block">
                {selectedBlock.standName} • {selectedBlock.tier}
              </span>
              <h4 className="text-base sm:text-lg font-black text-[#0a1c3d] tracking-tight">
                Block {selectedBlock.blockNumber}
              </h4>
              <p className="text-xs font-bold text-slate-700 mt-0.5">
                {selectedBlock.turnstileGates}
              </p>
            </div>

            {/* Queue Badge */}
            <div className="text-right shrink-0">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                selectedBlock.queueStatus === 'low' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : selectedBlock.queueStatus === 'moderate'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                <Clock className="w-3 h-3" />
                ~{selectedBlock.estimatedWaitMins}m wait
              </span>
              <span className="text-[10px] text-slate-400 block mt-1 font-medium">
                Aim for {selectedBlock.recommendedEntryTime}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            {/* Approach Route */}
            <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[11px]">
                <Compass className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Approach Route</span>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                {selectedBlock.approachRoute}
              </p>
            </div>

            {/* Step-free Access */}
            <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[11px]">
                <Accessibility className="w-3.5 h-3.5 text-emerald-600" />
                <span>Step-Free & Accessible Gate</span>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                {selectedBlock.stepFreeGate}
              </p>
            </div>

            {/* Nearest Bar */}
            <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[11px]">
                <Beer className="w-3.5 h-3.5 text-amber-500" />
                <span>Nearest Pints</span>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                {selectedBlock.nearestBar}
              </p>
            </div>

            {/* Nearest Food */}
            <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[11px]">
                <Utensils className="w-3.5 h-3.5 text-rose-500" />
                <span>Closest Food</span>
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                {selectedBlock.nearestFood}
              </p>
            </div>
          </div>

          {/* Stewards Tip Box */}
          <div className="p-3 rounded-lg bg-sky-50/80 border border-sky-200/70 flex items-start gap-2.5 text-xs text-sky-900">
            <ShieldCheck className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Matchday Pro-Tip: </span>
              <span className="text-sky-800">{selectedBlock.tips}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
