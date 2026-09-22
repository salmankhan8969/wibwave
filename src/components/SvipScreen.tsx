import React, { useState } from 'react';
import { 
  ChevronRight, 
  Crown, 
  Sparkles, 
  Check, 
  X,
  Volume2,
  Shield,
  Eye,
  Award,
  Box,
  Layers,
  Star,
  Image as ImageIcon,
  Rocket,
  EyeOff,
  VolumeX,
  User,
  Radio
} from 'lucide-react';
import { UserProfile } from '../types';
import { Svip1Frame } from './Svip1Frame';
import { Svip2Frame } from './Svip2Frame';
import { Svip3Frame } from './Svip3Frame';
import { Svip4Frame } from './Svip4Frame';

interface SvipScreenProps {
  user: UserProfile;
  onBack: () => void;
  goldBalance: number;
  onDeductCoins: (amount: number) => boolean;
  onRechargeNeeded?: () => void;
  onEquipFrame?: (frameId: string) => void;
  equippedFrame?: string;
  initialTier?: number;
}

interface Privilege {
  id: string;
  name: string;
  previewType: 'colorName' | 'frame' | 'entry' | 'page' | 'bubble' | 'micWave';
  description: string;
}

interface SvipPerk {
  id: string;
  name: string;
  iconType: 'picture' | 'rocket' | 'svipTag' | 'listHidden' | 'mystery' | 'antiKick' | 'antiMute' | 'gifAvatar' | 'gifCover';
  description: string;
  unlockedAt: number;
}

// Hexagon SVG Badge Component for pixel-perfect match
function HexagonPerkBadge({ 
  children, 
  active = true,
  tier = 4,
}: { 
  children: React.ReactNode; 
  active?: boolean;
  tier?: number;
}) {
  const isTier4 = tier === 4;
  const isTier3 = tier === 3;
  const isTier2 = tier === 2;

  const strokeColor = isTier4 ? '#0284c7' : isTier3 ? '#581c87' : isTier2 ? '#0284c7' : '#f59e0b';
  const shadowColor = isTier4 ? 'rgba(2,132,199,0.5)' : isTier3 ? 'rgba(107,33,168,0.4)' : isTier2 ? 'rgba(2,132,199,0.5)' : 'rgba(245,158,11,0.5)';

  return (
    <div className="relative w-15 h-15 sm:w-16 sm:h-16 flex items-center justify-center select-none group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full filter" style={{ filter: `drop-shadow(0 2px 8px ${shadowColor})` }}>
        <polygon
          points="50,3 93,25 93,75 50,97 7,75 7,25"
          fill={isTier4 ? 'url(#hexGradT4)' : isTier3 ? 'url(#hexGradT3)' : isTier2 ? 'url(#hexGradT2)' : 'url(#hexGradT1)'}
          stroke={strokeColor}
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="hexGradT4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0369a1" />
            <stop offset="50%" stopColor="#075985" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>
          <linearGradient id="hexGradT3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2e0854" />
            <stop offset="50%" stopColor="#1e0438" />
            <stop offset="100%" stopColor="#110220" />
          </linearGradient>
          <linearGradient id="hexGradT2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0e3450" />
            <stop offset="50%" stopColor="#082337" />
            <stop offset="100%" stopColor="#041421" />
          </linearGradient>
          <linearGradient id="hexGradT1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d2105" />
            <stop offset="50%" stopColor="#261403" />
            <stop offset="100%" stopColor="#140a02" />
          </linearGradient>
        </defs>
      </svg>
      <div className={`relative z-10 flex items-center justify-center ${
        isTier4 ? 'text-cyan-200' : isTier3 ? 'text-purple-200' : isTier2 ? 'text-cyan-200' : 'text-amber-200'
      }`}>
        {children}
      </div>
    </div>
  );
}

export function SvipScreen({ 
  user, 
  onBack, 
  goldBalance, 
  onDeductCoins, 
  onRechargeNeeded,
  onEquipFrame,
  equippedFrame = 'svip4',
  initialTier = 4,
}: SvipScreenProps) {
  const [activeTier, setActiveTier] = useState<number>(initialTier);
  const [previewPrivilege, setPreviewPrivilege] = useState<Privilege | null>(null);
  const [selectedPerk, setSelectedPerk] = useState<SvipPerk | null>(null);
  const [showFrameModal, setShowFrameModal] = useState<boolean>(false);
  const [frameModalTab, setFrameModalTab] = useState<'box' | 'avatar'>('avatar');
  const [currentEquipped, setCurrentEquipped] = useState<string>(equippedFrame);
  const [joinedSuccess, setJoinedSuccess] = useState(false);
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  const [equipToast, setEquipToast] = useState(false);

  // SVIP Tier configs (Exact matches to screenshots: SVIP1: 35,000, SVIP2: 70,000, SVIP3: 182,000, SVIP4: 560,000)
  const tiers = [
    { tier: 1, name: 'SVIP1', price: 35000, days: '7 Days', color: 'from-amber-400 to-yellow-500', glow: '#fbbf24' },
    { tier: 2, name: 'SVIP2', price: 70000, days: '7 Days', color: 'from-cyan-400 to-blue-500', glow: '#38bdf8' },
    { tier: 3, name: 'SVIP3', price: 182000, days: '7 Days', color: 'from-purple-500 to-indigo-600', glow: '#a855f7' },
    { tier: 4, name: 'SVIP4', price: 560000, days: '7 Days', color: 'from-sky-400 to-blue-600', glow: '#38bdf8' },
    { tier: 5, name: 'SVIP5', price: 1200000, days: '7 Days', color: 'from-purple-500 to-amber-400', glow: '#a855f7' },
    { tier: 6, name: 'SVIP6', price: 2500000, days: '7 Days', color: 'from-cyan-400 to-yellow-400', glow: '#06b6d4' },
    { tier: 7, name: 'SVIP7', price: 5000000, days: '7 Days', color: 'from-amber-400 to-rose-500', glow: '#f59e0b' },
  ];

  const currentTierData = tiers.find(t => t.tier === activeTier) || tiers[3];
  const isTier1 = activeTier === 1;
  const isTier2 = activeTier === 2;
  const isTier3 = activeTier === 3;
  const isTier4 = activeTier === 4;

  const privileges: Privilege[] = [
    {
      id: 'colorName',
      name: 'Color name',
      previewType: 'colorName',
      description: isTier4
        ? 'Supreme Celestial neon lime-green and cyan gradient NAME glow displayed across all global live broadcast rooms.'
        : isTier3
        ? 'Supreme polychromatic NAME display with luminous golden, violet, and emerald gradient letters.'
        : isTier2
        ? 'Radiant neon cyan-lime username glow distinguishing your status across all global rooms.'
        : 'Exclusive vibrant neon lime green VIP username display in all chat rooms and rankings.',
    },
    {
      id: 'frame',
      name: 'Frame',
      previewType: 'frame',
      description: isTier4
        ? 'SVIP 4 Celestial White Lion Frame: Sculpted celestial lion head with golden mane tips, sweeping baroque azure diamond crystal wings, and crowned SVIP4 plaque.'
        : isTier3
        ? 'SVIP 3 Royal Tiger Frame: Sculpted golden royal tiger crest, baroque purple feathered wings, and crowned SVIP3 plaque.'
        : isTier2
        ? 'SVIP 2 Frost Wolf Frame: Sculpted ice crystal wolf head, ethereal diamond wings, and royal blue SVIP2 plaque.'
        : 'SVIP 1 Frame - Premium Edition: Sculpted gold double ring paved with brilliant diamonds, spread eagle wings, and embossed SVIP1 plaque.',
    },
    {
      id: 'entry',
      name: 'Entry effect',
      previewType: 'entry',
      description: isTier4
        ? 'Imperial Celestial White Lion Dual Palace Banner: Royal azure blue baroque crest accompanied by radiant golden lion blast banner.'
        : isTier3
        ? 'Imperial Royal Tiger Dual Palace Banner: Royal purple baroque crest accompanied by radiant golden tiger blast banner.'
        : isTier2
        ? 'Mystic Arctic Wolf Palace entrance banner with glacial sparkles, swirling frost, and royal chime.'
        : 'Royal golden eagle flash entrance banner with sparkling particles and custom sound chime.',
    },
    {
      id: 'exclusivePage',
      name: 'Exclusive page',
      previewType: 'page',
      description: isTier4
        ? 'Full-screen Celestial White Lion glowing sapphire & azure profile theme with custom visitor animations.'
        : isTier3
        ? 'Full-screen Imperial Tiger glowing purple & gold profile theme with custom visitor animations.'
        : isTier2
        ? 'Full-screen Frost Wolf mystical watermark profile theme visible to all room visitors.'
        : 'Full-screen eagle watermark luxury profile theme visible to all visitors.',
    },
    {
      id: 'bubble',
      name: 'Bubble',
      previewType: 'bubble',
      description: isTier4
        ? 'Celestial sapphire azure dialogue bubble with glowing gold & diamond corners, SVIP4 crest, and celestial lion head.'
        : isTier3
        ? 'Imperial royal purple & gold dialogue bubble with golden tiger crest and SVIP3 noble plaque.'
        : isTier2
        ? 'Glacial cyan & gold dialogue bubble with crowned SVIP2 emblem and frosted wolf filigree trim.'
        : 'Golden luxury chat dialogue bubble with crowned SVIP crest and glossy filigree trim.',
    },
    {
      id: 'micWave',
      name: 'Mic Wave',
      previewType: 'micWave',
      description: isTier4
        ? 'Celestial sapphire acoustic waves radiating with diamond star sparkles when speaking in live broadcast rooms.'
        : isTier3
        ? 'Hexagram star aura of royal golden & violet sound ripples cascading when speaking on any live party seat.'
        : isTier2
        ? 'Concentric radiant cyan acoustic waves rippling outward whenever you speak in any live broadcast room.'
        : 'Royal golden acoustic waves rippling around your mic seat in voice rooms.',
    },
  ];

  // 9 Exclusive Hexagonal Perks
  const svipPerks: SvipPerk[] = [
    {
      id: 'picture',
      name: 'Send pictures in the chat room of the live broadcast room',
      iconType: 'picture',
      description: 'Allows you to send HD photos, gifs, and album images directly into the chat room of any live broadcast room.',
      unlockedAt: 2,
    },
    {
      id: 'speed',
      name: 'Upgrade speed',
      iconType: 'rocket',
      description: 'Accelerate your user level and VIP progress with a 1.8x experience boost on all gifts and voice room activities.',
      unlockedAt: 2,
    },
    {
      id: 'svipTag',
      name: 'Exclusive SVIP Tag',
      iconType: 'svipTag',
      description: 'Shining gold SVIP noble tag pinned on your name card, room member lists, and ranking leaderboards.',
      unlockedAt: 1,
    },
    {
      id: 'listHidden',
      name: 'List hidden',
      iconType: 'listHidden',
      description: 'Hide your profile from the public room audience visitor list to browse live parties with complete privacy.',
      unlockedAt: 2,
    },
    {
      id: 'mystery',
      name: 'Mystery admission',
      iconType: 'mystery',
      description: 'Enter live broadcast rooms anonymously with stealth arrival until you decide to take a mic or chat.',
      unlockedAt: 2,
    },
    {
      id: 'antiKick',
      name: "Can't be kicked",
      iconType: 'antiKick',
      description: 'Immunity to kick and ban actions from regular room hosts and room moderators in all public channels.',
      unlockedAt: 2,
    },
    {
      id: 'antiMute',
      name: "Can't be muted",
      iconType: 'antiMute',
      description: 'Immunity to room mute overrides, ensuring your voice is always audible whenever you hold the mic.',
      unlockedAt: 2,
    },
    {
      id: 'gifAvatar',
      name: 'Gif avatar',
      iconType: 'gifAvatar',
      description: 'Upload dynamic moving GIF avatars that continuously play on your profile card and voice mic seats.',
      unlockedAt: 2,
    },
    {
      id: 'gifCover',
      name: 'Gif live room cover',
      iconType: 'gifCover',
      description: 'Use animated GIF graphics as your voice room cover photo in the party hall to attract more guests.',
      unlockedAt: 2,
    },
  ];

  const handleJoinSvip = () => {
    if (goldBalance >= currentTierData.price) {
      const success = onDeductCoins(currentTierData.price);
      if (success) {
        setJoinedSuccess(true);
        const targetFrame = isTier3 ? 'svip3' : isTier2 ? 'svip2' : 'svip1';
        setCurrentEquipped(targetFrame);
        if (onEquipFrame) onEquipFrame(targetFrame);
        setTimeout(() => setJoinedSuccess(false), 3000);
      }
    } else {
      setInsufficientFunds(true);
    }
  };

  const handleToggleEquipFrame = () => {
    const targetFrame = isTier4 ? 'svip4' : isTier3 ? 'svip3' : isTier2 ? 'svip2' : 'svip1';
    if (currentEquipped === targetFrame) {
      setCurrentEquipped('');
      if (onEquipFrame) onEquipFrame('');
    } else {
      setCurrentEquipped(targetFrame);
      if (onEquipFrame) onEquipFrame(targetFrame);
      setEquipToast(true);
      setTimeout(() => setEquipToast(false), 2500);
    }
  };

  const handleOpenPrivilege = (p: Privilege) => {
    if (p.id === 'frame') {
      setShowFrameModal(true);
    } else {
      setPreviewPrivilege(p);
    }
  };

  // Background per Tier
  const bgImage = isTier4
    ? `url('/src/assets/images/svip4_lion_bg_1790074228094.jpg')`
    : isTier3
    ? `url('/src/assets/images/svip3_tiger_bg_1790073642286.jpg')`
    : isTier2
    ? `url('/src/assets/images/svip2_wolf_bg_1790073046350.jpg')`
    : `url('/src/assets/images/arabian_golden_lobby_bg_1790069591326.jpg')`;

  return (
    <div className={`relative z-20 flex-1 flex flex-col select-none overflow-y-auto font-sans min-h-full pb-28 transition-colors duration-500 ${
      isTier4 ? 'bg-[#021124] text-cyan-50' : isTier3 ? 'bg-[#18032b] text-purple-50' : isTier2 ? 'bg-[#031322] text-cyan-50' : 'bg-[#140a02] text-amber-50'
    }`}>
      {/* Background Graphic Watermark */}
      <div 
        className="absolute inset-0 bg-cover bg-top pointer-events-none opacity-45 z-0 transition-opacity duration-700"
        style={{ backgroundImage: bgImage }}
      />
      <div className={`absolute inset-0 pointer-events-none z-0 ${
        isTier4
          ? 'bg-gradient-to-b from-[#0284c7]/40 via-[#021a36]/90 to-[#010c1c]'
          : isTier3
          ? 'bg-gradient-to-b from-[#25043f]/80 via-[#18022b]/95 to-[#0e011a]'
          : isTier2
          ? 'bg-gradient-to-b from-[#03182b]/80 via-[#02111f]/95 to-[#010912]'
          : 'bg-gradient-to-b from-[#241304]/80 via-[#180d04]/95 to-[#0d0602]'
      }`} />

      {/* 1. DEVICE STATUS BAR (Matches 3:49 👁️ ▶ 🔀 f, 77% in screenshot) */}
      <div className={`relative z-10 flex items-center justify-between text-[11px] font-medium px-4 pt-2 pb-1 ${
        isTier4 ? 'text-cyan-200/90' : isTier3 ? 'text-purple-200/90' : isTier2 ? 'text-cyan-200/90' : 'text-amber-200/90'
      }`}>
        <div className="flex items-center gap-1.5">
          <span>{isTier4 ? '3:49' : isTier3 ? '3:45' : isTier2 ? '3:29' : '3:39'}</span>
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
          <span className="text-[11px] font-mono font-bold">
            {isTier4 ? '🔋 77% ⚡' : isTier3 ? '🔋 74% ⚡' : isTier2 ? '🔋 62% ⚡' : '🔋 70% ⚡'}
          </span>
        </div>
      </div>

      {/* 2. TOP APP BAR (Back button + Centered Title matching screenshot "Hayuki SVIP") */}
      <header className="relative z-10 flex items-center justify-between px-3.5 py-2">
        {/* Ornate Circular Back Button */}
        <button
          onClick={onBack}
          className={`relative w-9 h-9 rounded-full border flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer group ${
            isTier4
              ? 'bg-gradient-to-b from-[#0284c7] to-[#042f54] border-cyan-300/80 text-cyan-200'
              : isTier3
              ? 'bg-gradient-to-b from-[#3b0764] to-[#1c0230] border-yellow-400/80 text-yellow-300'
              : isTier2
              ? 'bg-gradient-to-b from-[#0f2c45] to-[#071725] border-cyan-400/80 text-cyan-200'
              : 'bg-gradient-to-b from-[#3a200a] to-[#1a0e05] border-amber-400/80 text-amber-200'
          }`}
          title="Back"
        >
          <div className="absolute -top-1 -left-1 text-[8px] text-yellow-400">✧</div>
          <div className="absolute -bottom-1 -right-1 text-[8px] text-yellow-400">✧</div>
          <span className="text-base font-bold group-hover:text-white">‹</span>
        </button>

        {/* Title: Hayuki SVIP */}
        <h1 className="text-lg font-bold text-white tracking-wide drop-shadow">
          Hayuki SVIP
        </h1>

        <div className="w-9" />
      </header>

      {/* 3. HORIZONTAL SVIP TIERS TAB BAR (SVIP4, SVIP5, SVIP6, SVIP7...) */}
      <div className={`relative z-10 flex items-center gap-6 px-4 pt-1 pb-3 overflow-x-auto scrollbar-none border-b ${
        isTier4 ? 'border-cyan-500/20' : isTier3 ? 'border-purple-500/20' : isTier2 ? 'border-cyan-500/20' : 'border-amber-500/15'
      }`}>
        {tiers.map((t) => {
          const isActive = t.tier === activeTier;
          return (
            <button
              key={t.tier}
              onClick={() => setActiveTier(t.tier)}
              className={`relative pb-1.5 text-sm font-extrabold transition whitespace-nowrap cursor-pointer ${
                isActive 
                  ? 'text-yellow-400 font-black' 
                  : isTier4
                  ? 'text-cyan-200/50 hover:text-cyan-100'
                  : isTier3 
                  ? 'text-purple-200/50 hover:text-purple-100'
                  : isTier2 
                  ? 'text-cyan-200/50 hover:text-cyan-100' 
                  : 'text-amber-200/50 hover:text-amber-200/80'
              }`}
            >
              <span>{t.name}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-0.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.9)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* 4. HERO CARD (Matching SVIP4 Celestial Lion in screenshot) */}
      <div className={`relative z-10 mx-3.5 mt-3 mb-4 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.85)] border ${
        isTier4
          ? 'border-cyan-400/80 shadow-[0_8px_30px_rgba(6,182,212,0.4)]'
          : isTier3 
          ? 'border-yellow-400/60 shadow-[0_8px_30px_rgba(168,85,247,0.35)]' 
          : isTier2 
          ? 'border-cyan-400/50 shadow-[0_8px_30px_rgba(6,182,212,0.25)]' 
          : 'border-yellow-500/30'
      }`}>
        {/* Sculpted Corner Accents */}
        {isTier4 && (
          <>
            <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-30 flex items-start justify-start p-1.5">
              <span className="text-cyan-300 text-xs filter drop-shadow-[0_0_6px_#38bdf8]">💎</span>
            </div>
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none z-30 flex items-start justify-end p-1.5">
              <span className="text-cyan-300 text-xs filter drop-shadow-[0_0_6px_#38bdf8]">💎</span>
            </div>
          </>
        )}
        {isTier3 && (
          <>
            <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-30 flex items-start justify-start p-1">
              <span className="text-yellow-400 text-base filter drop-shadow">⚜️</span>
            </div>
            <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none z-30 flex items-start justify-end p-1">
              <span className="text-yellow-400 text-base filter drop-shadow">⚜️</span>
            </div>
          </>
        )}

        <div className={`relative p-6 pt-7 pb-6 flex flex-col items-center justify-center text-center ${
          isTier4
            ? 'bg-gradient-to-b from-[#38bdf8] via-[#0284c7] to-[#0369a1]'
            : isTier3
            ? 'bg-gradient-to-b from-[#a855f7] via-[#7c3aed] to-[#4c1d95]'
            : isTier2 
            ? 'bg-gradient-to-b from-[#38bdf8] via-[#0284c7] to-[#0369a1]' 
            : 'bg-gradient-to-b from-[#a3681e] via-[#633e10] to-[#382006]'
        }`}>
          {/* Watermark Behind Frame */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 text-7xl select-none">
            {isTier4 ? '🦁' : isTier3 ? '🐯' : isTier2 ? '🐺' : '🦅'}
          </div>

          <div className="relative mb-3 cursor-pointer group" onClick={() => setShowFrameModal(true)}>
            {isTier4 ? (
              <Svip4Frame 
                size="lg" 
                avatarUrl={user.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80'} 
              />
            ) : isTier3 ? (
              <Svip3Frame 
                size="lg" 
                avatarUrl={user.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80'} 
              />
            ) : isTier2 ? (
              <Svip2Frame 
                size="lg" 
                avatarUrl={user.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80'} 
              />
            ) : (
              <Svip1Frame 
                size="lg" 
                avatarUrl={user.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80'} 
              />
            )}
          </div>

          {/* User Name Matching SVIP4 Screenshot: Zs 🔀 🚩 SALMAN 💚 🦅 . 🐢 with vibrant green & cyan */}
          <div className="mt-3 text-center">
            {isTier4 ? (
              <h2 className="text-base sm:text-lg font-black tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] flex items-center justify-center gap-1.5 flex-wrap">
                <span className="text-yellow-300 font-extrabold">Zs</span>
                <span className="text-lime-400">🔀</span>
                <span className="text-lime-400">🚩</span>
                <span className="text-[#22c55e] font-black">SALMAN</span>
                <span className="text-emerald-400">💚</span>
                <span className="text-cyan-300">🦅</span>
                <span className="text-cyan-300">.</span>
                <span className="text-sky-300">🐢</span>
              </h2>
            ) : isTier3 ? (
              <h2 className="text-base sm:text-lg font-black text-amber-300 tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] flex items-center justify-center gap-1.5 flex-wrap">
                <span className="text-yellow-300">Zs</span>
                <span className="text-amber-400">🏹</span>
                <span className="text-amber-400">🚩</span>
                <span className="text-amber-300 font-extrabold">SALMAN</span>
                <span>💛</span>
                <span>🦅</span>
                <span>.</span>
                <span>🐢</span>
              </h2>
            ) : (
              <h2 className="text-base sm:text-lg font-black text-[#84cc16] tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] flex items-center justify-center gap-1.5 flex-wrap">
                <span>Zs</span>
                <span>🔀</span>
                <span>SALMAN</span>
                <span>💚</span>
                <span>🦅</span>
                <span>.</span>
                <span>🙊</span>
              </h2>
            )}
          </div>
        </div>
      </div>

      {/* 5. "SVIP Privileges" SECTION HEADER RIBBON */}
      <div className="relative z-10 flex items-center justify-center my-3">
        <div className={`relative px-8 py-1.5 rounded-lg border shadow-md ${
          isTier4
            ? 'bg-gradient-to-r from-[#0369a1] via-[#0284c7] to-[#0369a1] border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.6)]'
            : isTier3
            ? 'bg-gradient-to-r from-[#581c87] via-[#9333ea] to-[#581c87] border-yellow-400/80 shadow-[0_0_15px_rgba(168,85,247,0.6)]'
            : isTier2
            ? 'bg-gradient-to-r from-[#0c4a6e] via-[#0284c7] to-[#0c4a6e] border-cyan-400/60 shadow-[0_0_12px_rgba(2,132,199,0.5)]'
            : 'bg-gradient-to-r from-[#422204] via-[#61360c] to-[#422204] border-amber-400/50'
        }`}>
          {/* Crown & Diamond Top Accent for SVIP4 */}
          {isTier4 && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
              <span className="text-yellow-400 text-xs">👑</span>
              <span className="text-cyan-300 text-[10px] -ml-0.5">💎</span>
            </div>
          )}
          <div className={`absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 ${
            isTier4 ? 'bg-cyan-300 shadow-[0_0_6px_#38bdf8]' : isTier3 ? 'bg-yellow-300 shadow-[0_0_6px_#fde047]' : isTier2 ? 'bg-cyan-300' : 'bg-amber-400'
          }`} />
          <div className={`absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 ${
            isTier4 ? 'bg-cyan-300 shadow-[0_0_6px_#38bdf8]' : isTier3 ? 'bg-yellow-300 shadow-[0_0_6px_#fde047]' : isTier2 ? 'bg-cyan-300' : 'bg-amber-400'
          }`} />
          <h3 className={`font-extrabold text-sm tracking-wider ${
            isTier4 ? 'text-white drop-shadow' : isTier3 ? 'text-yellow-200 drop-shadow' : isTier2 ? 'text-white' : 'text-yellow-200'
          }`}>
            SVIP Privileges
          </h3>
        </div>
      </div>

      {/* 6. PRIVILEGES LIST */}
      <div className="relative z-10 px-3.5 space-y-2.5">
        {privileges.map((p) => (
          <div 
            key={p.id}
            className={`p-3.5 rounded-2xl border flex items-center justify-between shadow-md transition group cursor-pointer ${
              isTier3
                ? 'bg-gradient-to-r from-[#2a094a] to-[#1a042e] border-purple-500/30 hover:border-yellow-400/50'
                : isTier2
                ? 'bg-gradient-to-r from-[#07253b] to-[#041724] border-cyan-500/25 hover:border-cyan-400/40'
                : 'bg-gradient-to-r from-[#2c1706] to-[#1f0f04] border-amber-500/25 hover:border-amber-400/40'
            }`}
            onClick={() => handleOpenPrivilege(p)}
          >
            {/* Left: Privilege Name + View button */}
            <div className="flex items-center gap-3">
              <span className={`font-bold text-sm ${
                isTier3 ? 'text-purple-100' : isTier2 ? 'text-cyan-50' : 'text-amber-100'
              }`}>
                {p.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenPrivilege(p);
                }}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border flex items-center gap-0.5 transition cursor-pointer ${
                  isTier3
                    ? 'bg-[#4c1d95] hover:bg-[#5b21b6] text-yellow-300 border-yellow-400/40'
                    : isTier2
                    ? 'bg-[#0f344e] hover:bg-[#154668] text-cyan-200 border-cyan-500/40'
                    : 'bg-[#4a2b0e] hover:bg-[#5e3814] text-amber-200 border-amber-500/30'
                }`}
              >
                <span>View</span>
                <span className="text-[9px]">&gt;</span>
              </button>
            </div>

            {/* Right: Graphic Preview */}
            <div className="shrink-0 flex items-center justify-end">
              {p.previewType === 'colorName' && (
                isTier4 ? (
                  <div className="font-black text-base tracking-wider drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] flex">
                    <span className="text-[#84cc16]">N</span>
                    <span className="text-[#22d3ee]">A</span>
                    <span className="text-[#06b6d4]">M</span>
                    <span className="text-[#38bdf8]">E</span>
                  </div>
                ) : isTier3 ? (
                  <div className="font-black text-base tracking-wider drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] flex">
                    <span className="text-yellow-400">N</span>
                    <span className="text-orange-400">A</span>
                    <span className="text-purple-400">M</span>
                    <span className="text-emerald-400">E</span>
                  </div>
                ) : (
                  <span className="font-black text-base text-[#06b6d4] tracking-wider drop-shadow-[0_0_8px_#06b6d4]">
                    NAME
                  </span>
                )
              )}

              {p.previewType === 'frame' && (
                <div className="w-14 h-14 relative flex items-center justify-center">
                  {isTier4 ? (
                    <Svip4Frame size="sm" showSparkles={true}>
                      <div className="w-full h-full bg-[#031b33] rounded-full" />
                    </Svip4Frame>
                  ) : isTier3 ? (
                    <Svip3Frame size="sm" showSparkles={true}>
                      <div className="w-full h-full bg-[#18052e] rounded-full" />
                    </Svip3Frame>
                  ) : isTier2 ? (
                    <Svip2Frame size="sm" showSparkles={true}>
                      <div className="w-full h-full bg-slate-900/60 rounded-full" />
                    </Svip2Frame>
                  ) : (
                    <Svip1Frame size="sm" showSparkles={true}>
                      <div className="w-full h-full bg-black/60 rounded-full" />
                    </Svip1Frame>
                  )}
                </div>
              )}

              {p.previewType === 'entry' && (
                isTier4 ? (
                  /* Dual Entry Banner matching SVIP4 */
                  <div className="flex flex-col gap-1 w-20">
                    <div className="h-4 rounded bg-gradient-to-r from-blue-700 via-sky-500 to-blue-700 border border-yellow-300 px-1 flex items-center justify-between text-[7px] text-yellow-200 font-bold shadow">
                      <span>👑</span>
                      <span>SVIP4</span>
                      <span>✦</span>
                    </div>
                    <div className="h-4 rounded bg-gradient-to-r from-sky-400 via-blue-500 to-amber-400 border border-yellow-200 px-1 flex items-center justify-between text-[7px] text-white font-bold shadow">
                      <span>✧</span>
                      <span className="font-black">PALACE</span>
                      <span>🦁</span>
                    </div>
                  </div>
                ) : isTier3 ? (
                  /* Dual Entry Banner matching SVIP3 screenshot */
                  <div className="flex flex-col gap-1 w-20">
                    <div className="h-4 rounded bg-gradient-to-r from-purple-800 via-fuchsia-600 to-purple-800 border border-yellow-400/80 px-1 flex items-center justify-between text-[7px] text-yellow-300 font-bold shadow">
                      <span>👑</span>
                      <span>SVIP3</span>
                      <span>✦</span>
                    </div>
                    <div className="h-4 rounded bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 border border-yellow-200 px-1 flex items-center justify-between text-[7px] text-amber-950 font-bold shadow">
                      <span>✧</span>
                      <span className="font-black">PALACE</span>
                      <span>🐯</span>
                    </div>
                  </div>
                ) : (
                  <div className={`w-20 h-9 rounded-lg p-0.5 shadow flex items-center justify-between px-1.5 border ${
                    isTier2
                      ? 'bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-500 border-cyan-200'
                      : 'bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700 border-yellow-200'
                  }`}>
                    <div className="w-5 h-5 rounded-full bg-black/50 flex items-center justify-center text-[10px]">
                      {isTier2 ? '🐺' : '🦅'}
                    </div>
                    <div className="flex-1 px-1">
                      <div className="h-1 bg-white rounded-full w-full" />
                      <div className="h-1 bg-cyan-200/60 rounded-full w-2/3 mt-0.5" />
                    </div>
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                )
              )}

              {p.previewType === 'page' && (
                <div className={`w-12 h-12 rounded-xl p-0.5 border shadow overflow-hidden relative flex flex-col items-center justify-center ${
                  isTier4
                    ? 'bg-gradient-to-b from-[#0284c7] to-[#041a33] border-cyan-400/80'
                    : isTier3
                    ? 'bg-gradient-to-b from-[#4a0e78] to-[#1d0333] border-yellow-400/60'
                    : isTier2
                    ? 'bg-gradient-to-b from-cyan-900 to-[#04192b] border-cyan-400/50'
                    : 'bg-gradient-to-b from-amber-700 to-[#221004] border-yellow-400/50'
                }`}>
                  <span className="text-xl">{isTier4 ? '🦁' : isTier3 ? '🐯' : isTier2 ? '🐺' : '🦅'}</span>
                  <span className={`text-[7px] font-bold ${isTier4 ? 'text-cyan-200' : isTier3 ? 'text-yellow-300' : 'text-cyan-300'}`}>
                    PROFILE
                  </span>
                </div>
              )}

              {p.previewType === 'bubble' && (
                isTier4 ? (
                  <div className="relative w-22 h-11 rounded-xl border-2 border-yellow-400 bg-gradient-to-r from-[#0369a1] via-[#0284c7] to-[#075985] p-1 flex items-center shadow-[0_0_12px_rgba(56,189,248,0.6)] overflow-visible">
                    <div className="absolute -top-1.5 -right-1 px-1.5 py-0.2 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 text-[6px] font-black text-amber-950 rounded shadow border border-yellow-200 uppercase tracking-tighter">
                      SVIP4
                    </div>
                    <div className="text-[7px] text-cyan-100 font-bold pl-1 select-none">
                      Hello...
                    </div>
                    <div className="absolute -bottom-2 -right-2 text-base filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] select-none">
                      🦁
                    </div>
                    <div className="absolute -bottom-1 -left-1 text-[9px] text-cyan-200 filter drop-shadow animate-pulse select-none">
                      💎
                    </div>
                  </div>
                ) : isTier3 ? (
                  <div className="relative w-22 h-11 rounded-xl border-2 border-yellow-400 bg-gradient-to-r from-[#4a044e] via-[#701a75] to-[#86198f] p-1 flex items-center shadow-[0_0_12px_rgba(217,70,239,0.5)] overflow-visible">
                    {/* Top Right SVIP3 Badge */}
                    <div className="absolute -top-1.5 -right-1 px-1.5 py-0.2 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 text-[6px] font-black text-amber-950 rounded shadow border border-yellow-200 uppercase tracking-tighter">
                      SVIP3
                    </div>
                    {/* Interior dialogue text */}
                    <div className="text-[7px] text-purple-100 font-bold pl-1 select-none">
                      Hello...
                    </div>
                    {/* Bottom Right Golden Royal Tiger with Blue Mane */}
                    <div className="absolute -bottom-2 -right-2 text-base filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] select-none">
                      🐯
                    </div>
                    {/* Bottom Left Golden Sparkle Trail */}
                    <div className="absolute -bottom-1 -left-1 text-[9px] text-yellow-300 filter drop-shadow animate-pulse select-none">
                      ✨
                    </div>
                  </div>
                ) : isTier2 ? (
                  <div className="relative w-20 h-10 rounded-xl border-2 border-yellow-400 bg-gradient-to-r from-[#0369a1] via-[#0284c7] to-[#0c4a6e] p-1 flex items-center shadow-[0_0_10px_rgba(2,132,199,0.5)] overflow-hidden">
                    <div className="absolute top-0 right-0 px-1 py-0.2 bg-gradient-to-r from-amber-400 to-yellow-300 text-[6px] font-black text-slate-950 rounded-bl">
                      SVIP2
                    </div>
                    <div className="text-[7px] text-cyan-100 font-bold pl-1">
                      Hello...
                    </div>
                    <div className="absolute bottom-0 right-0 text-sm">
                      🐺
                    </div>
                    <span className="absolute bottom-1 left-1 text-[8px] text-cyan-200">✧</span>
                  </div>
                ) : (
                  <div className="w-16 h-8 rounded-xl border-2 p-1 flex items-center justify-between shadow bg-gradient-to-r from-yellow-500/20 to-amber-600/30 border-yellow-400 text-yellow-100">
                    <span className="text-[8px] font-medium">Hello...</span>
                    <div className="px-1 py-0.2 rounded text-[7px] font-black bg-yellow-400 text-amber-950">
                      SVIP1
                    </div>
                  </div>
                )
              )}

              {p.previewType === 'micWave' && (
                isTier4 ? (
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-1 rounded-full border border-cyan-400/60 shadow-[0_0_14px_rgba(56,189,248,0.8)] animate-ping opacity-60" />
                    <div className="absolute inset-2.5 rounded-full border-2 border-sky-300 shadow-[0_0_10px_#38bdf8] animate-pulse" />
                    <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-xs text-white shadow">
                      🎤
                    </div>
                    <div className="absolute top-1 right-1 text-[9px] text-cyan-300 animate-bounce">✧</div>
                    <div className="absolute bottom-1 left-1 text-[9px] text-yellow-300 animate-bounce">✦</div>
                  </div>
                ) : isTier3 ? (
                  /* SVIP 3 Star Hexagram Mic Wave - Matching Screenshot */
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    {/* Glowing outer neon circle */}
                    <div className="absolute inset-1 rounded-full border border-fuchsia-400/50 shadow-[0_0_12px_rgba(217,70,239,0.8)] animate-pulse" />
                    
                    {/* Two interlocking triangles forming the exact 6-pointed star / Hexagram */}
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full filter drop-shadow-[0_0_8px_#d946ef] animate-[spin_15s_linear_infinite]">
                      {/* Triangle 1 (Points up) */}
                      <polygon 
                        points="50,4 90,75 10,75" 
                        fill="none" 
                        stroke="#f472b6" 
                        strokeWidth="3.5" 
                        strokeLinejoin="round" 
                      />
                      {/* Triangle 2 (Points down) */}
                      <polygon 
                        points="50,96 90,25 10,25" 
                        fill="none" 
                        stroke="#f472b6" 
                        strokeWidth="3.5" 
                        strokeLinejoin="round" 
                      />
                    </svg>

                    {/* Inner Avatar Matching Screenshot portrait */}
                    <div className="relative z-10 w-9 h-9 rounded-full overflow-hidden border-2 border-fuchsia-300 shadow-[0_0_8px_rgba(236,72,153,0.8)]">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" 
                        alt="Mic Wave User"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <div className={`absolute inset-0 rounded-full border-2 animate-ping opacity-60 ${
                      isTier2 ? 'border-cyan-400/40' : 'border-yellow-400/50'
                    }`} />
                    <div className={`absolute inset-1 rounded-full border-2 shadow-[0_0_10px] ${
                      isTier2 ? 'border-cyan-400 shadow-[#38bdf8]' : 'border-yellow-400 shadow-yellow-400/70'
                    }`} />
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" 
                        alt="Mic Wave Avatar"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 7. "SVIP(1/9)" HEXAGONAL SECTION RIBBON */}
      <div className="relative z-10 flex items-center justify-center mt-6 mb-4">
        <div className={`relative px-8 py-1.5 rounded-lg border shadow-md ${
          isTier3
            ? 'bg-gradient-to-r from-[#581c87] via-[#9333ea] to-[#581c87] border-yellow-400/80 shadow-[0_0_15px_rgba(168,85,247,0.6)]'
            : isTier2
            ? 'bg-gradient-to-r from-[#0c4a6e] via-[#0284c7] to-[#0c4a6e] border-cyan-400/70 shadow-[0_0_15px_rgba(2,132,199,0.6)]'
            : 'bg-gradient-to-r from-[#422204] via-[#61360c] to-[#422204] border-amber-400/60'
        }`}>
          <div className={`absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 ${
            isTier3 ? 'bg-yellow-300' : isTier2 ? 'bg-cyan-300' : 'bg-amber-400'
          }`} />
          <div className={`absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 ${
            isTier3 ? 'bg-yellow-300' : isTier2 ? 'bg-cyan-300' : 'bg-amber-400'
          }`} />
          <h3 className="font-black text-sm tracking-wider text-white">
            {currentTierData.name}(1/9)
          </h3>
        </div>
      </div>

      {/* 8. 3x3 GRID OF HEXAGONAL PERKS */}
      <div className="relative z-10 px-3.5 mb-6">
        <div className="grid grid-cols-3 gap-y-5 gap-x-2">
          {svipPerks.map((perk) => (
            <div 
              key={perk.id}
              onClick={() => setSelectedPerk(perk)}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              <HexagonPerkBadge tier={activeTier}>
                {perk.iconType === 'picture' && (
                  <ImageIcon className="w-6 h-6 group-hover:text-white transition-colors" />
                )}

                {perk.iconType === 'rocket' && (
                  <Rocket className="w-6 h-6 transform -rotate-45 group-hover:text-white transition-colors" />
                )}

                {perk.iconType === 'svipTag' && (
                  <div className="px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-950 font-black text-[9px] tracking-wider shadow border border-yellow-200">
                    SVIP
                  </div>
                )}

                {perk.iconType === 'listHidden' && (
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-0.5 bg-current rounded mb-0.5" />
                    <div className="w-4 h-0.5 bg-current rounded mb-0.5" />
                    <div className="w-3 h-0.5 bg-current rounded mb-0.5" />
                    <span className="text-[10px] -mt-0.5">👁️</span>
                  </div>
                )}

                {perk.iconType === 'mystery' && (
                  <div className="relative flex items-center justify-center">
                    <span className="text-xl">↪</span>
                    <span className="absolute -top-1 -right-2 text-xs">🎭</span>
                  </div>
                )}

                {perk.iconType === 'antiKick' && (
                  <div className="relative flex items-center justify-center">
                    <span className="text-xl">🥾</span>
                    <span className="absolute -bottom-1 -right-1 text-red-400 font-bold text-xs">⊘</span>
                  </div>
                )}

                {perk.iconType === 'antiMute' && (
                  <div className="relative flex items-center justify-center">
                    <Volume2 className="w-5 h-5" />
                    <span className="absolute -bottom-1 -right-1 text-red-400 font-bold text-xs">⊘</span>
                  </div>
                )}

                {perk.iconType === 'gifAvatar' && (
                  <div className="relative flex items-center justify-center">
                    <User className="w-5 h-5" />
                    <span className="absolute -bottom-1.5 -right-2.5 px-1 bg-yellow-400 text-slate-950 font-black text-[7px] rounded">
                      GIF
                    </span>
                  </div>
                )}

                {perk.iconType === 'gifCover' && (
                  <div className="relative flex items-center justify-center">
                    <ImageIcon className="w-5 h-5" />
                    <span className="absolute -bottom-1.5 -right-2.5 px-1 bg-yellow-400 text-slate-950 font-black text-[7px] rounded">
                      GIF
                    </span>
                  </div>
                )}
              </HexagonPerkBadge>

              <span className={`mt-2 text-[11px] font-medium leading-tight max-w-[95px] line-clamp-3 transition-colors ${
                isTier3 ? 'text-purple-200/90 group-hover:text-yellow-300' : isTier2 ? 'text-cyan-100/90 group-hover:text-cyan-200' : 'text-amber-100/90'
              }`}>
                {perk.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 9. BOTTOM STICKY FLOATING ACTION BAR (Exact price: SVIP3 is 182000, 7 Days) */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 border-t-2 px-5 py-3 shadow-[0_-8px_25px_rgba(0,0,0,0.85)] flex items-center justify-between ${
        isTier3
          ? 'bg-gradient-to-r from-[#1c0233] via-[#330559] to-[#1c0233] border-yellow-400/50'
          : isTier2
          ? 'bg-gradient-to-r from-[#041a2e] via-[#093252] to-[#041a2e] border-cyan-400/50'
          : 'bg-gradient-to-r from-[#241304] via-[#3d2008] to-[#241304] border-amber-500/40'
      }`}>
        {/* Left: Gold Coin + Price + Duration */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-600 p-0.5 shadow-[0_0_12px_rgba(251,191,36,0.7)] flex items-center justify-center shrink-0">
            <span className="text-base font-black text-amber-950">$</span>
          </div>
          <div>
            <div className="text-xl font-black text-yellow-300 leading-none drop-shadow font-mono">
              {currentTierData.price.toLocaleString()}
            </div>
            <p className="text-[11px] text-yellow-200/80 font-semibold mt-0.5">
              {currentTierData.days}
            </p>
          </div>
        </div>

        {/* Right: Rounded Yellow "JOIN SVIP" Button */}
        <button
          onClick={handleJoinSvip}
          className="px-7 py-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 text-amber-950 font-black text-sm tracking-wider shadow-[0_4px_15px_rgba(251,191,36,0.6)] hover:brightness-110 active:scale-95 transition cursor-pointer"
        >
          JOIN SVIP
        </button>
      </div>

      {/* 10. DEDICATED SVIP FRAME MODAL */}
      {showFrameModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-end sm:items-center justify-center p-3 animate-fade-in">
          <div className={`w-full max-w-sm rounded-[32px] border-2 shadow-[0_10px_35px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh] ${
            isTier4
              ? 'bg-gradient-to-b from-[#032542] via-[#02182b] to-[#010c17] border-cyan-400/90'
              : isTier3
              ? 'bg-gradient-to-b from-[#2a074a] via-[#1a042e] to-[#0e011a] border-yellow-400/80'
              : isTier2
              ? 'bg-gradient-to-b from-[#07243c] via-[#041728] to-[#020d17] border-cyan-400/80'
              : 'bg-gradient-to-b from-[#261405] via-[#1a0e04] to-[#100702] border-yellow-400/80'
          }`}>
            <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-2">
                <Crown className={`w-5 h-5 ${isTier4 ? 'text-cyan-300' : isTier3 ? 'text-yellow-400' : isTier2 ? 'text-cyan-400' : 'text-yellow-400'}`} />
                <div>
                  <h3 className={`font-black text-sm tracking-wide ${
                    isTier4 ? 'text-cyan-200' : isTier3 ? 'text-yellow-300' : isTier2 ? 'text-cyan-200' : 'text-yellow-200'
                  }`}>
                    {isTier4 ? 'SVIP 4 Celestial White Lion Frame' : isTier3 ? 'SVIP 3 Royal Tiger Frame' : isTier2 ? 'SVIP 2 Frost Wolf Frame' : 'SVIP 1 Frame'}
                  </h3>
                  <p className="text-[10px] text-yellow-300 font-semibold uppercase tracking-wider">
                    Imperial Edition
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowFrameModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center text-sm font-bold transition"
              >
                ✕
              </button>
            </div>

            <div className="flex border-b border-white/10 bg-black/30 text-xs font-bold">
              <button
                onClick={() => setFrameModalTab('avatar')}
                className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  frameModalTab === 'avatar' 
                    ? isTier4 || isTier2
                      ? 'text-cyan-300 border-b-2 border-cyan-400 bg-cyan-400/10'
                      : 'text-yellow-300 border-b-2 border-yellow-400 bg-yellow-400/10' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Wear on Avatar</span>
              </button>
              <button
                onClick={() => setFrameModalTab('box')}
                className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  frameModalTab === 'box' 
                    ? isTier4 || isTier2
                      ? 'text-cyan-300 border-b-2 border-cyan-400 bg-cyan-400/10'
                      : 'text-yellow-300 border-b-2 border-yellow-400 bg-yellow-400/10' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Collector Box</span>
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4">
              {frameModalTab === 'avatar' ? (
                <div className="space-y-4 text-center">
                  <p className="text-xs text-cyan-200/70">
                    Previewing {currentTierData.name} Frame equipped on your profile:
                  </p>

                  <div className="py-6 flex flex-col items-center justify-center">
                    {isTier4 ? (
                      <Svip4Frame 
                        size="xl" 
                        avatarUrl={user.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80'} 
                      />
                    ) : isTier3 ? (
                      <Svip3Frame 
                        size="xl" 
                        avatarUrl={user.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80'} 
                      />
                    ) : isTier2 ? (
                      <Svip2Frame 
                        size="xl" 
                        avatarUrl={user.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80'} 
                      />
                    ) : (
                      <Svip1Frame 
                        size="xl" 
                        avatarUrl={user.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80'} 
                      />
                    )}
                    <div className="mt-4">
                      {isTier4 ? (
                        <span className="text-base font-black text-white drop-shadow-md">
                          <span className="text-yellow-300">Zs</span> 🔀 🚩 <span className="text-[#22c55e]">SALMAN</span> 💚 🦅 . 🐢
                        </span>
                      ) : isTier3 ? (
                        <span className="text-base font-black text-yellow-300 drop-shadow-md">
                          Zs 🏹 🚩 SALMAN 💛 🦅 . 🐢
                        </span>
                      ) : (
                        <span className="text-base font-black text-[#84cc16] drop-shadow-md">
                          Zs 🔀 SALMAN 💚 🦅 . 🙊
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-left text-[11px]">
                    <div className="p-2 rounded-xl bg-black/40 border border-white/10 flex items-center gap-1.5 text-cyan-100">
                      <Check className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                      <span>{isTier4 ? 'Celestial Lion Crest' : isTier3 ? 'Imperial Tiger Crest' : isTier2 ? 'Ice Crystal Wings' : 'Diamond Pavé Wings'}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-black/40 border border-white/10 flex items-center gap-1.5 text-cyan-100">
                      <Check className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                      <span>{isTier4 ? 'Azure Diamond Wings' : isTier3 ? 'Baroque Gold Wings' : isTier2 ? 'Royal SVIP2 Plaque' : 'Baroque SVIP1 Shield'}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-black/40 border border-white/10 flex items-center gap-1.5 text-cyan-100">
                      <Check className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                      <span>{isTier4 ? 'Crowned SVIP4 Plaque' : isTier3 ? 'Golden SVIP3 Scroll' : isTier2 ? 'Sculpted Wolf Crest' : 'Sculpted Eagle Head'}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-black/40 border border-white/10 flex items-center gap-1.5 text-cyan-100">
                      <Check className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                      <span>{isTier4 ? 'Radiant Azure Halo' : 'Radiant Golden Halo'}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-400/60 bg-[#031d36] shadow-2xl aspect-[3/4] flex items-center justify-center">
                    <img 
                      src={isTier4 ? '/src/assets/images/svip4_lion_frame_1790074205043.jpg' : isTier3 ? '/src/assets/images/svip3_tiger_frame_1790073621984.jpg' : isTier2 ? '/src/assets/images/svip2_wolf_frame_1790072798862.jpg' : '/src/assets/images/svip1_box_showcase_1790072563227.jpg'} 
                      alt="Showcase Edition"
                      className="w-full h-full object-contain p-4" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-black/60 pointer-events-none" />
                  </div>

                  <div className="p-3 rounded-2xl bg-black/40 border border-cyan-400/30 text-xs text-cyan-100 space-y-1.5">
                    <div className="flex items-center justify-between text-cyan-300 font-bold text-xs">
                      <span>{isTier4 ? 'SVIP4 Celestial White Lion Frame' : isTier3 ? 'SVIP3 Royal Tiger Frame' : isTier2 ? 'SVIP2 Frost Wolf Frame' : 'SVIP1 Eagle Diamond Frame'}</span>
                      <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-slate-950 font-black text-[9px]">
                        IMPERIAL
                      </span>
                    </div>
                    <p className="text-[11px] text-cyan-200/70 leading-relaxed">
                      {isTier4
                        ? 'Forged from eternal celestial sapphire crystals and polished celestial gold. Features the majestic White Lion emblem with baroque azure diamond crystal wings.'
                        : isTier3
                        ? 'Forged from imperial gold and sacred amethyst crystals. Features the fearsome royal tiger emblem with baroque golden laurel wings.'
                        : isTier2 
                        ? 'Forged from eternal arctic ice crystals and polished platinum silver. Features shimmering blue diamond plumage and radiant wolf crest.'
                        : 'Forged in polished 18K gold and adorned with pavé diamonds with the royal eagle crest.'}
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleToggleEquipFrame}
                className={`w-full py-3 rounded-2xl font-black text-xs tracking-wider uppercase transition shadow-xl cursor-pointer flex items-center justify-center gap-2 ${
                  currentEquipped === (isTier4 ? 'svip4' : isTier3 ? 'svip3' : isTier2 ? 'svip2' : 'svip1')
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_4px_15px_rgba(16,185,129,0.5)]'
                    : 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 text-amber-950 shadow-[0_4px_15px_rgba(251,191,36,0.6)] hover:brightness-110'
                }`}
              >
                {currentEquipped === (isTier4 ? 'svip4' : isTier3 ? 'svip3' : isTier2 ? 'svip2' : 'svip1') ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Frame Equipped on Profile</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Equip {currentTierData.name} Frame</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
          </div>
        </div>
      )}

      {/* 11. GENERAL PREVIEW MODAL */}
      {previewPrivilege && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-xs rounded-3xl bg-gradient-to-b from-[#2a074a] to-[#120221] border-2 border-yellow-400/80 p-5 text-white shadow-2xl text-center space-y-4">
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
              <h4 className="font-extrabold text-base text-yellow-300">{previewPrivilege.name}</h4>
              <button 
                onClick={() => setPreviewPrivilege(null)}
                className="w-7 h-7 rounded-full bg-black/40 text-purple-200 hover:text-white flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="py-4 flex flex-col items-center justify-center">
              {previewPrivilege.previewType === 'colorName' && (
                <div className="text-xl font-black tracking-wider drop-shadow-[0_0_12px_rgba(250,204,21,0.7)] flex">
                  <span className="text-yellow-400">N</span>
                  <span className="text-orange-400">A</span>
                  <span className="text-purple-400">M</span>
                  <span className="text-emerald-400">E</span>
                </div>
              )}
              {previewPrivilege.previewType === 'entry' && (
                <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-800 via-amber-400 to-purple-800 text-slate-950 font-black text-xs shadow-lg flex items-center justify-center gap-2 animate-pulse border border-yellow-300">
                  <span>🐯</span>
                  <span>Imperial Lord Salman entered the palace!</span>
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              {previewPrivilege.previewType === 'page' && (
                <div className="w-36 h-24 rounded-2xl bg-[#36095c] border-2 border-yellow-400/70 p-2 flex flex-col items-center justify-center shadow-lg">
                  <span className="text-3xl">🐯</span>
                  <span className="text-xs text-yellow-300 font-extrabold mt-1">IMPERIAL TIGER PAGE</span>
                </div>
              )}
              {previewPrivilege.previewType === 'bubble' && (
                <div className="w-full flex flex-col items-center">
                  <div className="relative w-48 p-3 rounded-2xl bg-gradient-to-r from-[#4a044e] via-[#701a75] to-[#86198f] border-2 border-yellow-400 text-left text-xs text-yellow-100 shadow-[0_0_20px_rgba(217,70,239,0.6)] relative">
                    <span>Hey everyone, welcome to the SVIP3 Royal Room! 👑</span>
                    <div className="absolute -top-2 right-2 px-1.5 py-0.2 rounded bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 text-amber-950 text-[8px] font-black border border-yellow-200 shadow">
                      {currentTierData.name}
                    </div>
                    {isTier3 && (
                      <div className="absolute -bottom-2 -right-1 text-xl filter drop-shadow">
                        🐯
                      </div>
                    )}
                    <span className="absolute -bottom-1 left-2 text-xs text-yellow-300">✨</span>
                  </div>
                </div>
              )}
              {previewPrivilege.previewType === 'micWave' && (
                <div className="relative w-32 h-32 flex items-center justify-center">
                  {/* Outer pulsating glow rings */}
                  <div className={`absolute inset-0 rounded-full border-2 animate-ping opacity-30 ${
                    isTier3 ? 'border-fuchsia-400' : isTier2 ? 'border-cyan-400' : 'border-yellow-400'
                  }`} />
                  <div className={`absolute inset-2 rounded-full border-2 ${
                    isTier3 ? 'border-fuchsia-400 shadow-[0_0_20px_#d946ef]' : isTier2 ? 'border-cyan-400 shadow-[0_0_15px_#38bdf8]' : 'border-yellow-400 shadow-[0_0_15px_#facc15]'
                  }`} />
                  
                  {isTier3 && (
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full filter drop-shadow-[0_0_12px_#d946ef] animate-[spin_16s_linear_infinite]">
                      <polygon points="50,4 90,75 10,75" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinejoin="round" />
                      <polygon points="50,96 90,25 10,25" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinejoin="round" />
                    </svg>
                  )}

                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-xl relative z-10">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80" 
                      alt="Avatar"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-purple-200/80">{previewPrivilege.description}</p>

            <button
              onClick={() => setPreviewPrivilege(null)}
              className="w-full py-2 rounded-xl bg-yellow-400 text-slate-950 font-bold text-xs shadow hover:bg-yellow-300 cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

      {/* 12. PERK DETAIL MODAL */}
      {selectedPerk && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-xs rounded-3xl bg-gradient-to-b from-[#2a074a] to-[#120221] border-2 border-yellow-400 p-5 text-white shadow-2xl text-center space-y-3.5">
            <div className="w-16 h-16 mx-auto flex items-center justify-center">
              <HexagonPerkBadge tier={activeTier}>
                {selectedPerk.iconType === 'picture' && <ImageIcon className="w-6 h-6" />}
                {selectedPerk.iconType === 'rocket' && <Rocket className="w-6 h-6 -rotate-45" />}
                {selectedPerk.iconType === 'svipTag' && (
                  <span className="px-1 py-0.5 bg-yellow-400 text-slate-950 font-black text-[9px] rounded">
                    SVIP
                  </span>
                )}
                {selectedPerk.iconType === 'listHidden' && <EyeOff className="w-6 h-6" />}
                {selectedPerk.iconType === 'mystery' && <span className="text-2xl">🎭</span>}
                {selectedPerk.iconType === 'antiKick' && <span className="text-2xl">🥾</span>}
                {selectedPerk.iconType === 'antiMute' && <Volume2 className="w-6 h-6" />}
                {selectedPerk.iconType === 'gifAvatar' && <span className="text-2xl">👤</span>}
                {selectedPerk.iconType === 'gifCover' && <ImageIcon className="w-6 h-6" />}
              </HexagonPerkBadge>
            </div>

            <div>
              <h4 className="font-extrabold text-base text-yellow-300">
                {selectedPerk.name}
              </h4>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-400/40 text-yellow-200 font-bold text-[10px]">
                {currentTierData.name} Privilege Unlocked
              </span>
            </div>

            <p className="text-xs text-purple-100/80 leading-relaxed">
              {selectedPerk.description}
            </p>

            <button
              onClick={() => setSelectedPerk(null)}
              className="w-full py-2.5 rounded-xl bg-yellow-400 text-slate-950 font-bold text-xs shadow hover:bg-yellow-300 cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* 13. SUCCESS MODAL */}
      {joinedSuccess && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-xs rounded-3xl bg-gradient-to-b from-[#2a074a] to-[#120221] border-2 border-yellow-400 p-5 text-white shadow-2xl text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center text-3xl">
              👑
            </div>
            <h3 className="font-extrabold text-lg text-yellow-300">
              Welcome to {currentTierData.name}!
            </h3>
            <p className="text-xs text-purple-200/80">
              Your VIP privileges and {currentTierData.name} Frame have been activated for {currentTierData.days}!
            </p>
            <button
              onClick={() => setJoinedSuccess(false)}
              className="w-full py-2.5 rounded-xl bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider cursor-pointer shadow hover:bg-yellow-300"
            >
              Awesome
            </button>
          </div>
        </div>
      )}

      {/* 14. INSUFFICIENT FUNDS MODAL */}
      {insufficientFunds && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-xs rounded-3xl bg-gradient-to-b from-[#1f0b06] to-[#120703] border-2 border-red-500/80 p-5 text-white shadow-2xl text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl">
              🪙
            </div>
            <h3 className="font-extrabold text-base text-yellow-300">
              Insufficient Gold Coins
            </h3>
            <p className="text-xs text-amber-200/80">
              You need <span className="font-bold text-yellow-300 font-mono">{currentTierData.price.toLocaleString()}</span> coins for {currentTierData.name}. Your current balance is <span className="font-bold text-yellow-300 font-mono">{goldBalance.toLocaleString()}</span>.
            </p>
            <div className="p-2 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-[11px] text-yellow-200 font-medium">
              💡 Rate: $1 Dollar = 15,000 Coins
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setInsufficientFunds(false)}
                className="flex-1 py-2 rounded-xl bg-[#34343a] text-white text-xs font-bold hover:bg-[#40404a] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setInsufficientFunds(false);
                  if (onRechargeNeeded) {
                    onRechargeNeeded();
                  }
                }}
                className="flex-1 py-2 rounded-xl bg-yellow-400 text-amber-950 text-xs font-black hover:bg-yellow-300 cursor-pointer shadow"
              >
                Recharge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 15. TOAST FOR EQUIPPED */}
      {equipToast && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-purple-700 border border-yellow-300 text-yellow-200 font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-yellow-300" />
          <span>{currentTierData.name} Frame Equipped Successfully!</span>
        </div>
      )}
    </div>
  );
}
