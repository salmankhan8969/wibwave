import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  Users, 
  Send, 
  Gift, 
  Radio, 
  Flame, 
  Heart, 
  ChevronLeft, 
  Plus, 
  Crown,
  Share2,
  Compass,
  MessageCircle,
  User as UserIcon,
  ShieldAlert,
  Wifi
} from 'lucide-react';
import { UserProfile, VoiceRoom, ChatMessage, RoomParticipant } from '../types';
import { fetchRoomMessages, sendRoomMessage, sendRoomGift, sendHeartbeat } from '../api';
import { MainLobbyScreen } from './MainLobbyScreen';

interface VoicePartyAppProps {
  user: UserProfile;
  onSignOut: () => void;
}

const INITIAL_ROOMS: VoiceRoom[] = [
  {
    id: 'room-1',
    title: '🌙 Arabian Nights & Melodies',
    hostName: 'Princess_Yasmin',
    hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
    category: 'Music & Singing',
    onlineCount: 342,
    activeMicCount: 6,
    tag: 'Trending #1',
    isHot: true,
  },
  {
    id: 'room-2',
    title: '🎙️ Wibe Wave Chill & Chit-Chat',
    hostName: 'Tariq_Vibes',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
    category: 'Casual Chat',
    onlineCount: 218,
    activeMicCount: 7,
    tag: 'Official Party',
    isHot: true,
  },
  {
    id: 'room-3',
    title: '✨ Late Night Poetry & Deep Talk',
    hostName: 'Noor_AlQamar',
    hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80',
    category: 'Relaxation',
    onlineCount: 145,
    activeMicCount: 4,
    tag: 'Chill',
  },
  {
    id: 'room-4',
    title: '🎮 Mobile Gamers & Squad Hangout',
    hostName: 'ShadowStriker',
    hostAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80',
    category: 'Gaming',
    onlineCount: 98,
    activeMicCount: 5,
    tag: 'Gaming',
  }
];

const INITIAL_PARTICIPANTS: RoomParticipant[] = [
  {
    id: 'p-1',
    name: 'Princess_Yasmin',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    seatIndex: 0,
    isHost: true,
    isSpeaking: true,
    level: 15,
  },
  {
    id: 'p-2',
    name: 'Hamza_Singer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    seatIndex: 1,
    isSpeaking: false,
    level: 9,
  },
  {
    id: 'p-3',
    name: 'Layla_Glow',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    seatIndex: 2,
    isSpeaking: true,
    level: 12,
  },
  {
    id: 'p-4',
    name: 'Samir_Guitar',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    seatIndex: 3,
    isSpeaking: false,
    isMuted: true,
    level: 7,
  },
];

export function VoicePartyApp({ user, onSignOut }: VoicePartyAppProps) {
  const [activeTab, setActiveTab] = useState<'party' | 'messages' | 'profile'>('party');
  const [currentRoom, setCurrentRoom] = useState<VoiceRoom | null>(null);
  const [isMicOn, setIsMicOn] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', senderName: 'Princess_Yasmin', senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', text: 'Welcome everyone to the Wibe Wave festive night! 🌟', time: 'Just now' },
    { id: '2', senderName: 'Hamza_Singer', senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', text: 'Singing next in 2 mins! Send your song requests 🎶', time: 'Just now' },
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [giftBanner, setGiftBanner] = useState<{ sender: string; gift: string; icon: string } | null>(null);
  const [userCoins, setUserCoins] = useState(user.coins);
  const [onlinePeerCount, setOnlinePeerCount] = useState<number>(1);

  // Online Presence Heartbeat
  useEffect(() => {
    sendHeartbeat(user.id).then(setOnlinePeerCount).catch(() => {});
    const interval = setInterval(() => {
      sendHeartbeat(user.id).then(setOnlinePeerCount).catch(() => {});
    }, 15000);
    return () => clearInterval(interval);
  }, [user.id]);

  // Sync Room Messages in Real-time
  useEffect(() => {
    if (!currentRoom) return;

    const loadMessages = async () => {
      const liveMsgs = await fetchRoomMessages(currentRoom.id);
      if (liveMsgs && liveMsgs.length > 0) {
        setMessages(liveMsgs);
      }
    };
    loadMessages();

    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [currentRoom?.id]);

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const textToSend = inputMsg.trim();
    setInputMsg('');

    const optimisticMsg: ChatMessage = {
      id: Date.now().toString(),
      senderName: user.name,
      senderAvatar: user.avatar,
      text: textToSend,
      time: 'Just now',
    };
    setMessages((prev) => [...prev, optimisticMsg]);

    if (currentRoom) {
      try {
        await sendRoomMessage(currentRoom.id, {
          senderId: user.id,
          senderName: user.name,
          senderAvatar: user.avatar,
          text: textToSend,
        });
      } catch (err) {
        console.error('Failed to post message online:', err);
      }
    }
  };

  // Send gift
  const handleSendGift = async (giftName: string, icon: string, cost: number) => {
    if (userCoins < cost) {
      alert("Not enough coins! You can recharge in Profile.");
      return;
    }
    setUserCoins((prev) => prev - cost);
    setGiftBanner({ sender: user.name, gift: giftName, icon });

    const localGiftMsg: ChatMessage = {
      id: Date.now().toString(),
      senderName: user.name,
      senderAvatar: user.avatar,
      text: `Sent a magnificent ${giftName} ${icon} to the room!`,
      time: 'Just now',
      isGift: true,
      giftIcon: icon,
    };
    setMessages((prev) => [...prev, localGiftMsg]);

    if (currentRoom) {
      try {
        const result = await sendRoomGift(currentRoom.id, {
          userId: user.id,
          senderName: user.name,
          senderAvatar: user.avatar,
          giftName,
          giftIcon: icon,
          cost,
        });
        if (result?.user?.coins !== undefined) {
          setUserCoins(result.user.coins);
        }
      } catch (err) {
        console.error('Failed to send gift online:', err);
      }
    }

    setTimeout(() => {
      setGiftBanner(null);
    }, 3500);
  };

  // STEP 3: MAIN LOBBY SCREEN (Matches user screenshot)
  if (!currentRoom) {
    return (
      <MainLobbyScreen
        user={user}
        onSelectRoom={(room) => setCurrentRoom(room)}
        onSignOut={onSignOut}
        onlineCount={onlinePeerCount}
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#140b05] text-amber-50 font-outfit overflow-hidden">
      {/* Top Header */}
      <header className="h-14 px-4 bg-[#1e1108]/90 border-b border-amber-500/20 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-md">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full rounded-full object-cover"
              referrerPolicy="no-referrer" 
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-amber-200 truncate max-w-[120px]">{user.name}</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/30 text-amber-300 rounded font-semibold border border-amber-400/30">
                Lv.{user.level}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-amber-300/80">
              <span>🪙 {userCoins}</span>
              <span>💎 {user.diamonds}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Live Online Users Badge */}
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Online: {onlinePeerCount}</span>
          </span>

          {/* Sign In Provider Indicator */}
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 capitalize flex items-center gap-1">
            {user.provider}
          </span>
          <button
            onClick={onSignOut}
            title="Sign Out to Login Screen"
            className="px-2.5 py-1 text-xs rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 flex items-center gap-1 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative flex flex-col">
        {/* ROOM VIEW */}
        {currentRoom ? (
          <div className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-b from-[#241308] via-[#1a0e06] to-black">
            {/* Room Header */}
            <div className="px-4 py-2.5 bg-black/40 border-b border-amber-500/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentRoom(null)}
                  className="p-1 rounded-full text-amber-300 hover:bg-white/10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-sm font-bold text-amber-100 truncate max-w-[190px]">{currentRoom.title}</h2>
                  <p className="text-[10px] text-amber-300/70 flex items-center gap-1">
                    <Users className="w-3 h-3 text-amber-400" /> {currentRoom.onlineCount} listening • Host: {currentRoom.hostName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-2 rounded-full transition shadow-md ${
                    isMicOn 
                      ? 'bg-emerald-500 text-black shadow-emerald-500/30 animate-pulse' 
                      : 'bg-white/10 text-amber-200 hover:bg-white/20'
                  }`}
                  title={isMicOn ? 'Mic is Live' : 'Muted'}
                >
                  {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => alert("Room link copied: wibewave.app/room/" + currentRoom.id)}
                  className="p-2 rounded-full bg-white/10 text-amber-200 hover:bg-white/20"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Gift Notification Banner */}
            {giftBanner && (
              <div className="absolute top-14 left-4 right-4 z-30 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-amber-950 px-4 py-2 rounded-2xl shadow-xl flex items-center justify-between animate-bounce">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{giftBanner.icon}</span>
                  <div className="text-xs font-bold leading-tight">
                    <span>{giftBanner.sender}</span> sent a <span className="underline">{giftBanner.gift}</span>!
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-amber-900" />
              </div>
            )}

            {/* 8-Seat Audio Stage */}
            <div className="p-4 bg-gradient-to-b from-[#2a170a]/60 to-transparent">
              <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
                {/* 8 Seats */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((seatIdx) => {
                  const participant = INITIAL_PARTICIPANTS.find((p) => p.seatIndex === seatIdx);
                  const isUserSeat = seatIdx === 4 && isMicOn;

                  if (isUserSeat) {
                    return (
                      <div key={seatIdx} className="flex flex-col items-center">
                        <div className="relative w-13 h-13 rounded-full border-2 border-emerald-400 p-0.5 shadow-lg shadow-emerald-500/20 animate-pulse">
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-full h-full rounded-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-black rounded-full p-0.5">
                            <Mic className="w-2.5 h-2.5" />
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-300 mt-1 truncate max-w-[64px]">You</span>
                      </div>
                    );
                  }

                  if (participant) {
                    return (
                      <div key={seatIdx} className="flex flex-col items-center">
                        <div className={`relative w-13 h-13 rounded-full p-0.5 transition ${
                          participant.isSpeaking ? 'border-2 border-amber-400 shadow-md shadow-amber-400/40 animate-pulse-glow' : 'border border-amber-500/40'
                        }`}>
                          <img 
                            src={participant.avatar} 
                            alt={participant.name} 
                            className="w-full h-full rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {participant.isHost && (
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-amber-500 text-amber-950 rounded-full p-0.5">
                              <Crown className="w-3 h-3 fill-amber-950" />
                            </div>
                          )}
                          {participant.isMuted && (
                            <div className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full p-0.5">
                              <MicOff className="w-2.5 h-2.5" />
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] font-medium text-amber-200 mt-1 truncate max-w-[64px]">
                          {participant.name}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div key={seatIdx} className="flex flex-col items-center">
                      <button 
                        onClick={() => setIsMicOn(true)}
                        className="w-13 h-13 rounded-full border border-dashed border-amber-500/40 hover:border-amber-400 bg-white/5 flex items-center justify-center text-amber-400/60 hover:text-amber-300 transition cursor-pointer"
                        title="Take Mic Seat"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <span className="text-[9px] text-amber-400/50 mt-1">Seat {seatIdx + 1}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chat Stream */}
            <div className="flex-1 px-4 py-2 overflow-y-auto space-y-2 text-xs">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
                📢 Wibe Wave Safety Notice: Welcome to the Arabian live room! Please respect all community members and enjoy the festive party.
              </div>
              {messages.map((m) => (
                <div key={m.id} className={`flex items-start gap-2 p-1.5 rounded-lg ${m.isGift ? 'bg-amber-400/15 border border-amber-400/30' : ''}`}>
                  <img src={m.senderAvatar} alt="" className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5" referrerPolicy="no-referrer" />
                  <div className="min-w-0">
                    <span className="font-bold text-amber-300 mr-1.5">{m.senderName}:</span>
                    <span className="text-amber-100/90">{m.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Virtual Gift Bar */}
            <div className="px-4 py-2 bg-black/60 border-t border-amber-500/20 flex items-center justify-between gap-1 overflow-x-auto">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Gift className="w-3 h-3" /> Gifts:
              </span>
              <button 
                onClick={() => handleSendGift('Rose', '🌹', 50)} 
                className="px-2.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-xs text-amber-200 border border-amber-400/30 shrink-0 flex items-center gap-1"
              >
                🌹 Rose (50)
              </button>
              <button 
                onClick={() => handleSendGift('Fanoos Lantern', '🏮', 150)} 
                className="px-2.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-xs text-amber-200 border border-amber-400/30 shrink-0 flex items-center gap-1"
              >
                🏮 Lantern (150)
              </button>
              <button 
                onClick={() => handleSendGift('Golden Palace', '🏰', 500)} 
                className="px-2.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-xs text-amber-200 border border-amber-400/30 shrink-0 flex items-center gap-1"
              >
                🏰 Palace (500)
              </button>
            </div>

            {/* Message Input Footer */}
            <form onSubmit={handleSendMessage} className="p-3 bg-[#180e07] border-t border-amber-500/20 flex gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Say something friendly in Wibe Wave..."
                className="flex-1 bg-black/40 border border-amber-500/30 rounded-full px-4 py-2 text-xs text-amber-100 placeholder-amber-400/40 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 flex items-center justify-center font-bold hover:brightness-110 shadow"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* PARTY LOBBY / ROOMS LIST */
          <div className="p-4 space-y-4">
            {/* Arabian Night Festive Banner */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-900 via-amber-800 to-[#3b1d0b] p-4 border border-amber-500/30 shadow-lg">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[10px] font-bold mb-1.5">
                  <Sparkles className="w-3 h-3" /> Wibe Wave Special Event
                </div>
                <h3 className="text-base font-bold text-amber-100">Festive Voice Nights 🌙</h3>
                <p className="text-xs text-amber-200/80 mt-0.5">
                  Hop into voice rooms, talk with international friends &amp; collect golden lantern badges!
                </p>
              </div>
              <div className="absolute right-2 -bottom-2 text-6xl opacity-30 select-none">
                🕌
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-amber-950 font-bold shadow-sm shrink-0">
                🔥 All Party
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-amber-500/20 text-amber-200 shrink-0">
                🎶 Music
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-amber-500/20 text-amber-200 shrink-0">
                🎙️ Chat
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-amber-500/20 text-amber-200 shrink-0">
                🎮 Gaming
              </span>
            </div>

            {/* Voice Rooms Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500" /> Hot Voice Rooms
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INITIAL_ROOMS.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setCurrentRoom(room)}
                    className="group bg-gradient-to-br from-[#241308] to-[#1a0e06] border border-amber-500/20 hover:border-amber-400/60 rounded-2xl p-3.5 flex gap-3 cursor-pointer shadow-md transition transform hover:-translate-y-0.5"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-amber-500/30">
                      <img src={room.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-center text-amber-300 font-semibold py-0.5">
                        {room.activeMicCount} on mic
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded font-semibold border border-amber-400/20">
                            {room.tag}
                          </span>
                          <span className="text-[10px] text-amber-400/60">{room.category}</span>
                        </div>
                        <h5 className="text-xs font-bold text-amber-100 truncate group-hover:text-amber-300 transition-colors">
                          {room.title}
                        </h5>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-amber-300/70 pt-1 border-t border-amber-500/10">
                        <span className="truncate max-w-[90px]">@{room.hostName}</span>
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <Radio className="w-3 h-3 animate-pulse" /> {room.onlineCount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <footer className="h-14 bg-[#1b0f07] border-t border-amber-500/20 px-6 flex items-center justify-around z-20 shrink-0">
        <button
          onClick={() => { setCurrentRoom(null); setActiveTab('party'); }}
          className={`flex flex-col items-center gap-0.5 text-xs font-semibold ${
            activeTab === 'party' ? 'text-amber-400' : 'text-amber-200/50 hover:text-amber-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Party</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`flex flex-col items-center gap-0.5 text-xs font-semibold ${
            activeTab === 'messages' ? 'text-amber-400' : 'text-amber-200/50 hover:text-amber-200'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Messages</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-0.5 text-xs font-semibold ${
            activeTab === 'profile' ? 'text-amber-400' : 'text-amber-200/50 hover:text-amber-200'
          }`}
        >
          <UserIcon className="w-4 h-4" />
          <span>Profile</span>
        </button>
      </footer>
    </div>
  );
}
