import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Maximize2, 
  Check, 
  Sparkles, 
  Crown, 
  ShieldCheck, 
  Clock, 
  Zap, 
  X,
  Volume2
} from 'lucide-react';
import { UserProfile } from '../types';
import { Svip1Frame } from './Svip1Frame';
import { Svip2Frame } from './Svip2Frame';
import { Svip3Frame } from './Svip3Frame';

interface MyDressScreenProps {
  user: UserProfile;
  onBack: () => void;
  activeFrame: string;
  onEquipFrame: (frameId: string) => void;
  goldBalance: number;
}

export type DressCategory = 'frame' | 'car' | 'bubble' | 'entrance' | 'badge';

export interface DressItem {
  id: string;
  category: DressCategory;
  name: string;
  subtitle: string;
  daysRemaining?: number;
  pricePerDay?: number;
  isEquipped?: boolean;
  notForSale?: boolean;
  imageUrl?: string;
  rarity: 'SVIP' | 'Agency' | 'Rare' | 'Epic' | 'Legendary';
  description: string;
}

export function MyDressScreen({
  user,
  onBack,
  activeFrame,
  onEquipFrame,
  goldBalance,
}: MyDressScreenProps) {
  const [activeCategory, setActiveCategory] = useState<DressCategory>('frame');
  const [selectedItem, setSelectedItem] = useState<DressItem | null>(null);
  const [previewItem, setPreviewItem] = useState<DressItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Frames collection matching the user's screenshot
  const frameItems: DressItem[] = [
    {
      id: 'svip1',
      category: 'frame',
      name: 'SVIP 1',
      subtitle: 'Not for sale',
      daysRemaining: 30,
      notForSale: true,
      rarity: 'SVIP',
      description: 'Exclusive SVIP 1 Frame - Premium Edition with double diamond pavé gold ring, spread eagle wings, and baroque embossed SVIP1 shield plaque.',
    },
    {
      id: 'svip2',
      category: 'frame',
      name: 'SVIP2',
      subtitle: 'Not for sale',
      daysRemaining: 32,
      notForSale: true,
      imageUrl: '/src/assets/images/svip2_wolf_frame_1790072798862.jpg',
      rarity: 'SVIP',
      description: 'Exclusive SVIP 2 Frost Wolf Frame: Sculpted ice-blue crystal wolf head with piercing eyes and sparkling diamond crystal wing feathers.',
    },
    {
      id: 'svip3',
      category: 'frame',
      name: 'SVIP3',
      subtitle: 'Not for sale',
      daysRemaining: 35,
      notForSale: true,
      imageUrl: '/src/assets/images/svip3_tiger_frame_1790073621984.jpg',
      rarity: 'SVIP',
      description: 'Exclusive SVIP 3 Royal Tiger Frame: Sculpted golden royal tiger crest, baroque gold and purple feathered wings, and crowned SVIP3 plaque.',
    },
    {
      id: 'agency',
      category: 'frame',
      name: 'Agency',
      subtitle: 'Not for sale',
      notForSale: true,
      rarity: 'Agency',
      description: 'Official Agency Guild Avatar Frame adorned with silver wings, green emerald gem, and silk AGENCY ribbon.',
    },
    {
      id: 'emerald_loop',
      category: 'frame',
      name: 'Emerald Loop',
      subtitle: '2000/day',
      daysRemaining: 4,
      pricePerDay: 2000,
      rarity: 'Rare',
      description: 'Luminous concentric emerald & cyan neon ring pulsing with starlight flares and cosmic dust.',
    },
  ];

  // Vehicles / Cars
  const carItems: DressItem[] = [
    {
      id: 'golden_phantom',
      category: 'car',
      name: 'Gold Phantom',
      subtitle: 'Not for sale',
      daysRemaining: 15,
      notForSale: true,
      rarity: 'SVIP',
      description: 'Royal 24K solid gold hypercar with eagle wing doors and golden exhaust trail.',
    },
    {
      id: 'cyber_falcon',
      category: 'car',
      name: 'Cyber Falcon',
      subtitle: '5000/day',
      pricePerDay: 5000,
      daysRemaining: 7,
      rarity: 'Legendary',
      description: 'Futuristic anti-gravity cyber speeder with neon cyan thrusters.',
    },
  ];

  // Chat Bubbles
  const bubbleItems: DressItem[] = [
    {
      id: 'svip_bubble',
      category: 'bubble',
      name: 'SVIP Royal Bubble',
      subtitle: 'Not for sale',
      daysRemaining: 30,
      notForSale: true,
      rarity: 'SVIP',
      description: 'Golden chat message bubble adorned with crowned crest and sparkling amber filigree.',
    },
    {
      id: 'emerald_bubble',
      category: 'bubble',
      name: 'Emerald Whisper',
      subtitle: '1000/day',
      pricePerDay: 1000,
      daysRemaining: 3,
      rarity: 'Rare',
      description: 'Glowing green chat frame with floating jade leaves and crystal sheen.',
    },
  ];

  // Entrance Floats
  const entranceItems: DressItem[] = [
    {
      id: 'eagle_descent',
      category: 'entrance',
      name: 'Eagle Descent',
      subtitle: 'Not for sale',
      daysRemaining: 30,
      notForSale: true,
      rarity: 'SVIP',
      description: 'Panoramic grand entrance banner featuring a golden eagle flying across the room with firework sparkles.',
    },
  ];

  const currentItems = 
    activeCategory === 'frame' ? frameItems :
    activeCategory === 'car' ? carItems :
    activeCategory === 'bubble' ? bubbleItems :
    entranceItems;

  const handleEquipToggle = (item: DressItem) => {
    if (item.category === 'frame') {
      if (activeFrame === item.id) {
        onEquipFrame('');
        showToast(`Unequipped ${item.name}`);
      } else {
        onEquipFrame(item.id);
        showToast(`Equipped ${item.name} frame!`);
      }
    } else {
      showToast(`Equipped ${item.name}!`);
    }
  };

  return (
    <div className="relative z-20 flex-1 flex flex-col bg-[#0b0502] text-amber-50 select-none overflow-y-auto font-sans min-h-full pb-20">
      {/* Background Graphic: Theatrical Red Velvet Curtain Backdrop */}
      <div 
        className="absolute inset-0 bg-cover bg-top pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `url('/src/assets/images/my_dress_curtain_bg_1790072820921.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1f0b06]/85 via-[#120703]/95 to-[#0b0402] pointer-events-none z-0" />

      {/* 1. DEVICE STATUS BAR (Matches Screenshot 3:25 👁️ 58%) */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-amber-200/90 font-medium px-4 pt-2 pb-1">
        <div className="flex items-center gap-1.5">
          <span>3:25</span>
          <span className="text-[10px]">👁️</span>
          <span className="text-[10px]">▶</span>
          <span className="text-[10px] opacity-80">🔀</span>
          <span className="text-[10px] opacity-80">f</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span>ᛒ</span>
          <span>🔇</span>
          <span>🛜</span>
          <span>📶</span>
          <span className="text-[11px] font-mono font-bold">🔋 58% ⚡</span>
        </div>
      </div>

      {/* 2. TOP APP BAR (Ornate Back Button + "My dress" Title) */}
      <header className="relative z-10 flex items-center justify-between px-3.5 py-2">
        {/* Ornate Circular Back Button */}
        <button
          onClick={onBack}
          className="relative w-9 h-9 rounded-full bg-gradient-to-b from-[#3a1a0d] to-[#1a0a05] border border-amber-400/80 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer group"
          title="Back"
        >
          <div className="absolute -top-1 -left-1 text-[8px] text-amber-400">✧</div>
          <div className="absolute -bottom-1 -right-1 text-[8px] text-amber-400">✧</div>
          <span className="text-amber-200 group-hover:text-white text-base font-bold">‹</span>
        </button>

        {/* Title: My dress */}
        <h1 className="text-lg font-bold text-amber-100 tracking-wide drop-shadow">
          My dress
        </h1>

        <div className="w-9" />
      </header>

      {/* 3. CATEGORY TABS (Frame, Car, Bubble, Entance float) */}
      <div className="relative z-10 px-3 pt-1 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-amber-500/20">
        {/* Frame Tab (Active Highlight Pill) */}
        <button
          onClick={() => setActiveCategory('frame')}
          className={`flex flex-col items-center justify-center shrink-0 min-w-[70px] px-3 py-1.5 rounded-2xl transition cursor-pointer ${
            activeCategory === 'frame'
              ? 'bg-gradient-to-r from-fuchsia-900/90 via-purple-800 to-amber-900/90 border-2 border-fuchsia-400/80 shadow-[0_0_15px_rgba(217,70,239,0.5)]'
              : 'bg-black/30 border border-amber-500/20 hover:bg-white/5 text-amber-200/60'
          }`}
        >
          {/* 3D Crown Badge Icon */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-b from-yellow-300 via-amber-500 to-yellow-600 p-0.5 shadow-md flex items-center justify-center">
            <Crown className="w-4 h-4 text-amber-950 fill-amber-950" />
          </div>
          <span className={`text-xs font-black mt-1 ${activeCategory === 'frame' ? 'text-white' : 'text-amber-200/80'}`}>
            Frame
          </span>
        </button>

        {/* Car Tab */}
        <button
          onClick={() => setActiveCategory('car')}
          className={`flex flex-col items-center justify-center shrink-0 min-w-[70px] px-3 py-1.5 rounded-2xl transition cursor-pointer ${
            activeCategory === 'car'
              ? 'bg-gradient-to-r from-fuchsia-900/90 via-purple-800 to-amber-900/90 border-2 border-fuchsia-400/80 shadow-[0_0_15px_rgba(217,70,239,0.5)]'
              : 'bg-black/30 border border-amber-500/20 hover:bg-white/5 text-amber-200/60'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-b from-yellow-200 via-amber-400 to-amber-600 p-0.5 shadow-md flex items-center justify-center text-amber-950 text-base">
            🚗
          </div>
          <span className={`text-xs font-bold mt-1 ${activeCategory === 'car' ? 'text-white' : 'text-amber-200/80'}`}>
            Car
          </span>
        </button>

        {/* Bubble Tab */}
        <button
          onClick={() => setActiveCategory('bubble')}
          className={`flex flex-col items-center justify-center shrink-0 min-w-[70px] px-3 py-1.5 rounded-2xl transition cursor-pointer ${
            activeCategory === 'bubble'
              ? 'bg-gradient-to-r from-fuchsia-900/90 via-purple-800 to-amber-900/90 border-2 border-fuchsia-400/80 shadow-[0_0_15px_rgba(217,70,239,0.5)]'
              : 'bg-black/30 border border-amber-500/20 hover:bg-white/5 text-amber-200/60'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-b from-yellow-200 via-amber-400 to-amber-600 p-0.5 shadow-md flex items-center justify-center text-amber-950 text-base">
            💬
          </div>
          <span className={`text-xs font-bold mt-1 ${activeCategory === 'bubble' ? 'text-white' : 'text-amber-200/80'}`}>
            Bubble
          </span>
        </button>

        {/* Entrance Float Tab */}
        <button
          onClick={() => setActiveCategory('entrance')}
          className={`flex flex-col items-center justify-center shrink-0 min-w-[85px] px-3 py-1.5 rounded-2xl transition cursor-pointer ${
            activeCategory === 'entrance'
              ? 'bg-gradient-to-r from-fuchsia-900/90 via-purple-800 to-amber-900/90 border-2 border-fuchsia-400/80 shadow-[0_0_15px_rgba(217,70,239,0.5)]'
              : 'bg-black/30 border border-amber-500/20 hover:bg-white/5 text-amber-200/60'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-b from-yellow-200 via-amber-400 to-amber-600 p-0.5 shadow-md flex items-center justify-center text-amber-950 text-base">
            🚀
          </div>
          <span className={`text-xs font-bold mt-1 whitespace-nowrap ${activeCategory === 'entrance' ? 'text-white' : 'text-amber-200/80'}`}>
            Entance float
          </span>
        </button>
      </div>

      {/* 4. DRESS ITEMS GRID (Exact match to screenshot cards) */}
      <div className="relative z-10 p-3.5">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
          {currentItems.map((item) => {
            const isEquipped = activeFrame === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setPreviewItem(item)}
                className={`relative rounded-2xl bg-gradient-to-b from-[#1a1c23] via-[#121318] to-[#0c0d12] border transition-all cursor-pointer flex flex-col justify-between overflow-hidden shadow-lg group hover:scale-[1.02] ${
                  isEquipped 
                    ? 'border-yellow-400 shadow-[0_0_15px_rgba(251,191,36,0.4)] ring-1 ring-yellow-400' 
                    : 'border-white/10 hover:border-amber-500/40'
                }`}
              >
                {/* Top-Right Expand Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewItem(item);
                  }}
                  className="absolute top-1.5 right-1.5 z-20 w-5 h-5 rounded-full bg-black/50 text-white/60 hover:text-white flex items-center justify-center transition"
                  title="Expand"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>

                {/* Equipped Badge (Top Left) */}
                {isEquipped && (
                  <div className="absolute top-1.5 left-1.5 z-20 px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 font-black text-[8px] uppercase tracking-wider shadow">
                    Wearing
                  </div>
                )}

                {/* Item Graphic Area */}
                <div className="pt-4 pb-2 px-1 flex flex-col items-center justify-center relative min-h-[110px]">
                  {/* FRAME 1: SVIP 1 EAGLE WING DIAMOND FRAME */}
                  {item.id === 'svip1' && (
                    <div className="scale-85 group-hover:scale-95 transition-transform">
                      <Svip1Frame size="sm" showSparkles={true}>
                        <div className="w-full h-full bg-black/60 rounded-full" />
                      </Svip1Frame>
                    </div>
                  )}

                  {/* FRAME 2: SVIP 2 WOLF HEAD FRAME */}
                  {item.id === 'svip2' && (
                    <div className="scale-85 group-hover:scale-95 transition-transform">
                      <Svip2Frame size="sm" showSparkles={true}>
                        <div className="w-full h-full bg-slate-900/60 rounded-full" />
                      </Svip2Frame>
                    </div>
                  )}

                  {/* FRAME 3: SVIP 3 ROYAL TIGER FRAME */}
                  {item.id === 'svip3' && (
                    <div className="scale-85 group-hover:scale-95 transition-transform">
                      <Svip3Frame size="sm" showSparkles={true}>
                        <div className="w-full h-full bg-[#18052e] rounded-full" />
                      </Svip3Frame>
                    </div>
                  )}

                  {/* FRAME 3: AGENCY FRAME */}
                  {item.id === 'agency' && (
                    <div className="relative w-16 h-16 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
                      {/* Agency Frame Graphic with Laurel & Ribbon */}
                      <div className="w-13 h-13 rounded-full border-2 border-emerald-400/80 p-0.5 bg-black/50 relative shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                        {/* Top Ribbon */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded bg-gradient-to-r from-emerald-600 to-teal-400 text-white font-black text-[6px] tracking-tight border border-emerald-200">
                          AGENCY
                        </div>
                        {/* Bottom Laurel Jewel */}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-emerald-400 border border-white flex items-center justify-center text-[7px] shadow">
                          💎
                        </div>
                        {/* Left Wing */}
                        <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 text-emerald-300 text-[10px]">🪶</span>
                        {/* Right Wing */}
                        <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 text-emerald-300 text-[10px]">🪶</span>
                      </div>
                    </div>
                  )}

                  {/* FRAME 4: EMERALD LOOP */}
                  {item.id === 'emerald_loop' && (
                    <div className="relative w-16 h-16 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
                      {/* Glowing concentric neon cyan loop with star sparkles */}
                      <div className="w-13 h-13 rounded-full border-[3px] border-cyan-400 shadow-[0_0_12px_#22d3ee,inset_0_0_8px_#22d3ee] flex items-center justify-center relative">
                        <div className="w-10 h-10 rounded-full border border-teal-300/60" />
                        <span className="absolute -top-1 right-1 text-cyan-200 text-[8px] animate-ping">✧</span>
                        <span className="absolute bottom-1 -left-1 text-teal-200 text-[8px]">✦</span>
                      </div>
                    </div>
                  )}

                  {/* Other categories */}
                  {item.category === 'car' && (
                    <div className="text-3xl filter drop-shadow">
                      🏎️
                    </div>
                  )}
                  {item.category === 'bubble' && (
                    <div className="w-14 h-8 rounded-xl bg-gradient-to-r from-amber-500/30 to-yellow-600/30 border border-yellow-400 flex items-center justify-center text-[8px] text-yellow-200">
                      SVIP Bubble
                    </div>
                  )}
                  {item.category === 'entrance' && (
                    <div className="text-3xl filter drop-shadow">
                      🦅
                    </div>
                  )}

                  {/* Orange Days Pill Badge (Matches Screenshot: 32 day(s), 4 day(s)) */}
                  {item.daysRemaining !== undefined && (
                    <div className="mt-2">
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 text-white font-extrabold text-[9px] tracking-tight shadow">
                        {item.daysRemaining} day(s)
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Bottom Meta (Title + Not for sale / Price) */}
                <div className="p-2 pt-1 pb-2.5 text-center bg-black/40 border-t border-white/5">
                  <h4 className="font-extrabold text-xs text-white truncate">
                    {item.name}
                  </h4>

                  {/* Subtitle / Price */}
                  {item.pricePerDay ? (
                    <div className="flex items-center justify-center gap-1 mt-0.5 text-[10px] text-yellow-300 font-mono font-bold">
                      <span>🪙</span>
                      <span>{item.pricePerDay}/day</span>
                    </div>
                  ) : (
                    <p className="text-[10px] text-amber-200/60 font-medium mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. ITEM PREVIEW & WEAR DRAWER / MODAL */}
      {/* ========================================================================= */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-3 animate-fade-in">
          <div className="w-full max-w-sm rounded-[32px] bg-gradient-to-b from-[#221006] via-[#160a03] to-[#0c0401] border-2 border-yellow-400/80 shadow-[0_10px_40px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-amber-500/20 bg-black/40">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <div>
                  <h3 className="font-black text-sm text-yellow-200 tracking-wide">
                    {previewItem.name}
                  </h3>
                  <span className="px-1.5 py-0.2 rounded bg-yellow-400/20 text-yellow-300 text-[9px] font-bold uppercase">
                    {previewItem.rarity}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setPreviewItem(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center text-sm font-bold transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 text-center space-y-4">
              {/* Avatar Fitting Visual */}
              <div className="py-4 flex flex-col items-center justify-center">
                {previewItem.id === 'svip1' ? (
                  <Svip1Frame 
                    size="xl" 
                    avatarUrl={user.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80'} 
                  />
                ) : previewItem.id === 'svip2' ? (
                  <Svip2Frame 
                    size="xl" 
                    avatarUrl={user.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80'} 
                  />
                ) : previewItem.id === 'svip3' ? (
                  <Svip3Frame 
                    size="xl" 
                    avatarUrl={user.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80'} 
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full border-4 border-cyan-400 shadow-[0_0_20px_#22d3ee] flex items-center justify-center overflow-hidden">
                    <img 
                      src={user.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80'} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="mt-4">
                  <span className="text-base font-black text-[#84cc16] drop-shadow-md">
                    {user.name || 'Zs 🔀 SALMAN 💚 🦅 . 🙊'}
                  </span>
                </div>
              </div>

              {/* Description & Validity */}
              <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-xs text-amber-200/80 space-y-1.5 text-left">
                <div className="flex items-center justify-between text-yellow-300 font-bold">
                  <span>Validity Status</span>
                  <span>{previewItem.daysRemaining ? `${previewItem.daysRemaining} Days Left` : 'Permanent / Noble'}</span>
                </div>
                <p className="text-[11px] text-amber-200/70 leading-relaxed">
                  {previewItem.description}
                </p>
              </div>

              {/* Action Button: Wear / Take Off */}
              <button
                onClick={() => {
                  handleEquipToggle(previewItem);
                  setPreviewItem(null);
                }}
                className={`w-full py-3 rounded-2xl font-black text-xs tracking-wider uppercase transition shadow-xl cursor-pointer flex items-center justify-center gap-2 ${
                  activeFrame === previewItem.id
                    ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-[0_4px_15px_rgba(225,29,72,0.5)]'
                    : 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 text-amber-950 shadow-[0_4px_15px_rgba(251,191,36,0.6)] hover:brightness-110'
                }`}
              >
                {activeFrame === previewItem.id ? (
                  <>
                    <X className="w-4 h-4" />
                    <span>Take Off Frame</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Wear Frame</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-600 border border-emerald-300 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
