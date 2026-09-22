import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Edit3, 
  ChevronRight, 
  Sparkles, 
  ShoppingBag, 
  Crown, 
  Home, 
  Heart, 
  Shield, 
  Award, 
  DollarSign, 
  Star,
  Trophy
} from 'lucide-react';
import { UserProfile } from '../types';
import { MyProfileEditScreen } from './MyProfileEditScreen';
import { SvipScreen } from './SvipScreen';
import { Svip1Frame } from './Svip1Frame';
import { Svip2Frame } from './Svip2Frame';
import { Svip3Frame } from './Svip3Frame';
import { MyDressScreen } from './MyDressScreen';

interface MeScreenProps {
  user: UserProfile;
  onSignOut?: () => void;
  onNavigateToRoom?: () => void;
}

export function MeScreen({ user, onSignOut, onNavigateToRoom }: MeScreenProps) {
  const [copied, setCopied] = useState(false);
  const [goldBalance, setGoldBalance] = useState(12);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'me' | 'editProfile' | 'svip' | 'myDress'>('svip');
  const [activeFrame, setActiveFrame] = useState<string>('svip3');
  const [profileData, setProfileData] = useState({
    name: 'Zs 🔀 🇧🇫 SALMAN ❤️ 🦅 . 🙊',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    gender: 'Male' as 'Male' | 'Female',
    birthday: '2007-09-23',
    bio: '',
  });

  const userId = '91614512';

  const handleCopyId = () => {
    navigator.clipboard?.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePurchase = (amount: number) => {
    setGoldBalance((prev) => prev + amount);
    setShowPurchaseModal(false);
  };

  const handleDeductCoins = (amount: number) => {
    if (goldBalance >= amount) {
      setGoldBalance((prev) => prev - amount);
      return true;
    }
    return false;
  };

  if (currentView === 'svip') {
    return (
      <SvipScreen
        user={{ ...user, avatar: profileData.avatar, name: profileData.name, activeFrame }}
        onBack={() => setCurrentView('me')}
        goldBalance={goldBalance}
        onDeductCoins={handleDeductCoins}
        onRechargeNeeded={() => {
          setCurrentView('me');
          setShowPurchaseModal(true);
        }}
        onEquipFrame={(frameId) => setActiveFrame(frameId)}
        equippedFrame={activeFrame}
        initialTier={3}
      />
    );
  }

  if (currentView === 'editProfile') {
    return (
      <MyProfileEditScreen
        user={user}
        onBack={() => setCurrentView('me')}
        onUpdateProfile={(updated) => {
          setProfileData(updated);
        }}
      />
    );
  }

  if (currentView === 'myDress') {
    return (
      <MyDressScreen
        user={{ ...user, avatar: profileData.avatar, name: profileData.name }}
        onBack={() => setCurrentView('me')}
        activeFrame={activeFrame}
        onEquipFrame={(frameId) => setActiveFrame(frameId)}
        goldBalance={goldBalance}
      />
    );
  }

  return (
    <div className="relative z-10 flex-1 overflow-y-auto px-3.5 pt-1.5 pb-24 space-y-3.5 scrollbar-thin scrollbar-thumb-amber-900/40 select-none font-sans">
      {/* Status Bar (Matches Profile Screenshot 3:00, 62%) */}
      <div className="flex items-center justify-between text-[11px] text-amber-200/90 font-medium px-1 pt-1 pb-1">
        <div className="flex items-center gap-1">
          <span>3:00</span>
          <span className="text-[10px]">👁️</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span>ᛒ</span>
          <span>📶</span>
          <span className="text-[11px] font-mono font-bold">🔋 62%</span>
        </div>
      </div>

      {/* 1. TOP PROFILE SECTION (Matches Screenshot 100%) */}
      <div className="pt-1">
        {/* Top Bar Row: Avatar + Name + Flags + Edit Button */}
        <div className="flex items-start justify-between gap-2">
          {/* Avatar with Circular Border or SVIP1 Eagle Frame */}
          <div 
            className="relative shrink-0 cursor-pointer group"
            onClick={() => setCurrentView('editProfile')}
            title="Edit Profile"
          >
            {activeFrame === 'svip3' ? (
              <div className="group-hover:scale-105 transition-transform">
                <Svip3Frame size="md" avatarUrl={profileData.avatar} />
              </div>
            ) : activeFrame === 'svip2' ? (
              <div className="group-hover:scale-105 transition-transform">
                <Svip2Frame size="md" avatarUrl={profileData.avatar} />
              </div>
            ) : activeFrame === 'svip1' ? (
              <div className="group-hover:scale-105 transition-transform">
                <Svip1Frame size="md" avatarUrl={profileData.avatar} />
              </div>
            ) : (
              <div className="w-19 h-19 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-amber-300 via-amber-500 to-yellow-200 shadow-xl overflow-hidden ring-2 ring-black/40 group-hover:scale-105 transition-transform">
                <img 
                  src={profileData.avatar} 
                  alt="Profile Avatar" 
                  className="w-full h-full rounded-full object-cover"
                  referrerPolicy="no-referrer" 
                />
              </div>
            )}
            {/* Online Indicator */}
            <span className="absolute bottom-0 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-black rounded-full z-30" />
          </div>

          {/* User Details & ID */}
          <div className="flex-1 min-w-0 pt-0.5 pl-1">
            {/* Name + Flag + Green Text */}
            <div 
              onClick={() => setCurrentView('editProfile')}
              className="flex items-center gap-1.5 flex-wrap cursor-pointer hover:opacity-90 transition"
              title="Edit Profile"
            >
              <span className="font-extrabold text-sm sm:text-base text-emerald-400 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {profileData.name}
              </span>
            </div>

            {/* ID Line with Copy Button (Matches Wibe Wave rule) */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs text-amber-100/90 font-medium">
                Wibe Wave ID:{userId}
              </span>
              <button 
                onClick={handleCopyId}
                className="text-amber-200/80 hover:text-white transition cursor-pointer p-0.5"
                title="Copy ID"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Small Level & SVIP Badges Row 1 */}
            <div className="flex items-center gap-1 mt-1.5 flex-wrap">
              {/* [23] Level Badge */}
              <div className="px-1.5 py-0.2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-black text-[9px] shadow flex items-center gap-0.5 border border-white/30">
                <span className="text-[8px]">👑</span>
                <span>23</span>
              </div>
              {/* [10] Purple Badge */}
              <div className="px-1.5 py-0.2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-black text-[9px] shadow flex items-center gap-0.5 border border-white/30">
                <span className="text-[8px]">⭐</span>
                <span>10</span>
              </div>
              {/* [19] Winged Badge */}
              <div className="px-1.5 py-0.2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-black text-[9px] shadow flex items-center gap-0.5 border border-white/30">
                <span className="text-[8px]">🦅</span>
                <span>19</span>
              </div>
              {/* [SVIP2] Badge */}
              <div 
                onClick={() => setCurrentView('svip')}
                className="px-2 py-0.2 rounded bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 text-white font-extrabold text-[9px] shadow tracking-tight border border-sky-300/40 cursor-pointer hover:brightness-125"
                title="View SVIP"
              >
                SVIP2
              </div>
              {/* [Agent] Golden Badge */}
              <div className="px-2 py-0.2 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-amber-950 font-black text-[9px] shadow flex items-center gap-0.5 border border-yellow-200">
                <span>Agent</span>
                <span className="text-[8px]">👑</span>
              </div>
            </div>
          </div>

          {/* Edit Profile Button (Top Right in Screenshot) */}
          <button 
            onClick={() => setCurrentView('editProfile')}
            className="w-8 h-8 rounded-full bg-black/60 border border-amber-400/50 flex items-center justify-center text-amber-200 hover:text-white transition shadow-md cursor-pointer shrink-0 mt-1"
            title="Edit Profile"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* Big Trophy Medals Row (Matches Screenshot Medals: Dollar Shield, Star Wings, Soccer Champion) */}
        <div className="flex items-center gap-3 mt-3 pl-1">
          {/* 1. Dollar Shield Medal */}
          <div className="relative group cursor-pointer" onClick={() => setActiveModal('Wealth Shield')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-sky-400 via-blue-600 to-slate-900 p-0.5 shadow-lg border border-sky-300/60 flex items-center justify-center">
              <div className="w-full h-full rounded-[10px] bg-gradient-to-tr from-sky-950 to-blue-800 flex items-center justify-center text-sky-200">
                <span className="font-black text-sm text-cyan-200 drop-shadow">$</span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 text-[10px]">🛡️</div>
          </div>

          {/* 2. Royal Blue Star Wings Medal */}
          <div className="relative group cursor-pointer" onClick={() => setActiveModal('Star Honor')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-blue-300 via-indigo-600 to-slate-950 p-0.5 shadow-lg border border-indigo-300/60 flex items-center justify-center">
              <div className="w-full h-full rounded-[10px] bg-gradient-to-tr from-blue-950 to-indigo-900 flex items-center justify-center text-cyan-200">
                <span className="text-base drop-shadow">⭐</span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 text-[10px]">👑</div>
          </div>

          {/* 3. Soccer Champion Wreath Medal */}
          <div className="relative group cursor-pointer" onClick={() => setActiveModal('Sports Champion')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-emerald-400 via-teal-600 to-slate-900 p-0.5 shadow-lg border border-emerald-300/60 flex items-center justify-center">
              <div className="w-full h-full rounded-[10px] bg-gradient-to-tr from-emerald-950 to-teal-900 flex items-center justify-center text-white">
                <span className="text-base">⚽</span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 text-[10px]">🌿</div>
          </div>
        </div>

        {/* 4 Stats Numbers Row: Follow, Fans, Friends, Visitors (+2) */}
        <div className="grid grid-cols-4 gap-1 mt-4 text-center">
          {/* Follow */}
          <div className="cursor-pointer group" onClick={() => setActiveModal('Following')}>
            <p className="text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors">
              67
            </p>
            <p className="text-xs text-amber-200/70 font-medium">Follow</p>
          </div>

          {/* Fans */}
          <div className="cursor-pointer group" onClick={() => setActiveModal('Fans')}>
            <p className="text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors">
              1304
            </p>
            <p className="text-xs text-amber-200/70 font-medium">Fans</p>
          </div>

          {/* Friends */}
          <div className="cursor-pointer group" onClick={() => setActiveModal('Friends')}>
            <p className="text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors">
              32
            </p>
            <p className="text-xs text-amber-200/70 font-medium">Friends</p>
          </div>

          {/* Visitors */}
          <div className="cursor-pointer group relative" onClick={() => setActiveModal('Visitors')}>
            <div className="inline-flex items-center justify-center">
              <span className="text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors">
                2858
              </span>
              <span className="ml-0.5 px-1 py-0.1 rounded-full bg-red-600 text-white font-bold text-[9px] shadow leading-tight">
                +2
              </span>
            </div>
            <p className="text-xs text-amber-200/70 font-medium">Visitors</p>
          </div>
        </div>
      </div>

      {/* 2. GOLD BALANCE ARCHED PALACE CARD (Matches Screenshot Exactly) */}
      <div className="relative rounded-2xl overflow-hidden p-3.5 bg-gradient-to-r from-[#2a1708] via-[#3a200a] to-[#241306] border-2 border-yellow-400/70 shadow-[0_6px_20px_rgba(0,0,0,0.7)] flex items-center justify-between">
        {/* Left: 3D Gold Coin with Dollar sign + Balance text */}
        <div className="flex items-center gap-3">
          {/* Glowing 3D Coin Graphic */}
          <div className="w-13 h-13 rounded-full bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-600 p-0.5 shadow-[0_0_15px_rgba(251,191,36,0.6)] flex items-center justify-center shrink-0 border border-yellow-200">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-yellow-200 flex items-center justify-center text-amber-950 font-black text-2xl shadow-inner">
              $
            </div>
          </div>

          <div>
            <div className="text-2xl font-black text-yellow-300 leading-none drop-shadow font-mono">
              {goldBalance.toLocaleString()}
            </div>
            <p className="text-xs text-amber-200/80 font-medium mt-1">
              Gold balance
            </p>
          </div>
        </div>

        {/* Right: Purchase Button */}
        <button
          onClick={() => setShowPurchaseModal(true)}
          className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 text-amber-950 font-extrabold text-xs shadow-[0_2px_12px_rgba(251,191,36,0.5)] hover:brightness-110 active:scale-95 transition cursor-pointer"
        >
          Purchase
        </button>
      </div>

      {/* 3. FOUR QUICK ACCESS MEDALLIONS: SVIP, Store, Unique ID, Badge (Matches Screenshot) */}
      <div className="grid grid-cols-4 gap-2 text-center pt-1">
        {/* 1. SVIP */}
        <div 
          onClick={() => setCurrentView('svip')}
          className="flex flex-col items-center cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-red-600 via-rose-700 to-amber-900 p-0.5 border-2 border-amber-300/80 shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="text-center">
              <span className="text-lg block leading-none">👑</span>
              <span className="text-[10px] font-black text-yellow-300 uppercase tracking-tighter">SVIP</span>
            </div>
          </div>
          <span className="text-xs font-semibold text-amber-100/90 mt-1.5">SVIP</span>
        </div>

        {/* 2. Store */}
        <div 
          onClick={() => setActiveModal('Palace Store')}
          className="flex flex-col items-center cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-amber-700 via-yellow-600 to-[#1e1005] p-0.5 border-2 border-amber-300/80 shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="text-center">
              <span className="text-2xl block leading-none">🕌</span>
            </div>
          </div>
          <span className="text-xs font-semibold text-amber-100/90 mt-1.5">Store</span>
        </div>

        {/* 3. Unique ID */}
        <div 
          onClick={() => setActiveModal('Unique ID Center')}
          className="flex flex-col items-center cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-pink-600 via-rose-800 to-[#2a0715] p-0.5 border-2 border-pink-300/80 shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="text-center">
              <span className="font-black text-sm text-yellow-300 tracking-wider">ID</span>
            </div>
          </div>
          <span className="text-xs font-semibold text-amber-100/90 mt-1.5">Unique ID</span>
        </div>

        {/* 4. Badge */}
        <div 
          onClick={() => setActiveModal('Badges Collection')}
          className="flex flex-col items-center cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-purple-700 via-fuchsia-800 to-amber-950 p-0.5 border-2 border-fuchsia-300/80 shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <div className="text-center">
              <span className="text-2xl block leading-none">🏵️</span>
            </div>
          </div>
          <span className="text-xs font-semibold text-amber-100/90 mt-1.5">Badge</span>
        </div>
      </div>

      {/* 4. FIRST LIST GROUP: My dress, My Level, My Room */}
      <div className="rounded-2xl overflow-hidden bg-black/45 border border-amber-500/20 divide-y divide-amber-500/15 shadow-md">
        {/* My dress */}
        <div 
          onClick={() => setCurrentView('myDress')}
          className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">👜</span>
            <span className="text-sm font-bold text-white">My dress</span>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-200/50" />
        </div>

        {/* My Level */}
        <div 
          onClick={() => setActiveModal('My Level')}
          className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">👑</span>
            <span className="text-sm font-bold text-white">My Level</span>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-200/50" />
        </div>

        {/* My Room */}
        <div 
          onClick={() => {
            if (onNavigateToRoom) {
              onNavigateToRoom();
            } else {
              setActiveModal('My Room');
            }
          }}
          className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏪</span>
            <span className="text-sm font-bold text-white">My Room</span>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-200/50" />
        </div>
      </div>

      {/* 5. SECOND LIST GROUP: Host center, Agency center */}
      <div className="rounded-2xl overflow-hidden bg-black/45 border border-amber-500/20 divide-y divide-amber-500/15 shadow-md">
        {/* Host center */}
        <div 
          onClick={() => setActiveModal('Host Center')}
          className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">💖</span>
            <span className="text-sm font-bold text-white">Host center</span>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-200/50" />
        </div>

        {/* Agency center */}
        <div 
          onClick={() => setActiveModal('Agency Center')}
          className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">👑</span>
            <span className="text-sm font-bold text-white">Agency center</span>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-200/50" />
        </div>
      </div>

      {/* 6. PURCHASE GOLD MODAL */}
      {showPurchaseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#2a1708] to-[#120803] border-2 border-yellow-400/80 p-5 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🪙</span>
                <h3 className="font-extrabold text-base text-yellow-300">Purchase Gold Balance</h3>
              </div>
              <button 
                onClick={() => setShowPurchaseModal(false)}
                className="w-7 h-7 rounded-full bg-black/40 text-amber-200 hover:text-white flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Rate Announcement Banner */}
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-500/20 border border-yellow-400/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <div>
                  <p className="text-[11px] font-extrabold text-yellow-300">SPECIAL RATE</p>
                  <p className="text-xs font-black text-white">$1 Dollar = 15,000 Coins</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-amber-950 font-black text-[10px]">
                BEST VALUE
              </span>
            </div>

            <p className="text-xs text-amber-200/80">Select a gold coin package to recharge:</p>

            <div className="grid grid-cols-2 gap-2.5">
              {[
                { coins: 15000, price: '$1.00', bonus: 'Standard Rate', total: 15000 },
                { coins: 30000, price: '$2.00', bonus: '+2,000 Bonus', total: 32000 },
                { coins: 75000, price: '$5.00', bonus: '+10,000 Bonus', total: 85000 },
                { coins: 150000, price: '$10.00', bonus: '+25,000 Bonus', total: 175000 },
                { coins: 300000, price: '$20.00', bonus: '+60,000 Bonus', total: 360000 },
                { coins: 750000, price: '$50.00', bonus: '+200,000 Bonus', total: 950000 },
              ].map((pack, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePurchase(pack.total)}
                  className="p-3 rounded-xl bg-black/60 border border-yellow-500/40 hover:border-yellow-400 hover:bg-yellow-500/20 transition text-center cursor-pointer group"
                >
                  <span className="font-black text-sm text-yellow-300 block">
                    🪙 {pack.coins.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold block">{pack.bonus}</span>
                  <span className="mt-1 inline-block px-3 py-0.5 rounded-full bg-yellow-400 text-amber-950 font-extrabold text-xs group-hover:scale-105 transition-transform">
                    {pack.price}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePurchase(15000)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 text-amber-950 font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition cursor-pointer"
            >
              1-Tap Buy ($1 = 15,000 Coins)
            </button>
          </div>
        </div>
      )}

      {/* 7. QUICK MODAL FOR FEATURES */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xs rounded-2xl bg-gradient-to-b from-[#241306] to-[#0e0703] border border-amber-400/60 p-4 text-center space-y-3 shadow-2xl">
            <h3 className="font-bold text-base text-yellow-300">{activeModal}</h3>
            <p className="text-xs text-amber-200/80">
              Welcome to the official {activeModal} in Wibe Wave. You are an active VIP user with full privileges.
            </p>
            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-2 rounded-xl bg-yellow-400 text-amber-950 font-bold text-xs shadow cursor-pointer hover:bg-yellow-300"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
