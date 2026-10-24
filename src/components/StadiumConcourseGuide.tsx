import React, { useState } from 'react';
import { 
  Beer, 
  Utensils, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Sparkles, 
  Zap, 
  Check, 
  AlertCircle, 
  HelpCircle,
  Search,
  Luggage,
  Compass,
  HeartHandshake,
  Volume2,
  DoorOpen,
  Radio,
  Eye,
  Shield,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { 
  CONCOURSE_OUTLETS, 
  TURNSTILE_ADVICE, 
  BAG_DROP_DEPOTS,
  STADIUM_LANDMARKS,
  ACCESSIBILITY_SENSORY_GUIDE
} from '../data/concourseData';
import { ConcourseOutlet } from '../types';
import { TurnstileBlockFinder } from './TurnstileBlockFinder';

interface StadiumConcourseGuideProps {
  onClose?: () => void;
}

export const StadiumConcourseGuide: React.FC<StadiumConcourseGuideProps> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState<'bars' | 'food' | 'landmarks' | 'accessibility' | 'queues' | 'bagdrop'>('bars');
  const [selectedStand, setSelectedStand] = useState<string>('All');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'vegan' | 'halal' | 'kosher' | 'glutenFree' | 'kidFriendly'>('all');
  const [onlyBottomsUp, setOnlyBottomsUp] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAccessibilityCategory, setSelectedAccessibilityCategory] = useState<'all' | 'sensory' | 'turnstile' | 'audio' | 'facilities'>('all');

  // Filter food & bar outlets
  const filteredOutlets = CONCOURSE_OUTLETS.filter(outlet => {
    // Section category
    if (activeSection === 'bars' && outlet.category !== 'beer') return false;
    if (activeSection === 'food' && outlet.category !== 'food') return false;

    // Stand
    if (selectedStand !== 'All' && outlet.stand !== selectedStand) return false;

    // Bottoms up
    if (onlyBottomsUp && !outlet.hasBottomsUpTaps) return false;

    // Dietary
    if (dietaryFilter === 'vegan' && !outlet.dietaryOptions.vegan) return false;
    if (dietaryFilter === 'halal' && !outlet.dietaryOptions.halal) return false;
    if (dietaryFilter === 'kosher' && !outlet.dietaryOptions.kosher) return false;
    if (dietaryFilter === 'glutenFree' && !outlet.dietaryOptions.glutenFree) return false;
    if (dietaryFilter === 'kidFriendly' && !outlet.dietaryOptions.kidFriendly) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = outlet.name.toLowerCase().includes(q);
      const matchBlock = outlet.nearBlocks.toLowerCase().includes(q);
      const matchBeers = outlet.beersServed?.some(b => b.toLowerCase().includes(q));
      const matchSignature = outlet.signatureItem.toLowerCase().includes(q);
      if (!matchName && !matchBlock && !matchBeers && !matchSignature) return false;
    }

    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Top Banner with Tottenham Hotspur Stadium Identity */}
      <div className="bg-gradient-to-r from-[#06142e] to-[#0a2353] p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#4ea8de]/20 border border-[#4ea8de]/30 text-xs font-semibold text-[#4ea8de] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Tottenham Hotspur Stadium Concourses
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">
              In-Stadium Concourse & Bar Guide
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Europe’s longest Goal Line Bar, Beavertown on-site microbrewery, Bottoms-Up dispense points, and dietary food locator.
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              Close
            </button>
          )}
        </div>

        {/* Quick Tabs */}
        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => { setActiveSection('bars'); setDietaryFilter('all'); }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'bars'
                ? 'bg-[#4ea8de] text-[#06142e] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Beer className="w-4 h-4" />
            Goal Line Bar & Craft Beers
          </button>
          <button
            onClick={() => { setActiveSection('landmarks'); }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'landmarks'
                ? 'bg-[#4ea8de] text-[#06142e] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Compass className="w-4 h-4" />
            Stadium Landmarks
          </button>
          <button
            onClick={() => { setActiveSection('accessibility'); }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'accessibility'
                ? 'bg-[#4ea8de] text-[#06142e] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            Accessibility & Sensory
          </button>
          <button
            onClick={() => { setActiveSection('food'); setDietaryFilter('all'); }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'food'
                ? 'bg-[#4ea8de] text-[#06142e] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Utensils className="w-4 h-4" />
            Food & Dietary Finder
          </button>
          <button
            onClick={() => setActiveSection('queues')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'queues'
                ? 'bg-[#4ea8de] text-[#06142e] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Clock className="w-4 h-4" />
            Turnstiles & Queue Beater
          </button>
          <button
            onClick={() => setActiveSection('bagdrop')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSection === 'bagdrop'
                ? 'bg-[#4ea8de] text-[#06142e] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Luggage className="w-4 h-4" />
            Bag Drop Depots
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 md:p-6 space-y-6">
        {/* Spotlight feature for Bars */}
        {activeSection === 'bars' && (
          <div className="bg-[#f4f7fb] border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Bottoms-Up Fast Pour Technology</span>
              </div>
              <p className="text-sm font-semibold text-slate-900">
                Pours fresh draught Beavertown in 3 seconds from the bottom of the cup using magnet-seal valve cups!
              </p>
              <p className="text-xs text-slate-500">
                Early Bird Discount: Save 20% on all food and drinks purchased 45+ minutes before kickoff.
              </p>
            </div>
            <button
              onClick={() => setOnlyBottomsUp(!onlyBottomsUp)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                onlyBottomsUp 
                  ? 'bg-[#0a1c3d] text-white' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${onlyBottomsUp ? 'text-[#4ea8de]' : 'text-slate-400'}`} />
              {onlyBottomsUp ? 'Showing Bottoms-Up Only' : 'Filter Bottoms-Up Only'}
            </button>
          </div>
        )}

        {/* Dietary Filters for Food Finder */}
        {activeSection === 'food' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Dietary & Allergen Preferences
              </span>
              <span className="text-xs text-slate-400">
                All stadium food is prepared to certified hygiene standards
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Cuisines' },
                { id: 'vegan', label: '🌱 Vegan / Plant-Based' },
                { id: 'halal', label: '🕌 Halal Certified' },
                { id: 'kosher', label: '✡️ Kosher (Hermolis)' },
                { id: 'glutenFree', label: '🌾 Gluten-Free' },
                { id: 'kidFriendly', label: '👶 Kid-Friendly Portions' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setDietaryFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    dietaryFilter === tab.id
                      ? 'bg-[#0a1c3d] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stand Filter & Search Bar for Bars and Food */}
        {(activeSection === 'bars' || activeSection === 'food') && (
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold text-slate-400 mr-1">Stand:</span>
              {['All', 'South Stand', 'East Stand', 'West Stand', 'North Stand'].map((stand) => (
                <button
                  key={stand}
                  onClick={() => setSelectedStand(stand)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedStand === stand
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {stand}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search beer, burger, block..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ea8de]"
              />
            </div>
          </div>
        )}

        {/* Grid of Concourse Outlets (Bars & Food) */}
        {(activeSection === 'bars' || activeSection === 'food') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOutlets.map((outlet) => (
              <div 
                key={outlet.id}
                className="border border-slate-200 hover:border-[#4ea8de]/60 rounded-xl p-4 transition-all hover:shadow-md bg-white space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-sm">{outlet.name}</h3>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                        {outlet.stand} (L{outlet.level})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#0284c7]" />
                      {outlet.nearBlocks}
                    </div>
                  </div>

                  {/* Queue Status Badge */}
                  <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                    outlet.queueStatus === 'low' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : outlet.queueStatus === 'moderate'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      outlet.queueStatus === 'low' ? 'bg-emerald-500' : outlet.queueStatus === 'moderate' ? 'bg-amber-500' : 'bg-rose-500'
                    }`} />
                    {outlet.queueStatus === 'low' ? 'Fast Queue' : outlet.queueStatus === 'moderate' ? 'Mod Queue' : 'Busy'}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {outlet.description}
                </p>

                {/* Signature Highlight */}
                <div className="bg-[#f4f7fb] border border-slate-100 rounded-lg p-2.5 text-xs">
                  <span className="font-bold text-slate-800">Must-Try: </span>
                  <span className="text-slate-600">{outlet.signatureItem}</span>
                </div>

                {/* Beers Served if Available */}
                {outlet.beersServed && outlet.beersServed.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Draught Lines:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {outlet.beersServed.map((beer) => (
                        <span key={beer} className="px-2 py-0.5 rounded bg-blue-50 text-[#0a2353] text-[11px] font-semibold">
                          {beer}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dietary Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-100">
                  {outlet.hasBottomsUpTaps && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold">
                      <Zap className="w-3 h-3 text-amber-500" />
                      Bottoms-Up (3s Pour)
                    </span>
                  )}
                  {outlet.dietaryOptions.vegan && (
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                      Vegan Friendly
                    </span>
                  )}
                  {outlet.dietaryOptions.halal && (
                    <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 text-[10px] font-bold">
                      Halal Certified
                    </span>
                  )}
                  {outlet.dietaryOptions.kosher && (
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 text-[10px] font-bold">
                      Kosher (KLBD)
                    </span>
                  )}
                  {outlet.dietaryOptions.glutenFree && (
                    <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 text-[10px] font-bold">
                      Gluten-Free
                    </span>
                  )}
                  {outlet.dietaryOptions.kidFriendly && (
                    <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-800 text-[10px] font-bold">
                      Kid Portions
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stadium Landmarks Tab */}
        {activeSection === 'landmarks' && (
          <div className="space-y-6">
            <div className="bg-[#f0f4f9] border border-blue-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0284c7]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">Iconic N17 Architecture</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mt-1">Concourse Landmarks & World Firsts</h3>
                <p className="text-xs text-slate-600 mt-0.5 max-w-xl">
                  Explore Tottenham Hotspur Stadium’s record-breaking engineering — from Europe’s longest bar to the on-site craft microbrewery and sky-high roof climb.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0a1c3d] bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs shrink-0">
                <Compass className="w-4 h-4 text-[#4ea8de]" />
                <span>3 Major Landmarks</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {STADIUM_LANDMARKS.map((landmark) => (
                <div
                  key={landmark.id}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Landmark Image */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <img
                        src={landmark.photoUrl}
                        alt={landmark.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Tottenham_Hotspur_Stadium_South_Stand.jpg/1280px-Tottenham_Hotspur_Stadium_South_Stand.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#06142e]/85 backdrop-blur-xs text-[10px] font-black text-[#4ea8de] border border-[#4ea8de]/30 uppercase tracking-wider">
                          {landmark.badge}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h4 className="text-base font-black leading-tight drop-shadow-sm">{landmark.name}</h4>
                        <p className="text-[11px] text-slate-200 mt-0.5">{landmark.subtitle}</p>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 space-y-3">
                      <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs font-bold text-[#0284c7]">
                        {landmark.highlightStat}
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{landmark.location}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-xs pt-1">
                          {landmark.description}
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Highlights:</span>
                        <ul className="space-y-1 text-[11px] text-slate-600">
                          {landmark.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Timing advice footer */}
                  <div className="p-4 pt-0">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span><strong>Timing Tip: </strong>{landmark.timingAdvice}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accessibility & Sensory Guide Tab */}
        {activeSection === 'accessibility' && (
          <div className="space-y-5">
            {/* Header info */}
            <div className="bg-gradient-to-r from-emerald-900 to-[#0a2353] rounded-2xl p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  Inclusive Matchday Experience
                </div>
                <h3 className="text-lg md:text-xl font-black">Accessibility & Sensory Services</h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  Comprehensive sensory rooms, radar-key wide turnstiles (Entrances 4 & 11), quiet sanctuary rooms, and real-time audio descriptive commentary.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/20 text-xs space-y-1 shrink-0">
                <span className="text-[10px] text-emerald-300 uppercase font-bold block">Disability Liaison Team:</span>
                <p className="font-bold text-white">access@tottenhamhotspur.com</p>
                <p className="text-slate-300 text-[11px]">0208 365 5161 (Option 2)</p>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 text-xs font-bold">
              {[
                { id: 'all', label: 'All Accessibility Services' },
                { id: 'sensory', label: 'Sensory Suites' },
                { id: 'turnstile', label: 'Accessible Turnstiles (4 & 11)' },
                { id: 'facilities', label: 'Quiet Rooms & Changing Places' },
                { id: 'audio', label: 'Audio Commentary' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedAccessibilityCategory(cat.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    selectedAccessibilityCategory === cat.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Accessibility Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ACCESSIBILITY_SENSORY_GUIDE
                .filter(item => selectedAccessibilityCategory === 'all' || item.category === selectedAccessibilityCategory)
                .map((item) => (
                  <div
                    key={item.id}
                    className="border border-slate-200 rounded-2xl p-5 bg-white space-y-3.5 shadow-xs hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          {item.category === 'sensory' && <Volume2 className="w-4 h-4 text-emerald-600" />}
                          {item.category === 'turnstile' && <DoorOpen className="w-4 h-4 text-[#0284c7]" />}
                          {item.category === 'audio' && <Radio className="w-4 h-4 text-purple-600" />}
                          {item.category === 'facilities' && <HeartHandshake className="w-4 h-4 text-amber-600" />}
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base">{item.title}</h4>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase tracking-wider shrink-0 border border-emerald-200">
                        {item.badgeText}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Features & Equipment:</span>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {item.amenities.map((amenity, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-0.5">
                      <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">How to Access:</span>
                      <p>{item.accessProcedure}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Turnstiles & Queue Beater Tab */}
        {activeSection === 'queues' && (
          <div className="space-y-4">
            {/* Interactive Turnstile & Block Entrance Locator */}
            <TurnstileBlockFinder />

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <p className="font-bold text-slate-900">
                  Queue Beater Rule: Arrive 60–75 minutes prior to kickoff
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Turnstile lines peak between 35 and 10 minutes before kickoff. Entering before 2:15 PM (for a 3:00 PM KO) ensures instant entry and unlocks 20% off all concourse bars.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TURNSTILE_ADVICE.map((item) => (
                <div 
                  key={item.id}
                  className="border border-slate-200 rounded-xl p-4 bg-white space-y-2 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.stand}</h4>
                      <p className="text-xs font-semibold text-[#0284c7]">{item.blocks} • {item.gateLetter}</p>
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                      item.queueStatus === 'green'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${item.queueStatus === 'green' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      ~{item.waitMinutes} min wait
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">Pro Tip: </span>
                    {item.tip}
                  </p>
                  <div className="text-[11px] text-slate-400 font-medium">
                    Optimal arrival: {item.recommendedTime}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bag Drop Depots Tab */}
        {activeSection === 'bagdrop' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <p className="font-bold text-amber-900">
                  Strict A4 Bag Size Regulation
                </p>
                <p className="text-amber-800 leading-relaxed">
                  Only small bags no larger than A4 size (21cm x 30cm) or clear transparent plastic bags are admitted through stadium turnstiles. Large backpacks and suitcases MUST be deposited at the official bag drops below.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BAG_DROP_DEPOTS.map((depot) => (
                <div key={depot.id} className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{depot.name}</h4>
                      <p className="text-xs text-slate-500">{depot.location}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
                      {depot.price}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{depot.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#0284c7]" />
                      <span>{depot.walkMinutes} min walk from stadium turnstiles</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-semibold text-slate-700">Accepted: </span>
                    {depot.acceptedItems}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
