/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Smartphone, Maximize2, Eye, X, CheckCircle, Image as ImageIcon, Wifi } from 'lucide-react';
import { UserProfile } from './types';
import { SignInScreen, BACKGROUND_OPTIONS } from './components/SignInScreen';
import { VoicePartyApp } from './components/VoicePartyApp';
import { checkOnlineSession, signOutOnline } from './api';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [viewMode, setViewMode] = useState<'phone' | 'full'>('phone');
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [bgIndex, setBgIndex] = useState<number>(0);

  // Restore existing online session on load
  useEffect(() => {
    checkOnlineSession().then((user) => {
      if (user) setCurrentUser(user);
    });
  }, []);

  const handleSignOut = () => {
    signOutOnline();
    setCurrentUser(null);
  };

  return (
    <div className="w-full min-h-screen bg-[#100804] text-amber-50 flex flex-col items-center justify-center relative overflow-x-hidden font-outfit">
      {/* Top Desktop Navigation & Controls (hidden on small mobile screens) */}
      <div className="w-full max-w-5xl px-4 py-2.5 hidden md:flex items-center justify-between z-30 border-b border-amber-500/10 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-300 font-playfair tracking-wide text-sm">
            Wibe Wave
          </span>
          <span className="text-amber-500/50">•</span>
          <span className="text-amber-200/70">Sign In &amp; Voice Party</span>
          <div className="ml-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span>Online Server Active</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Background Theme Switcher */}
          <button
            onClick={() => setBgIndex((prev) => (prev + 1) % BACKGROUND_OPTIONS.length)}
            className="px-3 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-400/30 flex items-center gap-1.5 transition cursor-pointer"
            title="Change Background Scene"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Theme: {BACKGROUND_OPTIONS[bgIndex].name}</span>
          </button>

          {/* View Mode Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'phone' ? 'full' : 'phone')}
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-amber-200/90 border border-amber-500/20 flex items-center gap-1.5 transition cursor-pointer"
            title="Toggle Phone Frame or Fullscreen"
          >
            {viewMode === 'phone' ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Fullscreen</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>Phone Frame</span>
              </>
            )}
          </button>

          {/* Reference Comparison Drawer Toggle */}
          <button
            onClick={() => setShowComparison(true)}
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-amber-200/90 border border-amber-500/20 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Compare Original</span>
          </button>
        </div>
      </div>

      {/* Main Container Area */}
      <div className="w-full flex-1 flex items-center justify-center p-0 md:p-4">
        {viewMode === 'phone' ? (
          /* Realistic Smartphone Container Frame */
          <div className="relative w-full md:max-w-[390px] h-screen md:h-[820px] md:max-h-[92vh] bg-black md:rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_10px_#1f140c] overflow-hidden flex flex-col border border-amber-500/20">
            {/* Phone Top Notch / Dynamic Island (only visible on phone container) */}
            <div className="absolute top-0 inset-x-0 h-9 z-30 pointer-events-none flex items-center justify-between px-6 text-[11px] font-semibold text-amber-100/90">
              <span>9:41</span>
              <div className="w-20 h-4 bg-black/60 backdrop-blur-md rounded-full border border-amber-500/20" />
              <div className="flex items-center gap-1">
                <span>5G</span>
                <div className="w-4 h-2 border border-amber-100/80 rounded-sm p-0.5">
                  <div className="h-full bg-amber-300 w-3/4 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Screen Content */}
            <div className="flex-1 w-full h-full relative overflow-hidden flex flex-col">
              {currentUser ? (
                <VoicePartyApp 
                  user={currentUser} 
                  onSignOut={handleSignOut} 
                />
              ) : (
                <SignInScreen 
                  onLoginSuccess={(user) => setCurrentUser(user)} 
                  selectedBgIndex={bgIndex}
                  onBgChange={(idx) => setBgIndex(idx)}
                />
              )}
            </div>

            {/* Phone Bottom Home Bar Indicator */}
            <div className="absolute bottom-1 inset-x-0 h-4 z-30 pointer-events-none flex items-center justify-center">
              <div className="w-32 h-1 bg-white/40 rounded-full" />
            </div>
          </div>
        ) : (
          /* Fullscreen Mode */
          <div className="w-full max-w-md h-screen md:h-[820px] bg-black shadow-2xl overflow-hidden flex flex-col border border-amber-500/20 md:rounded-3xl">
            {currentUser ? (
              <VoicePartyApp 
                user={currentUser} 
                onSignOut={handleSignOut} 
              />
            ) : (
              <SignInScreen 
                onLoginSuccess={(user) => setCurrentUser(user)} 
                selectedBgIndex={bgIndex}
                onBgChange={(idx) => setBgIndex(idx)}
              />
            )}
          </div>
        )}
      </div>

      {/* Comparison Modal Dialog */}
      {showComparison && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div 
            className="w-full max-w-2xl bg-[#1d1209] border border-amber-500/30 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-amber-100">
                  Side-by-Side Reference Comparison
                </h3>
              </div>
              <button
                onClick={() => setShowComparison(false)}
                className="p-1 rounded-full text-amber-300 hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-amber-200">
              {/* Reference Details */}
              <div className="bg-black/40 p-4 rounded-2xl border border-amber-500/20 space-y-3">
                <div className="font-bold text-amber-400 text-sm">Original Screenshot (Hayuki)</div>
                <ul className="space-y-1.5 list-disc list-inside text-amber-200/80">
                  <li>Original App Name: <span className="line-through text-red-300">Hayuki</span></li>
                  <li>Arabian Golden Arch &amp; Lanterns backdrop</li>
                  <li>Pill button 1: Google</li>
                  <li>Pill button 2: Snapchat</li>
                  <li>Pill button 3: X/Twitter</li>
                  <li>User Agreement &amp; Privacy Agreement with checkmark</li>
                </ul>
              </div>

              {/* Updated App Details */}
              <div className="bg-amber-950/40 p-4 rounded-2xl border border-amber-400/40 space-y-3">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> Updated App (Wibe Wave)
                </div>
                <ul className="space-y-1.5 list-disc list-inside text-amber-100">
                  <li>App Name: <strong className="text-amber-300">Wibe Wave</strong> (replaced Hayuki)</li>
                  <li>Golden Sparkles &amp; Calligraphic serif typography</li>
                  <li>Subtitle: <span className="text-amber-200">"Chat &amp; Party, have fun together"</span></li>
                  <li>3 identical pill buttons with crisp official icons</li>
                  <li>Working Agreement terms &amp; interactive social auth flow</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => setShowComparison(false)}
              className="mt-2 w-full py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 font-bold text-xs hover:brightness-110 transition"
            >
              Back to Wibe Wave
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
