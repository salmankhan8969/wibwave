import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Check } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgreeAndClose: () => void;
}

export function TermsModal({ isOpen, onClose, onAgreeAndClose }: TermsModalProps) {
  const [activeTab, setActiveTab] = useState<'agreement' | 'privacy'>('agreement');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-gradient-to-b from-amber-950 via-[#22160d] to-black border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-amber-500/20">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-amber-200 font-outfit tracking-wide">
              Wibe Wave Legal
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-amber-300/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex px-6 pt-3 gap-2 border-b border-amber-500/10">
          <button
            onClick={() => setActiveTab('agreement')}
            className={`pb-2.5 px-3 text-sm font-semibold transition-all border-b-2 ${
              activeTab === 'agreement'
                ? 'text-amber-400 border-amber-400'
                : 'text-amber-200/60 border-transparent hover:text-amber-200'
            }`}
          >
            User Agreement
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-2.5 px-3 text-sm font-semibold transition-all border-b-2 ${
              activeTab === 'privacy'
                ? 'text-amber-400 border-amber-400'
                : 'text-amber-200/60 border-transparent hover:text-amber-200'
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto text-xs leading-relaxed text-amber-100/80 space-y-4 font-outfit">
          {activeTab === 'agreement' ? (
            <>
              <div>
                <h4 className="text-sm font-bold text-amber-300 mb-1">1. Welcome to Wibe Wave</h4>
                <p>
                  Welcome to Wibe Wave, the live voice chat and social party community. By creating an account or logging in through Google, Snapchat, or X/Twitter, you agree to comply with these terms.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-amber-300 mb-1">2. Community Code of Conduct</h4>
                <p>
                  Wibe Wave is dedicated to fostering an enjoyable, welcoming atmosphere. Harassment, hate speech, inappropriate broadcasting, or illegal activities in voice rooms and party channels are strictly prohibited and result in permanent suspension.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-amber-300 mb-1">3. Virtual Gifts & Currency</h4>
                <p>
                  Virtual diamonds, gold coins, and gifts used in Wibe Wave voice rooms are for entertainment within the platform. All in-app transfers adhere to fair play and anti-fraud guidelines.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-amber-300 mb-1">4. Account Responsibility</h4>
                <p>
                  You are solely responsible for maintaining the confidentiality of your linked social sign-in credentials and for all activities that occur under your Wibe Wave account.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="text-sm font-bold text-amber-300 mb-1">1. Information We Collect</h4>
                <p>
                  When you sign in using Google, Snapchat, or X/Twitter, we receive basic public profile information (such as your display name, profile avatar, and verified email/account handle).
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-amber-300 mb-1">2. Voice & Microphone Permissions</h4>
                <p>
                  Microphone access is requested only when you actively enter the stage to speak in a Wibe Wave voice party room. Your voice audio is transmitted in real time to room listeners.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-amber-300 mb-1">3. Data Security</h4>
                <p>
                  We implement robust encryption and privacy safeguards to protect your personal information against unauthorized access, alteration, or disclosure.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-amber-300 mb-1">4. Your Privacy Rights</h4>
                <p>
                  You may disconnect your social accounts or request data deletion anytime through the in-app profile settings.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-black/40 border-t border-amber-500/20 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-amber-400/30 text-amber-300 text-xs font-semibold hover:bg-white/5 transition"
          >
            Close
          </button>
          <button
            onClick={onAgreeAndClose}
            className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 hover:brightness-110 transition"
          >
            <Check className="w-4 h-4" />
            Agree & Accept
          </button>
        </div>
      </div>
    </div>
  );
}
