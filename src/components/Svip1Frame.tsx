import React from 'react';

interface Svip1FrameProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  avatarUrl?: string;
  children?: React.ReactNode;
  showSparkles?: boolean;
  className?: string;
}

export function Svip1Frame({
  size = 'md',
  avatarUrl,
  children,
  showSparkles = true,
  className = '',
}: Svip1FrameProps) {
  // Dimensions for inner avatar and outer frame
  const sizeConfig = {
    sm: {
      container: 'w-14 h-14',
      avatar: 'w-9 h-9',
      eagleTop: '-top-2.5 text-xs',
      wings: 'text-xs',
      wingsPos: '-bottom-1',
      plaque: 'text-[6px] px-1.5 py-0.2 -bottom-1.5',
      ringBorder: 'border-2',
    },
    md: {
      container: 'w-24 h-24',
      avatar: 'w-16 h-16',
      eagleTop: '-top-3.5 text-base',
      wings: 'text-base',
      wingsPos: '-bottom-1.5',
      plaque: 'text-[8px] px-2 py-0.5 -bottom-2',
      ringBorder: 'border-[3px]',
    },
    lg: {
      container: 'w-32 h-32',
      avatar: 'w-22 h-22',
      eagleTop: '-top-5 text-xl',
      wings: 'text-xl',
      wingsPos: '-bottom-2',
      plaque: 'text-[10px] px-2.5 py-0.5 -bottom-2.5',
      ringBorder: 'border-4',
    },
    xl: {
      container: 'w-48 h-48',
      avatar: 'w-34 h-34',
      eagleTop: '-top-7 text-3xl',
      wings: 'text-3xl',
      wingsPos: '-bottom-3',
      plaque: 'text-xs px-4 py-1 -bottom-3',
      ringBorder: 'border-[5px]',
    },
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeConfig.container} ${className}`}>
      {/* 1. Prismatic Rainbow Light Glare Rays (Exact match to screenshot's lens flares) */}
      {showSparkles && (
        <>
          <div className="absolute inset-0 pointer-events-none z-30 opacity-70">
            {/* Top Right Rainbow Flare */}
            <div className="absolute top-1 right-1 w-8 h-8 bg-gradient-to-tr from-transparent via-cyan-400/40 via-yellow-200/60 to-rose-400/40 blur-xs rounded-full animate-pulse" />
            {/* Left Wing Glint */}
            <div className="absolute bottom-4 left-1 w-6 h-6 bg-gradient-to-tr from-transparent via-yellow-200/50 to-emerald-300/40 blur-xs rounded-full" />
            {/* Star Sparkles */}
            <span className="absolute -top-1 right-2 text-yellow-200 text-xs animate-ping">✧</span>
            <span className="absolute bottom-2 -right-1 text-white text-[10px] drop-shadow-[0_0_4px_#fff]">✦</span>
            <span className="absolute bottom-3 -left-1 text-yellow-300 text-[10px] drop-shadow-[0_0_4px_#fbbf24]">✧</span>
          </div>
        </>
      )}

      {/* 2. Double Golden Ring with Pavé Diamonds */}
      <div 
        className={`absolute inset-1.5 rounded-full ${sizeConfig.ringBorder} border-yellow-400/90 shadow-[0_0_15px_rgba(251,191,36,0.6),inset_0_0_10px_rgba(251,191,36,0.4)] pointer-events-none z-20 flex items-center justify-center`}
        style={{
          background: 'linear-gradient(135deg, rgba(254, 240, 138, 0.25) 0%, rgba(217, 119, 6, 0.1) 50%, rgba(253, 224, 71, 0.25) 100%)',
        }}
      >
        {/* Diamond dots ring texture */}
        <div className="absolute inset-0.5 rounded-full border border-dashed border-white/80 opacity-60 pointer-events-none" />
      </div>

      {/* 3. Top Eagle Head Crest (Sculpted Gold with Diamond Feathers & Fiery Eyes) */}
      <div className={`absolute ${sizeConfig.eagleTop} left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none`}>
        <div className="relative flex items-center justify-center">
          {/* Diamond Halo behind head */}
          <div className="absolute -inset-1 bg-yellow-300/30 rounded-full blur-xs" />
          
          {/* Head Sculpture Badge */}
          <div className="relative px-1.5 py-0.5 rounded-full bg-gradient-to-b from-yellow-100 via-amber-400 to-yellow-600 border border-yellow-100 shadow-[0_2px_8px_rgba(0,0,0,0.8)] flex items-center justify-center text-amber-950 font-black">
            <span className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">🦅</span>
          </div>
        </div>
      </div>

      {/* 4. Left Spread Eagle Wing (Encrusted with Pavé Diamonds) */}
      <div className={`absolute left-0 ${sizeConfig.wingsPos} z-25 pointer-events-none transform -translate-x-1/4 select-none`}>
        <div className="relative filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
          {/* Golden Wing Layer */}
          <div className="flex flex-col items-end rotate-15 text-yellow-300">
            <span className={`${sizeConfig.wings} filter drop-shadow`}>🪶</span>
            <div className="-mt-3 -mr-1 text-white/90 text-[10px] font-bold">✧</div>
          </div>
          {/* Diamond overlay sparkle */}
          <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white blur-[1px] animate-pulse" />
        </div>
      </div>

      {/* 5. Right Spread Eagle Wing (Encrusted with Pavé Diamonds) */}
      <div className={`absolute right-0 ${sizeConfig.wingsPos} z-25 pointer-events-none transform translate-x-1/4 select-none`}>
        <div className="relative filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
          {/* Golden Wing Layer */}
          <div className="flex flex-col items-start -rotate-15 text-yellow-300">
            <span className={`${sizeConfig.wings} filter drop-shadow`}>🪶</span>
            <div className="-mt-3 -ml-1 text-white/90 text-[10px] font-bold">✧</div>
          </div>
          {/* Diamond overlay sparkle */}
          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white blur-[1px] animate-pulse" />
        </div>
      </div>

      {/* 6. Bottom Baroque Golden Shield Plaque: "SVIP1" */}
      <div className={`absolute ${sizeConfig.plaque} left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none`}>
        <div className="relative">
          {/* Outer Gold Shield with Engraved Borders */}
          <div className="px-2.5 py-0.5 rounded-md bg-gradient-to-b from-yellow-200 via-amber-400 to-yellow-700 text-amber-950 font-black tracking-widest uppercase shadow-[0_4px_12px_rgba(0,0,0,0.9),0_0_8px_rgba(251,191,36,0.6)] border-2 border-yellow-100 flex items-center justify-center gap-1">
            {/* Left filigree scroll */}
            <span className="text-[7px] text-amber-900">❧</span>
            <span className="font-extrabold drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">SVIP1</span>
            {/* Right filigree scroll */}
            <span className="text-[7px] text-amber-900">☙</span>
          </div>

          {/* Micro diamond centered under plaque */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-white shadow-[0_0_4px_#fff]" />
        </div>
      </div>

      {/* 7. Inner Avatar Content */}
      <div className={`rounded-full overflow-hidden z-10 ${sizeConfig.avatar} bg-black/60 shadow-inner flex items-center justify-center`}>
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
          <div className="w-full h-full bg-gradient-to-tr from-amber-900 to-yellow-600 flex items-center justify-center text-white font-bold">
            👤
          </div>
        )}
      </div>
    </div>
  );
}
