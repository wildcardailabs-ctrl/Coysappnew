import React, { useState } from 'react';
import { 
  X, 
  Ticket, 
  Smartphone, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  Copy, 
  Check, 
  Luggage, 
  Users, 
  Sparkles,
  QrCode,
  Info,
  ArrowUpRight
} from 'lucide-react';
import { Fixture } from '../types';

interface TicketPassHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  fixture?: Fixture;
  clientRefNumber?: string;
}

export const TicketPassHubModal: React.FC<TicketPassHubModalProps> = ({
  isOpen,
  onClose,
  fixture,
  clientRefNumber = '7482910'
}) => {
  const [copiedCRN, setCopiedCRN] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'pass' | 'exchange' | 'policy'>('pass');
  const [walletFeedback, setWalletFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyCRN = () => {
    navigator.clipboard.writeText(clientRefNumber);
    setCopiedCRN(true);
    setTimeout(() => setCopiedCRN(false), 2000);
  };

  const handleOpenAppleWallet = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      window.location.href = 'shoebox://';
    } else {
      setWalletFeedback('Apple Wallet passes are stored on your iPhone or Apple Watch. Download your match pass from your Spurs confirmation email.');
      setTimeout(() => setWalletFeedback(null), 5000);
    }
  };

  const handleOpenGoogleWallet = () => {
    window.open('https://wallet.google.com/', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="ticket-pass-hub-modal"
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
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
              Official Hub
            </span>
            <span className="text-xs text-white/70">Tottenham Hotspur Matchday</span>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
            Digital Pass & Ticket Hub
          </h2>
          <p className="text-xs text-white/80 mt-0.5">
            Launch your Apple/Google Wallet pass, find offline turnstile gates & access Ticket Exchange
          </p>

          {/* Sub Navigation Bar */}
          <div className="flex items-center gap-2 mt-4">
            {[
              { id: 'pass', label: 'Wallet & Turnstile Pass' },
              { id: 'exchange', label: 'Ticket Exchange (TX)' },
              { id: 'policy', label: 'Bag Policy' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeSubTab === tab.id
                    ? 'bg-white text-[#071938] shadow-sm'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: DIGITAL WALLET PASS */}
          {activeSubTab === 'pass' && (
            <div className="space-y-4">
              {/* Wallet Direct Launch Buttons */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  1-Tap Matchday Wallet Launch
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleOpenAppleWallet}
                    className="p-3 rounded-2xl bg-black hover:bg-neutral-800 text-white flex items-center justify-between transition-all shadow-sm cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center font-black text-sm">
                        
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-black block leading-none">Apple Wallet</span>
                        <span className="text-[10px] text-white/70">Open on iPhone / Watch</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                  </button>

                  <button
                    onClick={handleOpenGoogleWallet}
                    className="p-3 rounded-2xl bg-[#1e293b] hover:bg-[#0f172a] text-white flex items-center justify-between transition-all shadow-sm cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#4285f4] flex items-center justify-center font-black text-xs text-white shadow-xs">
                        G
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-black block leading-none">Google Wallet</span>
                        <span className="text-[10px] text-white/70">Open on Android / Web</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                  </button>
                </div>

                {walletFeedback && (
                  <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900 animate-in fade-in flex items-start gap-2">
                    <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{walletFeedback}</span>
                  </div>
                )}
              </div>

              {/* Offline Matchday Seat & Gate Companion */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#071938] via-[#0c2450] to-[#071938] text-white p-5 shadow-lg border border-[#1b3d75] overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#38bdf8] uppercase tracking-wider block">
                      Offline Concourse & Turnstile Companion
                    </span>
                    <h3 className="text-base font-black text-white">Tottenham Hotspur Stadium</h3>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-[#38bdf8]" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center my-3">
                  <div>
                    <span className="text-[10px] text-white/60 block font-semibold">STAND</span>
                    <span className="text-xs sm:text-sm font-black text-white">South Stand</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/60 block font-semibold">BLOCK</span>
                    <span className="text-xs sm:text-sm font-black text-[#38bdf8]">Block 254</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/60 block font-semibold">TURNSTILES</span>
                    <span className="text-xs sm:text-sm font-black text-emerald-400">Gates 5–11</span>
                  </div>
                </div>

                {/* Important Turnstile Security Notice */}
                <div className="pt-2 text-[11px] text-white/80 leading-relaxed bg-white/5 rounded-xl p-2.5 border border-white/10">
                  <div className="flex items-center gap-1.5 font-bold text-[#38bdf8] mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Official Turnstile Entry Rule</span>
                  </div>
                  <p>
                    Spurs turnstiles use encrypted contactless NFC (Apple VAS / Google Smart Tap). Screens or photos will not scan. Always tap your phone with your native Apple Wallet or Google Wallet pass open.
                  </p>
                </div>
              </div>

              {/* Client Reference Number Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Your Client Reference Number (CRN)
                  </span>
                  <span className="text-sm font-black text-[#0a1c3d] tracking-wider font-mono">
                    {clientRefNumber}
                  </span>
                </div>
                <button
                  onClick={handleCopyCRN}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
                >
                  {copiedCRN ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCRN ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Quick Official Links */}
              <div className="space-y-2">
                <a
                  href="https://www.eticketing.co.uk/tottenhamhotspur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#0a1c3d] hover:bg-[#0284c7] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <span>Open Spurs eTicketing Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-[11px] text-center text-slate-400">
                  Login to download or re-send your One Hotspur pass to your phone.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TICKET EXCHANGE & FORWARDING */}
          {activeSubTab === 'exchange' && (
            <div className="space-y-4">
              {/* Ticket Exchange Live Status */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                    TX Live
                  </span>
                  <span className="text-xs font-bold text-emerald-800">
                    Official Resale Open
                  </span>
                </div>
                <h4 className="text-sm font-bold text-emerald-950">
                  Spurs Ticket Exchange is Active
                </h4>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Season ticket holders who cannot attend have returned seats to the exchange. Verified One Hotspur & One Hotspur+ members can purchase tickets directly at face value with 0% resale markups.
                </p>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 pt-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Single seats frequently pop up in South Lower & West Stand.</span>
                </div>
              </div>

              {/* Ticket Forwarding Deadline Box */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Guest Forwarding Cutoff Notice</span>
                </div>
                <p className="text-amber-800 leading-relaxed">
                  If you are forwarding your ticket to a friend or family member within your Spurs Network, forwarding closes <strong>3 hours before kick-off</strong>.
                </p>
                <div className="p-2.5 rounded-lg bg-white border border-amber-200/80 text-[11px] text-amber-900 font-medium">
                  Recipients must have an active Tottenham Hotspur account linked to your network prior to cutoff.
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="https://www.eticketing.co.uk/tottenhamhotspur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#0a1c3d] hover:bg-[#0284c7] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs text-center"
                >
                  <span>Browse Ticket Exchange</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://www.tottenhamhotspur.com/tickets/ticket-exchange-and-ticket-share/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <span>Forwarding Guide & Rules</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 3: BAG POLICY & ENTRY RULES */}
          {activeSubTab === 'policy' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-2">
                <div className="flex items-center gap-2 text-rose-900 font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Strict Stadium Bag Policy</span>
                </div>
                <p className="text-rose-800 leading-relaxed">
                  Backpacks, rucksacks, laptop bags, and any non-transparent luggage exceeding A4 size (30cm x 30cm) will <strong>NOT</strong> be permitted through turnstiles.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Permitted
                  </span>
                  <ul className="space-y-1 text-slate-600 text-[11px]">
                    <li>• Clear A4 transparent carrier bags</li>
                    <li>• Small clutches under 30cm x 30cm</li>
                    <li>• Bags bought from official Spurs Shop</li>
                    <li>• Medically required equipment</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="font-bold text-rose-700 flex items-center gap-1">
                    <X className="w-4 h-4" /> Strictly Prohibited
                  </span>
                  <ul className="space-y-1 text-slate-600 text-[11px]">
                    <li>• Standard rucksacks & schoolbags</li>
                    <li>• Laptop cases & briefcases</li>
                    <li>• Large golf umbrellas</li>
                    <li>• Suitcases / travel holdalls</li>
                  </ul>
                </div>
              </div>

              {/* Bag Drop reminder */}
              <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 space-y-1">
                <span className="font-bold text-[#0284c7] block flex items-center gap-1.5">
                  <Luggage className="w-4 h-4" /> Need to store a bag?
                </span>
                <p className="text-sky-800 text-[11px] leading-relaxed">
                  Use the official matchday Bag Drop opposite Tottenham Police Station on High Road (£10 per bag, opens 3h before KO, closes 1h after final whistle).
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
