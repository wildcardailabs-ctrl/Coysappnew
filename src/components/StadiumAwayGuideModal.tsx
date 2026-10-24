import React from 'react';
import { 
  X, MapPin, Beer, Navigation, Shield, Users, 
  ExternalLink, Check, Clock, AlertTriangle, Train, Compass 
} from 'lucide-react';
import { Venue, PubVenue } from '../types';
import { InteractiveMatchMap } from './InteractiveMatchMap';
import { PUBS_DATABASE } from '../data/pubsData';

interface StadiumAwayGuideModalProps {
  stadium: Venue | null;
  isOpen: boolean;
  onClose: () => void;
  isVisited: boolean;
  onToggleVisited: (id: string) => void;
  onOpenTravel?: () => void;
}

export const StadiumAwayGuideModal: React.FC<StadiumAwayGuideModalProps> = ({
  stadium,
  isOpen,
  onClose,
  isVisited,
  onToggleVisited
}) => {
  if (!isOpen || !stadium) return null;

  const relevantPubs = PUBS_DATABASE.filter(p => p.stadiumId === stadium.id);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 overflow-y-auto">
      <div 
        id="stadium-away-guide-modal"
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300"
      >
        {/* Banner Hero */}
        <div className="relative h-48 sm:h-56 w-full flex-shrink-0 bg-slate-100">
          <img
            src={stadium.image}
            alt={stadium.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close Button */}
          <button
            id="stadium-modal-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center transition-all z-10 shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Visited Button */}
          <button
            id="stadium-modal-visited-btn"
            onClick={() => onToggleVisited(stadium.id)}
            className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md z-10 transition-all cursor-pointer ${
              isVisited
                ? 'bg-emerald-500 text-white'
                : 'bg-white/90 backdrop-blur-xs text-slate-800 hover:bg-white'
            }`}
          >
            {isVisited ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Visited With Spurs</span>
              </>
            ) : (
              <span>+ Mark Ground Visited</span>
            )}
          </button>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black text-[#071938] bg-[#4ea8de] px-2 py-0.5 rounded-md uppercase tracking-wider">
                AWAY DAY DIRECTORY
              </span>
              <span className="text-xs text-slate-200 font-medium">
                {stadium.city}, {stadium.country}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {stadium.clubBadge && (
                <div className="w-10 h-10 rounded-xl bg-white p-1.5 border border-slate-100 flex items-center justify-center shadow-md flex-shrink-0">
                  <img
                    src={stadium.clubBadge}
                    alt={stadium.club}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.visibility = 'hidden';
                    }}
                  />
                </div>
              )}
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                  {stadium.name}
                </h2>
                <p className="text-xs text-slate-200 font-semibold">
                  {stadium.club}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-slate-700">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-semibold block">Capacity</span>
              <span className="text-xs font-black text-[#0a1c3d]">{stadium.capacity.toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-semibold block">Opened</span>
              <span className="text-xs font-black text-[#0a1c3d]">{stadium.builtYear || stadium.openedYear}</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 font-semibold block">Distance</span>
              <span className="text-xs font-black text-[#0284c7]">{stadium.distanceFromLondon}</span>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0a1c3d] flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#0284c7]" />
                <span>Interactive Ground & Transit Map</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Live Directions</span>
            </div>
            <InteractiveMatchMap
              venue={stadium}
              pubs={relevantPubs}
              heightClass="h-56 sm:h-64"
            />
          </div>

          {/* Away Section Intelligence */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0284c7]">
              <Users className="w-4 h-4" />
              <span>Away End Allocation</span>
            </div>

            <p className="text-xs text-slate-600">
              <strong className="text-[#0a1c3d]">Stand / Seating: </strong>
              {stadium.awaySection}
            </p>

            <p className="text-xs text-slate-600">
              <strong className="text-[#0a1c3d]">Turnstiles & Gates: </strong>
              {stadium.awayEntrance}
            </p>
          </div>

          {/* Recommended Away Pubs */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
              <Beer className="w-4 h-4" />
              <span>Recommended Away Pubs & Drinking</span>
            </div>

            <p className="text-xs text-amber-900 leading-relaxed">
              {stadium.awayPubsRecommended}
            </p>

            <div className="p-2.5 rounded-xl bg-white border border-amber-200 flex items-start gap-2 text-[11px] text-amber-800">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-600 mt-0.5" />
              <span>Keep colours covered around home station pubs. Stick to recommended away fan hubs.</span>
            </div>
          </div>

          {/* Travel & Stations */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0a1c3d]">
              <Train className="w-4 h-4 text-[#0284c7]" />
              <span>Nearest Transport & Stations</span>
            </div>

            <div className="space-y-1.5">
              {stadium.nearestStations.map((st, i) => (
                <div key={i} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white border border-slate-100">
                  <span className="font-semibold text-[#0a1c3d]">{st.name} ({st.lines[0]})</span>
                  <span className="text-[#0284c7] font-bold">{st.walkTime}</span>
                </div>
              ))}
            </div>

            {stadium.transportNotes && (
              <p className="text-xs text-slate-500 pt-1">
                <strong className="text-[#0a1c3d]">Travel advice: </strong>
                {stadium.transportNotes}
              </p>
            )}
          </div>

          {/* Bag Policy & Security */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-slate-500 mb-1">
              <Shield className="w-4 h-4 text-[#0284c7]" />
              <span>Bag Policy & Security</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {stadium.bagPolicy}
            </p>
          </div>

          {/* External Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              id="stadium-google-maps-link"
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(stadium.name + ' ' + stadium.postcode)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-3 rounded-xl bg-[#4ea8de] hover:bg-[#38bdf8] text-[#071938] font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98]"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </a>

            <a
              id="stadium-official-site-link"
              href={stadium.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0a1c3d] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Official Stadium Site</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
