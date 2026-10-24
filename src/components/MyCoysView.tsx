import React, { useState } from 'react';
import { 
  User, Compass, Calendar, MapPin, Heart, Bell, 
  Settings, Check, Plus, Edit2, Shield, ExternalLink, Trash2, X,
  Trophy, Award, Star, Ticket, Camera, Sparkles, Users,
  LogIn, LogOut, ShieldCheck, RefreshCw, Info, RotateCcw
} from 'lucide-react';
import { UserProfile, PubVenue, Venue, ArticleGuide, UserAttendedMatch } from '../types';
import { INITIAL_SUPPORTER_BADGES } from '../data/badgesData';
import { LOYALTY_POINTS_CUTOFFS } from '../data/awaySafetyData';
import { TicketPassHubModal } from './TicketPassHubModal';
import { useAuth } from '../context/AuthContext';

interface MyCoysViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  pubsList: PubVenue[];
  stadiumsList: Venue[];
  guidesList: ArticleGuide[];
  onSelectPub: (pub: PubVenue) => void;
  onSelectStadium: (stadium: Venue) => void;
  onToggleVisitedGround: (stadiumId: string) => void;
}

export const MyCoysView: React.FC<MyCoysViewProps> = ({
  profile,
  onUpdateProfile,
  pubsList,
  stadiumsList,
  guidesList,
  onSelectPub,
  onSelectStadium,
  onToggleVisitedGround
}) => {
  const { 
    currentUser, 
    userProfile: fbProfile, 
    openAuthModal, 
    signOut, 
    updateProfile: updateFbProfile 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'passport' | 'cutoffs' | 'badges' | 'saved' | 'history' | 'settings'>('passport');
  const [savedSubTab, setSavedSubTab] = useState<'pubs' | 'stadiums'>('pubs');
  const [showLogMatchModal, setShowLogMatchModal] = useState(false);
  const [showTicketPassModal, setShowTicketPassModal] = useState(false);

  // Edit Profile Modal State
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editDisplayName, setEditDisplayName] = useState('');
  const [editMembershipNumber, setEditMembershipNumber] = useState('');
  const [editTier, setEditTier] = useState('One Hotspur');
  const [editHomeStand, setEditHomeStand] = useState('South Stand (Single Tier)');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Active display values prioritizing Firebase user profile
  const activeDisplayName = fbProfile?.displayName || currentUser?.displayName || profile.name;
  const activeAvatar = fbProfile?.photoURL || currentUser?.photoURL || profile.avatar;
  const activeTier = fbProfile?.tier || 'One Hotspur';
  const activeMembershipNumber = fbProfile?.membershipNumber || 'THFC-7482910';
  const activeHomeStand = fbProfile?.homeStand || profile.favoriteSection;

  const openEditProfile = () => {
    setEditDisplayName(activeDisplayName);
    setEditMembershipNumber(activeMembershipNumber);
    setEditTier(activeTier);
    setEditHomeStand(activeHomeStand);
    setShowEditProfileModal(true);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      if (currentUser) {
        await updateFbProfile({
          displayName: editDisplayName.trim(),
          membershipNumber: editMembershipNumber.trim(),
          tier: editTier,
          homeStand: editHomeStand
        });
      }
      onUpdateProfile({
        ...profile,
        name: editDisplayName.trim() || profile.name,
        favoriteSection: editHomeStand
      });
      setShowEditProfileModal(false);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleResetPassport = async () => {
    if (window.confirm('Reset all visited grounds and logged matches back to 0?')) {
      const cleanProfile: UserProfile = {
        ...profile,
        matchesAttendedCount: 0,
        awayDaysCount: 0,
        groundsVisitedCount: 0,
        visitedGrounds: [],
        attendedMatches: []
      };
      onUpdateProfile(cleanProfile);
      if (currentUser) {
        await updateFbProfile({
          matchesAttended: 0
        });
      }
    }
  };

  // New match form state with detailed seat record
  const [oppTeam, setOppTeam] = useState('');
  const [matchDate, setMatchDate] = useState('2026-09-15');
  const [matchVenue, setMatchVenue] = useState('Tottenham Hotspur Stadium');
  const [isHomeGame, setIsHomeGame] = useState(true);
  const [competition, setCompetition] = useState('Premier League');
  const [block, setBlock] = useState('Block 254');
  const [row, setRow] = useState('Row 18');
  const [seat, setSeat] = useState('Seat 104');
  const [companion, setCompanion] = useState('With mates');
  const [personalRating, setPersonalRating] = useState<number>(9);
  const [matchScore, setMatchScore] = useState('W 2-1');
  const [manOfTheMatch, setManOfTheMatch] = useState('Son Heung-min');
  const [matchPhotoUrl, setMatchPhotoUrl] = useState('https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80');
  const [matchNotes, setMatchNotes] = useState('');

  const savedPubs = pubsList.filter(p => profile.savedPubIds.includes(p.id));
  const savedStadiums = stadiumsList.filter(s => profile.savedVenueIds.includes(s.id));

  // Compute live badges progress from user profile
  const visitedCount = profile.visitedGrounds.filter(g => g.visited).length;
  const badges = INITIAL_SUPPORTER_BADGES.map(b => {
    if (b.id === 'badge-92-club-apprentice') {
      return { ...b, currentCount: visitedCount, unlocked: visitedCount >= 5 };
    }
    if (b.id === 'badge-92-club-master') {
      return { ...b, currentCount: visitedCount, unlocked: visitedCount >= 15 };
    }
    return b;
  });

  const handleToggleNotification = (key: keyof UserProfile['notificationsEnabled']) => {
    const updated = {
      ...profile,
      notificationsEnabled: {
        ...profile.notificationsEnabled,
        [key]: !profile.notificationsEnabled[key]
      }
    };
    onUpdateProfile(updated);
  };

  const handleLogMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oppTeam.trim()) return;

    const newMatch: UserAttendedMatch = {
      id: 'att_' + Date.now(),
      fixtureId: 'manual_' + Date.now(),
      opponent: oppTeam.trim(),
      date: matchDate,
      venue: matchVenue,
      isHome: isHomeGame,
      result: matchScore,
      competition,
      block,
      row,
      seat,
      companion,
      rating: personalRating,
      manOfTheMatch,
      photoUrl: matchPhotoUrl,
      notes: matchNotes
    };

    const updated = {
      ...profile,
      matchesAttendedCount: profile.matchesAttendedCount + 1,
      awayDaysCount: isHomeGame ? profile.awayDaysCount : profile.awayDaysCount + 1,
      attendedMatches: [newMatch, ...profile.attendedMatches]
    };

    onUpdateProfile(updated);
    setShowLogMatchModal(false);
    setOppTeam('');
    setMatchNotes('');
  };

  // Season Archive Stats
  const wins = profile.attendedMatches.filter(m => m.result.startsWith('W')).length;
  const draws = profile.attendedMatches.filter(m => m.result.startsWith('D')).length;
  const losses = profile.attendedMatches.filter(m => m.result.startsWith('L')).length;
  const winRate = profile.attendedMatches.length > 0 
    ? Math.round((wins / profile.attendedMatches.length) * 100) 
    : 0;

  return (
    <div id="my-coys-screen" className="space-y-4 pb-16 animate-in fade-in duration-300">
      {/* Cloud Authentication Prompt for Unauthenticated / Guest Users */}
      {!currentUser && (
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0a2353] via-[#0f346e] to-[#0a2353] p-4 text-white shadow-md border border-[#1e4a8a] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 text-[#4ea8de]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-white">
                  Join the Spurs Matchday Cloud
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#4ea8de]/20 text-[#72c2f4] text-[10px] font-bold border border-[#4ea8de]/30">
                  Google & Email
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Register or sign in with Google to sync your ground visits, match diary, and loyalty points across devices.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openAuthModal('login')}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-white text-[#0a2353] font-bold text-xs hover:bg-slate-100 transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              onClick={() => openAuthModal('register')}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#4ea8de] hover:bg-[#38bdf8] text-[#071938] font-bold text-xs transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Register</span>
            </button>
          </div>
        </div>
      )}

      {/* Profile Header Card in deep navy */}
      <div className="relative overflow-hidden rounded-3xl bg-[#071938] border border-[#0f2a58] p-5 shadow-md text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-[#4ea8de] shadow-md shrink-0">
              {activeAvatar ? (
                <img src={activeAvatar} alt={activeDisplayName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#0a1c3d] flex items-center justify-center text-white font-black text-2xl">
                  {activeDisplayName.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight truncate">
                  {activeDisplayName}
                </h2>
                <span className={`w-2 h-2 rounded-full ${currentUser ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} title={currentUser ? 'Cloud Synced' : 'Guest Mode'} />
              </div>

              <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                <span className="px-2 py-0.5 rounded-md bg-[#4ea8de]/20 text-[#72c2f4] text-[10px] font-bold border border-[#4ea8de]/30">
                  {activeTier}
                </span>
                <span className="text-[11px] text-slate-300 font-mono">
                  CRN: {activeMembershipNumber}
                </span>
              </div>

              <p className="text-[11px] text-[#4ea8de] font-bold mt-1 truncate">
                {activeHomeStand}
              </p>
            </div>
          </div>

          {/* Account Action Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            {currentUser ? (
              <>
                <button
                  onClick={openEditProfile}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#4ea8de]" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => signOut()}
                  title="Sign out of account"
                  className="p-2 rounded-xl bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-1.5 rounded-xl bg-[#4ea8de] hover:bg-[#38bdf8] text-[#071938] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Connect Account</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Key Metric Badges */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-3.5 border-t border-white/10 text-center">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-lg sm:text-xl font-black text-white block font-mono">
              {profile.matchesAttendedCount}
            </span>
            <span className="text-[9px] font-bold text-slate-300 tracking-wider">
              MATCHES
            </span>
          </div>

          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-lg sm:text-xl font-black text-[#4ea8de] block font-mono">
              {profile.awayDaysCount}
            </span>
            <span className="text-[9px] font-bold text-slate-300 tracking-wider">
              AWAY DAYS
            </span>
          </div>

          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            <span className="text-lg sm:text-xl font-black text-emerald-400 block font-mono">
              {profile.visitedGrounds.filter(g => g.visited).length}
            </span>
            <span className="text-[9px] font-bold text-slate-300 tracking-wider">
              GROUNDS
            </span>
          </div>

          <button 
            onClick={() => setActiveTab('cutoffs')}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-left hover:bg-white/10 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-0.5">
              <span className="text-lg sm:text-xl font-black text-amber-300 block font-mono">
                300+
              </span>
              <span className="text-[10px] text-amber-300/80 font-bold">pts</span>
            </div>
            <span className="text-[9px] font-bold text-slate-300 tracking-wider block">
              AWAY POINTS
            </span>
          </button>
        </div>
      </div>

      {/* Spurs Digital Pass & Ticket Exchange Quick Hub */}
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#071938] flex items-center justify-center text-[#38bdf8] shrink-0 shadow-xs">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-[#0a1c3d]">
                Spurs Digital Pass & Ticket Exchange
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                TX Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              NFC Apple/Google Wallet pass • Client Ref #7482910 • Resale & Forwarding cutoff
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowTicketPassModal(true)}
          className="px-4 py-2 rounded-xl bg-[#0a1c3d] hover:bg-[#0284c7] text-white font-bold text-xs transition-colors shadow-xs shrink-0 cursor-pointer text-center"
        >
          Open Ticket Hub
        </button>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center justify-between p-1 rounded-2xl bg-slate-100 border border-slate-200/80 text-xs font-bold shadow-xs overflow-x-auto">
        {[
          { id: 'passport', label: 'Groundhopper' },
          { id: 'cutoffs', label: 'Away Points' },
          { id: 'badges', label: 'Away Badges' },
          { id: 'history', label: 'Match Archive' },
          { id: 'saved', label: 'Saved' },
          { id: 'settings', label: 'Preferences' }
        ].map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`my-coys-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-1.5 rounded-xl text-center transition-all cursor-pointer text-[11px] sm:text-xs whitespace-nowrap ${
                isSelected
                  ? 'bg-white text-[#0a1c3d] shadow-xs font-black'
                  : 'text-slate-500 hover:text-[#0a1c3d]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: GROUNDHOPPER PASSPORT */}
      {activeTab === 'passport' && (() => {
        const plStadiums = stadiumsList.filter(s => s.league === 'Premier League');
        const visitedPlCount = plStadiums.filter(s => profile.visitedGrounds.some(g => g.stadiumId === s.id && g.visited)).length;
        const progressPercent = Math.round((visitedPlCount / (plStadiums.length || 20)) * 100);

        return (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl sm:rounded-3xl bg-white border border-slate-100 shadow-xs space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#0a1c3d]">
                      Premier League Groundhopper Passport
                    </h3>
                    <span className="text-[10px] font-black font-mono px-2 py-0.5 rounded-full bg-[#132257] text-[#c5a059] border border-[#c5a059]/30">
                      {visitedPlCount} / {plStadiums.length} PL Grounds
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Tick off every Premier League stadium attended with Tottenham Hotspur
                  </p>
                </div>
                <button
                  id="btn-log-match-trigger"
                  onClick={() => setShowLogMatchModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-[#4ea8de] hover:bg-[#38bdf8] text-[#071938] font-black text-xs flex items-center gap-1 shadow-xs transition-colors shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Log Game</span>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                  <span>Passport Completion</span>
                  <span className="font-mono text-[#132257]">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#132257] to-[#c5a059] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {plStadiums.map((stadium) => {
                const isVisited = profile.visitedGrounds.some(g => g.stadiumId === stadium.id && g.visited);

                return (
                  <div
                    key={stadium.id}
                    className="p-3.5 rounded-2xl bg-white border border-slate-100 flex items-center justify-between hover:bg-slate-50 hover:shadow-xs transition-all cursor-pointer tap-spring"
                    onClick={() => onToggleVisitedGround(stadium.id)}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                          isVisited
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'bg-slate-100 border border-slate-200 text-transparent'
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </button>

                      {stadium.clubBadge && (
                        <div className="w-6 h-6 rounded-md bg-white border border-slate-100 p-0.5 flex items-center justify-center shrink-0">
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
                        <h4 className="text-xs sm:text-sm font-bold text-[#0a1c3d]">{stadium.name}</h4>
                        <p className="text-[11px] text-slate-500">{stadium.club} • {stadium.city}</p>
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold text-slate-400 font-mono">
                      {stadium.distanceFromLondon}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* TAB: AWAY TICKET CRITERIA & POINTS CUTOFFS */}
      {activeTab === 'cutoffs' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#0b1e47] via-[#132257] to-[#071330] p-5 rounded-2xl sm:rounded-3xl text-white space-y-1.5 shadow-md border border-white/10">
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-[#c5a059]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#c5a059]">
                Official Spurs Ticketing Requirements
              </span>
            </div>
            <h3 className="text-lg font-black font-display">Away Match Loyalty Points Needed</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-medium">
              Tottenham Hotspur away match allocations are strictly tiered by loyalty points. Here are the typical cutoff thresholds and allocations required for upcoming and annual away fixtures.
            </p>
          </div>

          {/* Quick Overview Bento Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Derby Cutoffs</span>
              <span className="text-lg font-black text-rose-600 block mt-0.5">380–465+ pts</span>
              <p className="text-[11px] text-slate-500 mt-1">Arsenal & Chelsea require the highest loyalty total of the entire season.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Standard Away Days</span>
              <span className="text-lg font-black text-amber-600 block mt-0.5">250–350 pts</span>
              <p className="text-[11px] text-slate-500 mt-1">Man United, Liverpool, and Midlands fixtures usually drop into this range.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Best Entry Fixtures</span>
              <span className="text-lg font-black text-emerald-600 block mt-0.5">80–180 pts</span>
              <p className="text-[11px] text-slate-500 mt-1">FA Cup 3rd/4th rounds and northern midweek ties (e.g. Everton, Newcastle) have lower thresholds.</p>
            </div>
          </div>

          {/* Cutoffs Fixtures List */}
          <div className="space-y-3">
            {LOYALTY_POINTS_CUTOFFS.map((fixture) => (
              <div 
                key={fixture.fixtureId}
                className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                        {fixture.competition}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200/60">
                        {fixture.tier}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-black text-[#0a1c3d] mt-1">
                      {fixture.opponent}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Points Needed</span>
                      <span className="text-base sm:text-lg font-black text-[#0a1c3d]">
                        {fixture.typicalCutoffPoints}+ <span className="text-xs font-normal text-slate-500">pts</span>
                      </span>
                    </div>
                    <div className="text-left sm:text-right pl-3 border-l border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Allocation</span>
                      <span className="text-xs sm:text-sm font-black text-slate-700">
                        {fixture.allocationSize.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">seats</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <span className="font-bold text-[#0a1c3d] block text-[11px]">Season Ticket Holders</span>
                    <span className="text-slate-600 text-[11px] mt-0.5 block">{fixture.seasonTicketWindow}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                    <span className="font-bold text-[#0a1c3d] block text-[11px]">One Hotspur+ Members</span>
                    <span className="text-slate-600 text-[11px] mt-0.5 block">{fixture.oneHotspurPlusWindow}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 bg-sky-50/60 border border-sky-100 rounded-xl p-2.5">
                  <strong className="text-[#0284c7]">Club Guidance: </strong>{fixture.guidance}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-600">
              For live ballot windows, pricing tiers, and official announcements, consult the club's away ticket page.
            </span>
            <a
              href="https://www.tottenhamhotspur.com/tickets/away-tickets/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#0a1c3d] hover:bg-[#0284c7] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
            >
              <span>Spurs Away Tickets Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* TAB 2: AWAY GROUND BADGES */}
      {activeTab === 'badges' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#0a1c3d] to-[#122b55] p-5 rounded-2xl text-white space-y-1">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Official Away Day Honours
              </span>
            </div>
            <h3 className="text-lg font-black">Away Ground Badges & 92 Club</h3>
            <p className="text-xs text-slate-300">
              Unlock digital crests as you check off away grounds, London derbies, and historic tours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                  badge.unlocked
                    ? 'bg-gradient-to-br from-[#fefce8] via-white to-[#fffbeb] border-[#c5a059]/50 shadow-sm ring-1 ring-[#c5a059]/30'
                    : 'bg-white border-slate-200/90 opacity-90'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      badge.unlocked ? 'bg-[#c5a059]/20 text-[#8c6b2d] border border-[#c5a059]/30' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-xs sm:text-sm">{badge.title}</h4>
                      <span className="text-[10px] font-bold text-slate-400 capitalize">
                        {badge.category} Award
                      </span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    badge.unlocked 
                      ? 'bg-[#c5a059]/20 text-[#785b20] border border-[#c5a059]/40' 
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {badge.unlocked ? 'Unlocked' : 'In Progress'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {badge.description}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500">
                    <span>Progress: {badge.currentCount} / {badge.requiredCount}</span>
                    <span className="font-mono">{Math.min(100, Math.round((badge.currentCount / badge.requiredCount) * 100))}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        badge.unlocked ? 'bg-[#c5a059]' : 'bg-[#0284c7]'
                      }`}
                      style={{ width: `${Math.min(100, (badge.currentCount / badge.requiredCount) * 100)}%` }}
                    />
                  </div>
                </div>

                {badge.unlockedAt && (
                  <div className="text-[10px] text-[#8c6b2d] font-bold pt-0.5">
                    Unlocked: {badge.unlockedAt}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MATCH ARCHIVE & SEAT LOGS */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {/* Season Archive Stats Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Your Personal Season Archive
                </span>
                <h4 className="text-sm font-black text-slate-900">Attendance Statistics</h4>
              </div>
              <button
                onClick={() => setShowLogMatchModal(true)}
                className="px-3 py-1.5 rounded-xl bg-[#0284c7] text-white text-xs font-bold hover:bg-[#0369a1] transition-colors"
              >
                + Log Match & Seat
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-3 text-center">
              <div>
                <span className="text-xs text-slate-400 font-medium">Record</span>
                <p className="text-sm font-black text-slate-800 font-mono mt-0.5">
                  {wins}W - {draws}D - {losses}L
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium">Win Rate</span>
                <p className="text-sm font-black text-emerald-600 font-mono mt-0.5">
                  {winRate}%
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium">Home/Away</span>
                <p className="text-sm font-black text-[#0284c7] font-mono mt-0.5">
                  {profile.matchesAttendedCount - profile.awayDaysCount}H / {profile.awayDaysCount}A
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium">Avg Rating</span>
                <p className="text-sm font-black text-amber-500 font-mono mt-0.5">
                  8.8 ★
                </p>
              </div>
            </div>
          </div>

          {/* Attended Matches List with Seat Details */}
          <div className="space-y-3">
            {profile.attendedMatches.map((m) => (
              <div key={m.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs hover:border-slate-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-[#0a1c3d] text-sm sm:text-base">
                        Spurs vs {m.opponent}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-[#0284c7]">
                        {m.competition || 'Premier League'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span>{m.date}</span>
                      <span>•</span>
                      <span>{m.venue}</span>
                      <span>•</span>
                      <span className="text-[#0284c7] font-semibold">{m.isHome ? 'Home' : 'Away'}</span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full font-mono font-bold text-xs ${
                    m.result.startsWith('W')
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : m.result.startsWith('D')
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {m.result}
                  </span>
                </div>

                {/* Ticket Details Strip (Block, Row, Seat, Companion) */}
                <div className="bg-[#f4f7fb] rounded-xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Seat Location</span>
                    <p className="font-bold text-slate-800">{m.block || 'Block 254'} • {m.row || 'Row 18'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Seat Number</span>
                    <p className="font-bold text-slate-800">{m.seat || 'Seat 104'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Accompanied By</span>
                    <p className="font-bold text-slate-800">{m.companion || 'With mates'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Match Rating</span>
                    <p className="font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {m.rating || 9}/10
                    </p>
                  </div>
                </div>

                {m.notes && (
                  <p className="text-xs text-slate-600 italic">
                    "{m.notes}"
                  </p>
                )}

                {m.manOfTheMatch && (
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1 border-t border-slate-100">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Your MOTM: <strong className="text-slate-800">{m.manOfTheMatch}</strong></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SAVED ITEMS */}
      {activeTab === 'saved' && (
        <div className="space-y-3">
          <div className="flex gap-2 text-xs font-semibold">
            <button
              onClick={() => setSavedSubTab('pubs')}
              className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                savedSubTab === 'pubs'
                  ? 'bg-[#0284c7] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 shadow-xs hover:bg-slate-50'
              }`}
            >
              Saved Pubs ({savedPubs.length})
            </button>
            <button
              onClick={() => setSavedSubTab('stadiums')}
              className={`px-4 py-1.5 rounded-xl transition-all cursor-pointer ${
                savedSubTab === 'stadiums'
                  ? 'bg-[#0284c7] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 shadow-xs hover:bg-slate-50'
              }`}
            >
              Saved Stadiums ({savedStadiums.length})
            </button>
          </div>

          {savedSubTab === 'pubs' && (
            <div className="space-y-2">
              {savedPubs.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-white border border-slate-100 text-slate-400 text-xs shadow-xs">
                  You haven't saved any matchday pubs yet. Tap the heart on any pub to bookmark it here!
                </div>
              ) : (
                savedPubs.map((pub) => (
                  <div
                    key={pub.id}
                    onClick={() => onSelectPub(pub)}
                    className="p-3.5 rounded-2xl bg-white border border-slate-100 flex items-center justify-between hover:bg-slate-50 hover:shadow-xs cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={pub.image}
                        alt={pub.name}
                        className="w-12 h-12 rounded-xl object-cover shadow-xs"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#0a1c3d]">{pub.name}</h4>
                        <p className="text-[11px] text-slate-500">{pub.distance} • {pub.walkTime}</p>
                      </div>
                    </div>
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                  </div>
                ))
              )}
            </div>
          )}

          {savedSubTab === 'stadiums' && (
            <div className="space-y-2">
              {savedStadiums.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-white border border-slate-100 text-slate-400 text-xs shadow-xs">
                  No saved stadiums yet.
                </div>
              ) : (
                savedStadiums.map((st) => (
                  <div
                    key={st.id}
                    onClick={() => onSelectStadium(st)}
                    className="p-3.5 rounded-2xl bg-white border border-slate-100 flex items-center justify-between hover:bg-slate-50 hover:shadow-xs cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={st.image}
                        alt={st.name}
                        className="w-12 h-12 rounded-xl object-cover shadow-xs"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#0a1c3d]">{st.name}</h4>
                        <p className="text-[11px] text-slate-500">{st.club} • {st.city}</p>
                      </div>
                    </div>
                    <MapPin className="w-5 h-5 text-[#0284c7]" />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: PREFERENCES & SETTINGS */}
      {activeTab === 'settings' && (
        <div className="space-y-4">
          {/* Cloud Supporter Account Section */}
          <div className="p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-100 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0a1c3d] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
                <span>Spurs Supporter Account & Cloud Sync</span>
              </h3>
              {currentUser ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Synced
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                  Guest Mode
                </span>
              )}
            </div>

            {currentUser ? (
              <div className="space-y-3 pt-1">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                      {activeAvatar ? (
                        <img src={activeAvatar} alt={activeDisplayName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#0a1c3d] flex items-center justify-center text-white font-bold">
                          {activeDisplayName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0a1c3d]">{activeDisplayName}</h4>
                      <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7] block">
                      {activeTier}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {activeMembershipNumber}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={openEditProfile}
                    className="py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#0284c7]" />
                    <span>Edit Profile Data</span>
                  </button>
                  <button
                    onClick={() => signOut()}
                    className="py-2 px-3 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <p className="text-xs text-slate-600">
                  You are currently using local storage. Create an account or sign in with Google to safeguard your passport stamps, attended matches, and favorite pubs.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#0a2353] hover:bg-[#071938] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5 text-[#4ea8de]" />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#4ea8de] hover:bg-[#38bdf8] text-[#071938] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>Register New Account</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Matchday Alert Preferences */}
          <div className="p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-100 space-y-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0a1c3d] flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#0284c7]" />
              <span>Matchday Alert Preferences</span>
            </h3>

            <div className="divide-y divide-slate-100">
              {[
                { key: 'matchReminders' as const, label: 'Kickoff & Gate Reminders', desc: 'Countdown alerts 3h and 1h before kickoff' },
                { key: 'travelAlerts' as const, label: 'TfL & Rail Disruption Alerts', desc: 'Real-time notifications if Overground/Victoria line suffers delays' },
                { key: 'fixtureChanges' as const, label: 'Fixture Rescheduling Updates', desc: 'Instant alerts when TV broadcast picks shift dates' },
                { key: 'awayDayGuides' as const, label: 'Away Day Intelligence', desc: 'Pub guides and ticket drop alerts for upcoming away fixtures' }
              ].map((item) => {
                const isEnabled = profile.notificationsEnabled[item.key];
                return (
                  <div key={item.key} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0">
                    <div>
                      <span className="text-xs font-bold text-[#0a1c3d] block">{item.label}</span>
                      <span className="text-[11px] text-slate-500">{item.desc}</span>
                    </div>

                    <button
                      onClick={() => handleToggleNotification(item.key)}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                        isEnabled ? 'bg-[#0284c7]' : 'bg-slate-200'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          isEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* One Hotspur Loyalty Points Explained */}
          <div className="p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-100 space-y-3.5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0a1c3d] flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>How Away Match Loyalty Points Work</span>
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              Loyalty points are awarded by Tottenham Hotspur to Season Ticket Holders and One Hotspur / One Hotspur+ members. They determine ticket priority for high-demand away matches, domestic cup finals, and European away days.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="font-bold text-[#0a1c3d] block text-xs">Home Matches</span>
                <span className="text-amber-600 font-bold text-xs mt-0.5 block">+1 to +3 Points</span>
                <p className="text-[11px] text-slate-500 mt-1">Based on Premier League fixture category (Cat A, B, or C).</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="font-bold text-[#0a1c3d] block text-xs">Away & Cup Fixtures</span>
                <span className="text-amber-600 font-bold text-xs mt-0.5 block">+3 to +5 Points</span>
                <p className="text-[11px] text-slate-500 mt-1">Rewarding dedicated traveling supporters at away grounds.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="font-bold text-[#0a1c3d] block text-xs">Season Renewal</span>
                <span className="text-amber-600 font-bold text-xs mt-0.5 block">+10 to +15 Points</span>
                <p className="text-[11px] text-slate-500 mt-1">Annual bonus when renewing your membership during the priority window.</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60 text-[11px] text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                To view how many loyalty points are typically required for every upcoming away match (like Arsenal, Chelsea, or Liverpool), switch to the <strong>Away Points</strong> tab.
              </span>
            </div>
          </div>

          {/* Reset Passport & Data Cleansing */}
          <div className="p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-100 space-y-3 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0a1c3d] flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-slate-500" />
              <span>Groundhopper & Archive Data</span>
            </h3>
            <p className="text-xs text-slate-600">
              Want to start completely fresh? You can reset your visited stadiums checklist and attended matches diary back to zero.
            </p>
            <button
              onClick={handleResetPassport}
              className="px-3.5 py-2 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-slate-700 hover:text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Grounds & Attended Matches to Zero</span>
            </button>
          </div>
        </div>
      )}

      {/* DETAILED LOG MATCH & SEAT RECORD MODAL */}
      {showLogMatchModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-[#0a1c3d]">Log Match & Seat Record</h3>
                <p className="text-[11px] text-slate-500">Record your ticket stub and build your season diary</p>
              </div>
              <button
                onClick={() => setShowLogMatchModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleLogMatch} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Opponent</label>
                <input
                  type="text"
                  required
                  value={oppTeam}
                  onChange={(e) => setOppTeam(e.target.value)}
                  placeholder="e.g. Manchester United, Newcastle, Aston Villa..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Competition</label>
                  <select
                    value={competition}
                    onChange={(e) => setCompetition(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                  >
                    <option value="Premier League">Premier League</option>
                    <option value="UEFA Europa League">UEFA Europa League</option>
                    <option value="FA Cup">FA Cup</option>
                    <option value="Carabao Cup">Carabao Cup</option>
                    <option value="Pre-Season Friendly">Pre-Season Friendly</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Result / Score</label>
                  <input
                    type="text"
                    value={matchScore}
                    onChange={(e) => setMatchScore(e.target.value)}
                    placeholder="e.g. W 2-0, D 1-1"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                  />
                </div>
              </div>

              {/* Home vs Away */}
              <div className="flex items-center gap-4 py-1">
                <label className="flex items-center gap-2 text-xs font-bold text-[#0a1c3d] cursor-pointer">
                  <input
                    type="radio"
                    checked={isHomeGame}
                    onChange={() => {
                      setIsHomeGame(true);
                      setMatchVenue('Tottenham Hotspur Stadium');
                    }}
                    name="hometype"
                  />
                  <span>Home Match (N17)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-[#0a1c3d] cursor-pointer">
                  <input
                    type="radio"
                    checked={!isHomeGame}
                    onChange={() => {
                      setIsHomeGame(false);
                      setMatchVenue('Away Ground');
                    }}
                    name="hometype"
                  />
                  <span>Away Day</span>
                </label>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Stadium / Venue</label>
                <input
                  type="text"
                  value={matchVenue}
                  onChange={(e) => setMatchVenue(e.target.value)}
                  placeholder="e.g. Tottenham Hotspur Stadium"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                />
              </div>

              {/* SEAT RECORD DETAILS */}
              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0284c7] flex items-center gap-1">
                  <Ticket className="w-3.5 h-3.5" />
                  Your Ticket Seat Record
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Block</label>
                    <input
                      type="text"
                      value={block}
                      onChange={(e) => setBlock(e.target.value)}
                      placeholder="e.g. 254"
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Row</label>
                    <input
                      type="text"
                      value={row}
                      onChange={(e) => setRow(e.target.value)}
                      placeholder="e.g. 18"
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Seat</label>
                    <input
                      type="text"
                      value={seat}
                      onChange={(e) => setSeat(e.target.value)}
                      placeholder="e.g. 104"
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Who were you with?</label>
                    <input
                      type="text"
                      value={companion}
                      onChange={(e) => setCompanion(e.target.value)}
                      placeholder="e.g. Dad, Lads, Solo"
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 block mb-0.5">Personal Rating (1-10)</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={personalRating}
                      onChange={(e) => setPersonalRating(Number(e.target.value))}
                      className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Your Player of the Match</label>
                <input
                  type="text"
                  value={manOfTheMatch}
                  onChange={(e) => setManOfTheMatch(e.target.value)}
                  placeholder="e.g. Son Heung-min, Micky van de Ven"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Personal Match Memory / Notes</label>
                <textarea
                  rows={2}
                  value={matchNotes}
                  onChange={(e) => setMatchNotes(e.target.value)}
                  placeholder="e.g. Screamer in the 89th minute, singing in the rain..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#4ea8de] hover:bg-[#38bdf8] text-[#071938] font-black text-xs transition-colors shadow-xs"
              >
                Save To Match & Seat Archive
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Digital Pass & Ticket Exchange Modal */}
      <TicketPassHubModal
        isOpen={showTicketPassModal}
        onClose={() => setShowTicketPassModal(false)}
        clientRefNumber="7482910"
      />

      {/* EDIT SUPPORTER PROFILE MODAL */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-[#0a1c3d]">Edit Supporter Profile</h3>
                <p className="text-[11px] text-slate-500">Update your One Hotspur membership details synced to Cloud Firestore</p>
              </div>
              <button
                onClick={() => setShowEditProfileModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Supporter Name / Handle
                </label>
                <input
                  type="text"
                  required
                  value={editDisplayName}
                  onChange={(e) => setEditDisplayName(e.target.value)}
                  placeholder="e.g. Matt Spurs"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Membership Tier
                  </label>
                  <select
                    value={editTier}
                    onChange={(e) => setEditTier(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                  >
                    <option value="One Hotspur">One Hotspur</option>
                    <option value="One Hotspur+">One Hotspur+</option>
                    <option value="Season Ticket Holder">Season Ticket</option>
                    <option value="Junior Hotspur">Junior Hotspur</option>
                    <option value="International Member">International Fan</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Client Ref (CRN)
                  </label>
                  <input
                    type="text"
                    value={editMembershipNumber}
                    onChange={(e) => setEditMembershipNumber(e.target.value)}
                    placeholder="e.g. 7482910"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Preferred Home Stand
                </label>
                <select
                  value={editHomeStand}
                  onChange={(e) => setEditHomeStand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                >
                  <option value="South Stand (Single Tier)">South Stand (Block 254 / Single Tier)</option>
                  <option value="East Stand">East Stand (Premium & Concourse)</option>
                  <option value="West Stand">West Stand (High Road)</option>
                  <option value="North Stand">North Stand (Family & Visiting)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingProfile}
                  className="flex-1 py-2.5 rounded-xl bg-[#0a2353] hover:bg-[#071938] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-60"
                >
                  {isUpdatingProfile ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5 text-[#4ea8de]" />
                  )}
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
