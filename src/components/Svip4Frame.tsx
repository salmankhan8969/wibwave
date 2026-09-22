import React from 'react';

interface Svip4FrameProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  avatarUrl?: string;
  children?: React.ReactNode;
  showSparkles?: boolean;
  className?: string;
}

export function Svip4Frame({
  size = 'md',
  avatarUrl,
  children,
  showSparkles = true,
  className = '',
}: Svip4FrameProps) {
  const sizeConfig = {
    sm: {
      container: 'w-14 h-14',
      avatar: 'w-9 h-9',
      lionTop: '-top-3.5',
      wings: 'text-xs',
      wingsPos: '-bottom-1',
      plaque: 'text-[6px] px-1.5 py-0.2 -bottom-1.5',
      ringBorder: 'border-2',
    },
    md: {
      container: 'w-24 h-24',
      avatar: 'w-16 h-16',
      lionTop: '-top-5',
      wings: 'text-base',
      wingsPos: '-bottom-1.5',
      plaque: 'text-[8px] px-2 py-0.5 -bottom-2',
      ringBorder: 'border-[3px]',
    },
    lg: {
      container: 'w-32 h-32',
      avatar: 'w-22 h-22',
      lionTop: '-top-7',
      wings: 'text-xl',
      wingsPos: '-bottom-2',
      plaque: 'text-[10px] px-2.5 py-0.5 -bottom-2.5',
      ringBorder: 'border-4',
    },
    xl: {
      container: 'w-48 h-48',
      avatar: 'w-34 h-34',
      lionTop: '-top-9',
      wings: 'text-3xl',
      wingsPos: '-bottom-3',
      plaque: 'text-xs px-4 py-1 -bottom-3',
      ringBorder: 'border-[5px]',
    },
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeConfig.container} ${className}`}>
      {/* 1. Ice-Blue Sapphire & Golden Celestial Sparkles */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none z-30 opacity-90">
          <span className="absolute -top-2 left-2 text-cyan-200 text-xs animate-pulse drop-shadow-[0_0_8px_#38bdf8]">✧</span>
          <span className="absolute top-1 -right-1 text-yellow-300 text-[10px] drop-shadow-[0_0_6px_#facc15]">✦</span>
          <span className="absolute bottom-2 -left-1 text-blue-300 text-[10px] drop-shadow-[0_0_6px_#60a5fa]">✧</span>
          <span className="absolute bottom-1 right-3 text-cyan-100 text-xs drop-shadow-[0_0_8px_#06b6d4]">✦</span>
          {/* Radiant celestial blue aura halo */}
          <div className="absolute -inset-1 rounded-full bg-cyan-500/25 blur-sm pointer-events-none animate-pulse" />
        </div>
      )}

      {/* 2. Celestial Azure & 24K Gold Dual Filigree Ring */}
      <div 
        className={`absolute inset-1.5 rounded-full ${sizeConfig.ringBorder} border-yellow-400 shadow-[0_0_15px_rgba(56,189,248,0.9),inset_0_0_10px_rgba(250,204,21,0.7)] pointer-events-none z-20 flex items-center justify-center`}
        style={{
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.4) 0%, rgba(3, 105, 161, 0.6) 50%, rgba(202, 138, 4, 0.3) 100%)',
        }}
      >
        {/* Inner Sapphire Diamond Crystal Beaded Ring */}
        <div className="absolute inset-0.5 rounded-full border border-dashed border-cyan-200/90 pointer-events-none" />
      </div>

      {/* 3. Top Sculpted Celestial White Lion Head with Golden Mane & Sapphire Eyes */}
      <div className={`absolute ${sizeConfig.lionTop} left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none`}>
        <div className="relative flex items-center justify-center">
          {/* Radiant Celestial Cyan & Gold Halo */}
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/60 via-yellow-300/70 to-blue-500/60 rounded-full blur-xs" />
          
          {/* Lion Crest Badge */}
          <div className="relative px-2 py-0.5 rounded-full bg-gradient-to-b from-slate-100 via-sky-300 to-blue-900 border-2 border-yellow-300 shadow-[0_2px_14px_rgba(6,182,212,0.95)] flex items-center justify-center text-white font-black">
            <span className="filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] text-lg">🦁</span>
          </div>

          {/* Golden Diamond Crown atop Lion */}
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] text-yellow-300 filter drop-shadow">👑</span>
        </div>
      </div>

      {/* 4. Left Spread Celestial Azure & Golden Crystal Feather Wings */}
      <div className={`absolute left-0 ${sizeConfig.wingsPos} z-25 pointer-events-none transform -translate-x-1/4 select-none`}>
        <div className="relative filter drop-shadow-[0_4px_10px_rgba(6,182,212,0.9)]">
          <svg viewBox="0 0 50 60" className="w-8 h-10 -scale-x-100 transform -rotate-12">
            <path
              d="M10 55 C12 35 25 15 48 5 C40 18 36 28 32 38 C38 30 42 25 46 22 C37 34 32 44 26 50 C20 54 14 55 10 55 Z"
              fill="url(#svip4WingGradGold)"
              stroke="#fef08a"
              strokeWidth="0.8"
            />
            <path
              d="M8 56 C14 42 22 25 40 16 C34 26 28 36 22 46 C16 52 11 55 8 56 Z"
              fill="url(#svip4WingGradBlue)"
              opacity="0.9"
            />
            <defs>
              <linearGradient id="svip4WingGradGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
              <linearGradient id="svip4WingGradBlue" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 5. Right Spread Celestial Azure & Golden Crystal Feather Wings */}
      <div className={`absolute right-0 ${sizeConfig.wingsPos} z-25 pointer-events-none transform translate-x-1/4 select-none`}>
        <div className="relative filter drop-shadow-[0_4px_10px_rgba(6,182,212,0.9)]">
          <svg viewBox="0 0 50 60" className="w-8 h-10 transform -rotate-12">
            <path
              d="M10 55 C12 35 25 15 48 5 C40 18 36 28 32 38 C38 30 42 25 46 22 C37 34 32 44 26 50 C20 54 14 55 10 55 Z"
              fill="url(#svip4WingGradGoldR)"
              stroke="#fef08a"
              strokeWidth="0.8"
            />
            <path
              d="M8 56 C14 42 22 25 40 16 C34 26 28 36 22 46 C16 52 11 55 8 56 Z"
              fill="url(#svip4WingGradBlueR)"
              opacity="0.9"
            />
            <defs>
              <linearGradient id="svip4WingGradGoldR" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
              <linearGradient id="svip4WingGradBlueR" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* 6. Bottom Embossed Golden Plaque reading SVIP4 flanked by Sapphire Diamonds */}
      <div className={`absolute ${sizeConfig.plaque} z-30 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none`}>
        <div className="relative px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 border border-yellow-200 shadow-[0_2px_8px_rgba(234,179,8,0.8)] flex items-center gap-0.5">
          <span className="text-[6px] text-cyan-300">💎</span>
          <span className="font-black text-amber-950 tracking-wider uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
            SVIP4
          </span>
          <span className="text-[6px] text-cyan-300">💎</span>
        </div>
      </div>

      {/* 7. Center Avatar / Children */}
      <div className={`rounded-full overflow-hidden z-10 flex items-center justify-center bg-slate-950 ${sizeConfig.avatar}`}>
        {children ? (
          children
        ) : avatarUrl ? (
          <img
            src={avatarUrl}
            alt="SVIP4 Avatar"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-blue-900 to-sky-700 flex items-center justify-center text-white font-bold text-xs">
            VIP
          </div>
        )}
      </div>
    </div>
  );
}
