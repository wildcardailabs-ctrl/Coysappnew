import React, { useState } from 'react';
import { 
  BookOpen, Clock, ChevronRight, ThumbsUp, PlusCircle, 
  Search, Share2, Sparkles, MessageSquare, X, Send 
} from 'lucide-react';
import { ArticleGuide, FanTip } from '../types';

interface ExploreViewProps {
  guides: ArticleGuide[];
  fanTips: FanTip[];
  onAddTip: (tip: Omit<FanTip, 'id' | 'createdAt' | 'upvotes' | 'status'>) => void;
  onSelectStadiumId?: (stadiumId: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  guides,
  fanTips,
  onAddTip,
  onSelectStadiumId
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<ArticleGuide | null>(null);
  const [showTipModal, setShowTipModal] = useState(false);

  // Tip form state
  const [tipAuthor, setTipAuthor] = useState('');
  const [tipCategory, setTipCategory] = useState<'travel' | 'pub' | 'food' | 'atmosphere'>('travel');
  const [tipVenue, setTipVenue] = useState('Tottenham Hotspur Stadium');
  const [tipContent, setTipContent] = useState('');
  const [tipSuccess, setTipSuccess] = useState(false);

  const categories = ['All', 'MATCHDAY GUIDES', 'PUBS', 'AWAY DAYS', 'FEATURES'];

  const filteredGuides = guides.filter((g) => {
    const matchesCat =
      selectedCategory === 'All'
        ? true
        : g.category.toUpperCase() === selectedCategory.toUpperCase();
    const matchesSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleTipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipContent.trim()) return;

    onAddTip({
      authorName: tipAuthor.trim() || 'Spurs Fan',
      venueId: 'tottenham-hotspur-stadium',
      venueName: tipVenue,
      category: tipCategory,
      content: tipContent.trim()
    });

    setTipContent('');
    setShowTipModal(false);
    setTipSuccess(true);
    setTimeout(() => setTipSuccess(false), 4000);
  };

  return (
    <div id="explore-screen" className="space-y-5 pb-16 animate-in fade-in duration-300">
      {/* View Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0a1c3d] tracking-tight">
          Explore & Guides
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Curated matchday guides, pub crawl features, and crowd-sourced intelligence from fellow Spurs supporters.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          id="explore-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search matchday guides, tips, articles..."
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

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 text-xs font-semibold">
        {categories.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              id={`explore-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
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

      {/* Hero Featured Guide matching master high-contrast style */}
      {filteredGuides.length > 0 && selectedCategory === 'All' && !searchQuery && (
        <div
          id="featured-guide-card"
          onClick={() => setActiveArticle(filteredGuides[0])}
          className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-md active:scale-[0.99] transition-all border border-slate-200"
        >
          <img
            src={filteredGuides[0].featuredImage}
            alt={filteredGuides[0].title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071938] via-[#071938]/60 to-transparent" />

          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-[#4ea8de] text-[#071938] text-[10px] font-black uppercase tracking-wider shadow-xs">
              FEATURED STORY
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[10px] font-bold text-slate-200 flex items-center gap-1 mb-1">
              <Clock className="w-3 h-3 text-[#4ea8de]" />
              {filteredGuides[0].readTime} • {filteredGuides[0].category}
            </span>
            <h3 className="text-lg sm:text-xl font-black leading-tight mb-1 group-hover:text-[#4ea8de] transition-colors">
              {filteredGuides[0].title}
            </h3>
            <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
              {filteredGuides[0].summary}
            </p>
          </div>
        </div>
      )}

      {/* Guide Cards Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Articles & Supporter Stories
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              id={`guide-card-${guide.id}`}
              onClick={() => setActiveArticle(guide)}
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md cursor-pointer shadow-xs active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img
                    src={guide.featuredImage}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                      {guide.category}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.readTime}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#0a1c3d] group-hover:text-[#0284c7] transition-colors leading-snug">
                    {guide.title}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Fan Tips Community Board in crisp white card */}
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-100 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-black text-[#0a1c3d] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0284c7]" />
              <span>Supporter Tips & Intel</span>
            </h3>
            <p className="text-[11px] text-slate-500">Verified crowd knowledge from the Spurs family</p>
          </div>

          <button
            id="explore-share-tip-btn"
            onClick={() => setShowTipModal(true)}
            className="px-3 py-1.5 rounded-xl bg-[#4ea8de] hover:bg-[#38bdf8] text-[#071938] font-black text-xs flex items-center gap-1 shadow-xs transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Share Tip</span>
          </button>
        </div>

        {tipSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            Cheers! Your matchday tip has been posted to the community board.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {fanTips.filter(t => t.status === 'APPROVED').map((tip) => (
            <div
              key={tip.id}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {tip.authorAvatar ? (
                    <img
                      src={tip.authorAvatar}
                      alt={tip.authorName}
                      className="w-6 h-6 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#071938] text-[10px] font-bold text-white flex items-center justify-center">
                      {tip.authorName.charAt(0)}
                    </div>
                  )}
                  <span className="text-xs font-bold text-[#0a1c3d]">{tip.authorName}</span>
                </div>

                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  {tip.category}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                "{tip.content}"
              </p>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/60">
                <span>{tip.venueName}</span>
                <span className="flex items-center gap-1 font-semibold text-slate-600">
                  <ThumbsUp className="w-3 h-3 text-[#0284c7]" />
                  {tip.upvotes}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ARTICLE READER MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Header image */}
            <div className="relative h-56 sm:h-64 w-full flex-shrink-0">
              <img
                src={activeArticle.featuredImage}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center transition-all z-10 shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4ea8de] block mb-1">
                  {activeArticle.category} • {activeArticle.readTime}
                </span>
                <h2 className="text-xl sm:text-2xl font-black leading-tight">
                  {activeArticle.title}
                </h2>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-slate-700">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-100">
                <span>By {activeArticle.author}</span>
                <span>Published {activeArticle.publishedAt}</span>
              </div>

              <p className="text-sm font-semibold text-slate-800 italic">
                {activeArticle.subtitle}
              </p>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {activeArticle.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {activeArticle.relatedStadiumId && onSelectStadiumId && (
                <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#0a1c3d] block">Heading to this ground?</span>
                    <span className="text-[11px] text-slate-500">View complete transport, pub & ticket dossier</span>
                  </div>
                  <button
                    onClick={() => {
                      const id = activeArticle.relatedStadiumId!;
                      setActiveArticle(null);
                      onSelectStadiumId(id);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#4ea8de] text-[#071938] font-bold text-xs hover:bg-[#38bdf8] transition-colors"
                  >
                    Open Ground Guide
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SHARE TIP MODAL */}
      {showTipModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-black text-[#0a1c3d]">Share Matchday Intel</h3>
              <button
                onClick={() => setShowTipModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleTipSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Your Name / Handle</label>
                <input
                  type="text"
                  value={tipAuthor}
                  onChange={(e) => setTipAuthor(e.target.value)}
                  placeholder="e.g. Harry_N17"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Category</label>
                <select
                  value={tipCategory}
                  onChange={(e) => setTipCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                >
                  <option value="travel">Travel & Transit</option>
                  <option value="pub">Pubs & Drinking</option>
                  <option value="food">Matchday Food</option>
                  <option value="atmosphere">Matchday Atmosphere</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Venue / Match</label>
                <input
                  type="text"
                  value={tipVenue}
                  onChange={(e) => setTipVenue(e.target.value)}
                  placeholder="e.g. Tottenham Hotspur Stadium, Old Trafford, Anfield..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">Your Matchday Advice</label>
                <textarea
                  rows={3}
                  value={tipContent}
                  onChange={(e) => setTipContent(e.target.value)}
                  placeholder="Tell fellow Spurs fans about shortcuts, hidden bars, queue tips, or turnstile advice..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#4ea8de] hover:bg-[#38bdf8] text-[#071938] font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Tip to Community</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
