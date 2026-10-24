import React, { useState } from 'react';
import { 
  X, Star, MapPin, Clock, Phone, Globe, Navigation, 
  Heart, Check, MessageSquare, Send 
} from 'lucide-react';
import { PubVenue, UserReview } from '../types';

interface PubDetailModalProps {
  pub: PubVenue;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  reviews: UserReview[];
  onAddReview: (review: Omit<UserReview, 'id' | 'date' | 'status'>) => void;
}

export const PubDetailModal: React.FC<PubDetailModalProps> = ({
  pub,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  reviews,
  onAddReview
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  if (!isOpen) return null;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onAddReview({
      authorName: userName.trim() || 'Spurs Supporter',
      venueId: pub.id,
      venueName: pub.name,
      rating,
      atmosphere: rating,
      service: 5,
      comment: comment.trim()
    });

    setComment('');
    setShowReviewForm(false);
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  const pubReviews = reviews.filter(r => r.venueId === pub.id);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 overflow-y-auto">
      <div 
        id="pub-detail-modal"
        className="relative w-full max-w-lg bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300"
      >
        {/* Modal Image Hero */}
        <div className="relative h-48 sm:h-56 w-full flex-shrink-0 bg-slate-100">
          <img
            src={pub.image}
            alt={pub.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

          {/* Close Button */}
          <button
            id="pub-modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center transition-all z-10 shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Save Button */}
          <button
            id="pub-modal-save-btn"
            onClick={onToggleSave}
            aria-label="Save venue"
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center transition-all z-10 shadow-md"
          >
            <Heart
              className={`w-5 h-5 transition-transform active:scale-125 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`}
            />
          </button>

          {/* Badges on hero */}
          <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center gap-1.5">
            {pub.badges.map((b, i) => (
              <span
                key={i}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#4ea8de] text-[#071938] shadow-xs"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-slate-700">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-[#0a1c3d] tracking-tight">
                {pub.name}
              </h3>
              <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-xl border border-amber-200 text-xs font-black">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{pub.rating}</span>
                <span className="text-[10px] text-slate-500 font-normal">({pub.reviewsCount})</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>{pub.address}, {pub.postcode}</span>
              <span className="text-[#0a1c3d] font-bold ml-2">• {pub.distance} ({pub.walkTime})</span>
            </p>
          </div>

          {/* Quick Action Buttons: Get Directions, Call, Website */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            <a
              id="pub-get-directions-btn"
              href={pub.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-[#4ea8de] hover:bg-[#38bdf8] text-[#071938] font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>

            {pub.phone && (
              <a
                href={`tel:${pub.phone}`}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0a1c3d] font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Call Venue</span>
              </a>
            )}

            {pub.website && (
              <a
                href={pub.website}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0a1c3d] font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Website</span>
              </a>
            )}
          </div>

          {/* Editorial Summary */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#0a1c3d] uppercase tracking-wider text-[10px]">
                COYS Matchday Guide
              </span>
              {pub.verifiedByCoys && (
                <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-bold">
                  <Check className="w-3 h-3 text-emerald-600" />
                  Verified by COYS
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {pub.editorialSummary}
            </p>

            {pub.foodStyle && (
              <div className="pt-2 text-xs border-t border-slate-200/60">
                <span className="font-semibold text-slate-500">Matchday Food: </span>
                <span className="text-[#0a1c3d] font-medium">{pub.foodStyle}</span>
              </div>
            )}

            {pub.beersServed.length > 0 && (
              <div className="text-xs">
                <span className="font-semibold text-slate-500">On Tap: </span>
                <span className="text-[#0a1c3d] font-medium">{pub.beersServed.join(', ')}</span>
              </div>
            )}
          </div>

          {/* Opening Times */}
          <div className="flex items-center gap-2 text-xs text-slate-600 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <Clock className="w-4 h-4 text-[#0284c7]" />
            <div>
              <span className="font-bold text-[#0a1c3d]">Opening Hours: </span>
              <span>{pub.openingHours}</span>
            </div>
          </div>

          {/* Fan Reviews Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0a1c3d] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Supporter Reviews</span>
              </h4>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-xs font-bold text-[#0284c7] hover:underline cursor-pointer"
              >
                {showReviewForm ? 'Cancel' : '+ Leave Review'}
              </button>
            </div>

            {submittedMessage && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                Thank you! Your review has been added.
              </div>
            )}

            {/* Review submission form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Your Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Gary N17"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0284c7]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setRating(num)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                          rating >= num ? 'bg-amber-400 text-black' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {num}★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1">Matchday Experience</label>
                  <textarea
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Pints, queues, matchday vibes..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0284c7]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#4ea8de] hover:bg-[#38bdf8] text-[#071938] font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-2">
              {pubReviews.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No supporter reviews yet. Be the first to share your experience!</p>
              ) : (
                pubReviews.map((rev) => (
                  <div key={rev.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#0a1c3d]">{rev.authorName}</span>
                      <span className="text-amber-500 font-bold">{rev.rating}★</span>
                    </div>
                    <p className="text-xs text-slate-600">{rev.comment}</p>
                    <span className="text-[10px] text-slate-400 block">{rev.date}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
