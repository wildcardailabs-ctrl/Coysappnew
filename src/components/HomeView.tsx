import React, { useState, useMemo } from 'react';
import { 
  Calendar, MapPin, ArrowRight, ChevronRight, Train, 
  Beer, Sparkles, ExternalLink, ShieldAlert, Award, RefreshCw, Radio, CheckCircle2, ChevronDown, ChevronUp,
  Ticket, ArrowUpRight, Smartphone
} from 'lucide-react';
import { Fixture, Venue, PubVenue, ArticleGuide, FanTip, WeatherData, AffiliatePartner } from '../types';
import { FootballFeedStatus } from '../services/footballApi';
import { MatchCard } from './MatchCard';
import { QuickActions } from './QuickActions';
import { WeatherWidget } from './WeatherWidget';
import { CalendarSyncModal } from './CalendarSyncModal';

interface HomeViewProps {
  nextFixture: Fixture;
  allFixtures: Fixture[];
  venue: Venue;
  weather: WeatherData | null;
  weatherLoading: boolean;
  guides: ArticleGuide[];
  fanTips: FanTip[];
  affiliates: AffiliatePartner[];
  feedStatus?: FootballFeedStatus;
  isRefreshing?: boolean;
  onRefreshFixtures?: () => void;
  onViewMatchdayGuide: () => void;
  onQuickAction: (action: 'travel' | 'pubs' | 'stadium' | 'tickets') => void;
  onSelectArticle: (article: ArticleGuide) => void;
  onSelectFixture: (fixture: Fixture) => void;
  onAffiliateClick: (partner: AffiliatePartner, page: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  nextFixture,
  allFixtures,
  venue,
  weather,
  weatherLoading,
  guides,
  fanTips,
  affiliates,
  feedStatus,
  isRefreshing,
  onRefreshFixtures,
  onViewMatchdayGuide,
  onQuickAction,
  onSelectArticle,
  onSelectFixture,
  onAffiliateClick
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [isAllExpanded, setIsAllExpanded] = useState<boolean>(false);
  const [showCalendarSyncModal, setShowCalendarSyncModal] = useState<boolean>(false);

  const upcomingOtherFixtures = useMemo(() => {
    return allFixtures.filter(f => f.id !== nextFixture.id && f.status === 'UPCOMING');
  }, [allFixtures, nextFixture.id]);

  const pastFixtures = useMemo(() => {
    return allFixtures.filter(f => f.status === 'FINISHED').sort((a, b) => b.kickoffTimestamp - a.kickoffTimestamp);
  }, [allFixtures]);

  const months = ['All', 'Oct 2026', 'Nov 2026', 'Dec 2026', 'Jan 2027', 'Feb 2027', 'Mar 2027', 'Apr 2027', 'May 2027', 'Results'];

  const displayedFixtures = useMemo(() => {
    if (selectedMonth === 'Results') {
      return pastFixtures;
    }
    if (selectedMonth === 'All') {
      return isAllExpanded ? upcomingOtherFixtures : upcomingOtherFixtures.slice(0, 6);
    }
    const [mon, yr] = selectedMonth.split(' ');
    return allFixtures.filter(f => f.date.includes(mon) && f.date.includes(yr));
  }, [selectedMonth, isAllExpanded, pastFixtures, upcomingOtherFixtures, allFixtures]);

  return (
    <div id="home-screen-view" className="space-y-4 pb-16 animate-in fade-in duration-300">
      {/* 1. Next Match Card matching master reference */}
      <MatchCard
        fixture={nextFixture}
        onViewGuide={onViewMatchdayGuide}
      />

      {/* Matchday Single-Handed Turnstile Glance Banner */}
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0b1e47] via-[#132257] to-[#071533] text-white p-3.5 sm:p-4 shadow-md border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#c5a059] shrink-0 border border-white/10">
            <Ticket className="w-5 h-5 text-[#c5a059]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#c5a059]">
                Turnstile Glance
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-400/30">
                NFC Ready
              </span>
            </div>
            <p className="text-xs font-bold text-white mt-0.5">
              South Stand • Block 254 • <span className="text-[#38bdf8]">Gates 5–11</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
              if (isIOS) window.location.href = 'shoebox://';
              else window.open('https://wallet.google.com/', '_blank');
            }}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-white text-[#0b1e47] font-black text-xs hover:bg-slate-100 tap-spring transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Launch Wallet</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#0b1e47]" />
          </button>
          <button
            onClick={() => onQuickAction('tickets')}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 tap-spring text-white font-bold text-xs transition-all border border-white/10 cursor-pointer"
          >
            Digital Pass
          </button>
        </div>
      </div>

      {/* 2. Four Quick Action Cards (Getting There, Pubs & Food, Stadium Info, Tickets) */}
      <QuickActions
        onSelectAction={onQuickAction}
      />

      {/* 3. Hero Stadium Banner Card ("TO DARE IS TO DO") matching master visual reference */}
      <div
        id="home-banner-card"
        onClick={onViewMatchdayGuide}
        className="relative overflow-hidden rounded-3xl bg-[#071938] text-white shadow-md cursor-pointer group transition-transform active:scale-[0.99]"
      >
        {/* Stadium Image Background with Dusk / Blue Lit Atmosphere */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/London_Tottenham_Hotspur_Stadium.jpg/1280px-London_Tottenham_Hotspur_Stadium.jpg"
            alt="Tottenham Hotspur Stadium"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          {/* Deep Navy Overlay matching the master screenshot */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071938]/95 via-[#071938]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071938]/80 via-transparent to-transparent" />

          {/* Banner Left Content */}
          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-none">
                TO DARE<br />IS TO DO
              </h2>
              <p className="text-xs sm:text-sm font-medium text-slate-200 mt-2">
                Home or away.<br />Always together.
              </p>
              {/* Sky Blue Accent Bar */}
              <div className="w-12 h-1.5 rounded-full bg-[#4ea8de] mt-2.5" />
            </div>

            {/* Stadium Branding Tag on Right */}
            <div className="self-end flex items-center gap-2">
              <div className="text-right hidden xs:block">
                <div className="w-4 h-4 text-white mx-auto mb-0.5">
                  <svg viewBox="0 0 100 140" fill="white" className="w-full h-full">
                    <path d="M50 10 C55 10 60 14 60 20 C60 24 57 27 55 29 C62 32 70 42 70 57 C70 72 62 85 55 92 L57 110 L50 110 L47 95 C42 92 35 85 32 75 C30 67 31 60 35 52 C37 47 42 42 45 37 C47 32 47 25 45 20 C45 14 47 10 50 10 Z" />
                    <circle cx="52" cy="122" r="14" />
                  </svg>
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-white/90 block leading-tight">
                  TOTTENHAM<br />HOTSPUR<br />STADIUM
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#4ea8de] group-hover:text-[#071938] transition-colors">
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. "Latest from COYS" matching master reference */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between px-0.5">
          <h3 className="text-base sm:text-lg font-bold text-[#0a1c3d] tracking-tight">
            Latest from COYS
          </h3>
          <button
            onClick={() => onQuickAction('stadium')}
            className="text-xs font-bold text-[#0284c7] hover:text-sky-700 flex items-center gap-1 transition-colors"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>

        {/* 2 Clean Horizontal Cards matching the screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Card 1: Matchday Guide */}
          <div
            onClick={() => {
              if (guides[0]) onSelectArticle(guides[0]);
              else onQuickAction('stadium');
            }}
            className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md hover:border-slate-200 cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Tottenham_Hotspur_Stadium_South_Stand.jpg/1280px-Tottenham_Hotspur_Stadium_South_Stand.jpg"
                  alt="Tottenham Hotspur Stadium South Stand"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
              </div>
              <div className="space-y-0.5 pr-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7] block">
                  MATCHDAY GUIDE
                </span>
                <h4 className="text-xs font-bold text-[#0a1c3d] line-clamp-2 leading-snug group-hover:text-[#0284c7] transition-colors">
                  The Complete Guide to Tottenham Hotspur Stadium
                </h4>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] flex-shrink-0 transition-colors" />
          </div>

          {/* Card 2: Spurs Pubs */}
          <div
            onClick={() => onQuickAction('pubs')}
            className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 shadow-xs hover:shadow-md hover:border-slate-200 cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=300&q=80"
                  alt="Pubs Near Stadium"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
              </div>
              <div className="space-y-0.5 pr-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7] block">
                  SPURS PUBS
                </span>
                <h4 className="text-xs font-bold text-[#0a1c3d] line-clamp-2 leading-snug group-hover:text-[#0284c7] transition-colors">
                  10 Must-Visit Pubs Near the Stadium
                </h4>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] flex-shrink-0 transition-colors" />
          </div>
        </div>
      </div>

      {/* 5. Live Matchday Weather Widget */}
      <WeatherWidget
        weather={weather}
        loading={weatherLoading}
      />

      {/* 6. Official 2026/27 Fixtures & Schedule in clean white container */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between px-0.5">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#0284c7]" />
              Official 2026/27 Fixtures
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">
              {selectedMonth === 'Results' 
                ? '5 Played Matches (Aug - Sep 2026)' 
                : `${upcomingOtherFixtures.length + 1} Confirmed Premier League Fixtures`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="home-sync-calendar-btn"
              onClick={() => setShowCalendarSyncModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#0284c7] border border-sky-200 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Sync .ics</span>
            </button>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {displayedFixtures.length} matches
            </span>
          </div>
        </div>

        {/* Horizontal month selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
          {months.map((m) => {
            const isSelected = selectedMonth === m;
            return (
              <button
                key={m}
                onClick={() => {
                  setSelectedMonth(m);
                  setIsAllExpanded(false);
                }}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#0284c7] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-[#0a1c3d] hover:bg-slate-50 border border-slate-100'
                }`}
              >
                {m === 'All' ? 'All Upcoming' : m}
              </button>
            );
          })}
        </div>

        {/* Fixtures List in Crisp White Card */}
        <div className="divide-y divide-slate-100 rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-xs">
          {displayedFixtures.map((fix) => (
            <div
              key={fix.id}
              onClick={() => onSelectFixture(fix)}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center p-1.5 shadow-xs flex-shrink-0 border border-slate-100">
                  <img
                    src={fix.isHome ? fix.awayTeam.crest : fix.homeTeam.crest}
                    alt="Opponent"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-[#0a1c3d]">
                      {fix.isHome ? `vs ${fix.awayTeam.name}` : `@ ${fix.homeTeam.name}`}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">
                      ({fix.isHome ? fix.awayTeam.code : fix.homeTeam.code})
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <span className="font-semibold text-slate-700">{fix.date}</span>
                    <span>•</span>
                    <span className="text-slate-500">{fix.venue.name}</span>
                  </span>
                </div>
              </div>

              <div className="text-right flex flex-col items-end">
                {fix.status === 'FINISHED' ? (
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {fix.score?.home} - {fix.score?.away}
                    </span>
                    <span className="text-[9px] text-slate-400 mt-0.5 uppercase font-bold">
                      FT
                    </span>
                  </div>
                ) : (
                  <>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      fix.isHome ? 'bg-slate-100 text-slate-700' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {fix.isHome ? 'Home' : 'Away Day'}
                    </span>
                    <span className="text-[11px] text-[#0a1c3d] block mt-0.5 font-mono font-bold">
                      {fix.kickoffTime}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}

          {displayedFixtures.length === 0 && (
            <div className="p-6 text-center text-slate-400 text-xs">
              No fixtures scheduled for {selectedMonth}.
            </div>
          )}
        </div>

        {/* Expand / Collapse All Upcoming toggle */}
        {selectedMonth === 'All' && upcomingOtherFixtures.length > 6 && (
          <button
            onClick={() => setIsAllExpanded(!isAllExpanded)}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-100 text-xs font-bold text-[#0284c7] flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            {isAllExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Show Less</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>View Full 2026/27 Season Schedule ({upcomingOtherFixtures.length} Matches)</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* 7. Matchday Travel & Service Affiliates in Crisp White Card */}
      <div className="p-4 rounded-2xl bg-white border border-slate-100 space-y-3 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#0284c7] block">
            Matchday Services & Travel
          </span>
          <h4 className="text-sm font-bold text-[#0a1c3d]">
            Plan Rail, Parking & Official Gear
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {affiliates.map((aff) => (
            <a
              key={aff.id}
              href={aff.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onAffiliateClick(aff, 'Home Page Grid')}
              className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 inline-block mb-1">
                  {aff.badge}
                </span>
                <h5 className="text-xs font-bold text-[#0a1c3d] group-hover:text-[#0284c7]">
                  {aff.name}
                </h5>
                <p className="text-[10px] text-slate-500 line-clamp-1">
                  {aff.headline}
                </p>
              </div>

              <div className="mt-2 text-[10px] font-bold text-[#0284c7] flex items-center gap-1">
                <span>{aff.ctaText}</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Fixture Calendar Sync Modal */}
      <CalendarSyncModal
        isOpen={showCalendarSyncModal}
        onClose={() => setShowCalendarSyncModal(false)}
        fixtures={allFixtures}
        nextFixture={nextFixture}
      />
    </div>
  );
};
