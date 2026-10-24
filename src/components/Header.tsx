import React from 'react';
import { Search, User, ShieldAlert, Bell, LogIn } from 'lucide-react';
import { COYSLogo } from './COYSLogo';
import { TabType } from '../types';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  isAdminOpen: boolean;
  onToggleAdmin: () => void;
  userAvatar?: string;
  isLiveFootball: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onOpenSearch,
  onOpenNotifications,
  isAdminOpen,
  onToggleAdmin,
  userAvatar,
  isLiveFootball
}) => {
  const { currentUser, userProfile, openAuthModal } = useAuth();
  const avatarToDisplay = userProfile?.photoURL || currentUser?.photoURL || userAvatar;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-2.5 sm:py-3 transition-colors">
      <div className="max-w-md mx-auto sm:max-w-xl md:max-w-4xl flex items-center justify-between">
        {/* Left: Brand Logo matching attached logo image */}
        <div className="flex items-center gap-2.5">
          <COYSLogo size="md" variant="dark" showLockup={true} onClick={() => onNavigate('home')} />
          {isLiveFootball && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Live
            </span>
          )}
        </div>

        {/* Right Action Icons: Search, Notifications, Admin, Auth & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Search Button */}
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            aria-label="Search fixtures, stadiums, pubs"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#0a1c3d] hover:bg-slate-100 active:scale-95 transition-all"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Notifications Button */}
          <button
            id="header-notifications-btn"
            onClick={onOpenNotifications}
            aria-label="Matchday Alerts and Notifications"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#0a1c3d] hover:bg-slate-100 active:scale-95 transition-all relative"
          >
            <Bell className="w-5 h-5 stroke-[2]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#4ea8de]" />
          </button>

          {/* Admin CMS Pill */}
          <button
            id="header-admin-toggle-btn"
            onClick={onToggleAdmin}
            title="Admin Management Panel"
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
              isAdminOpen
                ? 'bg-[#4ea8de] text-[#071938] shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* If not logged in, show quick Sign In button */}
          {!currentUser ? (
            <button
              id="header-login-btn"
              onClick={() => openAuthModal('login')}
              className="px-3 py-1.5 rounded-full bg-[#0a1c3d] hover:bg-[#0284c7] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-[#4ea8de]" />
              <span className="hidden xs:inline">Sign In</span>
            </button>
          ) : (
            /* User Profile Button with verified active status */
            <button
              id="header-profile-btn"
              onClick={() => onNavigate('my-coys')}
              aria-label="My COYS Profile"
              className="relative w-9 h-9 rounded-full bg-[#0a1c3d] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all overflow-hidden shadow-xs ring-2 ring-[#4ea8de]/40"
            >
              {avatarToDisplay ? (
                <img src={avatarToDisplay} alt="User Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-white stroke-[2.2]" />
              )}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

