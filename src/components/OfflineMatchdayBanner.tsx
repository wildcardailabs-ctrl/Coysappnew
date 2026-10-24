import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Download, 
  Check, 
  ShieldAlert, 
  Phone, 
  Ticket, 
  MapPin, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { OfflineCacheService, MatchdayOfflineBundle } from '../services/offlineCache';
import { PubVenue } from '../types';

interface OfflineMatchdayBannerProps {
  savedPubs?: PubVenue[];
}

export const OfflineMatchdayBanner: React.FC<OfflineMatchdayBannerProps> = ({ savedPubs = [] }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [forceOffline, setForceOffline] = useState<boolean>(OfflineCacheService.isForceOfflineMode());
  const [bundle, setBundle] = useState<MatchdayOfflineBundle | null>(OfflineCacheService.getOfflineBundle());
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [justSaved, setJustSaved] = useState<boolean>(false);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const effectiveOffline = !isOnline || forceOffline;

  const handleSaveMatchdayPack = () => {
    const newBundle = OfflineCacheService.createAndSaveDefaultBundle(savedPubs);
    setBundle(newBundle);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 3000);
  };

  const handleToggleForceOffline = () => {
    const newStatus = !forceOffline;
    setForceOffline(newStatus);
    OfflineCacheService.setForceOfflineMode(newStatus);
  };

  return (
    <>
      {/* Top Matchday Network Status Strip */}
      <div className={`transition-colors py-2 px-4 border-b ${
        effectiveOffline 
          ? 'bg-amber-500 text-slate-950 border-amber-600' 
          : 'bg-[#06142e] text-slate-200 border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            {effectiveOffline ? (
              <span className="inline-flex items-center gap-1 font-black bg-slate-950 text-amber-400 px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
                <WifiOff className="w-3 h-3" />
                Low-Signal Matchday Mode Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 font-bold text-slate-300">
                <Wifi className="w-3 h-3 text-emerald-400" />
                Stadium Network Online
              </span>
            )}
            <span className="hidden sm:inline opacity-90 text-[11px]">
              {effectiveOffline 
                ? 'All ticket, concourse maps, and emergency contacts running 100% from offline cache.'
                : '62,000 fans expected. Pre-cache your matchday essentials before turnstile congestion.'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Download / Cache Pack button */}
            <button
              onClick={handleSaveMatchdayPack}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all ${
                effectiveOffline
                  ? 'bg-slate-950 text-white hover:bg-slate-800'
                  : 'bg-[#4ea8de] text-[#06142e] hover:bg-[#3897cd]'
              }`}
            >
              {justSaved ? (
                <>
                  <Check className="w-3 h-3" />
                  Cached!
                </>
              ) : (
                <>
                  <Download className="w-3 h-3" />
                  {bundle ? 'Update Matchday Pack' : 'Save for Matchday (Offline)'}
                </>
              )}
            </button>

            {/* Quick Access to Emergency & Ticket Hub */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                effectiveOffline
                  ? 'bg-amber-400 border-slate-900 text-slate-950 hover:bg-amber-300'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
            >
              Emergency & Ticket Pass
            </button>

            {/* Simulation toggle */}
            <button
              onClick={handleToggleForceOffline}
              title="Test low-signal offline behavior"
              className="opacity-70 hover:opacity-100 text-[10px] underline ml-1 cursor-pointer hidden md:inline"
            >
              {forceOffline ? 'Exit Offline Sim' : 'Simulate Low Signal'}
            </button>
          </div>
        </div>
      </div>

      {/* Offline Matchday Drawer / Modal */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#0a1c3d] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      Zero-Signal Matchday Protocol
                    </span>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
                      Works 100% Offline
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-black tracking-tight">
                    Emergency Contacts & Digital Ticket Stub
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto space-y-5">
              {/* Cached Ticket Stub */}
              <div className="border-2 border-dashed border-[#0284c7]/40 bg-blue-50/40 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-[#0284c7]" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                      Cached Digital Seat Stub
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Ready For Scanning
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-blue-100 text-center">
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">Block</span>
                    <p className="text-sm font-black text-slate-900">{bundle?.ticket.block || 'Block 254'}</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">Row</span>
                    <p className="text-sm font-black text-slate-900">{bundle?.ticket.row || 'Row 18'}</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">Seat</span>
                    <p className="text-sm font-black text-slate-900">{bundle?.ticket.seat || 'Seat 104'}</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-100">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">Turnstiles</span>
                    <p className="text-sm font-black text-slate-900">{bundle?.ticket.turnstile || 'Gates 8-11'}</p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 text-center font-medium">
                  {bundle?.ticket.entryGate || 'South Stand Atrium (Gate 6)'} • Have screen brightness turned up when approaching optical scanner
                </p>
              </div>

              {/* Matchday Emergency Helplines */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Official Matchday Helplines & Safety:
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Direct dial works even on 2G voice
                  </span>
                </div>

                <div className="space-y-2.5">
                  {bundle?.emergencyContacts.map((contact, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl p-3.5 bg-white space-y-1.5 hover:border-slate-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <h5 className="font-bold text-slate-900 text-xs">{contact.service}</h5>
                        <a 
                          href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
                        >
                          <Phone className="w-3 h-3 text-emerald-600" />
                          {contact.phone}
                        </a>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {contact.description}
                      </p>
                      {contact.textService && (
                        <div className="bg-slate-50 p-2 rounded-lg text-[11px] font-semibold text-slate-700 border border-slate-100">
                          📱 {contact.textService}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stadium Low-Signal Offline Protocols */}
              <div className="bg-[#f4f7fb] border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
                <span className="font-bold text-slate-900">Offline Stadium Tips:</span>
                <ul className="space-y-1 text-slate-600 list-disc list-inside">
                  <li><strong>Free Stadium Wi-Fi:</strong> Connect to network <code>THFC_Official_Fan</code> across all concourse levels if 4G/5G signals drop.</li>
                  <li><strong>Meeting Point:</strong> The Golden Cockerel Clock in South Stand Market Place is the primary post-match rendezvous location.</li>
                  <li><strong>Cashless:</strong> Physical contactless cards work without requiring cell reception on your phone.</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Last cached: {bundle?.cachedAt || 'Just now'}
              </span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Close Emergency Card
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
