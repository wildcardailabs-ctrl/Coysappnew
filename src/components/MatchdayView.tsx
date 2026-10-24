import React, { useState } from 'react';
import { 
  ArrowLeft, Train, Beer, Landmark, Ticket, Clock, 
  ShoppingBag, Shield, CheckCircle, ChevronRight, MapPin, 
  Calendar, Users, Info, ExternalLink, Activity, FileText, Radio, X, UtensilsCrossed
} from 'lucide-react';
import { Fixture, Venue, TransitLineStatus, PubVenue, MatchdayTimelineItem, UserReview } from '../types';
import { TravelView } from './TravelView';
import { PubsView } from './PubsView';
import { InteractiveMatchMap } from './InteractiveMatchMap';
import { StadiumConcourseGuide } from './StadiumConcourseGuide';
import { FanWallMotm } from './FanWallMotm';
import { DEFAULT_MATCHDAY_TIMELINE } from '../data/timelineData';
import { TicketPassHubModal } from './TicketPassHubModal';
import { PreMatchMeetupModal } from './PreMatchMeetupModal';
import { CalendarSyncModal } from './CalendarSyncModal';

interface MatchdayViewProps {
  fixture: Fixture;
  venue: Venue;
  pubsList: PubVenue[];
  savedPubIds: string[];
  onToggleSavePub: (pubId: string) => void;
  transitUpdates: TransitLineStatus[];
  onNavigateToAwayGuide?: (venueId: string) => void;
  reviews: UserReview[];
  onAddReview: (review: Omit<UserReview, 'id' | 'date' | 'status'>) => void;
  initialTab?: 'overview' | 'travel' | 'pubs' | 'stadium';
}

export const MatchdayView: React.FC<MatchdayViewProps> = ({
  fixture,
  venue,
  pubsList,
  savedPubIds,
  onToggleSavePub,
  transitUpdates,
  onNavigateToAwayGuide,
  reviews,
  onAddReview,
  initialTab = 'overview'
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'travel' | 'pubs' | 'stadium'>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [showTicketsModal, setShowTicketsModal] = useState(false);
  const [showStadiumModal, setShowStadiumModal] = useState(false);
  const [showLineupsModal, setShowLineupsModal] = useState(false);
  const [showConcourseModal, setShowConcourseModal] = useState(false);
  const [showTicketPassModal, setShowTicketPassModal] = useState(false);
  const [showMeetupModal, setShowMeetupModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'travel', label: 'Travel' },
    { id: 'pubs', label: 'Pubs' },
    { id: 'stadium', label: 'Stadium' }
  ];

  const isLive = fixture.status === 'LIVE';

  return (
    <div id="matchday-screen-container" className="space-y-4 pb-16 animate-in fade-in duration-300">
      {/* Hero Match Banner in deep navy matching master visual reference */}
      <div className="relative overflow-hidden rounded-3xl bg-[#071938] text-white shadow-md border border-[#0f2a58] p-5 sm:p-6 transition-all">
        {/* Top Header Row */}
        <div className="relative flex items-center justify-between mb-3">
          <div>
            <span className="text-xs font-semibold text-[#4ea8de] block">
              {fixture.competition}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
              {isLive ? (
                <span className="inline-flex items-center gap-1.5 text-rose-400">
                  <Radio className="w-4 h-4 animate-pulse" />
                  Live Matchday
                </span>
              ) : (
                'Matchday Guide'
              )}
            </h2>
          </div>

          <span className={`px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase border ${
            fixture.isHome 
              ? 'bg-white/10 text-white border-white/15' 
              : 'bg-amber-400/20 text-amber-300 border-amber-400/30'
          }`}>
            {fixture.isHome ? 'HOME' : 'AWAY'}
          </span>
        </div>

        {/* Teams Display Row */}
        <div className="relative flex items-center justify-around py-3 px-2 sm:px-6">
          {/* Home Team */}
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="w-13 h-13 sm:w-15 sm:h-15 flex items-center justify-center p-2 rounded-2xl bg-white border border-slate-100 mb-2 shadow-md shadow-black/20">
              <img
                src={fixture.homeTeam.crest}
                alt={fixture.homeTeam.name}
                className="max-h-10 max-w-10 object-contain"
              />
            </div>
            <span className="text-sm sm:text-base font-black text-white tracking-tight">
              {fixture.homeTeam.shortName}
            </span>
            {isLive && fixture.score && (
              <span className="text-xl font-black text-white mt-1">{fixture.score.home}</span>
            )}
          </div>

          {/* Center Versus "V" */}
          <div className="px-3 flex flex-col items-center justify-center">
            {isLive ? (
              <div className="flex flex-col items-center">
                <span className="text-xl font-black text-[#4ea8de]">VS</span>
                <span className="text-[11px] font-bold text-rose-400 mt-0.5">{fixture.liveMinute}'</span>
              </div>
            ) : (
              <span className="text-xl sm:text-2xl font-black text-white/80 tracking-widest">
                V
              </span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="w-13 h-13 sm:w-15 sm:h-15 flex items-center justify-center p-2 rounded-2xl bg-white border border-slate-100 mb-2 shadow-md shadow-black/20">
              <img
                src={fixture.awayTeam.crest}
                alt={fixture.awayTeam.name}
                className="max-h-10 max-w-10 object-contain"
              />
            </div>
            <span className="text-sm sm:text-base font-black text-white tracking-tight">
              {fixture.awayTeam.shortName}
            </span>
            {isLive && fixture.score && (
              <span className="text-xl font-black text-white mt-1">{fixture.score.away}</span>
            )}
          </div>
        </div>

        {/* Date, Time & Stadium Row */}
        <div className="relative flex flex-col items-center gap-1 mt-1 pt-2 border-t border-white/10 text-center">
          <div className="flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm font-medium text-slate-200">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-white/70" />
              {fixture.date}
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-white/70" />
              {fixture.kickoffTime}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-white/70" />
            <span>{venue.name}</span>
          </div>
        </div>
      </div>

      {/* Segmented Sub-Navigation Tabs matching master design language */}
      <div className="flex items-center justify-between p-1 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-xs">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`matchday-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-2 rounded-xl text-xs font-bold text-center transition-all ${
                isSelected
                  ? 'bg-white text-[#0a1c3d] shadow-xs'
                  : 'text-slate-500 hover:text-[#0a1c3d]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-3">
          {/* Quick Action List in crisp white card */}
          <div className="divide-y divide-slate-100 rounded-2xl sm:rounded-3xl bg-white border border-slate-100 overflow-hidden shadow-xs">
            {/* Getting There */}
            <button
              id="matchday-opt-travel"
              onClick={() => setActiveTab('travel')}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 text-left transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0a1c3d] group-hover:scale-110 transition-transform">
                  <Train className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0a1c3d]">Getting There</h3>
                  <p className="text-xs text-slate-500">Trains, Tube, Buses, Parking</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Pubs & Food */}
            <button
              id="matchday-opt-pubs"
              onClick={() => setActiveTab('pubs')}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 text-left transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0a1c3d] group-hover:scale-110 transition-transform">
                  <Beer className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0a1c3d]">Pubs & Food</h3>
                  <p className="text-xs text-slate-500">Best spots near the stadium</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* The Stadium */}
            <button
              id="matchday-opt-stadium"
              onClick={() => setShowStadiumModal(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 text-left transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0a1c3d] group-hover:scale-110 transition-transform">
                  <Landmark className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0a1c3d]">The Stadium</h3>
                  <p className="text-xs text-slate-500">Entrances, map, facilities & bag policy</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Tickets & Membership */}
            <button
              id="matchday-opt-tickets"
              onClick={() => setShowTicketsModal(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 text-left transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0a1c3d] group-hover:scale-110 transition-transform">
                  <Ticket className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0a1c3d]">Tickets & Membership</h3>
                  <p className="text-xs text-slate-500">Official links and exchange info</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Matchday Timeline */}
            <button
              id="matchday-opt-timeline"
              onClick={() => setShowTimelineModal(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 text-left transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0a1c3d] group-hover:scale-110 transition-transform">
                  <Clock className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0a1c3d]">Matchday Timeline</h3>
                  <p className="text-xs text-slate-500">Plan your full schedule from home to full-time</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Team Lineups & Squad */}
            <button
              id="matchday-opt-lineups"
              onClick={() => setShowLineupsModal(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 text-left transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0a1c3d] group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0a1c3d]">Team Lineups & Squads</h3>
                  <p className="text-xs text-slate-500">Predicted and confirmed starting XI</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* In-Stadium Concourse & Bar Guide */}
            <button
              id="matchday-opt-concourse"
              onClick={() => setShowConcourseModal(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 text-left transition-colors group cursor-pointer bg-blue-50/40"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100/70 border border-blue-200 flex items-center justify-center text-[#0284c7] group-hover:scale-110 transition-transform">
                  <UtensilsCrossed className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0a1c3d]">In-Stadium Concourse & Bar Guide</h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#0284c7] text-white text-[9px] font-black uppercase">
                      New
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Goal Line Bar, Beavertown beers, dietary finder & queue beater</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Spurs Digital Pass & Ticket Exchange */}
            <button
              id="matchday-opt-digital-pass"
              onClick={() => setShowTicketPassModal(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 text-left transition-colors border-b border-slate-100 group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0a1c3d] group-hover:scale-110 transition-transform">
                  <Ticket className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0a1c3d]">Digital Pass & Ticket Exchange Hub</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-200">
                      TX Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">NFC Apple/Google Wallet pass, client ref #, resale & bag policy</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Pre-Match Meetup Coordinator */}
            <button
              id="matchday-opt-group-meetup"
              onClick={() => setShowMeetupModal(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 text-left transition-colors border-b border-slate-100 group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0a1c3d] group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0a1c3d]">Where's the Mates? (Group Meetup)</h3>
                    <span className="px-2 py-0.5 rounded-full bg-sky-50 text-[#0284c7] text-[9px] font-bold border border-sky-200">
                      WhatsApp Invite
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Coordinate pre-match pub arrival & generate 1-tap group invite</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* One-Tap Calendar Sync */}
            <button
              id="matchday-opt-calendar-sync"
              onClick={() => setShowCalendarModal(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 text-left transition-colors border-b border-slate-100 group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0a1c3d] group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0a1c3d]">Sync Fixture to Phone Calendar (.ics)</h3>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[9px] font-bold">
                      Apple • Google
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Automatic kick-off notifications and broadcast channel details</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Spurs Shop */}
            <a
              id="matchday-opt-shop"
              href="https://shop.tottenhamhotspur.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 text-left transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0a1c3d] group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0a1c3d]">Spurs Shop</h3>
                  <p className="text-xs text-slate-500">Get your official matchday gear</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7]" />
            </a>
          </div>

          {/* Fan Wall & Man of the Match Community Hub */}
          <FanWallMotm
            currentMinute={isLive ? 75 : undefined}
            matchStatus={fixture.status}
            opponent={fixture.isHome ? fixture.awayTeam.name : fixture.homeTeam.name}
          />

          {/* Editorial Notes */}
          {fixture.editorialNotes && (
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
              <span className="text-[10px] font-black text-[#0284c7] uppercase tracking-wider block mb-1">
                COYS Matchday Editorial
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {fixture.editorialNotes}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: TRAVEL */}
      {activeTab === 'travel' && (
        <TravelView venue={venue} transitUpdates={transitUpdates} />
      )}

      {/* TAB 3: PUBS */}
      {activeTab === 'pubs' && (
        <PubsView
          stadiumId={venue.id}
          stadiumName={venue.name}
          pubsList={pubsList}
          savedPubIds={savedPubIds}
          onToggleSavePub={onToggleSavePub}
          reviews={reviews}
          onAddReview={onAddReview}
        />
      )}

      {/* TAB 4: STADIUM */}
      {activeTab === 'stadium' && (
        <div className="space-y-3">
          {/* Interactive Stadium Map in crisp white card */}
          <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-100 p-4 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0a1c3d]">
                Ground & Matchday Environs Map
              </h3>
              <span className="text-[10px] font-bold text-[#0284c7]">Interactive Satellite / Street Map</span>
            </div>
            <InteractiveMatchMap
              venue={venue}
              pubs={pubsList}
              heightClass="h-64 sm:h-72"
            />
          </div>

          <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-100 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#0a1c3d]">{venue.name}</h3>
                <p className="text-xs text-slate-500">{venue.address}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-[#0a1c3d]">
                Capacity: {venue.capacity.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-black text-[#0284c7] uppercase block mb-1">
                  Bag Policy
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">{venue.bagPolicy}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-black text-[#0284c7] uppercase block mb-1">
                  Turnstiles & Entry
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">{venue.turnstileInfo}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-black text-[#0284c7] uppercase block mb-1">
                Away Supporter Details
              </span>
              <p className="text-xs text-slate-600">
                <strong className="text-[#0a1c3d]">Section:</strong> {venue.awaySection}
              </p>
              <p className="text-xs text-slate-600 mt-1">
                <strong className="text-[#0a1c3d]">Entrances:</strong> {venue.awayEntrance}
              </p>
            </div>

            <a
              href={venue.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#071938] hover:bg-[#0d2654] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <span>Official Stadium Guide Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* MATCHDAY TIMELINE MODAL */}
      {showTimelineModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-black text-[#0a1c3d]">Matchday Schedule & Timeline</h3>
                <p className="text-xs text-slate-500">Official stadium times & fan recommendations</p>
              </div>
              <button
                onClick={() => setShowTimelineModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-4 pr-1">
              {DEFAULT_MATCHDAY_TIMELINE.map((item) => (
                <div key={item.id} className="relative pl-6 border-l-2 border-[#0284c7]/40 space-y-1">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-[#0284c7] flex items-center justify-center" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#0a1c3d] font-mono bg-slate-100 px-2 py-0.5 rounded">
                      {item.time}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        item.type === 'official'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-sky-50 text-sky-700 border border-sky-200'
                      }`}
                    >
                      {item.type === 'official' ? 'Official Info' : 'COYS Recommendation'}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-[#0a1c3d]">{item.title}</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{item.description}</p>
                  {item.location && (
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#0284c7]" />
                      {item.location}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TICKETS MODAL */}
      {showTicketsModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0a1c3d]">Tickets & Membership</h3>
              <button
                onClick={() => setShowTicketsModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">Ticket Status:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold">
                  {fixture.ticketInfo?.status || 'Sold Out'}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {fixture.ticketInfo?.notes || 'All general admission tickets for Tottenham Hotspur Stadium require One Hotspur Membership.'}
              </p>
            </div>

            <div className="space-y-2">
              <a
                href="https://www.tottenhamhotspur.com/tickets/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#4ea8de] hover:bg-[#38bdf8] text-[#071938] font-black text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <span>Spurs Official Ticket Exchange</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://www.tottenhamhotspur.com/the-club/membership/one-hotspur/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0a1c3d] font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Join One Hotspur Membership</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* LINEUPS MODAL */}
      {showLineupsModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-base font-black text-[#0a1c3d]">Starting Lineups</h3>
                <p className="text-xs text-slate-500">Matchday squad announcements</p>
              </div>
              <button
                onClick={() => setShowLineupsModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-4">
              {/* Home Team Squad */}
              <div>
                <h4 className="text-xs font-black text-[#0284c7] uppercase tracking-wider mb-2">
                  {fixture.homeTeam.name}
                </h4>
                <div className="grid grid-cols-1 gap-1.5">
                  {fixture.homeLineup?.map((p) => (
                    <div key={p.number} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 text-center font-mono font-bold text-[#0284c7]">{p.number}</span>
                        <span className="font-bold text-[#0a1c3d]">{p.name} {p.isCaptain && '(C)'}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500">{p.position}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Away Team Squad */}
              <div>
                <h4 className="text-xs font-black text-rose-600 uppercase tracking-wider mb-2">
                  {fixture.awayTeam.name}
                </h4>
                <div className="grid grid-cols-1 gap-1.5">
                  {fixture.awayLineup?.map((p) => (
                    <div key={p.number} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 text-center font-mono font-bold text-rose-600">{p.number}</span>
                        <span className="font-bold text-[#0a1c3d]">{p.name}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500">{p.position}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONCOURSE & BAR GUIDE MODAL */}
      {showConcourseModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h3 className="text-base font-black text-[#0a1c3d]">In-Stadium Concourse & Bar Guide</h3>
                <p className="text-xs text-slate-500">Tottenham Hotspur Stadium concourse navigator</p>
              </div>
              <button
                onClick={() => setShowConcourseModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto">
              <StadiumConcourseGuide />
            </div>
          </div>
        </div>
      )}

      {/* TICKET PASS & EXCHANGE MODAL */}
      <TicketPassHubModal
        isOpen={showTicketPassModal}
        onClose={() => setShowTicketPassModal(false)}
        fixture={fixture}
        clientRefNumber="7482910"
      />

      {/* PRE-MATCH MEETUP MODAL */}
      <PreMatchMeetupModal
        isOpen={showMeetupModal}
        onClose={() => setShowMeetupModal(false)}
        pubs={pubsList}
      />

      {/* CALENDAR SYNC MODAL */}
      <CalendarSyncModal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        fixtures={[fixture]}
        nextFixture={fixture}
      />
    </div>
  );
};
