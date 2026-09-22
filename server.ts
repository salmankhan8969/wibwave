import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Persistent Data Storage
const DATA_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface ServerUser {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  provider: string;
  level: number;
  coins: number;
  diamonds: number;
  createdAt: number;
  lastSeen: number;
}

interface ServerMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  time: string;
  isGift?: boolean;
  giftIcon?: string;
  timestamp: number;
}

interface ServerRoom {
  id: string;
  title: string;
  hostName: string;
  hostAvatar: string;
  coverImage: string;
  category: string;
  tag: string;
  seats: Array<{
    seatIndex: number;
    userId: string;
    name: string;
    avatar: string;
    isSpeaking: boolean;
    isMuted: boolean;
  } | null>;
}

interface DatabaseSchema {
  users: Record<string, ServerUser>;
  rooms: ServerRoom[];
  messages: ServerMessage[];
}

const defaultRooms: ServerRoom[] = [
  {
    id: "room-1",
    title: "🌙 Arabian Nights & Melodies",
    hostName: "Princess_Yasmin",
    hostAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80",
    category: "Music & Singing",
    tag: "Trending #1",
    seats: [
      {
        seatIndex: 0,
        userId: "bot-host-1",
        name: "Princess_Yasmin",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        isSpeaking: true,
        isMuted: false,
      },
      {
        seatIndex: 1,
        userId: "bot-singer-1",
        name: "Hamza_Singer",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        isSpeaking: false,
        isMuted: false,
      },
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
  {
    id: "room-2",
    title: "🎙️ Wibe Wave Chill & Chit-Chat",
    hostName: "Tariq_Vibes",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
    category: "Casual Chat",
    tag: "Official Party",
    seats: [
      {
        seatIndex: 0,
        userId: "bot-host-2",
        name: "Tariq_Vibes",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        isSpeaking: true,
        isMuted: false,
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
];

function readDb(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading db:", err);
  }
  const initialDb: DatabaseSchema = {
    users: {},
    rooms: defaultRooms,
    messages: [
      {
        id: "msg-welcome-1",
        roomId: "room-1",
        senderId: "sys",
        senderName: "Wibe Wave Host",
        senderAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        text: "Welcome to the online festive room! Marhaba! 🌙✨",
        time: "Just now",
        timestamp: Date.now(),
      },
    ],
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2));
  return initialDb;
}

function writeDb(db: DatabaseSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error("Error writing db:", err);
  }
}

// ---------------- API ROUTES ----------------

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "online", service: "Wibe Wave Online Auth & Voice Backend" });
});

// 1. Online Sign In
app.post("/api/auth/signin", (req, res) => {
  const { provider, name, email, avatar } = req.body;
  if (!provider) {
    return res.status(400).json({ error: "Missing auth provider" });
  }

  const db = readDb();
  const userId = `usr_${provider}_${(name || "user").toLowerCase().replace(/[^a-z0-9]/g, "")}_${Date.now().toString().slice(-4)}`;

  // Find existing by email or provider name
  let existingUser = Object.values(db.users).find(
    (u) => (email && u.email === email) || (u.provider === provider && u.name === name)
  );

  if (!existingUser) {
    existingUser = {
      id: userId,
      name: name || `WaveUser_${Math.floor(1000 + Math.random() * 9000)}`,
      email: email || undefined,
      avatar: avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      provider,
      level: 1,
      coins: 3000,
      diamonds: 500,
      createdAt: Date.now(),
      lastSeen: Date.now(),
    };
    db.users[existingUser.id] = existingUser;
  } else {
    existingUser.lastSeen = Date.now();
    if (avatar) existingUser.avatar = avatar;
    if (name) existingUser.name = name;
  }

  writeDb(db);
  const token = `ww_online_tok_${existingUser.id}`;

  return res.json({
    success: true,
    user: existingUser,
    token,
  });
});

// 2. Fetch authenticated user profile
app.get("/api/auth/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ww_online_tok_")) {
    return res.status(401).json({ error: "Unauthorized session" });
  }
  const userId = authHeader.replace("Bearer ww_online_tok_", "").trim();
  const db = readDb();
  const user = db.users[userId];
  if (!user) {
    return res.status(404).json({ error: "User session not found on server" });
  }
  user.lastSeen = Date.now();
  writeDb(db);
  return res.json({ user });
});

// 3. Online Presence & Heartbeat
app.post("/api/presence/heartbeat", (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "Missing userId" });
  const db = readDb();
  if (db.users[userId]) {
    db.users[userId].lastSeen = Date.now();
    writeDb(db);
  }
  const now = Date.now();
  const onlineCount = Object.values(db.users).filter((u) => now - u.lastSeen < 60000).length;
  return res.json({ success: true, onlineCount: Math.max(1, onlineCount) });
});

// 4. Online Rooms List
app.get("/api/rooms", (req, res) => {
  const db = readDb();
  res.json({ rooms: db.rooms });
});

// 5. Room Chat Messages
app.get("/api/rooms/:roomId/messages", (req, res) => {
  const { roomId } = req.params;
  const db = readDb();
  const roomMessages = db.messages
    .filter((m) => m.roomId === roomId)
    .slice(-50);
  res.json({ messages: roomMessages });
});

// 6. Post Chat Message Online
app.post("/api/rooms/:roomId/messages", (req, res) => {
  const { roomId } = req.params;
  const { senderId, senderName, senderAvatar, text } = req.body;
  if (!text || !senderName) {
    return res.status(400).json({ error: "Invalid message payload" });
  }
  const db = readDb();
  const newMsg: ServerMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    roomId,
    senderId: senderId || "guest",
    senderName,
    senderAvatar: senderAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    text,
    time: "Just now",
    timestamp: Date.now(),
  };
  db.messages.push(newMsg);
  // Keep last 150 messages max
  if (db.messages.length > 150) {
    db.messages = db.messages.slice(-150);
  }
  writeDb(db);
  res.json({ success: true, message: newMsg });
});

// 7. Send Online Gift
app.post("/api/rooms/:roomId/gift", (req, res) => {
  const { roomId } = req.params;
  const { userId, senderName, senderAvatar, giftName, giftIcon, cost } = req.body;
  const db = readDb();
  const user = db.users[userId];
  if (user) {
    if (user.coins < cost) {
      return res.status(400).json({ error: "Insufficient coins on server balance" });
    }
    user.coins -= cost;
  }
  const newMsg: ServerMessage = {
    id: `gift_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    roomId,
    senderId: userId || "guest",
    senderName: senderName || user?.name || "Guest",
    senderAvatar: senderAvatar || user?.avatar || "",
    text: `Sent a spectacular ${giftName} ${giftIcon}! 🌟`,
    time: "Just now",
    isGift: true,
    giftIcon,
    timestamp: Date.now(),
  };
  db.messages.push(newMsg);
  writeDb(db);
  res.json({ success: true, user, message: newMsg });
});

// 8. Join / Leave Audio Mic Seat Online
app.post("/api/rooms/:roomId/seats", (req, res) => {
  const { roomId } = req.params;
  const { seatIndex, action, user: seatUser } = req.body;
  const db = readDb();
  const room = db.rooms.find((r) => r.id === roomId);
  if (!room) return res.status(404).json({ error: "Room not found" });

  if (action === "join") {
    room.seats[seatIndex] = {
      seatIndex,
      userId: seatUser.id,
      name: seatUser.name,
      avatar: seatUser.avatar,
      isSpeaking: false,
      isMuted: false,
    };
  } else if (action === "leave") {
    room.seats[seatIndex] = null;
  }

  writeDb(db);
  res.json({ success: true, seats: room.seats });
});

// ---------------- VITE MIDDLEWARE / STATIC FILES ----------------

async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Wibe Wave full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

start();
