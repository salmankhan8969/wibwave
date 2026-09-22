import React, { useState } from 'react';
import { Sparkles, Trophy, Flame, Play, Coins, RotateCw, Volume2, ShieldCheck, ChevronRight } from 'lucide-react';
import { UserProfile } from '../types';

interface GamesScreenProps {
  user: UserProfile;
}

interface GameItem {
  id: string;
  title: string;
  tag: string;
  category: string;
  playersOnline: number;
  coverImage: string;
  jackpot: string;
  gradient: string;
  accentColor: string;
  badge: string;
}

const VOICE_PARTY_GAMES: GameItem[] = [
  {
    id: 'greedy-fruits',
    title: 'Greedy Fruit Slots',
    tag: 'x100 JACKPOT',
    category: 'Slot / Arcade',
    playersOnline: 4820,
    coverImage: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&auto=format&fit=crop&q=80',
    jackpot: '2,850,000 🪙',
    gradient: 'from-amber-600 via-yellow-500 to-amber-700',
    accentColor: 'border-yellow-400',
    badge: 'HOT 🔥',
  },
  {
    id: 'lucky-wheel',
    title: 'Royal Spin Wheel',
    tag: 'WIN FALCON',
    category: 'Lucky Draw',
    playersOnline: 3120,
    coverImage: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=400&auto=format&fit=crop&q=80',
    jackpot: '999 💎',
    gradient: 'from-purple-700 via-fuchsia-600 to-pink-700',
    accentColor: 'border-fuchsia-400',
    badge: 'SUPER',
  },
  {
    id: 'ludo-party',
    title: 'Ludo Voice Rush',
    tag: '4 PLAYERS',
    category: 'Board Game',
    playersOnline: 8940,
    coverImage: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&auto=format&fit=crop&q=80',
    jackpot: '500,000 🪙',
    gradient: 'from-blue-700 via-cyan-600 to-teal-700',
    accentColor: 'border-cyan-400',
    badge: 'TOP 1',
  },
  {
    id: 'teen-patti',
    title: 'Teen Patti Champions',
    tag: 'ROYAL TABLE',
    category: 'Cards',
    playersOnline: 5670,
    coverImage: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&auto=format&fit=crop&q=80',
    jackpot: '1,200,000 🪙',
    gradient: 'from-emerald-700 via-green-600 to-teal-800',
    accentColor: 'border-emerald-400',
    badge: 'CLASSIC',
  },
  {
    id: 'carrom-pool',
    title: 'Carrom 2v2 Live',
    tag: 'VOICE CHAT',
    category: 'Sports Board',
    playersOnline: 2450,
    coverImage: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&auto=format&fit=crop&q=80',
    jackpot: '300,000 🪙',
    gradient: 'from-rose-700 via-red-600 to-amber-700',
    accentColor: 'border-rose-400',
    badge: 'NEW',
  },
  {
    id: 'rocket-crash',
    title: 'Wibe Rocket Crash',
    tag: 'x50 MULTIPLIER',
    category: 'Instant Win',
    playersOnline: 6180,
    coverImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=400&auto=format&fit=crop&q=80',
    jackpot: '5,000,000 🪙',
    gradient: 'from-indigo-800 via-violet-700 to-purple-900',
    accentColor: 'border-indigo-400',
    badge: 'VIP',
  },
];

export function GamesScreen({ user }: GamesScreenProps) {
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [userCoins, setUserCoins] = useState(user.coins);
  const [isSpinning, setIsSpinning] = useState(false);
  const [slotResult, setSlotResult] = useState<string[]>(['🍒', '🍋', '🍇']);
  const [winMessage, setWinMessage] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState<number>(100);

  // Quick Fruit Slot Mini-Game Simulator
  const FRUITS = ['🍒', '🍋', '🍇', '🍉', '🔔', '⭐', '💎', '7️⃣'];

  const handlePlayFruitSlot = () => {
    if (userCoins < betAmount) {
      alert("Not enough coins! Please top up your wallet.");
      return;
    }
    if (isSpinning) return;

    setUserCoins((prev) => prev - betAmount);
    setIsSpinning(true);
    setWinMessage(null);

    let counter = 0;
    const interval = setInterval(() => {
      setSlotResult([
        FRUITS[Math.floor(Math.random() * FRUITS.length)],
        FRUITS[Math.floor(Math.random() * FRUITS.length)],
        FRUITS[Math.floor(Math.random() * FRUITS.length)],
      ]);
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        // Determine final outcome
        const finalSlot = [
          FRUITS[Math.floor(Math.random() * FRUITS.length)],
          FRUITS[Math.floor(Math.random() * FRUITS.length)],
          FRUITS[Math.floor(Math.random() * FRUITS.length)],
        ];
        
        // 40% chance of small win or jackpot for fun demo
        const isLucky = Math.random() < 0.45;
        if (isLucky) {
          const winFruit = FRUITS[Math.floor(Math.random() * 4)];
          finalSlot[0] = winFruit;
          finalSlot[1] = winFruit;
          finalSlot[2] = winFruit;
          const winMultiplier = winFruit === '7️⃣' ? 50 : winFruit === '💎' ? 25 : winFruit === '⭐' ? 10 : 3;
          const wonAmount = betAmount * winMultiplier;
          setUserCoins((prev) => prev + wonAmount);
          setWinMessage(`🎉 BIG WIN! Multiplier x${winMultiplier} (+${wonAmount.toLocaleString()} Coins)`);
        } else {
          setWinMessage('Try again! Good luck next spin 🍀');
        }

        setSlotResult(finalSlot);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="relative z-10 flex-1 overflow-y-auto px-3.5 pt-2 pb-24 space-y-4 scrollbar-thin scrollbar-thumb-amber-900/40 select-none">
      {/* 1. TOP HEADER WITH STATUS AND COIN WALLET */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-500 tracking-wide drop-shadow">
            Games Arena
          </h1>
          <p className="text-[11px] text-amber-200/70">Win Jackpots &amp; Chat Live</p>
        </div>

        {/* User Balance Chip */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-950 via-[#26150a] to-amber-900 border border-yellow-400/50 shadow-md">
          <span className="text-sm">🪙</span>
          <span className="text-xs font-mono font-bold text-yellow-300">
            {userCoins.toLocaleString()}
          </span>
          <button 
            onClick={() => setUserCoins((prev) => prev + 5000)}
            className="w-5 h-5 rounded-full bg-yellow-400 text-amber-950 font-black text-xs flex items-center justify-center hover:scale-105 transition cursor-pointer shadow"
            title="Free Coin Top Up"
          >
            +
          </button>
        </div>
      </div>

      {/* 2. RECENT WINNERS TICKER */}
      <div className="px-3 py-1.5 rounded-xl bg-black/40 border border-amber-500/20 flex items-center gap-2 text-[11px] text-amber-200/80 overflow-hidden">
        <Trophy className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
        <span className="font-bold text-yellow-300 shrink-0">Recent Winner:</span>
        <div className="truncate animate-marquee">
          <span>Malik_King won 450,000 🪙 in Greedy Fruits! • Shahzaman won x20 in Rocket Crash!</span>
        </div>
      </div>

      {/* 3. INTERACTIVE FEATURED GAME POPUP / BANNER: GREEDY FRUIT SLOTS */}
      <div className="relative rounded-2xl overflow-hidden p-4 bg-gradient-to-b from-[#3b0764] via-[#2e1065] to-[#1e1b4b] border-2 border-yellow-400/80 shadow-[0_8px_25px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-amber-950 font-black text-[10px] shadow">
              FEATURED MINI-GAME
            </span>
            <span className="text-xs font-bold text-yellow-200">Greedy Fruit Slots 777</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-cyan-300">Jackpot: 2.8M 🪙</span>
        </div>

        {/* Slot Reels Container */}
        <div className="my-3 p-3 rounded-xl bg-black/70 border border-yellow-500/40 flex items-center justify-around shadow-inner">
          {slotResult.map((sym, idx) => (
            <div
              key={idx}
              className={`w-16 h-16 rounded-xl bg-gradient-to-b from-amber-950 to-[#180d05] border-2 border-yellow-400/70 flex items-center justify-center text-3xl shadow-lg transition-transform ${
                isSpinning ? 'scale-110 animate-bounce' : 'scale-100'
              }`}
            >
              {sym}
            </div>
          ))}
        </div>

        {/* Win/Loss Feedback Message */}
        {winMessage && (
          <div className="text-center text-xs font-bold text-yellow-300 bg-yellow-950/60 py-1 px-3 rounded-lg border border-yellow-400/30 mb-2 animate-pulse">
            {winMessage}
          </div>
        )}

        {/* Bet Selection & Spin Controls */}
        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-lg border border-white/10">
            <span className="text-[10px] text-gray-400">Bet:</span>
            {[100, 500, 1000].map((amt) => (
              <button
                key={amt}
                onClick={() => setBetAmount(amt)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer transition ${
                  betAmount === amt
                    ? 'bg-yellow-400 text-amber-950 font-black'
                    : 'text-amber-200/60 hover:text-white'
                }`}
              >
                {amt}
              </button>
            ))}
          </div>

          <button
            onClick={handlePlayFruitSlot}
            disabled={isSpinning}
            className={`flex-1 py-2 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all ${
              isSpinning
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-amber-950 hover:brightness-110 active:scale-95 shadow-[0_0_15px_rgba(251,191,36,0.6)]'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'SPINNING...' : `SPIN (${betAmount} 🪙)`}</span>
          </button>
        </div>
      </div>

      {/* 4. ALL VOICE ROOM GAMES GRID */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <h2 className="text-sm font-bold text-amber-100 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span>Popular Voice Room Games</span>
          </h2>
          <span className="text-[10px] text-amber-300/70">6 Available</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {VOICE_PARTY_GAMES.map((game) => (
            <div
              key={game.id}
              onClick={() => {
                if (game.id === 'greedy-fruits') {
                  handlePlayFruitSlot();
                } else {
                  alert(`Starting ${game.title} live table! Matching with online room players...`);
                }
              }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group bg-gradient-to-b ${game.gradient} border-2 ${game.accentColor} shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]`}
            >
              {/* Badge */}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-[9px] font-black text-yellow-300 shadow border border-white/20 z-10">
                {game.badge}
              </div>

              {/* Cover Image */}
              <div className="relative h-24 w-full overflow-hidden">
                <img
                  src={game.coverImage}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-mono text-cyan-200">
                  👥 {game.playersOnline.toLocaleString()}
                </div>
              </div>

              {/* Details */}
              <div className="p-2.5 bg-black/80 backdrop-blur-sm">
                <h3 className="text-xs font-bold text-white truncate drop-shadow">
                  {game.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] text-amber-200/80 mt-1">
                  <span className="font-semibold">{game.tag}</span>
                  <span className="font-mono text-yellow-400 font-bold">{game.jackpot}</span>
                </div>

                <button className="w-full mt-2 py-1 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-950 font-bold text-[10px] flex items-center justify-center gap-1 shadow group-hover:brightness-110">
                  <Play className="w-3 h-3 fill-amber-950" />
                  <span>PLAY NOW</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
