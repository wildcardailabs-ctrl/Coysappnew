import React from 'react';
import { Bell, X, AlertTriangle, Train, Calendar, Ticket, Check } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewTravel: () => void;
  onViewTickets: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onViewTravel,
  onViewTickets
}) => {
  if (!isOpen) return null;

  const alerts = [
    {
      id: 'al-1',
      title: 'TfL Matchday Travel Notice',
      category: 'Travel',
      icon: Train,
      color: 'text-[#0284c7]',
      time: '12 mins ago',
      desc: 'White Hart Lane Station queues will operate queue management after full-time. Fans travelling towards Central London are advised to also consider Seven Sisters.',
      action: onViewTravel,
      actionText: 'View Transit Map'
    },
    {
      id: 'al-2',
      title: 'Ticket Exchange Notice',
      category: 'Tickets',
      icon: Ticket,
      color: 'text-amber-600',
      time: '1 hour ago',
      desc: 'Spurs v Man United: Verified One Hotspur Ticket Exchange open for members until 13:30 on matchday.',
      action: onViewTickets,
      actionText: 'Check Exchange'
    },
    {
      id: 'al-3',
      title: 'Matchday Security & Bag Policy',
      category: 'Matchday',
      icon: AlertTriangle,
      color: 'text-emerald-600',
      time: '3 hours ago',
      desc: 'All turnstiles open at 14:30. A10 High Road closure between White Hart Lane and Park Lane commences at 14:30.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 pt-16 sm:pt-24">
      <div 
        id="matchday-notifications-modal"
        className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
      >
        <div className="p-4 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#0284c7]" />
            <h3 className="text-base font-black text-[#0a1c3d]">Matchday Intelligence Alerts</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 text-slate-700 flex items-center justify-center hover:bg-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3">
          {alerts.map((al) => {
            const Icon = al.icon;
            return (
              <div key={al.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-bold text-[#0a1c3d]">
                    <Icon className={`w-4 h-4 ${al.color}`} />
                    <span>{al.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{al.time}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {al.desc}
                </p>

                {al.action && (
                  <div className="pt-1">
                    <button
                      onClick={() => {
                        al.action!();
                        onClose();
                      }}
                      className="text-xs font-bold text-[#0284c7] hover:underline cursor-pointer"
                    >
                      {al.actionText} →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
