import { UserProfile, VoiceRoom, ChatMessage } from './types';

const TOKEN_KEY = 'wibe_wave_online_token';
const USER_KEY = 'wibe_wave_online_user';

export async function signInOnline(payload: {
  provider: string;
  name: string;
  email?: string;
  avatar: string;
}): Promise<{ user: UserProfile; token: string }> {
  const res = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Failed to sign in' }));
    throw new Error(err.error || 'Server error during sign in');
  }

  const data = await res.json();
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  return data;
}

export async function checkOnlineSession(): Promise<UserProfile | null> {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  try {
    const res = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return null;
    }
    const data = await res.json();
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data.user;
  } catch (err) {
    console.error('Session check failed:', err);
    // Return cached user if offline
    const cached = localStorage.getItem(USER_KEY);
    return cached ? JSON.parse(cached) : null;
  }
}

export function signOutOnline(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function sendHeartbeat(userId: string): Promise<number> {
  try {
    const res = await fetch('/api/presence/heartbeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    return data.onlineCount || 1;
  } catch {
    return 1;
  }
}

export async function fetchOnlineRooms(): Promise<any[]> {
  try {
    const res = await fetch('/api/rooms');
    if (!res.ok) throw new Error('Failed to fetch rooms');
    const data = await res.json();
    return data.rooms;
  } catch (err) {
    console.error('fetchOnlineRooms error:', err);
    return [];
  }
}

export async function fetchRoomMessages(roomId: string): Promise<ChatMessage[]> {
  try {
    const res = await fetch(`/api/rooms/${roomId}/messages`);
    if (!res.ok) throw new Error('Failed to fetch messages');
    const data = await res.json();
    return data.messages;
  } catch (err) {
    console.error('fetchRoomMessages error:', err);
    return [];
  }
}

export async function sendRoomMessage(roomId: string, message: {
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
}): Promise<ChatMessage> {
  const res = await fetch(`/api/rooms/${roomId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  });
  const data = await res.json();
  return data.message;
}

export async function sendRoomGift(roomId: string, payload: {
  userId: string;
  senderName: string;
  senderAvatar: string;
  giftName: string;
  giftIcon: string;
  cost: number;
}): Promise<{ user: UserProfile; message: ChatMessage }> {
  const res = await fetch(`/api/rooms/${roomId}/gift`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Gift failed' }));
    throw new Error(err.error || 'Gift failed');
  }
  return res.json();
}
