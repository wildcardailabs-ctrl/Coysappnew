import React from 'react';
import { Train, Beer, Shield, Ticket } from 'lucide-react';

interface QuickActionsProps {
  onSelectAction: (action: 'travel' | 'pubs' | 'stadium' | 'tickets') => void;
}

// Custom stadium icon matching the master reference oval arena
const StadiumIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="12" rx="9" ry="5" />
    <path d="M3 12v3c0 2.76 4.03 5 9 5s9-2.24 9-5v-3" />
    <ellipse cx="12" cy="12" rx="5" ry="2.5" />
  </svg>
);

export const QuickActions: React.FC<QuickActionsProps> = ({ onSelectAction }) => {
  const actions = [
    { id: 'travel' as const, label: 'Getting\nThere', icon: Train },
    { id: 'pubs' as const, label: 'Pubs &\nFood', icon: Beer },
    { id: 'stadium' as const, label: 'Stadium\nInfo', icon: StadiumIcon },
    { id: 'tickets' as const, label: 'Tickets', icon: Ticket }
  ];

  return (
    <div id="home-quick-actions" className="grid grid-cols-4 gap-2.5 sm:gap-3 my-3">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <button
            key={act.id}
            id={`quick-act-${act.id}`}
            onClick={() => onSelectAction(act.id)}
            className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 active:scale-95 transition-all text-center group cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-1.5 text-[#0a1c3d] group-hover:scale-110 transition-transform">
              <Icon className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-[#0a1c3d] text-center leading-tight whitespace-pre-line">
              {act.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
