import React, { useState } from 'react';
import { 
  ShieldCheck, Landmark, Beer, Clock, BookOpen, 
  MessageSquare, DollarSign, Plus, Edit2, Trash2, Check, X, AlertCircle 
} from 'lucide-react';
import { Venue, PubVenue, ArticleGuide, FanTip, MatchdayTimelineItem, AffiliatePartner, AffiliateClickRecord } from '../types';

interface AdminCMSProps {
  isOpen: boolean;
  onClose: () => void;
  stadiums: Venue[];
  onAddStadium: (stadium: Venue) => void;
  pubs: PubVenue[];
  onAddPub: (pub: PubVenue) => void;
  guides: ArticleGuide[];
  onAddGuide: (guide: ArticleGuide) => void;
  fanTips: FanTip[];
  onUpdateTipStatus: (id: string, status: 'APPROVED' | 'REJECTED') => void;
  affiliates: AffiliatePartner[];
  affiliateClicks: AffiliateClickRecord[];
}

export const AdminCMS: React.FC<AdminCMSProps> = ({
  isOpen,
  onClose,
  stadiums,
  onAddStadium,
  pubs,
  onAddPub,
  guides,
  onAddGuide,
  fanTips,
  onUpdateTipStatus,
  affiliates,
  affiliateClicks
}) => {
  const [activeTab, setActiveTab] = useState<'pubs' | 'stadiums' | 'guides' | 'tips' | 'affiliates'>('pubs');
  const [successBanner, setSuccessBanner] = useState('');

  // Form states for adding a new pub
  const [pubName, setPubName] = useState('');
  const [pubAddress, setPubAddress] = useState('');
  const [pubCategory, setPubCategory] = useState<'Pub' | 'Food' | 'Cafe' | 'Bar'>('Pub');
  const [pubDistance, setPubDistance] = useState('0.5 miles');
  const [pubWalkTime, setPubWalkTime] = useState('12 min walk');
  const [pubEditorial, setPubEditorial] = useState('');
  const [pubIsVerified, setPubIsVerified] = useState(true);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setSuccessBanner(msg);
    setTimeout(() => setSuccessBanner(''), 4000);
  };

  const handleCreatePub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pubName.trim()) return;

    const newPub: PubVenue = {
      id: 'pub_' + Date.now(),
      name: pubName.trim(),
      category: pubCategory,
      stadiumId: 'tottenham-hotspur-stadium',
      distance: pubDistance,
      walkTime: pubWalkTime,
      address: pubAddress.trim() || 'High Road, Tottenham',
      postcode: 'N17 0BX',
      atmosphereRating: 5,
      rating: 4.8,
      reviewsCount: 1,
      priceLevel: '££',
      spursFriendly: true,
      awayFansWelcome: false,
      foodAvailable: true,
      beersServed: ['Beavertown Neck Oil', 'Guinness', 'Camden Hells'],
      foodStyle: 'Matchday classics & pies',
      openingHours: '11:00 AM - 11:30 PM',
      badges: ['Spurs friendly', 'Pre-match'],
      editorialSummary: pubEditorial.trim() || 'Great matchday venue for Spurs supporters.',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
      googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(pubName)}`,
      verifiedByCoys: pubIsVerified
    };

    onAddPub(newPub);
    setPubName('');
    setPubAddress('');
    setPubEditorial('');
    showNotification(`Added "${newPub.name}" to verified venues.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div 
        id="admin-cms-modal"
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center text-[#0284c7]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#0a1c3d]">
                COYS Admin Dashboard & CMS
              </h2>
              <p className="text-[11px] text-slate-500">
                Grounds, Venues, Articles, Supporter Moderation & Affiliate Tracking
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 text-slate-700 flex items-center justify-center hover:bg-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-slate-100 border-b border-slate-200 overflow-x-auto no-scrollbar text-xs font-bold">
          {[
            { id: 'pubs', label: 'Pubs & Food', icon: Beer },
            { id: 'stadiums', label: 'Stadiums Directory', icon: Landmark },
            { id: 'guides', label: 'Guides & CMS', icon: BookOpen },
            { id: 'tips', label: 'Tip Moderation', icon: MessageSquare },
            { id: 'affiliates', label: 'Affiliates & Clicks', icon: DollarSign }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#0a1c3d] shadow-xs'
                    : 'text-slate-600 hover:text-[#0a1c3d] hover:bg-white/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Notification banner */}
        {successBanner && (
          <div className="m-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successBanner}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 text-slate-700">
          {/* TAB: PUBS & FOOD */}
          {activeTab === 'pubs' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#0a1c3d] mb-3">
                  + Add New Matchday Venue
                </h3>
                <form onSubmit={handleCreatePub} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Venue Name</label>
                    <input
                      type="text"
                      required
                      value={pubName}
                      onChange={(e) => setPubName(e.target.value)}
                      placeholder="e.g. The Bill Nicholson Tap"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:border-[#0284c7] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Category</label>
                    <select
                      value={pubCategory}
                      onChange={(e) => setPubCategory(e.target.value as any)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:border-[#0284c7] focus:outline-none"
                    >
                      <option value="Pub">Pub</option>
                      <option value="Food">Food</option>
                      <option value="Cafe">Cafe</option>
                      <option value="Bar">Bar</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Distance & Walk</label>
                    <input
                      type="text"
                      value={pubDistance}
                      onChange={(e) => setPubDistance(e.target.value)}
                      placeholder="e.g. 0.3 miles"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:border-[#0284c7] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Address / Street</label>
                    <input
                      type="text"
                      value={pubAddress}
                      onChange={(e) => setPubAddress(e.target.value)}
                      placeholder="e.g. 780 High Road, Tottenham"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:border-[#0284c7] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Editorial Summary & Vibe</label>
                    <textarea
                      rows={2}
                      value={pubEditorial}
                      onChange={(e) => setPubEditorial(e.target.value)}
                      placeholder="Matchday atmosphere, singing, outdoor garden, beer selection..."
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:border-[#0284c7] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 text-xs font-bold text-[#0a1c3d] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pubIsVerified}
                        onChange={(e) => setPubIsVerified(e.target.checked)}
                      />
                      <span>Grant "Verified by COYS" Badge</span>
                    </label>

                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#4ea8de] hover:bg-[#38bdf8] text-[#071938] font-black text-xs transition-colors shadow-xs cursor-pointer"
                    >
                      Publish Venue
                    </button>
                  </div>
                </form>
              </div>

              {/* Current Pubs Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase">Live Published Venues ({pubs.length})</h4>
                <div className="divide-y divide-slate-100 rounded-xl bg-slate-50 border border-slate-200/80">
                  {pubs.map((p) => (
                    <div key={p.id} className="p-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#0a1c3d]">{p.name}</span>
                        <span className="text-slate-500 ml-2">({p.distance})</span>
                        {p.verifiedByCoys && (
                          <span className="ml-2 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Verified</span>
                        )}
                      </div>
                      <span className="text-slate-500 font-mono text-[10px]">{p.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: STADIUMS DIRECTORY */}
          {activeTab === 'stadiums' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-500 uppercase">Managed Stadiums ({stadiums.length})</h4>
              </div>

              <div className="space-y-2">
                {stadiums.map((s) => (
                  <div key={s.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                    <div>
                      <h5 className="font-bold text-[#0a1c3d]">{s.name}</h5>
                      <p className="text-[11px] text-slate-500">{s.club} • {s.city}, {s.country} • Cap: {s.capacity.toLocaleString()}</p>
                      <p className="text-[10px] text-[#0284c7] font-semibold mt-0.5">Away: {s.awaySection}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[10px] text-slate-600 font-mono font-bold">
                      {s.league}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: GUIDES & CMS */}
          {activeTab === 'guides' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase">Editorial Guides ({guides.length})</h4>
              <div className="space-y-2">
                {guides.map((g) => (
                  <div key={g.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0a1c3d]">{g.title}</span>
                      <span className="text-[10px] text-[#0284c7] font-mono font-bold">{g.category}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{g.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: TIP MODERATION */}
          {activeTab === 'tips' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase">Community Supporter Intel ({fanTips.length})</h4>
              <div className="space-y-2">
                {fanTips.map((tip) => (
                  <div key={tip.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0a1c3d]">{tip.authorName}</span>
                        <span className="text-[10px] text-slate-500">• {tip.venueName}</span>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                          tip.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {tip.status}
                        </span>
                      </div>
                      <p className="text-slate-600 italic">"{tip.content}"</p>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {tip.status !== 'APPROVED' && (
                        <button
                          onClick={() => {
                            onUpdateTipStatus(tip.id, 'APPROVED');
                            showNotification('Tip approved!');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold cursor-pointer"
                        >
                          Approve
                        </button>
                      )}
                      {tip.status !== 'REJECTED' && (
                        <button
                          onClick={() => {
                            onUpdateTipStatus(tip.id, 'REJECTED');
                            showNotification('Tip rejected.');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold cursor-pointer"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: AFFILIATES & CLICKS */}
          {activeTab === 'affiliates' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Configured Affiliate Partners</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {affiliates.map((aff) => (
                    <div key={aff.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-black text-[#0a1c3d]">{aff.name}</span>
                        <span className="text-[10px] text-[#0284c7] font-semibold block">{aff.category} • Comm: {aff.commissionRate}</span>
                        <span className="text-[10px] text-slate-500 truncate max-w-[180px] block">{aff.targetUrl}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Live Click Audit Trail ({affiliateClicks.length})</h4>
                <div className="divide-y divide-slate-100 rounded-xl bg-slate-50 border border-slate-200/80 max-h-48 overflow-y-auto text-xs">
                  {affiliateClicks.map((clk) => (
                    <div key={clk.id} className="p-2.5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[#0a1c3d]">{clk.partnerName}</span>
                        <span className="text-slate-500 ml-2">from {clk.page}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        {clk.timestamp.split('T')[1]?.slice(0, 5) || 'Recent'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
