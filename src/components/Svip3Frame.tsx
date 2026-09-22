import React from 'react';

interface Svip3FrameProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  avatarUrl?: string;
  children?: React.ReactNode;
  showSparkles?: boolean;
  className?: string;
}

export function Svip3Frame({
  size = 'md',
  avatarUrl,
  children,
  showSparkles = true,
  className = '',
}: Svip3FrameProps) {
  const sizeConfig = {
    sm: {
      container: 'w-14 h-14',
      avatar: 'w-9 h-9',
      tigerTop: '-top-3.5',
      wings: 'text-xs',
      wingsPos: '-bottom-1',
      plaque: 'text-[6px] px-1.5 py-0.2 -bottom-1.5',
      ringBorder: 'border-2',
    },
    md: {
      container: 'w-24 h-24',
      avatar: 'w-16 h-16',
      tigerTop: '-top-5',
      wings: 'text-base',
      wingsPos: '-bottom-1.5',
      plaque: 'text-[8px] px-2 py-0.5 -bottom-2',
      ringBorder: 'border-[3px]',
    },
    lg: {
      container: 'w-32 h-32',
      avatar: 'w-22 h-22',
      tigerTop: '-top-7',
      wings: 'text-xl',
      wingsPos: '-bottom-2',
      plaque: 'text-[10px] px-2.5 py-0.5 -bottom-2.5',
      ringBorder: 'border-4',
    },
    xl: {
      container: 'w-48 h-48',
      avatar: 'w-34 h-34',
      tigerTop: '-top-9',
      wings: 'text-3xl',
      wingsPos: '-bottom-3',
      plaque: 'text-xs px-4 py-1 -bottom-3',
      ringBorder: 'border-[5px]',
    },
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeConfig.container} ${className}`}>
      {/* 1. Purple & Golden Shimmer & Sparkles */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none z-30 opacity-90">
          <span className="absolute -top-2 left-2 text-yellow-300 text-xs animate-pulse">✧</span>
          <span className="absolute top-1 -right-1 text-purple-200 text-[10px] drop-shadow-[0_0_6px_#c084fc]">✦</span>
          <span className="absolute bottom-2 -left-1 text-amber-300 text-[10px] drop-shadow-[0_0_6px_#f59e0b]">✧</span>
          <span className="absolute bottom-1 right-3 text-yellow-200 text-xs">✦</span>
          {/* Subtle violet/golden aura halo */}
          <div className="absolute -inset-1 rounded-full bg-purple-600/30 blur-sm pointer-events-none" />
        </div>
      )}

      {/* 2. Imperial Royal Purple & Gold Dual Filigree Ring */}
      <div 
        className={`absolute inset-1.5 rounded-full ${sizeConfig.ringBorder} border-yellow-400 shadow-[0_0_15px_rgba(168,85,247,0.8),inset_0_0_10px_rgba(234,179,8,0.6)] pointer-events-none z-20 flex items-center justify-center`}
        style={{
          background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.4) 0%, rgba(88, 28, 135, 0.6) 50%, rgba(202, 138, 4, 0.3) 100%)',
        }}
      >
        {/* Ornate Inner Dotted Gold Ring */}
        <div className="absolute inset-0.5 rounded-full border border-dashed border-yellow-300/80 pointer-events-none" />
      </div>

      {/* 3. Top Sculpted Royal Tiger Head with Glowing Amber Eyes */}
      <div className={`absolute ${sizeConfig.tigerTop} left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none`}>
        <div className="relative flex items-center justify-center">
          {/* Radiant Gold & Purple Halo */}
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/50 via-yellow-400/60 to-purple-500/50 rounded-full blur-xs" />
          
          {/* Tiger Crest Badge */}
          <div className="relative px-1.5 py-0.5 rounded-full bg-gradient-to-b from-amber-300 via-yellow-500 to-purple-900 border-2 border-yellow-200 shadow-[0_2px_12px_rgba(147,51,234,0.9)] flex items-center justify-center text-white font-black">
            <span className="filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] text-lg">🐯</span>
          </div>

          {/* Tiny Golden Crown on Tiger */}
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] text-yellow-300 filter drop-shadow">👑</span>
        </div>
      </div>

      {/* 4. Left Spread Royal Violet & Golden Wings */}
      <div className={`absolute left-0 ${sizeConfig.wingsPos} z-25 pointer-events-none transform -translate-x-1/4 select-none`}>
        <div className="relative filter drop-shadow-[0_4px_10px_rgba(147,51,234,0.9)]">
          <div className="flex flex-col items-end rotate-15 text-purple-300">
            <span className={`${sizeConfig.wings} filter drop-shadow text-amber-300`}>🪶</span>
            <div className="-mt-3 -mr-1 text-yellow-200 text-[10px] font-bold">✧</div>
          </div>
          <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-yellow-300 blur-[1px] animate-pulse" />
        </div>
      </div>

      {/* 5. Right Spread Royal Violet & Golden Wings */}
      <div className={`absolute right-0 ${sizeConfig.wingsPos} z-25 pointer-events-none transform translate-x-1/4 select-none`}>
        <div className="relative filter drop-shadow-[0_4px_10px_rgba(147,51,234,0.9)]">
          <div className="flex flex-col items-start -rotate-15 text-purple-300">
            <span className={`${sizeConfig.wings} filter drop-shadow text-amber-300`}>🪶</span>
            <div className="-mt-3 -ml-1 text-yellow-200 text-[10px] font-bold">✧</div>
          </div>
          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-yellow-300 blur-[1px] animate-pulse" />
        </div>
      </div>

      {/* 6. Bottom Plaque: "SVIP3" in Royal Gold Baroque Scroll */}
      <div className={`absolute ${sizeConfig.plaque} left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none`}>
        <div className="relative">
          <div className="px-2.5 py-0.5 rounded-md bg-gradient-to-b from-purple-700 via-indigo-900 to-[#1e0a38] text-white font-black tracking-widest uppercase shadow-[0_4px_12px_rgba(0,0,0,0.9),0_0_12px_rgba(234,179,8,0.8)] border-2 border-yellow-400 flex items-center justify-center gap-1">
            <span className="text-[7px] text-yellow-300">✦</span>
            <span className="font-extrabold text-yellow-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] tracking-wider">SVIP3</span>
            <span className="text-[7px] text-yellow-300">✦</span>
          </div>

          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-yellow-400 shadow-[0_0_4px_#facc15]" />
        </div>
      </div>

      {/* 7. Inner Avatar Content */}
      <div className={`rounded-full overflow-hidden z-10 ${sizeConfig.avatar} bg-[#1a082e] shadow-inner flex items-center justify-center border border-purple-400/40`}>
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt="Avatar" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer" 
          />
        ) : children ? (
          children
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-purple-900 to-indigo-700 flex items-center justify-center text-white font-bold">
            👤
          </div>
        )}
      </div>
    </div>
  );
}
