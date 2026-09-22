import React, { useState } from 'react';
import { Volume2, VolumeX, X, Flame, Radio, Users, Sparkles } from 'lucide-react';
import { VoiceRoom } from '../types';

interface MyPartyTabProps {
  onSelectRoom: (room: VoiceRoom) => void;
}

interface MyRoomItem {
  id: string;
  title: string;
  hostName: string;
  avatar: string;
  countryFlag: string;
  level: number;
  roomId: string;
  subtitle: string;
  audioHeat: number;
  frameStyle: 'emerald' | 'blue-wings' | 'dark' | 'ruby-gold';
}

const MY_ROOMS: MyRoomItem[] = [
  {
    id: 'my-room-rang-mahal',
    title: '🔥 ⊱✿رنگ محل✿⊰🕊️',
    hostName: 'Rang Mahal Host',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    countryFlag: '🇵🇰',
    level: 3,
    roomId: '569369',
    subtitle: 'Welcome Everyone 🤗 egncy',
    audioHeat: 80,
    frameStyle: 'dark',
  },
  {
    id: 'my-room-pagal-khana',
    title: '🤸Pagal khana🤼',
    hostName: 'Pagal Khana',
    avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=300&auto=format&fit=crop&q=80',
    countryFlag: '🇦🇪',
    level: 9,
    roomId: '107997',
    subtitle: 'bad words🚫No kick/ban witho...',
    audioHeat: 80,
    frameStyle: 'dark',
  },
  {
    id: 'my-room-manger-anjan',
    title: 'MANGER ANJAN',
    hostName: 'Manger Anjan',
    avatar: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&auto=format&fit=crop&q=80',
    countryFlag: '🇵🇰',
    level: 7,
    roomId: '218783',
    subtitle: 'Y BD CODE KY2CKB5GC A',
    audioHeat: 0,
    frameStyle: 'dark',
  },
  {
    id: 'my-room-ma-gora',
    title: 'MA GORA CHE NA SWA...',
    hostName: 'Ma Gora Host',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    countryFlag: '🇵🇰',
    level: 3,
    roomId: '268148',
    subtitle: 'Have not ego but mong Da c...',
    audioHeat: 240,
    frameStyle: 'ruby-gold',
  },
  {
    id: 'my-room-punjabi-girls',
    title: 'Power 0f Punjabi Girls',
    hostName: 'Punjabi Girls',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80',
    countryFlag: '🇵🇰',
    level: 5,
    roomId: '485721',
    subtitle: 'Chit chat & music 🎵',
    audioHeat: 95,
    frameStyle: 'ruby-gold',
  },
  {
    id: 'my-room-1',
    title: '🇵🇰 🍂نازیکۍ جینکۍ 🍂🇦🇫',
    hostName: 'نازیکۍ',
    avatar: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300&auto=format&fit=crop&q=80',
    countryFlag: '🇵🇰',
    level: 13,
    roomId: '322154',
    subtitle: 'me everyone dlta kanzal ao l...',
    audioHeat: 160,
    frameStyle: 'blue-wings',
  },
  {
    id: 'my-room-2',
    title: '🍁 KARACHI WORLD 🍁',
    hostName: 'Karachi World Host',
    avatar: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&auto=format&fit=crop&q=80',
    countryFlag: '🇵🇰',
    level: 6,
    roomId: '859769',
    subtitle: 'code fhdef9t6',
    audioHeat: 40,
    frameStyle: 'dark',
  },
];

export function MyPartyTab({ onSelectRoom }: MyPartyTabProps) {
  const [subFilter, setSubFilter] = useState<'Follow' | 'Recently' | 'Group' | 'Adm'>('Recently');
  const [showMiniPlayer, setShowMiniPlayer] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  // Pinned Emerald Royal Card Data (Wibe Wave)
  const pinnedCard: MyRoomItem = {
    id: 'pinned-brand',
    title: 'Brand 🇴† Wibe Wave',
    hostName: 'Wibe Wave Host',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    countryFlag: '🇵🇰',
    level: 14,
    roomId: '879365',
    subtitle: "We'll come 👉 rx33kc...",
    audioHeat: 320,
    frameStyle: 'emerald',
  };

  const handleOpenRoom = (item: MyRoomItem) => {
    onSelectRoom({
      id: item.id,
      title: item.title,
      hostName: item.hostName,
      hostAvatar: item.avatar,
      coverImage: item.avatar,
      category: 'Voice Party',
      onlineCount: item.audioHeat > 0 ? item.audioHeat * 3 : 45,
      activeMicCount: 6,
      tag: item.countryFlag + ' ' + item.roomId,
      isHot: true,
    });
  };

  return (
    <div className="flex-1 overflow-y-auto px-3.5 pb-24 space-y-3.5 scrollbar-thin scrollbar-thumb-amber-900/40 relative select-none font-sans">
      {/* 1. TOP PINNED EMERALD ROYAL BANNER CARD */}
      <div
        onClick={() => handleOpenRoom(pinnedCard)}
        className="relative rounded-2xl overflow-hidden cursor-pointer group p-3 bg-gradient-to-r from-[#06331a] via-[#094723] to-[#042813] border-2 border-amber-400/80 shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
      >
        {/* Golden filigree decorative border overlay */}
        <div className="absolute inset-0 border border-yellow-300/40 rounded-xl m-1 pointer-events-none" />
        
        {/* Lantern & Star atmospheric watermark */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-5xl opacity-15 pointer-events-none select-none text-yellow-300">
          🕌
        </div>

        <div className="flex items-center gap-3 relative z-10">
          {/* Avatar with ornate golden framing */}
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-amber-300 ring-1 ring-yellow-400/50 shrink-0 shadow-lg bg-black/40">
            <img
              src={pinnedCard.avatar}
              alt={pinnedCard.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h2 className="text-[15px] font-bold text-amber-100 truncate tracking-wide drop-shadow">
              {pinnedCard.title}
            </h2>

            {/* Badges: Flag, Level, Room ID */}
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs">{pinnedCard.countryFlag}</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-700/80 border border-amber-400/40 text-amber-200 text-[9.5px] font-bold">
                {pinnedCard.level}
              </span>
              <span className="px-2 py-0.2 rounded-full bg-black/40 border border-amber-500/30 text-[10.5px] font-mono text-amber-200/90 font-medium">
                Room:{pinnedCard.roomId}
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-xs text-amber-200/70 truncate mt-1">
              {pinnedCard.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* 2. SUB-FILTERS: Follow | Recently (Active) | Group | Adm */}
      <div className="flex items-center gap-2 pt-0.5">
        {(['Follow', 'Recently', 'Group', 'Adm'] as const).map((tab) => {
          const isSelected = subFilter === tab;
          return (
            <button
              key={tab}
              onClick={() => setSubFilter(tab)}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 shadow-[0_2px_8px_rgba(251,191,36,0.5)] font-bold'
                  : 'bg-black/40 text-amber-200/60 border border-amber-500/20 hover:text-amber-200 hover:bg-black/60'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 3. LIST OF HORIZONTAL ROOM CARDS (Exact match to screenshot) */}
      <div className="space-y-3">
        {MY_ROOMS.map((room) => {
          if (room.frameStyle === 'blue-wings') {
            return (
              /* Blue Diamond Winged Frame */
              <div
                key={room.id}
                onClick={() => handleOpenRoom(room)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group p-2.5 bg-gradient-to-r from-[#1e1b4b] via-[#2e1065] to-[#1e1b4b] border-2 border-indigo-300/80 shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
              >
                {/* Silver Wing Crest Accents */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-80" />
                <div className="absolute -top-1 left-2 text-xs opacity-90">💎</div>
                <div className="absolute -top-1 right-2 text-xs opacity-90">💎</div>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-cyan-300/60 shrink-0 shadow-md">
                    <img
                      src={room.avatar}
                      alt={room.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">
                      {room.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-xs">{room.countryFlag}</span>
                      <span className="px-1.5 py-0.2 rounded bg-amber-800/80 border border-amber-400/40 text-amber-200 text-[9.5px] font-bold">
                        {room.level}
                      </span>
                      <span className="px-2 py-0.2 rounded-full bg-black/40 border border-white/20 text-[10px] font-mono text-cyan-200">
                        Room:{room.roomId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-indigo-200/70 truncate max-w-[170px]">
                        {room.subtitle}
                      </p>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/40 text-[10px] text-orange-400 font-bold">
                        <span className="text-xs">📊</span>
                        <span>{room.audioHeat}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (room.frameStyle === 'ruby-gold') {
            return (
              /* Ornate Gold & Ruby Frame (Coral-Red Gradient) */
              <div
                key={room.id}
                onClick={() => handleOpenRoom(room)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group p-2.5 bg-gradient-to-r from-[#881337] via-[#9f1239] to-[#701a75] border-2 border-amber-400 shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
              >
                {/* Ruby Gem Corner Pins */}
                <div className="absolute top-1 left-2 text-xs">🔴</div>
                <div className="absolute top-1 right-2 text-xs">👑</div>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-amber-300 shrink-0 shadow-md">
                    <img
                      src={room.avatar}
                      alt={room.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-amber-100 truncate">
                      {room.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-xs">{room.countryFlag}</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-700 border border-emerald-400/40 text-white text-[9.5px] font-bold">
                        {room.level}
                      </span>
                      <span className="px-2 py-0.2 rounded-full bg-black/40 border border-amber-400/30 text-[10px] font-mono text-amber-200">
                        Room:{room.roomId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-rose-200/80 truncate max-w-[170px]">
                        {room.subtitle}
                      </p>
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/40 text-[10px] text-gray-400 font-bold">
                        <span className="text-xs">📊</span>
                        <span>{room.audioHeat}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          /* Default Sleek Dark Room Card */
          return (
            <div
              key={room.id}
              onClick={() => handleOpenRoom(room)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group p-2.5 bg-[#1b120a] border border-amber-500/25 hover:border-amber-400/50 shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-amber-500/30 shrink-0 shadow-sm bg-black/40">
                  <img
                    src={room.avatar}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-amber-100 truncate">
                    {room.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs">{room.countryFlag}</span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-800 border border-emerald-500/40 text-emerald-200 text-[9.5px] font-bold">
                      {room.level}
                    </span>
                    <span className="px-2 py-0.2 rounded-full bg-black/40 border border-amber-500/20 text-[10px] font-mono text-amber-200/80">
                      Room:{room.roomId}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-400 truncate max-w-[170px]">
                      {room.subtitle}
                    </p>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/40 text-[10px] text-amber-400 font-bold">
                      <span className="text-xs">📊</span>
                      <span>{room.audioHeat}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. FLOATING MINI-PLAYER BAR (Bottom Right - Exactly matches screenshot) */}
      {showMiniPlayer && (
        <aside aria-label="Mini voice stage audio player" className="fixed bottom-20 right-3 z-40 flex items-center bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#7f1d1d] border-2 border-amber-400/90 rounded-full pl-2 pr-1 py-1 shadow-[0_4px_20px_rgba(0,0,0,0.85)] animate-in fade-in slide-in-from-bottom-3">
          {/* Mute/Speaker Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 text-amber-200 hover:text-white transition cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Close mini player */}
          <button
            onClick={() => setShowMiniPlayer(false)}
            className="p-1 text-amber-200/70 hover:text-white transition cursor-pointer ml-0.5 mr-1"
            title="Close mini player"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Thumbnail with Live Cyan Sound Waves */}
          <div 
            onClick={() => handleOpenRoom(MY_ROOMS[0])}
            className="w-9 h-9 rounded-full overflow-hidden border border-amber-300 relative cursor-pointer group shrink-0"
            title="Tap to maximize room"
          >
            <img
              src={MY_ROOMS[0].avatar}
              alt="Live Stage"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Live Equalizer Animation */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-0.5 px-1">
              <span className="w-0.5 h-3 bg-cyan-400 rounded-full animate-bounce" />
              <span className="w-0.5 h-4 bg-emerald-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-0.5 h-2 bg-yellow-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
