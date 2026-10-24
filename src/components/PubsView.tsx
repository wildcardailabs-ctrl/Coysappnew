import React, { useState } from 'react';
import { 
  ArrowLeft, Search, SlidersHorizontal, Star, Heart, 
  MapPin, Check, Users, Share2, Sparkles, Beer
} from 'lucide-react';
import { PubVenue, UserReview } from '../types';
import { PubDetailModal } from './PubDetailModal';
import { PreMatchMeetupModal, GroupMeetupData } from './PreMatchMeetupModal';

interface PubsViewProps {
  stadiumId?: string;
  stadiumName?: string;
  pubsList: PubVenue[];
  savedPubIds: string[];
  onToggleSavePub: (pubId: string) => void;
  onBack?: () => void;
  reviews: UserReview[];
  onAddReview: (review: Omit<UserReview, 'id' | 'date' | 'status'>) => void;
}

export const PubsView: React.FC<PubsViewProps> = ({
  stadiumId = 'tottenham-hotspur-stadium',
  stadiumName = 'Tottenham Hotspur Stadium',
  pubsList,
  savedPubIds,
  onToggleSavePub,
  onBack,
  reviews,
  onAddReview
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePubDetail, setActivePubDetail] = useState<PubVenue | null>(null);
  const [isMeetupModalOpen, setIsMeetupModalOpen] = useState(false);
  const [meetupPubForModal, setMeetupPubForModal] = useState<PubVenue | null>(null);
  const [activeMeetup, setActiveMeetup] = useState<GroupMeetupData | null>(() => {
    try {
      const stored = localStorage.getItem('coys_active_meetup');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const handleSaveMeetup = (data: GroupMeetupData) => {
    setActiveMeetup(data);
    try {
      localStorage.setItem('coys_active_meetup', JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  };

  // Filter pubs for this stadium or general list
  const filteredPubs = pubsList.filter((pub) => {
    const matchesStadium = stadiumId ? pub.stadiumId === stadiumId : true;
    const matchesCategory =
      selectedCategory === 'All' ? true : pub.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      pub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.badges.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStadium && matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Pubs', 'Food', 'Cafes', 'Bars'];

  return (
    <div id="pubs-food-view" className="space-y-4 pb-12 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        {onBack ? (
          <button
            id="pubs-back-btn"
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0284c7] hover:text-sky-700 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}
        <div className="text-center">
          <h2 className="text-base sm:text-lg font-bold text-[#0a1c3d] tracking-tight">
            Pubs & Food
          </h2>
          <span className="text-[11px] text-slate-400 font-medium block">
            Near {stadiumName}
          </span>
        </div>
        <div className="w-10" />
      </div>

      {/* Pre-Match Meetup Coordinator ("Where's the Mates?") Banner */}
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#071938] via-[#0c2450] to-[#071938] text-white p-4 sm:p-5 shadow-sm space-y-3 border border-[#1b3d75]">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] text-[10px] font-black uppercase tracking-wider border border-[#38bdf8]/30">
                Where's The Mates?
              </span>
              <span className="text-[11px] text-white/70 font-medium">Group Coordinator</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
              Pre-Match Supporter Meetup
            </h3>
            <p className="text-xs text-white/80 leading-relaxed max-w-lg">
              Set a pub, specify arrival time, and generate a 1-tap WhatsApp / iMessage invite link for your group.
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-[#38bdf8]" />
          </div>
        </div>

        {activeMeetup ? (
          <div className="p-3 rounded-xl bg-white/10 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
            <div>
              <span className="text-[10px] font-bold text-[#38bdf8] uppercase block">
                Active Meetup • {activeMeetup.meetTime}
              </span>
              <span className="font-bold text-white text-sm">
                {activeMeetup.venueName} ({activeMeetup.area})
              </span>
              <p className="text-white/80 text-[11px] mt-0.5">
                Supporters: {activeMeetup.mates.join(', ')}
              </p>
            </div>
            <button
              onClick={() => {
                setMeetupPubForModal(pubsList.find(p => p.name === activeMeetup.venueName) || null);
                setIsMeetupModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-white text-[#071938] font-bold text-xs hover:bg-slate-100 transition-colors shrink-0 cursor-pointer shadow-2xs self-start sm:self-auto"
            >
              Share / Edit Invite
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setMeetupPubForModal(null);
              setIsMeetupModalOpen(true);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#071938] font-black text-xs flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <Beer className="w-4 h-4" />
            <span>Coordinate Group Meetup</span>
          </button>
        )}
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          id="pubs-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by pub name, beer, food style..."
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

      {/* Category Filter Chips in master style */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 text-xs font-semibold">
        {categories.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              id={`pubs-cat-${cat.toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
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

      {/* Venue Cards List in crisp white */}
      <div className="space-y-2.5">
        {filteredPubs.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white border border-slate-100 text-slate-400 text-xs shadow-xs">
            No venues found matching your filter. Try adjusting your search query!
          </div>
        ) : (
          filteredPubs.map((pub) => {
            const isSaved = savedPubIds.includes(pub.id);

            return (
              <div
                key={pub.id}
                id={`pub-card-${pub.id}`}
                onClick={() => setActivePubDetail(pub)}
                className="group relative flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md cursor-pointer shadow-xs active:scale-[0.99] transition-all"
              >
                <div className="flex items-center gap-3">
                  {/* Thumbnail */}
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative shadow-inner">
                    <img
                      src={pub.image}
                      alt={pub.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {pub.verifiedByCoys && (
                      <div className="absolute top-1 left-1 bg-emerald-500 rounded-full p-0.5 text-white shadow">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-[#0a1c3d] group-hover:text-[#0284c7] transition-colors leading-tight">
                      {pub.name}
                    </h3>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{pub.distance}</span>
                      <span>•</span>
                      <span>{pub.walkTime}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="flex items-center gap-0.5 text-amber-500 font-bold text-[11px]">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{pub.rating}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        ({pub.reviewsCount})
                      </span>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-1 pt-0.5">
                      {pub.badges.slice(0, 2).map((badge, idx) => (
                        <span
                          key={idx}
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            badge === 'Spurs friendly'
                              ? 'bg-sky-50 text-sky-700 border border-sky-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Save Heart Button */}
                <button
                  id={`pub-save-btn-${pub.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSavePub(pub.id);
                  }}
                  aria-label={isSaved ? 'Remove from saved' : 'Save pub'}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-rose-500 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 transition-transform active:scale-125 ${
                      isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-300'
                    }`}
                  />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Pub Detail Modal */}
      {activePubDetail && (
        <PubDetailModal
          pub={activePubDetail}
          isOpen={Boolean(activePubDetail)}
          onClose={() => setActivePubDetail(null)}
          isSaved={savedPubIds.includes(activePubDetail.id)}
          onToggleSave={() => onToggleSavePub(activePubDetail.id)}
          reviews={reviews}
          onAddReview={onAddReview}
        />
      )}

      {/* Pre-Match Meetup Coordinator Modal */}
      <PreMatchMeetupModal
        isOpen={isMeetupModalOpen}
        onClose={() => setIsMeetupModalOpen(false)}
        pubs={pubsList}
        selectedPub={meetupPubForModal}
        onSaveMeetup={handleSaveMeetup}
      />
    </div>
  );
};
