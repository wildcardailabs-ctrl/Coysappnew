import React, { useState } from 'react';
import { 
  X, 
  Users, 
  MapPin, 
  Clock, 
  Share2, 
  Copy, 
  Check, 
  Beer, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { PubVenue } from '../types';

export interface GroupMeetupData {
  id: string;
  venueName: string;
  area: string;
  meetTime: string;
  note: string;
  mates: string[];
  createdAt: number;
}

interface PreMatchMeetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  pubs: PubVenue[];
  selectedPub?: PubVenue | null;
  onSaveMeetup?: (meetup: GroupMeetupData) => void;
}

export const PreMatchMeetupModal: React.FC<PreMatchMeetupModalProps> = ({
  isOpen,
  onClose,
  pubs,
  selectedPub,
  onSaveMeetup
}) => {
  const [selectedPubName, setSelectedPubName] = useState<string>(
    selectedPub ? selectedPub.name : 'The Bricklayers Arms'
  );
  const [specificArea, setSpecificArea] = useState('Beer Garden / Back Yard');
  const [meetTime, setMeetTime] = useState('12:30 PM (2h before KO)');
  const [note, setNote] = useState('First round on me! Table by the outdoor screens.');
  const [newMateName, setNewMateName] = useState('');
  const [mates, setMates] = useState<string[]>(['Liam', 'Dan', 'Sophie']);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  if (!isOpen) return null;

  const handleAddMate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMateName.trim() && !mates.includes(newMateName.trim())) {
      setMates([...mates, newMateName.trim()]);
      setNewMateName('');
    }
  };

  const handleRemoveMate = (name: string) => {
    setMates(mates.filter(m => m !== name));
  };

  const meetupText = `⚪ COYS Matchday Meetup!
🍻 Where: ${selectedPubName} (${specificArea})
⏰ Time: ${meetTime}
👥 Supporters: ${mates.join(', ')}
💬 Note: ${note}
📍 Coordinate live via COYS Spurs Companion!`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(meetupText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Clipboard copy failed', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `COYS Spurs Meetup at ${selectedPubName}`,
          text: meetupText
        });
        setShared(true);
        setTimeout(() => setShared(false), 2500);
        return;
      } catch (err) {
        // Fallback to copy
      }
    }
    handleCopy();
  };

  const handleSave = () => {
    const data: GroupMeetupData = {
      id: `meetup-${Date.now()}`,
      venueName: selectedPubName,
      area: specificArea,
      meetTime,
      note,
      mates,
      createdAt: Date.now()
    };
    if (onSaveMeetup) onSaveMeetup(data);
    handleCopy();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="pre-match-meetup-modal"
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-[#071938] text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] text-[10px] font-black uppercase tracking-wider border border-[#38bdf8]/30">
              Where's The Mates?
            </span>
            <span className="text-xs text-white/70">Group Coordinator</span>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
            Pre-Match Supporter Meetup
          </h2>
          <p className="text-xs text-white/80 mt-0.5">
            Coordinate your matchday group, pick a pub spot & share a one-tap WhatsApp / iMessage invite
          </p>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Form */}
          <div className="space-y-3">
            {/* Select Pub */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Meeting Pub / Venue
              </label>
              <select
                value={selectedPubName}
                onChange={(e) => setSelectedPubName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white"
              >
                {pubs.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Area Inside Pub */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Specific Spot
                </label>
                <input
                  type="text"
                  value={specificArea}
                  onChange={(e) => setSpecificArea(e.target.value)}
                  placeholder="e.g. Beer Garden, Front Bar"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  Meetup Time
                </label>
                <input
                  type="text"
                  value={meetTime}
                  onChange={(e) => setMeetTime(e.target.value)}
                  placeholder="e.g. 12:30 PM (2h before KO)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                />
              </div>
            </div>

            {/* Group Mates Chips */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Who's In? ({mates.length} Mates)
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {mates.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 text-[#0284c7] border border-sky-200 font-bold text-xs"
                  >
                    <span>{m}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMate(m)}
                      className="hover:text-rose-600 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add mate form */}
              <form onSubmit={handleAddMate} className="flex gap-2">
                <input
                  type="text"
                  value={newMateName}
                  onChange={(e) => setNewMateName(e.target.value)}
                  placeholder="Add friend name (e.g. Charlie, Tom)..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>
            </div>

            {/* Note */}
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Note / Message for Group
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Grabbed a table out back, pints are flowing"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white"
              />
            </div>
          </div>

          {/* Generated Invite Preview */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-400 tracking-wider">
              <span>Preview Share Message</span>
              <span className="text-[#0284c7]">Ready for WhatsApp / iMessage</span>
            </div>
            <pre className="text-[11px] font-mono whitespace-pre-wrap text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80">
              {meetupText}
            </pre>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleShare}
              className="flex-1 py-3 px-4 rounded-xl bg-[#0a1c3d] hover:bg-[#0284c7] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{shared ? 'Shared!' : 'Share to WhatsApp / Mates'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
