import React, { useState } from 'react';
import { Sparkles, Check, AlertCircle, Info, ExternalLink, Image as ImageIcon, Wifi } from 'lucide-react';
import { AuthProvider, UserProfile } from '../types';
import { GoogleIcon, SnapchatIcon, XTwitterIcon } from './SocialIcons';
import { TermsModal } from './TermsModal';
import { OAuthDialog } from './OAuthDialog';
import { GoogleAccountChooserModal } from './GoogleAccountChooserModal';
import { signInOnline } from '../api';

export const BACKGROUND_OPTIONS = [
  {
    id: 'palace-glow',
    name: 'Palace Lantern Glow',
    url: '/src/assets/images/wibe_wave_new_bg_1790068898384.jpg',
  },
  {
    id: 'twilight-arabian',
    name: 'Twilight Courtyard',
    url: '/src/assets/images/wibe_wave_bg_alt_1790068926230.jpg',
  },
  {
    id: 'classic-gold',
    name: 'Classic Golden Arch',
    url: '/src/assets/images/wibe_wave_bg_1790068684135.jpg',
  },
];

interface SignInScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
  selectedBgIndex?: number;
  onBgChange?: (index: number) => void;
}

export function SignInScreen({ 
  onLoginSuccess, 
  selectedBgIndex = 0,
  onBgChange,
}: SignInScreenProps) {
  const [agreed, setAgreed] = useState<boolean>(true);
  const [showTerms, setShowTerms] = useState<boolean>(false);
  const [activeOAuthProvider, setActiveOAuthProvider] = useState<AuthProvider | null>(null);
  const [showAgreementAlert, setShowAgreementAlert] = useState<boolean>(false);
  const [shakeAgreement, setShakeAgreement] = useState<boolean>(false);
  const [bgIndex, setBgIndex] = useState<number>(selectedBgIndex);

  const currentBgUrl = BACKGROUND_OPTIONS[bgIndex % BACKGROUND_OPTIONS.length].url;

  const cycleBackground = () => {
    const nextIdx = (bgIndex + 1) % BACKGROUND_OPTIONS.length;
    setBgIndex(nextIdx);
    if (onBgChange) onBgChange(nextIdx);
  };

  const handleProviderClick = (provider: AuthProvider) => {
    if (!agreed) {
      setShakeAgreement(true);
      setShowAgreementAlert(true);
      setTimeout(() => setShakeAgreement(false), 600);
      setTimeout(() => setShowAgreementAlert(false), 3500);
      return;
    }
    setActiveOAuthProvider(provider);
  };

  const handleQuickGuest = async () => {
    if (!agreed) {
      setShakeAgreement(true);
      setShowAgreementAlert(true);
      setTimeout(() => setShakeAgreement(false), 600);
      return;
    }
    try {
      const res = await signInOnline({
        provider: 'guest',
        name: 'Wave Traveler',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      });
      onLoginSuccess(res.user);
    } catch {
      const guestUser: UserProfile = {
        id: 'ww_guest_' + Math.floor(1000 + Math.random() * 9000),
        name: 'Wave Traveler',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        provider: 'guest',
        level: 1,
        coins: 1000,
        diamonds: 100,
      };
      onLoginSuccess(guestUser);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[680px] flex flex-col justify-between overflow-hidden select-none">
      {/* Background Graphic Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-[1.01] transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `url('${currentBgUrl}')`,
        }}
      >
        {/* Warm Golden Ambient Lighting Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-transparent to-amber-950/45 pointer-events-none" />
        
        {/* Radial Lantern Glow effect in top center */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-400/25 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      </div>

      {/* Top Bar Badges */}
      <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-auto">
        <button
          onClick={cycleBackground}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 hover:bg-black/60 border border-amber-400/30 text-amber-200 text-[10px] font-semibold backdrop-blur-md transition-all shadow-lg cursor-pointer hover:border-amber-300"
          title="Click to change background"
        >
          <ImageIcon className="w-3 h-3 text-amber-400" />
          <span>Theme ({bgIndex + 1}/{BACKGROUND_OPTIONS.length})</span>
        </button>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 border border-emerald-400/30 text-emerald-300 text-[10px] font-semibold backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Wifi className="w-3 h-3 text-emerald-400" />
          <span>Server Online</span>
        </div>
      </div>

      {/* Floating Sparkles & Dust Particles */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-[15%] w-1.5 h-1.5 bg-yellow-200 rounded-full animate-ping opacity-60" />
        <div className="absolute top-1/3 right-[18%] w-2 h-2 bg-amber-200 rounded-full animate-pulse opacity-70" />
        <div className="absolute top-[55%] left-[10%] w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-50" />
        <div className="absolute top-[68%] right-[12%] w-1.5 h-1.5 bg-amber-100 rounded-full animate-pulse opacity-60" />
      </div>

      {/* Top Section: App Branding */}
      <div className="relative z-10 pt-28 sm:pt-32 text-center px-4">
        {/* Animated Main Logo: "Wibe Wave" matching Hayuki's opulent golden cursive/serif aesthetic */}
        <div className="inline-block relative">
          <h1 
            className="text-5xl sm:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FDF3C7] to-[#E9BF68] drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] font-playfair transition-all transform hover:scale-[1.02]"
            style={{
              textShadow: '0 2px 4px rgba(78,41,0,0.8), 0 8px 18px rgba(0,0,0,0.9)',
            }}
          >
            Wibe Wave
          </h1>

          {/* Golden Sparkle Star on top right of logo (matching screenshot) */}
          <div className="absolute -top-2 -right-4 sm:-right-6 text-amber-300 animate-pulse">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]" viewBox="0 0 24 24">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </div>
          {/* Subtle secondary sparkle on left */}
          <div className="absolute -top-1 -left-3 text-amber-200/80 animate-ping opacity-75">
            <svg className="w-3.5 h-3.5 fill-amber-200" viewBox="0 0 24 24">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </div>
        </div>

        {/* Subtitle: "Chat & Party, have fun together" */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 drop-shadow-[0_0_4px_rgba(251,191,36,0.8)]" />
          <p 
            className="text-amber-100 font-medium text-base sm:text-lg tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-marcellus italic"
            style={{
              color: '#FDE68A',
              textShadow: '0 2px 6px rgba(0,0,0,0.9)',
            }}
          >
            Chat & Party, have fun together
          </p>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 drop-shadow-[0_0_4px_rgba(251,191,36,0.8)]" />
        </div>
      </div>

      {/* Middle Section: Social Sign In Pill Buttons */}
      <div className="relative z-10 w-full max-w-sm mx-auto px-6 sm:px-8 space-y-3.5 my-auto py-6">
        {/* Validation Warning Alert */}
        {showAgreementAlert && (
          <div className="bg-red-950/90 border border-red-500/60 text-red-200 px-4 py-2 rounded-2xl text-xs flex items-center gap-2 shadow-xl animate-bounce backdrop-blur-md">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>Please agree to User Agreement & Privacy Agreement first!</span>
          </div>
        )}

        {/* 1. Google Button */}
        <button
          id="btn-login-google"
          onClick={() => handleProviderClick('google')}
          className="group w-full h-14 bg-white hover:bg-neutral-50 active:scale-[0.98] transition-all duration-150 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.35)] flex items-center px-6 relative cursor-pointer"
        >
          {/* Google Icon on Left */}
          <div className="absolute left-6 flex items-center justify-center">
            <GoogleIcon className="w-7 h-7 drop-shadow-sm group-hover:scale-105 transition-transform" />
          </div>
          {/* Centered Text */}
          <span className="w-full text-center text-gray-800 font-semibold text-lg tracking-tight font-outfit">
            Google
          </span>
        </button>

        {/* 2. Snapchat Button */}
        <button
          id="btn-login-snapchat"
          onClick={() => handleProviderClick('snapchat')}
          className="group w-full h-14 bg-white hover:bg-neutral-50 active:scale-[0.98] transition-all duration-150 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.35)] flex items-center px-6 relative cursor-pointer"
        >
          {/* Snapchat Icon on Left */}
          <div className="absolute left-6 flex items-center justify-center">
            <SnapchatIcon className="w-7 h-7 drop-shadow-sm group-hover:scale-105 transition-transform" />
          </div>
          {/* Centered Text */}
          <span className="w-full text-center text-gray-800 font-semibold text-lg tracking-tight font-outfit">
            Snapchat
          </span>
        </button>

        {/* 3. X/Twitter Button */}
        <button
          id="btn-login-twitter"
          onClick={() => handleProviderClick('twitter')}
          className="group w-full h-14 bg-white hover:bg-neutral-50 active:scale-[0.98] transition-all duration-150 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.35)] flex items-center px-6 relative cursor-pointer"
        >
          {/* X/Twitter Icon on Left */}
          <div className="absolute left-6 flex items-center justify-center">
            <XTwitterIcon className="w-7 h-7 drop-shadow-sm group-hover:scale-105 transition-transform" />
          </div>
          {/* Centered Text */}
          <span className="w-full text-center text-gray-800 font-semibold text-lg tracking-tight font-outfit">
            X/Twitter
          </span>
        </button>

        {/* Quick Guest / Demo Option */}
        <div className="pt-2 text-center">
          <button
            onClick={handleQuickGuest}
            className="text-xs text-amber-200/80 hover:text-amber-100 underline decoration-amber-400/40 hover:decoration-amber-300 transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-outfit cursor-pointer"
          >
            Quick Guest Exploration →
          </button>
        </div>
      </div>

      {/* Bottom Section: Agreement & Policies */}
      <div className="relative z-10 pb-8 sm:pb-10 px-6 max-w-sm mx-auto w-full text-center">
        <div 
          className={`flex items-center justify-center gap-2.5 transition-transform ${
            shakeAgreement ? 'animate-[wiggle_0.4s_ease-in-out]' : ''
          }`}
        >
          {/* Circular Gold Checkbox */}
          <button
            type="button"
            onClick={() => setAgreed(!agreed)}
            className={`shrink-0 w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer shadow-md ${
              agreed
                ? 'border-amber-400 bg-amber-400/30 text-amber-300'
                : 'border-amber-300/70 bg-black/40 text-transparent'
            }`}
            aria-label="Agree to terms checkbox"
          >
            <Check className={`w-4 h-4 stroke-[3] transition-transform ${agreed ? 'scale-100 text-amber-300' : 'scale-0'}`} />
          </button>

          {/* Agreement Label */}
          <div className="text-left leading-tight text-xs font-outfit">
            <span 
              onClick={() => setAgreed(!agreed)}
              className="text-amber-100/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] cursor-pointer"
            >
              Logging in means you agree to the user
            </span>
            <div className="mt-0.5">
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-[#29d9d5] hover:text-[#52e7e3] font-semibold underline underline-offset-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] transition-colors inline-flex items-center gap-0.5 cursor-pointer"
              >
                <span>User Agreement &amp; Privacy Agreement</span>
                <ExternalLink className="w-2.5 h-2.5 inline opacity-70" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Privacy Policy Modal */}
      <TermsModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        onAgreeAndClose={() => {
          setAgreed(true);
          setShowTerms(false);
        }}
      />

      {/* Google Sign-In 2nd Step Account Chooser (As per user screenshot) */}
      <GoogleAccountChooserModal
        isOpen={activeOAuthProvider === 'google'}
        onClose={() => setActiveOAuthProvider(null)}
        onSuccess={(user) => {
          setActiveOAuthProvider(null);
          onLoginSuccess(user);
        }}
      />

      {/* Other OAuth Providers (Snapchat, X/Twitter) */}
      <OAuthDialog
        provider={activeOAuthProvider !== 'google' ? activeOAuthProvider : null}
        onClose={() => setActiveOAuthProvider(null)}
        onSuccess={(user) => {
          setActiveOAuthProvider(null);
          onLoginSuccess(user);
        }}
      />
    </div>
  );
}
