import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Bus, 
  Train, 
  Calculator, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MapPin, 
  ExternalLink,
  Info,
  ChevronRight,
  Sparkles,
  Star,
  Check,
  Users,
  AlertOctagon
} from 'lucide-react';
import { 
  AWAY_PUB_SAFETY_DIRECTORY, 
  OFFICIAL_COACH_SERVICES, 
  LOYALTY_POINTS_CUTOFFS,
  RAIL_DISRUPTIONS_DATA,
  PREMIER_LEAGUE_AWAY_ALLOTMENTS
} from '../data/awaySafetyData';
import { AwayPubSafetyGuide, LoyaltyPointsCutoffTier } from '../types';

interface AwaySurvivalGuideProps {
  currentGroundId?: string;
  onClose?: () => void;
}

export const AwaySurvivalGuide: React.FC<AwaySurvivalGuideProps> = ({ 
  currentGroundId,
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'pubs' | 'travel' | 'allotments' | 'loyalty'>('pubs');
  const [selectedStadiumFilter, setSelectedStadiumFilter] = useState<string>(
    currentGroundId || 'all'
  );
  const [safetyFilter, setSafetyFilter] = useState<'all' | 'away-friendly' | 'neutral-strict' | 'home-only'>('all');
  const [selectedTerminal, setSelectedTerminal] = useState<string>('all');

  // Loyalty Calculator State
  const [userLoyaltyPoints, setUserLoyaltyPoints] = useState<number>(290);
  const [selectedCutoffFixture, setSelectedCutoffFixture] = useState<LoyaltyPointsCutoffTier>(
    LOYALTY_POINTS_CUTOFFS[0]
  );

  // Filtered pubs
  const filteredPubs = AWAY_PUB_SAFETY_DIRECTORY.filter(pub => {
    if (selectedStadiumFilter !== 'all' && pub.stadiumId !== selectedStadiumFilter) return false;
    if (safetyFilter !== 'all' && pub.safetyClass !== safetyFilter) return false;
    return true;
  });

  // Calculate user's likelihood for the selected away match
  const getLikelihood = (userPts: number, cutoff: number) => {
    if (userPts >= cutoff) {
      return { status: 'Guaranteed Ticket', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', icon: CheckCircle2, probability: '100%' };
    } else if (userPts >= cutoff - 40) {
      return { status: 'High Chance (Ballot / Drop)', color: 'text-blue-700 bg-blue-50 border-blue-200', icon: CheckCircle2, probability: '~75%' };
    } else if (userPts >= cutoff - 90) {
      return { status: '50/50 Chance (Check Returns)', color: 'text-amber-700 bg-amber-50 border-amber-200', icon: AlertTriangle, probability: '~40%' };
    } else {
      return { status: 'Very Unlikely to Drop', color: 'text-rose-700 bg-rose-50 border-rose-200', icon: XCircle, probability: '<10%' };
    }
  };

  const likelihood = getLikelihood(userLoyaltyPoints, selectedCutoffFixture.typicalCutoffPoints);
  const LikelihoodIcon = likelihood.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-[#06142e] via-[#0a1c3d] to-[#12284c] p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-xs font-semibold text-rose-300 uppercase tracking-wider mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              Away Section Survival Guide
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">
              Away Day Safety, Travel & Loyalty
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Verified away pubs intelligence, coach vs. rail connections, and One Hotspur loyalty points cutoffs.
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

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => setActiveTab('pubs')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'pubs'
                ? 'bg-[#4ea8de] text-[#06142e] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Strict Away-Friendly Pubs
          </button>
          <button
            onClick={() => setActiveTab('travel')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'travel'
                ? 'bg-[#4ea8de] text-[#06142e] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Train className="w-4 h-4" />
            National Rail & Coach Disruptions
          </button>
          <button
            onClick={() => setActiveTab('allotments')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'allotments'
                ? 'bg-[#4ea8de] text-[#06142e] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Users className="w-4 h-4" />
            Away Allotments & Safe Standing
          </button>
          <button
            onClick={() => setActiveTab('loyalty')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'loyalty'
                ? 'bg-[#4ea8de] text-[#06142e] shadow-sm'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Calculator className="w-4 h-4" />
            Loyalty Points Estimator
          </button>
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* TAB 1: STRICT AWAY-FRIENDLY PUBS */}
        {activeTab === 'pubs' && (
          <div className="space-y-4">
            {/* Safety Legend Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-emerald-900">Strictly Away Friendly</p>
                  <p className="text-emerald-700">Colours welcome; away fans congregate safely with dedicated door security.</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-amber-900">Neutral / Strictly No Colours</p>
                  <p className="text-amber-700">Keep coats zipped and team colours covered; ticket checks may apply.</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-rose-900">Home Fans Only (Danger Zone)</p>
                  <p className="text-rose-700">Traditional home territory; do NOT attempt entry in away shirts.</p>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-slate-400">Ground:</span>
                {[
                  { id: 'all', label: 'All Grounds' },
                  { id: 'old-trafford', label: 'Old Trafford' },
                  { id: 'stamford-bridge', label: 'Stamford Bridge' },
                  { id: 'st-james-park', label: "St James' Park" },
                  { id: 'anfield', label: 'Anfield' }
                ].map((stadium) => (
                  <button
                    key={stadium.id}
                    onClick={() => setSelectedStadiumFilter(stadium.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      selectedStadiumFilter === stadium.id
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {stadium.label}
                  </button>
                ))}
              </div>

              {/* Safety Level Filter */}
              <div className="flex items-center gap-1">
                {(['all', 'away-friendly', 'neutral-strict', 'home-only'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSafetyFilter(level)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      safetyFilter === level
                        ? 'bg-[#0284c7] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {level === 'all' ? 'All Pubs' : level === 'away-friendly' ? 'Away Only' : level === 'neutral-strict' ? 'Neutral' : 'Home Only'}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Pubs with Safety Intel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPubs.map((pub) => {
                const isFriendly = pub.safetyClass === 'away-friendly';
                const isNeutral = pub.safetyClass === 'neutral-strict';
                const isHome = pub.safetyClass === 'home-only';

                return (
                  <div
                    key={pub.id}
                    className={`border rounded-xl p-4 transition-all space-y-3 ${
                      isFriendly 
                        ? 'border-emerald-200 bg-white hover:border-emerald-400' 
                        : isNeutral 
                        ? 'border-amber-200 bg-white hover:border-amber-400' 
                        : 'border-rose-200 bg-rose-50/40 hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{pub.pubName}</h4>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#0284c7]" />
                          <span>{pub.distanceToTurnstiles} • {pub.walkTime}</span>
                        </div>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        isFriendly 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : isNeutral 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isFriendly ? 'Colours Welcome' : isNeutral ? 'No Colours' : 'Home Only'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pub.advisoryNote}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Police Presence: <strong className="text-slate-700">{pub.policePresence}</strong></span>
                      <span>Ticket Check: <strong className="text-slate-700">{pub.ticketCheckRequired ? 'Enforced' : 'None'}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: OFFICIAL COACHES VS RAIL TRAVEL */}
        {activeTab === 'travel' && (
          <div className="space-y-6">
            {/* National Rail Weekend Engineering Work & Disruption Hub */}
            <div className="bg-[#f0f4f9] border border-blue-100 rounded-2xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">Live Transit Intelligence</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">National Rail Matchday Disruptions</h3>
                  <p className="text-xs text-slate-600 mt-0.5 max-w-xl">
                    Crucial weekend engineering notices for major London terminals serving Premier League away fixtures.
                  </p>
                </div>

                {/* Terminal Filter */}
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold shrink-0">
                  {['all', 'London Euston', 'London Kings Cross', 'London St Pancras'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSelectedTerminal(term)}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        selectedTerminal === term
                          ? 'bg-[#0a2353] text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {term === 'all' ? 'All Terminals' : term.replace('London ', '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Disruption Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {RAIL_DISRUPTIONS_DATA
                  .filter(notice => selectedTerminal === 'all' || notice.terminal === selectedTerminal)
                  .map((notice) => (
                    <div
                      key={notice.id}
                      className="border border-slate-200 rounded-xl p-4 bg-white space-y-3 shadow-2xs flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{notice.operator}</span>
                            <h4 className="font-bold text-slate-900 text-sm">{notice.terminal}</h4>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            notice.status === 'Critical Work'
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : notice.status === 'Moderate Delays'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}>
                            {notice.status}
                          </span>
                        </div>

                        <div className="text-xs text-[#0284c7] font-semibold">
                          {notice.affectedCorridor}
                        </div>

                        <div className="text-[11px] text-slate-500">
                          <span className="font-medium text-slate-700">Affected Fixtures: </span>
                          {notice.primaryDestinations.join(' • ')}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          {notice.impactSummary}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                        <div className="text-slate-700">
                          <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">Pro Away Advice:</span>
                          <p className="text-[11px] text-slate-600 mt-0.5">{notice.proTravelAdvice}</p>
                        </div>
                        <div className="text-[11px] text-[#0284c7] font-semibold bg-blue-50/70 p-2 rounded-lg">
                          Alt: {notice.alternativeRoute}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Official Club Coaches Box */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                <div className="flex items-center gap-2 text-[#0284c7]">
                  <Bus className="w-5 h-5" />
                  <h3 className="font-bold text-slate-900 text-sm">THFC Official Away Travel Coaches</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct transport from Tottenham Hotspur Stadium right into the secured away coach park at the visiting stadium. Stewarded, alcohol-free, and ideal for long away journeys.
                </p>

                <div className="bg-[#f4f7fb] rounded-xl p-3.5 space-y-2 text-xs text-slate-700 border border-slate-100">
                  <div className="flex items-center justify-between font-semibold">
                    <span>Main Departure Point:</span>
                    <span className="text-[#0a1c3d]">Lilywhite House / Sainsbury’s Car Park</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Northumberland Park Hub:</span>
                    <span>High Road loading bays</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Drop-Off Location:</span>
                    <span className="text-emerald-700 font-semibold">Inside Visiting Stadium Police Cordon</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Coach Services:</span>
                  {OFFICIAL_COACH_SERVICES.map((coach) => (
                    <div key={coach.matchId} className="border border-slate-100 rounded-lg p-3 bg-slate-50 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">{coach.opponent}</span>
                        <span className="text-xs font-bold text-[#0284c7]">{coach.pricePerSeat}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Departs {coach.departureTime}</span>
                        <span>•</span>
                        <span>{coach.serviceStationStop}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* London Derbies & Rail Travel Controls */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
                <div className="flex items-center gap-2 text-[#0a1c3d]">
                  <Train className="w-5 h-5 text-[#0284c7]" />
                  <h3 className="font-bold text-slate-900 text-sm">London Derby Rail & Tube Crowd Controls</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Metropolitan Police & British Transport Police implement strict crowd management routes on London derby matchdays.
                </p>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg border border-blue-100 bg-blue-50/50 space-y-1">
                    <p className="font-bold text-slate-900">Seven Sisters Underground Management</p>
                    <p className="text-slate-600">
                      Post-match, queue pens outside Seven Sisters separate Victoria Line northbound and southbound passengers. Have contactless ready to tap through barriers.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-purple-100 bg-purple-50/50 space-y-1">
                    <p className="font-bold text-slate-900">London Stadium & Stratford Transit Hub</p>
                    <p className="text-slate-600">
                      Away supporters are directed through Queen Elizabeth Olympic Park towards <strong>Stratford International</strong> or Hackney Wick rather than Stratford Regional main entrance to bypass heavy queues.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                    <p className="font-bold text-slate-900">Stamford Bridge (Fulham Broadway)</p>
                    <p className="text-slate-600">
                      District Line platforms at Fulham Broadway are often closed immediately post-match for 30 minutes. Walking 15 mins to West Brompton or Earl’s Court avoids the queue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AWAY ALLOTMENTS & SAFE STANDING */}
        {activeTab === 'allotments' && (
          <div className="space-y-6">
            {/* Explainer banner */}
            <div className="bg-[#f0f4f9] border border-blue-100 rounded-2xl p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">SGSA Licensed Standing</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">Away Allocations & Safe Standing Directory</h3>
                  <p className="text-xs text-slate-600 mt-0.5 max-w-xl">
                    Premier League rules guarantee visiting supporters up to 3,000 tickets (or 10% for stadiums under 30,000 capacity). Domestic cup ties mandate up to 15% (up to 6,000+ seats).
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 text-xs shrink-0">
                  <div className="text-center px-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Standard PL</span>
                    <span className="font-black text-slate-900 text-sm">3,000</span>
                  </div>
                  <div className="w-px h-8 bg-slate-200" />
                  <div className="text-center px-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">FA Cup</span>
                    <span className="font-black text-emerald-600 text-sm">Up to 6,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grounds Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PREMIER_LEAGUE_AWAY_ALLOTMENTS.map((ground) => (
                <div
                  key={ground.id}
                  className="border border-slate-200 rounded-2xl p-5 bg-white space-y-4 shadow-2xs hover:border-blue-300 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-slate-900 text-base">{ground.stadiumName}</h4>
                          <span className="text-xs text-slate-500 font-medium">({ground.club})</span>
                        </div>
                        <p className="text-xs text-slate-500">{ground.city} • {ground.standName}</p>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0 border ${
                        ground.safeStandingAvailable
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {ground.safeStandingAvailable ? 'Safe Standing Rails' : 'Seated Only'}
                      </span>
                    </div>

                    {/* Stats pills */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">PL Tickets</span>
                        <span className="font-bold text-slate-900">{ground.standardPLAllocation.toLocaleString()}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">Cup Allocation</span>
                        <span className="font-bold text-[#0284c7]">{ground.cupAllocation.toLocaleString()}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase">Away Noise</span>
                        <div className="flex items-center justify-center gap-0.5 font-bold text-amber-600">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{ground.atmosphereRating}/5</span>
                        </div>
                      </div>
                    </div>

                    {/* Safe Standing Section info */}
                    <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs space-y-1">
                      <div className="font-bold text-[#0a2353] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Standing Section Details</span>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {ground.safeStandingSection}
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-medium">Turnstiles:</span>
                        <span className="font-bold text-slate-800">{ground.turnstileGate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-medium">Nearest Transit:</span>
                        <span className="font-semibold text-[#0284c7]">{ground.nearestTransit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Away Pro Tip:</span>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{ground.keyAdvice}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ONE HOTSPUR LOYALTY POINTS ESTIMATOR */}
        {activeTab === 'loyalty' && (
          <div className="space-y-6">
            <div className="bg-[#f4f7fb] border border-slate-200 rounded-2xl p-5 md:p-6 space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#0284c7]" />
                    One Hotspur Away Loyalty Points Calculator
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Enter your current loyalty points to see your historical cutoff probability for high-demand away fixtures.
                  </p>
                </div>

                {/* User Points Input Slider & Number Box */}
                <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-slate-500">Your Loyalty Points:</span>
                  <input
                    type="number"
                    min="0"
                    max="650"
                    value={userLoyaltyPoints}
                    onChange={(e) => setUserLoyaltyPoints(Number(e.target.value) || 0)}
                    className="w-20 px-2.5 py-1 text-sm font-black text-[#0a1c3d] bg-slate-50 border border-slate-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#4ea8de]"
                  />
                  <span className="text-xs font-bold text-[#0284c7]">pts</span>
                </div>
              </div>

              {/* Slider Controller */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max="550"
                  step="5"
                  value={userLoyaltyPoints}
                  onChange={(e) => setUserLoyaltyPoints(Number(e.target.value))}
                  className="w-full accent-[#0284c7] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>0 pts (New Member)</span>
                  <span>150 pts</span>
                  <span>300 pts (Seasoned Away Fan)</span>
                  <span>450+ pts (Derby Tier)</span>
                </div>
              </div>

              {/* Fixture Selector Buttons */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Away Fixture:</span>
                <div className="flex flex-wrap gap-2">
                  {LOYALTY_POINTS_CUTOFFS.map((f) => (
                    <button
                      key={f.fixtureId}
                      onClick={() => setSelectedCutoffFixture(f)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedCutoffFixture.fixtureId === f.fixtureId
                          ? 'bg-[#0a1c3d] text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {f.opponent.split('(')[0].trim()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Comparison Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#0a1c3d] text-white">
                        {selectedCutoffFixture.tier}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        Allocation: {selectedCutoffFixture.allocationSize.toLocaleString()} tickets
                      </span>
                    </div>
                    <h4 className="text-base font-black text-slate-900 mt-1">
                      {selectedCutoffFixture.opponent}
                    </h4>
                  </div>

                  {/* Likelihood Badge */}
                  <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${likelihood.color}`}>
                    <LikelihoodIcon className="w-5 h-5 shrink-0" />
                    <div>
                      <p className="text-xs font-extrabold">{likelihood.status}</p>
                      <p className="text-[10px] font-semibold opacity-80">Estimated Success: {likelihood.probability}</p>
                    </div>
                  </div>
                </div>

                {/* Cutoff Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <span className="text-[11px] font-medium text-slate-500">Typical Cutoff</span>
                    <p className="text-lg font-black text-slate-900 mt-0.5">
                      {selectedCutoffFixture.typicalCutoffPoints} <span className="text-xs font-normal text-slate-400">pts</span>
                    </p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <span className="text-[11px] font-medium text-slate-500">Last Season Cutoff</span>
                    <p className="text-lg font-black text-slate-900 mt-0.5">
                      {selectedCutoffFixture.lastSeasonCutoff} <span className="text-xs font-normal text-slate-400">pts</span>
                    </p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <span className="text-[11px] font-medium text-slate-500">Your Points</span>
                    <p className={`text-lg font-black mt-0.5 ${
                      userLoyaltyPoints >= selectedCutoffFixture.typicalCutoffPoints ? 'text-emerald-600' : 'text-slate-900'
                    }`}>
                      {userLoyaltyPoints} <span className="text-xs font-normal text-slate-400">pts</span>
                    </p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <span className="text-[11px] font-medium text-slate-500">Difference</span>
                    <p className={`text-lg font-black mt-0.5 ${
                      userLoyaltyPoints >= selectedCutoffFixture.typicalCutoffPoints ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {userLoyaltyPoints >= selectedCutoffFixture.typicalCutoffPoints ? '+' : ''}
                      {userLoyaltyPoints - selectedCutoffFixture.typicalCutoffPoints} <span className="text-xs font-normal text-slate-400">pts</span>
                    </p>
                  </div>
                </div>

                {/* Practical Advice */}
                <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-3 text-xs text-slate-700 space-y-1">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#0284c7]" />
                    Ticketing Strategy & Advice
                  </p>
                  <p>{selectedCutoffFixture.guidance}</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    <strong>Window:</strong> {selectedCutoffFixture.seasonTicketWindow} • {selectedCutoffFixture.oneHotspurPlusWindow}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
