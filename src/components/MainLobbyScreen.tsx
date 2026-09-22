import React, { useState } from 'react';
import { 
  Search, 
  Flame, 
  ChevronDown, 
  Crown, 
  Sparkles, 
  Radio, 
  Users, 
  Gift, 
  MessageCircle, 
  User, 
  Trophy, 
  Compass,
  LogOut,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { UserProfile, VoiceRoom } from '../types';
import { MessagesScreen } from './MessagesScreen';
import { MyPartyTab } from './MyPartyTab';
import { GamesScreen } from './GamesScreen';
import { MeScreen } from './MeScreen';

interface MainLobbyScreenProps {
  user: UserProfile;
  onSelectRoom: (room: VoiceRoom) => void;
  onSignOut: () => void;
  onlineCount: number;
}

interface LobbyPartyRoom {
  id: string;
  title: string;
  hostName: string;
  coverImage: string;
  frameType: 'gold-ruby' | 'pearl-crown' | 'silver-wing' | 'gold-classic';
  heat: number;
  countryFlag: string;
  countryName: string;
  level: number;
  badgeName: string;
  roomId?: string;
  captionTitle?: string;
  activeMics: number;
}

const LOBBY_ROOMS: LobbyPartyRoom[] = [
  {
    id: 'room-anmol',
    title: 'nmol Rishty,🥀',
    hostName: 'nmol Rishty',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
    frameType: 'gold-ruby',
    heat: 80,
    countryFlag: '🇵🇰',
    countryName: 'Pakistan',
    level: 3,
    badgeName: 'nmol Rishty,🥀',
    captionTitle: 'Welcome everyone!',
    activeMics: 6,
  },
  {
    id: 'room-dunya',
    title: '🌙خوبصورت دُنیا',
    hostName: 'Host-hds8gh9s',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    frameType: 'pearl-crown',
    heat: 520,
    countryFlag: '🇵🇰',
    countryName: 'Pakistan',
    level: 17,
    badgeName: 'خوبصورت دُنیا 🌙',
    roomId: '214977',
    captionTitle: 'Host-hds8gh9s',
    activeMics: 8,
  },
  {
    id: 'room-qalb',
    title: 'E-QALB🕊️',
    hostName: 'E-QALB',
    coverImage: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=600&auto=format&fit=crop&q=80',
    frameType: 'silver-wing',
    heat: 600,
    countryFlag: '🇵🇰',
    countryName: 'Pakistan',
    level: 14,
    badgeName: 'E-QALB🕊️',
    captionTitle: 'Late Night Ghazal & Poetry 🌙',
    activeMics: 7,
  },
  {
    id: 'room-friends',
    title: 'World Of Friends',
    hostName: 'World Of Friends',
    coverImage: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format&fit=crop&q=80',
    frameType: 'gold-classic',
    heat: 760,
    countryFlag: '🇵🇰',
    countryName: 'Pakistan',
    level: 14,
    badgeName: 'World Of Friends',
    captionTitle: 'Worldwide Chill & Music Party 🎵',
    activeMics: 8,
  },
];

export function MainLobbyScreen({
  user,
  onSelectRoom,
  onSignOut,
  onlineCount,
}: MainLobbyScreenProps) {
  const [activeTab, setActiveTab] = useState<'My' | 'Popular' | 'New'>('My');
  const [selectedCountry, setSelectedCountry] = useState<string>('Pakistan');
  const [showCountryMenu, setShowCountryMenu] = useState<boolean>(false);
  const [bottomNav, setBottomNav] = useState<'rooms' | 'games' | 'pm' | 'me'>('me');
  const [bannerIndex, setBannerIndex] = useState(0);

  const countries = [
    { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
    { code: 'AE', name: 'UAE', flag: '🇦🇪' },
    { code: 'AF', name: 'Afg', flag: '🇦🇫' },
    { code: 'SA', name: 'Saudi', flag: '🇸🇦' },
    { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
    { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  ];

  const handleRoomClick = (room: LobbyPartyRoom) => {
    onSelectRoom({
      id: room.id,
      title: room.captionTitle || room.title,
      hostName: room.hostName,
      hostAvatar: room.coverImage,
      coverImage: room.coverImage,
      category: 'Voice Party',
      onlineCount: room.heat * 3,
      activeMicCount: room.activeMics,
      tag: room.countryFlag + ' ' + room.countryName,
      isHot: true,
    });
  };

  return (
    <div className="w-full h-full min-h-[720px] flex flex-col bg-[#140c06] text-amber-50 select-none overflow-hidden relative font-sans">
      {/* Background Graphic Layer (Islamic Golden Palace Arch with Palm Trees) */}
      <div 
        className="absolute inset-0 bg-cover bg-top z-0 pointer-events-none opacity-45"
        style={{
          backgroundImage: `url('/src/assets/images/arabian_golden_lobby_bg_1790069591326.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#180d05]/90 to-[#100804] pointer-events-none z-0" />

      {/* RENDER VIEW ACCORDING TO BOTTOM NAV */}
      {bottomNav === 'pm' ? (
        <MessagesScreen user={user} onlineCount={onlineCount} />
      ) : bottomNav === 'games' ? (
        <GamesScreen user={user} />
      ) : bottomNav === 'me' ? (
        <MeScreen 
          user={user} 
          onSignOut={onSignOut} 
          onNavigateToRoom={() => handleRoomClick(LOBBY_ROOMS[0])}
        />
      ) : (
        /* ROOMS TAB (HOME LOBBY & MY PARTY) */
        <>
          {/* TOP HEADER: Status Bar + Golden Palace Nav */}
          <header className="relative z-10 pt-2 px-4 pb-2 bg-gradient-to-b from-black/60 to-transparent">
            {/* Device Status Bar Info (Matches Screenshot) */}
            <div className="flex items-center justify-between text-[11px] text-amber-200/90 font-medium px-1 mb-2">
              <span>2:46</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30">
                  Online: {onlineCount}
                </span>
                <span>📶</span>
                <span>🔋 67%</span>
              </div>
            </div>

            {/* Top Navigation Tabs: My | Popular | New + Search */}
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-6 text-base font-semibold">
                <button
                  onClick={() => setActiveTab('My')}
                  className={`cursor-pointer transition-colors relative py-1 ${
                    activeTab === 'My' ? 'text-white font-bold text-[22px] tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' : 'text-amber-200/60 hover:text-amber-200 text-base'
                  }`}
                >
                  My
                  {activeTab === 'My' && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('Popular')}
                  className={`cursor-pointer transition-all relative py-1 ${
                    activeTab === 'Popular' 
                      ? 'text-white font-bold text-[22px] tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' 
                      : 'text-amber-200/60 hover:text-amber-200 text-base'
                  }`}
                >
                  Popular
                  {activeTab === 'Popular' && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.9)]" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('New')}
                  className={`cursor-pointer transition-colors relative py-1 ${
                    activeTab === 'New' ? 'text-white font-bold text-[22px] tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' : 'text-amber-200/60 hover:text-amber-200 text-base'
                  }`}
                >
                  New
                  {activeTab === 'New' && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert("Search rooms, hosts, or party tags...")}
                  className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600/40 to-yellow-400/40 border border-amber-400/50 flex items-center justify-center text-amber-200 hover:text-white shadow-md transition cursor-pointer backdrop-blur-sm relative"
                  title="Search"
                >
                  <Search className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 text-[10px]">🐚</span>
                </button>

                <button
                  onClick={onSignOut}
                  className="p-1 text-amber-300/60 hover:text-amber-200 transition"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* ACTIVE TAB CONTENT (My Tab or Popular Feed) */}
          {activeTab === 'My' ? (
            <MyPartyTab onSelectRoom={onSelectRoom} />
          ) : (
            /* POPULAR TAB / NEW TAB CONTENT */
            <div className="flex-1 overflow-y-auto px-3.5 pb-20 space-y-4 scrollbar-thin scrollbar-thumb-amber-900/40">
              {/* 1. WEEKLY GIFT STAR LEADERBOARD BANNER */}
              <div 
                onClick={() => alert("Weekly Gift Star Leaderboard event details! Compete to win exclusive royal badges & diamonds.")}
                className="relative rounded-2xl overflow-hidden shadow-xl border border-amber-400/30 cursor-pointer group transform transition hover:scale-[1.01]"
              >
                <img 
                  src="/src/assets/images/weekly_gift_star_banner_1790069576434.jpg" 
                  alt="Weekly Gift Star Leaderboard"
                  className="w-full h-28 sm:h-32 object-cover"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute bottom-2 left-4 flex items-center gap-1.5">
                  <span className="w-2.5 h-1 bg-white rounded-full shadow" />
                  <span className="w-1 h-1 bg-white/50 rounded-full" />
                  <span className="w-1 h-1 bg-white/50 rounded-full" />
                </div>
              </div>

              {/* 2. PODIUM STAGE: TOP 3 WEEKLY GIFT STARS */}
              <div className="relative py-2">
                <div className="grid grid-cols-3 items-end gap-2 max-w-sm mx-auto">
                  {/* Rank 2 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-1">
                      <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-slate-400 via-sky-300 to-slate-200 shadow-lg relative">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
                          alt="Rank 2" 
                          className="w-full h-full rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-b from-sky-200 to-slate-400 text-slate-950 rounded-full w-5 h-5 flex items-center justify-center font-black text-[10px] border border-white shadow">
                          2
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gradient-to-b from-[#831843] to-[#4c0519] border-t-2 border-pink-400/60 rounded-t-lg pt-1 pb-1.5 px-1 shadow-md">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 text-white font-bold text-[9px] shadow-sm">
                        NO.2
                      </span>
                    </div>
                  </div>

                  {/* Rank 1 */}
                  <div className="flex flex-col items-center text-center -mt-3 z-10">
                    <div className="relative mb-1">
                      <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-md animate-pulse pointer-events-none" />
                      <div className="w-20 h-20 rounded-full p-1.5 bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 shadow-xl relative ring-2 ring-amber-300/80">
                        <img 
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" 
                          alt="Rank 1" 
                          className="w-full h-full rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-b from-yellow-300 to-amber-500 text-amber-950 rounded-full w-6 h-6 flex items-center justify-center font-black text-xs border-2 border-white shadow-md">
                          👑 1
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gradient-to-b from-[#9d174d] via-[#831843] to-[#500724] border-t-2 border-yellow-300 rounded-t-xl pt-1 pb-2 px-1 shadow-xl flex flex-col items-center">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-amber-950 font-black text-[10px] shadow">
                        NO.1
                      </span>
                      <div className="mt-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-300 border border-white/50 text-amber-950 font-extrabold text-[9px] shadow flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5 text-amber-900" />
                        <span>Lucky Gift</span>
                      </div>
                    </div>
                  </div>

                  {/* Rank 3 */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-1">
                      <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-purple-400 via-fuchsia-300 to-purple-500 shadow-lg relative">
                        <img 
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" 
                          alt="Rank 3" 
                          className="w-full h-full rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-to-b from-purple-300 to-fuchsia-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-black text-[10px] border border-white shadow">
                          3
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gradient-to-b from-[#701a75] to-[#4a044e] border-t-2 border-fuchsia-400/60 rounded-t-lg pt-1 pb-1.5 px-1 shadow-md">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-[9px] shadow-sm">
                        NO.3
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. HOT! BADGE + COUNTRY PILLS */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <div className="shrink-0 px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 text-white font-black text-xs italic tracking-wider shadow-[0_0_12px_rgba(249,115,22,0.6)] flex items-center gap-1">
                  <span>HOT!</span>
                </div>
                {countries.map((c) => {
                  const isSelected = selectedCountry === c.name;
                  return (
                    <button
                      key={c.code}
                      onClick={() => setSelectedCountry(c.name)}
                      className={`shrink-0 px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-md'
                          : 'bg-black/40 border-amber-500/20 text-amber-300/70 hover:bg-black/60 hover:text-amber-200'
                      }`}
                    >
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                    </button>
                  );
                })}
                <button
                  onClick={() => setShowCountryMenu(!showCountryMenu)}
                  className="shrink-0 p-1.5 rounded-full bg-black/40 border border-amber-500/20 text-amber-300 hover:bg-black/60 transition"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4. 2-COLUMN GRID OF HOT VOICE PARTY ROOMS */}
              <div className="grid grid-cols-2 gap-3">
                {LOBBY_ROOMS.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => handleRoomClick(room)}
                    className="group flex flex-col cursor-pointer"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square bg-[#1f1309] border border-amber-400/40 group-hover:border-amber-300 transition-all duration-200">
                      <img 
                        src={room.coverImage} 
                        alt={room.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[10px] font-bold text-amber-300 flex items-center gap-0.5 border border-amber-500/20 shadow">
                        <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
                        <span>{room.heat}</span>
                      </div>
                      {room.frameType === 'pearl-crown' && (
                        <div className="absolute inset-0 pointer-events-none border-2 border-pink-300/40 rounded-2xl">
                          <div className="absolute top-1 left-2 text-xs">💖</div>
                          <div className="absolute top-1 right-8 text-xs text-amber-300">⭐</div>
                        </div>
                      )}
                      <div className="absolute bottom-1.5 inset-x-1.5 flex flex-col gap-1">
                        <div className="px-2 py-1 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-[11px] text-white">
                          <span className="text-xs">{room.countryFlag}</span>
                          <span className="px-1 py-0.2 rounded bg-emerald-600 text-[9px] font-bold text-white leading-none">
                            {room.level}
                          </span>
                          <span className="truncate font-semibold text-[11px] text-amber-100">
                            {room.badgeName}
                          </span>
                        </div>
                        {room.roomId && (
                          <div className="self-center px-3 py-0.5 rounded-full bg-[#78350f]/90 border border-amber-400/40 text-[10px] font-mono font-bold text-amber-200 shadow">
                            {room.roomId}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-1.5 px-1">
                      <p className="text-xs font-semibold text-amber-100/90 truncate group-hover:text-amber-300 transition-colors">
                        {room.captionTitle || room.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* 5. LUXURY EMBOSSED GOLDEN BOTTOM NAVIGATION BAR */}
      <footer className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0e0703] via-[#1a0e06] to-[#26150a] border-t border-amber-400/30 px-3 flex items-center justify-around z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.8)]">
        {/* Tab 1: Rooms (Mosque Dome) */}
        <button
          onClick={() => setBottomNav('rooms')}
          className={`flex flex-col items-center justify-center flex-1 h-full cursor-pointer transition-all ${
            bottomNav === 'rooms'
              ? 'relative bg-gradient-to-b from-yellow-300/30 via-amber-400/25 to-amber-900/30 border-t-2 border-yellow-300 shadow-[inset_0_1px_10px_rgba(251,191,36,0.3)]'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <span className="text-2xl select-none filter drop-shadow">🕌</span>
          <span className={`text-[10px] font-bold tracking-tight ${
            bottomNav === 'rooms' ? 'text-yellow-300' : 'text-amber-200/70'
          }`}>
            Rooms
          </span>
        </button>

        {/* Tab 2: Games (Golden Trophy Cup) */}
        <button
          onClick={() => setBottomNav('games')}
          className={`flex flex-col items-center justify-center flex-1 h-full cursor-pointer transition-all ${
            bottomNav === 'games'
              ? 'relative bg-gradient-to-b from-yellow-300/30 via-amber-400/25 to-amber-900/30 border-t-2 border-yellow-300 shadow-[inset_0_1px_10px_rgba(251,191,36,0.3)]'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <span className="text-2xl select-none filter drop-shadow">🏆</span>
          <span className={`text-[10px] font-bold tracking-tight ${
            bottomNav === 'games' ? 'text-yellow-300' : 'text-amber-200/70'
          }`}>
            Games
          </span>
        </button>

        {/* Tab 3: PM (Parchment & Quill) */}
        <button
          onClick={() => setBottomNav('pm')}
          className={`flex flex-col items-center justify-center flex-1 h-full cursor-pointer transition-all ${
            bottomNav === 'pm'
              ? 'relative bg-gradient-to-b from-yellow-300/30 via-amber-400/25 to-amber-900/30 border-t-2 border-yellow-300 shadow-[inset_0_1px_10px_rgba(251,191,36,0.3)]'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <span className="text-2xl select-none filter drop-shadow">📜</span>
          <span className={`text-[10px] font-bold tracking-tight ${
            bottomNav === 'pm' ? 'text-yellow-300' : 'text-amber-200/70'
          }`}>
            PM
          </span>
        </button>

        {/* Tab 4: Me (Golden Owl Mascot) */}
        <button
          onClick={() => setBottomNav('me')}
          className={`flex flex-col items-center justify-center flex-1 h-full cursor-pointer transition-all ${
            bottomNav === 'me'
              ? 'relative bg-gradient-to-b from-yellow-300/30 via-amber-400/25 to-amber-900/30 border-t-2 border-yellow-300 shadow-[inset_0_1px_10px_rgba(251,191,36,0.3)]'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          <span className="text-2xl select-none filter drop-shadow">🦉</span>
          <span className={`text-[10px] font-bold tracking-tight ${
            bottomNav === 'me' ? 'text-yellow-300' : 'text-amber-200/70'
          }`}>
            Me
          </span>
        </button>
      </footer>
    </div>
  );
}
