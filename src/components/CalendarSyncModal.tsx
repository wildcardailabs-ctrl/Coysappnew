import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Download, 
  ExternalLink, 
  Check, 
  Sparkles, 
  Smartphone, 
  Clock,
  Radio
} from 'lucide-react';
import { Fixture } from '../types';
import { downloadFixturesIcs, getGoogleCalendarUrl } from '../utils/calendarSync';

interface CalendarSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  fixtures: Fixture[];
  nextFixture: Fixture;
}

export const CalendarSyncModal: React.FC<CalendarSyncModalProps> = ({
  isOpen,
  onClose,
  fixtures,
  nextFixture
}) => {
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const upcomingFixtures = fixtures.filter(f => f.status === 'UPCOMING');

  const handleDownloadAll = () => {
    downloadFixturesIcs(upcomingFixtures);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="calendar-sync-modal"
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
      >
        {/* Header Banner */}
        <div className="bg-[#071938] text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] text-[10px] font-black uppercase tracking-wider border border-[#38bdf8]/30">
              One-Tap Sync
            </span>
            <span className="text-xs text-white/70">Automatic Fixture Updates</span>
          </div>

          <h2 className="text-lg font-black text-white tracking-tight">
            Sync Spurs Fixtures (.ics)
          </h2>
          <p className="text-xs text-white/80 mt-0.5">
            Add official kick-off times and TV broadcast channels straight to your phone's calendar
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Main Action: Download Full .ics */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-50 to-slate-50 border border-sky-100 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#0a1c3d]">
                  Full Season Fixtures ({upcomingFixtures.length} Matches)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Standard RFC 5545 .ics file for iPhone Apple Calendar, Outlook & Google
                </p>
              </div>
              <Calendar className="w-5 h-5 text-[#0284c7] shrink-0" />
            </div>

            <button
              onClick={handleDownloadAll}
              className="w-full py-3 px-4 rounded-xl bg-[#0a1c3d] hover:bg-[#0284c7] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
            >
              {downloaded ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
              <span>{downloaded ? 'Calendar File Downloaded!' : 'Download .ics Calendar File'}</span>
            </button>
          </div>

          {/* Quick Option: Next Match in Google Calendar */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#0a1c3d]">Next Match 1-Click:</span>
              <span className="text-[10px] text-slate-400 font-semibold">{nextFixture.date}</span>
            </div>

            <p className="text-slate-600 text-[11px]">
              {nextFixture.homeTeam.shortName} vs {nextFixture.awayTeam.shortName} ({nextFixture.kickoffTime})
            </p>

            <a
              href={getGoogleCalendarUrl(nextFixture)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors text-center"
            >
              <span>Add Next Game to Google Calendar</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Device Setup Guide */}
          <div className="space-y-2 pt-1">
            <h4 className="font-bold text-slate-700 text-xs flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#0284c7]" />
              <span>How it works on your phone:</span>
            </h4>
            <div className="space-y-1.5 text-slate-600 text-[11px] leading-relaxed">
              <p>• <strong>iPhone / Apple Calendar:</strong> Tap the download button above, open the downloaded file, and tap "Add All" to instantly populate your iOS calendar.</p>
              <p>• <strong>Google / Android:</strong> Import into Google Calendar under Settings &gt; Import & Export &gt; Select from computer.</p>
              <p>• <strong>TV Rescheduling:</strong> Reminders include kick-off changes whenever fixtures move for broadcast.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
