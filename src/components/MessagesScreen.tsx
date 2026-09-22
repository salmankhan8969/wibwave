import React, { useState } from 'react';
import { 
  Users, 
  Send, 
  ArrowLeft, 
  CheckCheck, 
  Check, 
  Sparkles, 
  Search, 
  Bell, 
  Trash2, 
  BadgeCheck, 
  Gift, 
  Smile,
  ShieldCheck
} from 'lucide-react';
import { UserProfile } from '../types';

export interface ChatThread {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  isOfficial?: boolean;
  isHost?: boolean;
  isVerified?: boolean;
  online?: boolean;
  messages: {
    id: string;
    sender: 'them' | 'me';
    text: string;
    time: string;
  }[];
}

const INITIAL_THREADS: ChatThread[] = [
  {
    id: 'wibe-team',
    name: 'Wibe Wave T...',
    avatar: '/src/assets/images/wibe_wave_mascot_1790069365261.jpg',
    lastMessage: 'Congratulations on receiving...',
    time: 'Today 06:21',
    unreadCount: 1,
    isOfficial: true,
    isVerified: true,
    messages: [
      {
        id: 'msg-1',
        sender: 'them',
        text: '🎉 Welcome to Wibe Wave Voice Party! Congratulations on receiving your first login lucky diamond pouch and 1,000 welcome coins!',
        time: 'Today 06:20',
      },
      {
        id: 'msg-2',
        sender: 'them',
        text: 'Join popular voice rooms in Pakistan & UAE to unlock exclusive animated mic borders and level badges.',
        time: 'Today 06:21',
      },
    ],
  },
  {
    id: 'user-lja',
    name: 'LJA85011',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    lastMessage: 'Hi',
    time: 'Today 11:18',
    unreadCount: 0,
    online: true,
    messages: [
      {
        id: 'msg-1',
        sender: 'them',
        text: 'Hi 👋 are you in the room right now?',
        time: 'Today 11:18',
      },
    ],
  },
  {
    id: 'user-maghrora',
    name: '🕊️ MAGHRORA ...',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    lastMessage: 'Hi',
    time: 'Today 11:14',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-1',
        sender: 'them',
        text: 'Hi! Loved your song in the room yesterday 🎶',
        time: 'Today 11:14',
      },
    ],
  },
  {
    id: 'user-alishba',
    name: '💫alishba',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    lastMessage: 'salm Salman 2 bomb rakai ...',
    time: 'Today 11:05',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-1',
        sender: 'them',
        text: 'salm Salman 2 bomb rakai ...',
        time: 'Today 11:05',
      },
    ],
  },
  {
    id: 'user-heer',
    name: '🌹 Heer 🌹',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    lastMessage: 'kya howa',
    time: '2026-09-21',
    isHost: true,
    messages: [
      {
        id: 'msg-1',
        sender: 'them',
        text: 'kya howa',
        time: '2026-09-21 22:45',
      },
    ],
  },
  {
    id: 'user-muskan',
    name: '🕊️Muskan.🐅',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&auto=format&fit=crop&q=80',
    lastMessage: 'waly',
    time: '2026-09-21',
    messages: [
      {
        id: 'msg-1',
        sender: 'them',
        text: 'waly',
        time: '2026-09-21 21:12',
      },
    ],
  },
  {
    id: 'user-mughal',
    name: 'MUGHAL RESEL...',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    lastMessage: 'ok',
    time: '2026-09-21',
    messages: [
      {
        id: 'msg-1',
        sender: 'them',
        text: 'ok bhai coins recharge confirm ho gaya hai 👍',
        time: '2026-09-21 19:30',
      },
    ],
  },
  {
    id: 'user-nzawali',
    name: '💫❤️NZAWALI࿐',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    lastMessage: 'rasha',
    time: '2026-09-21',
    messages: [
      {
        id: 'msg-1',
        sender: 'them',
        text: 'rasha room ta',
        time: '2026-09-21 18:05',
      },
    ],
  },
  {
    id: 'user-ayat',
    name: '🕊️ Ayat Khan 🐅',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop&q=80',
    lastMessage: 'Ao party shuru karein...',
    time: '2026-09-21',
    messages: [
      {
        id: 'msg-1',
        sender: 'them',
        text: 'Ao party shuru karein mic pe!',
        time: '2026-09-21 16:40',
      },
    ],
  },
];

interface MessagesScreenProps {
  user: UserProfile;
  onlineCount: number;
}

export function MessagesScreen({ user, onlineCount }: MessagesScreenProps) {
  const [threads, setThreads] = useState<ChatThread[]>(INITIAL_THREADS);
  const [activeChat, setActiveChat] = useState<ChatThread | null>(null);
  const [inputText, setInputText] = useState('');
  const [sweptNotice, setSweptNotice] = useState<string | null>(null);

  // Clear unread counts / sweep clean
  const handleSweepAll = () => {
    setThreads((prev) =>
      prev.map((t) => ({ ...t, unreadCount: 0 }))
    );
    setSweptNotice('All notifications marked as read! ✨');
    setTimeout(() => setSweptNotice(null), 2500);
  };

  // Send a message inside open chat thread
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChat) return;

    const newMsgText = inputText.trim();
    setInputText('');

    const newMsg = {
      id: 'msg-' + Date.now(),
      sender: 'me' as const,
      text: newMsgText,
      time: 'Just now',
    };

    const updatedActiveChat = {
      ...activeChat,
      lastMessage: newMsgText,
      time: 'Just now',
      messages: [...activeChat.messages, newMsg],
    };

    setActiveChat(updatedActiveChat);

    setThreads((prev) =>
      prev.map((t) => (t.id === activeChat.id ? updatedActiveChat : t))
    );

    // Auto reply for fun if chatting with Official Team or bot
    if (activeChat.isOfficial) {
      setTimeout(() => {
        const reply = {
          id: 'reply-' + Date.now(),
          sender: 'them' as const,
          text: 'Thank you for contacting Wibe Wave Official Support! Your VIP account status is verified.',
          time: 'Just now',
        };
        setActiveChat((curr) => curr ? { ...curr, messages: [...curr.messages, reply] } : null);
      }, 1200);
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative select-none">
      {/* Background Graphic Layer matching screenshot */}
      <div 
        className="absolute inset-0 bg-cover bg-top z-0 pointer-events-none opacity-45"
        style={{
          backgroundImage: `url('/src/assets/images/arabian_golden_lobby_bg_1790069591326.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#180d05]/95 to-[#100804] pointer-events-none z-0" />

      {/* TOP HEADER: Device Bar + Message Header */}
      <header className="relative z-10 pt-2 px-4 pb-2 bg-gradient-to-b from-black/60 to-transparent">
        {/* Device Status Bar Info */}
        <div className="flex items-center justify-between text-[11px] text-amber-200/90 font-medium px-1 mb-2">
          <span>2:35</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30">
              Online: {onlineCount}
            </span>
            <span>📶</span>
            <span>🔋 71%</span>
          </div>
        </div>

        {/* Header Action Bar */}
        <div className="flex items-center justify-between mt-1">
          {/* Title: "Message" */}
          <h1 className="text-[26px] font-bold tracking-tight text-[#f1f3f4] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-sans">
            Message
          </h1>

          {/* Right Header Buttons: [👥 Team] and [🧹 Broom Button] */}
          <div className="flex items-center gap-2">
            {/* Team Pill Button */}
            <button
              onClick={() => {
                const teamChat = threads.find((t) => t.id === 'wibe-team');
                if (teamChat) setActiveChat(teamChat);
              }}
              className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-900/60 to-amber-950/80 border border-amber-500/40 text-amber-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition cursor-pointer active:scale-95"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Team</span>
            </button>

            {/* Broom / Clear Badge Circular Button */}
            <button
              onClick={handleSweepAll}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-700/50 via-amber-600/40 to-yellow-500/40 border border-amber-400/50 flex items-center justify-center text-amber-200 hover:text-yellow-100 shadow-md transition cursor-pointer active:scale-95"
              title="Mark all as read"
            >
              <span className="text-sm select-none">🧹</span>
            </button>
          </div>
        </div>
      </header>

      {/* Swept clean floating notification */}
      {sweptNotice && (
        <div className="relative z-20 mx-4 mt-1 px-3 py-1.5 bg-amber-500/20 border border-amber-400/40 rounded-xl text-amber-200 text-xs flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <span>{sweptNotice}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>
      )}

      {/* MESSAGES LIST (Identical list items matching screenshot) */}
      <div className="relative z-10 flex-1 overflow-y-auto divide-y divide-amber-900/20 px-2 pb-20 scrollbar-thin scrollbar-thumb-amber-950">
        {threads.map((thread) => (
          <div
            key={thread.id}
            onClick={() => setActiveChat(thread)}
            className="w-full px-2 py-3 flex items-center gap-3 hover:bg-black/30 active:bg-black/50 transition-colors cursor-pointer group rounded-xl"
          >
            {/* Avatar Circle with Online indicator / Mascot Badge */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-400/30 ring-1 ring-amber-500/20 bg-black/40">
                <img
                  src={thread.avatar}
                  alt={thread.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {thread.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#180d05]" />
              )}
            </div>

            {/* Conversation Details */}
            <div className="flex-1 min-w-0">
              {/* Row 1: Name + Badges + Time */}
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={`text-[15px] truncate font-medium ${
                    thread.id === 'user-mughal' 
                      ? 'font-black italic text-amber-100 tracking-wide' 
                      : 'text-[#f1f3f4] group-hover:text-amber-200'
                  }`}>
                    {thread.name}
                  </span>

                  {/* Official Cyan Badge */}
                  {thread.isOfficial && (
                    <span className="shrink-0 px-1.5 py-0.2 rounded-full bg-[#00bcd4] text-[#052e35] text-[9.5px] font-black tracking-tight flex items-center gap-0.5 shadow-sm">
                      <span>✔Official</span>
                    </span>
                  )}

                  {/* Host Badge */}
                  {thread.isHost && (
                    <span className="shrink-0 px-2 py-0.2 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-[10px] font-semibold leading-tight">
                      Host
                    </span>
                  )}
                </div>

                {/* Timestamp */}
                <span className="shrink-0 text-[11px] text-[#9aa0a6] font-normal">
                  {thread.time}
                </span>
              </div>

              {/* Row 2: Last Message snippet + Unread Badge */}
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <p className="text-[13px] text-[#9aa0a6] truncate font-normal group-hover:text-amber-100/70">
                  {thread.lastMessage}
                </p>

                {thread.unreadCount && thread.unreadCount > 0 ? (
                  <span className="shrink-0 px-1.5 py-0.2 min-w-4 text-center rounded-full bg-red-600 text-white text-[10px] font-bold shadow">
                    {thread.unreadCount}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 1-on-1 LIVE CHAT MODAL (Opened upon tapping any chat) */}
      {activeChat && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#140c06] text-white animate-in slide-in-from-right duration-250 font-sans">
          {/* Chat Header */}
          <div className="pt-2 px-3 pb-2.5 bg-gradient-to-b from-black/80 to-[#1e1008] border-b border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setActiveChat(null)}
                className="p-1.5 -ml-1 text-amber-200 hover:text-white rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-400/40">
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-amber-100 truncate max-w-[150px]">
                    {activeChat.name}
                  </span>
                  {activeChat.isOfficial && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#00bcd4] text-[#052e35] text-[9px] font-black">
                      ✔Official
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-emerald-400 font-medium">Online</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert(`View ${activeChat.name}'s profile and send lucky party gift`)}
                className="p-2 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 hover:text-white transition cursor-pointer"
                title="Send Gift"
              >
                <Gift className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black/40">
            {activeChat.messages.map((m) => {
              const isMe = m.sender === 'me';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-md ${
                      isMe
                        ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-amber-950 font-medium rounded-br-none'
                        : 'bg-[#291b10] border border-amber-500/20 text-amber-100 rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9.5px] text-gray-500 mt-1 px-1">
                    {m.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-[#180e07] border-t border-amber-500/20 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Message ${activeChat.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-full bg-black/60 border border-amber-500/30 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 font-bold hover:brightness-110 transition disabled:opacity-50 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
