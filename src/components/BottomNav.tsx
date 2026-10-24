import React from 'react';
import { Home, Calendar, MapPin, Compass, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const navItems: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'matchday', label: 'Matchday', icon: Calendar },
    { id: 'away-days', label: 'Away Days', icon: MapPin },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'my-coys', label: 'My COYS', icon: User }
  ];

  return (
    <nav 
      id="bottom-navigation-bar"
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 py-1.5 px-3 safe-area-bottom shadow-lg transition-all"
    >
      <div className="max-w-md mx-auto sm:max-w-xl md:max-w-4xl flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`flex-1 min-h-[48px] py-1 px-1 flex flex-col items-center justify-center gap-1 transition-all select-none tap-spring cursor-pointer ${
                isActive ? 'text-[#0b1e47]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-[#0b1e47]' : 'text-slate-400'
                  }`}
                  fill={isActive && item.id === 'home' ? 'currentColor' : 'none'}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#0b1e47]" />
                )}
              </div>
              <span
                className={`text-[11px] tracking-tight ${
                  isActive ? 'text-[#0b1e47] font-black' : 'text-slate-500 font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
