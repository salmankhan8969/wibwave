import React from 'react';

interface Svip2FrameProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  avatarUrl?: string;
  children?: React.ReactNode;
  showSparkles?: boolean;
  className?: string;
}

export function Svip2Frame({
  size = 'md',
  avatarUrl,
  children,
  showSparkles = true,
  className = '',
}: Svip2FrameProps) {
  const sizeConfig = {
    sm: {
      container: 'w-14 h-14',
      avatar: 'w-9 h-9',
      wolfTop: '-top-3.5 text-xs',
      wings: 'text-xs',
      wingsPos: '-bottom-1',
      plaque: 'text-[6px] px-1.5 py-0.2 -bottom-1.5',
      ringBorder: 'border-2',
    },
    md: {
      container: 'w-24 h-24',
      avatar: 'w-16 h-16',
      wolfTop: '-top-5 text-base',
      wings: 'text-base',
      wingsPos: '-bottom-1.5',
      plaque: 'text-[8px] px-2 py-0.5 -bottom-2',
      ringBorder: 'border-[3px]',
    },
    lg: {
      container: 'w-32 h-32',
      avatar: 'w-22 h-22',
      wolfTop: '-top-7 text-xl',
      wings: 'text-xl',
      wingsPos: '-bottom-2',
      plaque: 'text-[10px] px-2.5 py-0.5 -bottom-2.5',
      ringBorder: 'border-4',
    },
    xl: {
      container: 'w-48 h-48',
      avatar: 'w-34 h-34',
      wolfTop: '-top-9 text-3xl',
      wings: 'text-3xl',
      wingsPos: '-bottom-3',
      plaque: 'text-xs px-4 py-1 -bottom-3',
      ringBorder: 'border-[5px]',
    },
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeConfig.container} ${className}`}>
      {/* 1. Ice Crystal Shimmer & Sparkles */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none z-30 opacity-80">
          <span className="absolute -top-2 left-2 text-cyan-200 text-xs animate-pulse">✧</span>
          <span className="absolute top-1 -right-1 text-white text-[10px] drop-shadow-[0_0_6px_#38bdf8]">✦</span>
          <span className="absolute bottom-2 -left-1 text-sky-300 text-[10px] drop-shadow-[0_0_6px_#0284c7]">✧</span>
          <span className="absolute bottom-1 right-3 text-cyan-100 text-xs">✦</span>
          {/* Subtle cyan glow halo */}
          <div className="absolute -inset-1 rounded-full bg-cyan-400/20 blur-sm pointer-events-none" />
        </div>
      )}

      {/* 2. Crystalline Ice-Blue & Silver Ring */}
      <div 
        className={`absolute inset-1.5 rounded-full ${sizeConfig.ringBorder} border-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.7),inset_0_0_10px_rgba(56,189,248,0.5)] pointer-events-none z-20 flex items-center justify-center`}
        style={{
          background: 'linear-gradient(135deg, rgba(186, 230, 253, 0.3) 0%, rgba(2, 132, 199, 0.15) 50%, rgba(125, 211, 252, 0.3) 100%)',
        }}
      >
        {/* Frost diamond ring texture */}
        <div className="absolute inset-0.5 rounded-full border border-dashed border-white/90 opacity-70 pointer-events-none" />
      </div>

      {/* 3. Top Sculpted Arctic Wolf Head Crest */}
      <div className={`absolute ${sizeConfig.wolfTop} left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none`}>
        <div className="relative flex items-center justify-center">
          {/* Cyan Glow Halo */}
          <div className="absolute -inset-1.5 bg-cyan-400/40 rounded-full blur-xs" />
          
          {/* Wolf Head Emblem */}
          <div className="relative px-1.5 py-0.5 rounded-full bg-gradient-to-b from-sky-100 via-cyan-400 to-blue-700 border-2 border-white shadow-[0_2px_10px_rgba(2,132,199,0.9)] flex items-center justify-center text-white font-black">
            <span className="filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] text-sky-100">🐺</span>
          </div>
        </div>
      </div>

      {/* 4. Left Spread Ice Crystal Wings */}
      <div className={`absolute left-0 ${sizeConfig.wingsPos} z-25 pointer-events-none transform -translate-x-1/4 select-none`}>
        <div className="relative filter drop-shadow-[0_4px_10px_rgba(2,132,199,0.9)]">
          <div className="flex flex-col items-end rotate-15 text-cyan-300">
            <span className={`${sizeConfig.wings} filter drop-shadow text-cyan-200`}>🪶</span>
            <div className="-mt-3 -mr-1 text-white text-[10px] font-bold">✧</div>
          </div>
          <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white blur-[1px] animate-pulse" />
        </div>
      </div>

      {/* 5. Right Spread Ice Crystal Wings */}
      <div className={`absolute right-0 ${sizeConfig.wingsPos} z-25 pointer-events-none transform translate-x-1/4 select-none`}>
        <div className="relative filter drop-shadow-[0_4px_10px_rgba(2,132,199,0.9)]">
          <div className="flex flex-col items-start -rotate-15 text-cyan-300">
            <span className={`${sizeConfig.wings} filter drop-shadow text-cyan-200`}>🪶</span>
            <div className="-mt-3 -ml-1 text-white text-[10px] font-bold">✧</div>
          </div>
          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white blur-[1px] animate-pulse" />
        </div>
      </div>

      {/* 6. Bottom Plaque: "SVIP2" with Royal Blue & Gold Border */}
      <div className={`absolute ${sizeConfig.plaque} left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none`}>
        <div className="relative">
          <div className="px-2.5 py-0.5 rounded-md bg-gradient-to-b from-sky-400 via-blue-600 to-indigo-800 text-white font-black tracking-widest uppercase shadow-[0_4px_12px_rgba(0,0,0,0.9),0_0_10px_rgba(56,189,248,0.8)] border-2 border-yellow-300 flex items-center justify-center gap-1">
            <span className="text-[7px] text-yellow-300">✦</span>
            <span className="font-extrabold text-yellow-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">SVIP2</span>
            <span className="text-[7px] text-yellow-300">✦</span>
          </div>

          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 bg-cyan-300 shadow-[0_0_4px_#38bdf8]" />
        </div>
      </div>

      {/* 7. Inner Avatar Content */}
      <div className={`rounded-full overflow-hidden z-10 ${sizeConfig.avatar} bg-slate-900/80 shadow-inner flex items-center justify-center`}>
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
          <div className="w-full h-full bg-gradient-to-tr from-cyan-900 to-blue-600 flex items-center justify-center text-white font-bold">
            👤
          </div>
        )}
      </div>
    </div>
  );
}
