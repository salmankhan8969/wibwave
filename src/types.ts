export type AuthProvider = 'google' | 'snapchat' | 'twitter' | 'guest';

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  provider: AuthProvider;
  level: number;
  coins: number;
  diamonds: number;
  activeFrame?: string;
  svipTier?: number;
}

export interface VoiceRoom {
  id: string;
  title: string;
  hostName: string;
  hostAvatar: string;
  coverImage: string;
  category: string;
  onlineCount: number;
  activeMicCount: number;
  tag: string;
  isHot?: boolean;
}

export interface RoomParticipant {
  id: string;
  name: string;
  avatar: string;
  seatIndex: number;
  isHost?: boolean;
  isSpeaking?: boolean;
  isMuted?: boolean;
  level: number;
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  time: string;
  isGift?: boolean;
  giftIcon?: string;
}
