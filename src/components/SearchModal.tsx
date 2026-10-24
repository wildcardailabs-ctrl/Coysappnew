import React, { useState } from 'react';
import { Search, X, Calendar, Landmark, Beer, BookOpen, ChevronRight } from 'lucide-react';
import { Fixture, Venue, PubVenue, ArticleGuide } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  fixtures: Fixture[];
  stadiums: Venue[];
  pubs: PubVenue[];
  guides: ArticleGuide[];
  onSelectFixture: (f: Fixture) => void;
  onSelectStadium: (s: Venue) => void;
  onSelectPub: (p: PubVenue) => void;
  onSelectGuide: (g: ArticleGuide) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  fixtures,
  stadiums,
  pubs,
  guides,
  onSelectFixture,
  onSelectStadium,
  onSelectPub,
  onSelectGuide
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedFixtures = q
    ? fixtures.filter(f => f.homeTeam.name.toLowerCase().includes(q) || f.awayTeam.name.toLowerCase().includes(q) || f.competition.toLowerCase().includes(q))
    : [];

  const matchedStadiums = q
    ? stadiums.filter(s => s.name.toLowerCase().includes(q) || s.club.toLowerCase().includes(q) || s.city.toLowerCase().includes(q))
    : [];

  const matchedPubs = q
    ? pubs.filter(p => p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
    : [];

  const matchedGuides = q
    ? guides.filter(g => g.title.toLowerCase().includes(q) || g.summary.toLowerCase().includes(q))
    : [];

  const hasResults = matchedFixtures.length > 0 || matchedStadiums.length > 0 || matchedPubs.length > 0 || matchedGuides.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 pt-16 sm:pt-24">
      <div 
        id="global-search-modal"
        className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Search Input Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#0284c7]" />
          <input
            id="global-search-input"
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fixtures, pubs, away stadiums, guides..."
            className="flex-1 bg-transparent text-sm text-[#0a1c3d] placeholder-slate-400 focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-semibold text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 text-slate-700 flex items-center justify-center hover:bg-slate-300 cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {!q ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              Type anything to search the COYS database (e.g. "South Stand", "Bricklayers", "Old Trafford", "Overground", "Tickets")...
            </div>
          ) : !hasResults ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No results found for "{query}". Try checking the spelling or searching another club.
            </div>
          ) : (
            <div className="space-y-4">
              {/* Fixtures */}
              {matchedFixtures.length > 0 && (
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0284c7] block mb-1">
                    Fixtures
                  </span>
                  <div className="space-y-1">
                    {matchedFixtures.map(f => (
                      <div
                        key={f.id}
                        onClick={() => {
                          onSelectFixture(f);
                          onClose();
                        }}
                        className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 flex items-center justify-between text-xs cursor-pointer shadow-xs transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <Calendar className="w-4 h-4 text-[#0284c7]" />
                          <span className="font-bold text-[#0a1c3d]">{f.homeTeam.shortName} vs {f.awayTeam.shortName}</span>
                          <span className="text-slate-400 text-[11px]">• {f.date}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pubs */}
              {matchedPubs.length > 0 && (
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block mb-1">
                    Pubs & Venues
                  </span>
                  <div className="space-y-1">
                    {matchedPubs.map(p => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectPub(p);
                          onClose();
                        }}
                        className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 flex items-center justify-between text-xs cursor-pointer shadow-xs transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <Beer className="w-4 h-4 text-amber-500" />
                          <span className="font-bold text-[#0a1c3d]">{p.name}</span>
                          <span className="text-slate-400 text-[11px]">• {p.distance} ({p.walkTime})</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stadiums */}
              {matchedStadiums.length > 0 && (
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block mb-1">
                    Stadiums & Grounds
                  </span>
                  <div className="space-y-1">
                    {matchedStadiums.map(s => (
                      <div
                        key={s.id}
                        onClick={() => {
                          onSelectStadium(s);
                          onClose();
                        }}
                        className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 flex items-center justify-between text-xs cursor-pointer shadow-xs transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <Landmark className="w-4 h-4 text-emerald-600" />
                          <span className="font-bold text-[#0a1c3d]">{s.name}</span>
                          <span className="text-slate-400 text-[11px]">• {s.club} ({s.city})</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Guides */}
              {matchedGuides.length > 0 && (
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0284c7] block mb-1">
                    Matchday Guides
                  </span>
                  <div className="space-y-1">
                    {matchedGuides.map(g => (
                      <div
                        key={g.id}
                        onClick={() => {
                          onSelectGuide(g);
                          onClose();
                        }}
                        className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-100 flex items-center justify-between text-xs cursor-pointer shadow-xs transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <BookOpen className="w-4 h-4 text-[#0284c7]" />
                          <span className="font-bold text-[#0a1c3d]">{g.title}</span>
                          <span className="text-slate-400 text-[11px]">• {g.category}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
