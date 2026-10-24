import React from 'react';

interface COYSLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'white' | 'light';
  showLockup?: boolean;
  className?: string;
  onClick?: () => void;
}

export const COYSLogo: React.FC<COYSLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showLockup = true,
  className = '',
  onClick
}) => {
  const isDark = variant === 'dark' || variant === 'light';
  const textColor = isDark ? 'text-[#071938]' : 'text-white';
  const dividerColor = isDark ? 'bg-slate-300' : 'bg-white/30';
  const taglineColor = isDark ? 'text-slate-600' : 'text-white/90';

  const config = {
    sm: {
      text: 'text-xl font-black tracking-tight',
      bar: 'h-[3px] w-7 rounded-full mt-0.5',
      divider: 'h-6 w-[1.5px] mx-2',
      taglineTop: 'text-[7.5px] font-bold tracking-[0.18em]',
      taglineBottom: 'text-[6.5px] font-bold tracking-[0.14em]'
    },
    md: {
      text: 'text-2xl sm:text-3xl font-black tracking-tight',
      bar: 'h-[3.5px] sm:h-[4px] w-9 sm:w-11 rounded-full mt-0.5',
      divider: 'h-7 sm:h-8 w-[1.5px] mx-2 sm:mx-2.5',
      taglineTop: 'text-[8.5px] sm:text-[10px] font-bold tracking-[0.18em]',
      taglineBottom: 'text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.14em]'
    },
    lg: {
      text: 'text-3xl sm:text-4xl font-black tracking-tight',
      bar: 'h-[5px] w-12 sm:w-14 rounded-full mt-1',
      divider: 'h-9 sm:h-10 w-[2px] mx-3 sm:mx-4',
      taglineTop: 'text-xs font-bold tracking-[0.22em]',
      taglineBottom: 'text-[10px] font-bold tracking-[0.18em]'
    },
    xl: {
      text: 'text-4xl sm:text-5xl font-black tracking-tight',
      bar: 'h-[6px] w-18 sm:w-22 rounded-full mt-1.5',
      divider: 'h-12 sm:h-14 w-[2.5px] mx-4 sm:mx-5',
      taglineTop: 'text-sm sm:text-base font-bold tracking-[0.24em]',
      taglineBottom: 'text-xs sm:text-sm font-bold tracking-[0.18em]'
    }
  }[size];

  return (
    <div 
      id="coys-brand-logo"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`inline-flex items-center select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Primary Mark: COYS with signature light blue underline bar */}
      <div className="flex flex-col items-start leading-none">
        <span className={`font-black font-['Plus_Jakarta_Sans',sans-serif] ${config.text} ${textColor} uppercase tracking-[-0.03em] transition-opacity ${onClick ? 'group-hover:opacity-90' : ''}`}>
          COYS
        </span>
        {/* Sky-blue underline positioned precisely under 'C' and 'O' */}
        <div className={`bg-[#38bdf8] shadow-sm shadow-[#38bdf8]/30 ${config.bar}`} />
      </div>

      {/* Full Brand Lockup with Vertical Divider and Stacked Tagline */}
      {showLockup && (
        <div className="flex items-center">
          {/* Vertical Divider */}
          <div className={`${dividerColor} ${config.divider} transition-colors`} />

          {/* Stacked Tagline */}
          <div className="flex flex-col justify-center leading-tight whitespace-nowrap select-none">
            <span className={`font-bold font-['Plus_Jakarta_Sans',sans-serif] uppercase ${config.taglineTop} ${taglineColor}`}>
              YOUR SPURS
            </span>
            <span className={`font-bold font-['Plus_Jakarta_Sans',sans-serif] uppercase ${config.taglineBottom} ${taglineColor}`}>
              MATCHDAY COMPANION
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
