import React, { useState } from 'react';
import { UserProfile } from '../types';
import { signInOnline } from '../api';
import { UserPlus, ArrowLeft, Check, AlertCircle } from 'lucide-react';

interface GoogleAccount {
  id: string;
  name: string;
  email: string;
  letter?: string;
  bg?: string;
  avatarUrl?: string;
}

const DEFAULT_GOOGLE_ACCOUNTS: GoogleAccount[] = [
  {
    id: 'g-1',
    name: 'Salman Khan',
    email: 'salmannazia8968@gmail.com',
    letter: 'S',
    bg: 'bg-[#ea580c]', // Orange
  },
  {
    id: 'g-2',
    name: 'Salman Khan',
    email: 'salmanmkmahii@gmail.com',
    letter: 'S',
    bg: 'bg-[#0284c7]', // Blue
  },
  {
    id: 'g-3',
    name: 'Mehran Khan',
    email: 'mehranshah89690@gmail.com',
    letter: 'M',
    bg: 'bg-[#06b6d4]', // Cyan
  },
  {
    id: 'g-4',
    name: 'Salman Khan',
    email: 'mrsalmanbhaijan8969@gmail.com',
    letter: 'S',
    bg: 'bg-[#7c3aed]', // Purple
  },
  {
    id: 'g-5',
    name: 'Salman Khan',
    email: 'salmankhan8969125@gmail.com',
    letter: 'S',
    bg: 'bg-[#785444]', // Brownish
  },
  {
    id: 'g-6',
    name: 'Waqas Khan',
    email: 'waqaskhan55990099@gmail.com',
    letter: 'W',
    bg: 'bg-[#dc2626]', // Red
  },
  {
    id: 'g-7',
    name: 'Hassau Bahi',
    email: 'smkhan8969@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'g-8',
    name: 'Meno Khan',
    email: 'menokhan8969@gmail.com',
    letter: 'M',
    bg: 'bg-[#52525b]', // Grey
  },
  {
    id: 'g-9',
    name: 'Mahii Jan',
    email: 'mahiijan8969@gmail.com',
    letter: 'M',
    bg: 'bg-[#0d9488]', // Teal
  },
];

interface GoogleAccountChooserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export function GoogleAccountChooserModal({
  isOpen,
  onClose,
  onSuccess,
}: GoogleAccountChooserModalProps) {
  const [selectedAccount, setSelectedAccount] = useState<GoogleAccount | null>(null);
  const [loading, setLoading] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectAccount = async (account: GoogleAccount) => {
    setSelectedAccount(account);
    setLoading(true);
    setError(null);

    try {
      const avatar = account.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(account.name)}&backgroundColor=d97706`;
      const res = await signInOnline({
        provider: 'google',
        name: account.name,
        email: account.email,
        avatar,
      });

      // Brief delay for authentic Google Sign-In completion feel
      setTimeout(() => {
        setLoading(false);
        onSuccess(res.user);
      }, 500);
    } catch (err: any) {
      console.error('Google Sign In failed:', err);
      setError(err.message || 'Failed to authenticate with Google account');
      setLoading(false);
    }
  };

  const handleCustomAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim()) return;

    const name = customName.trim() || customEmail.split('@')[0];
    const newAcc: GoogleAccount = {
      id: 'custom-' + Date.now(),
      name,
      email: customEmail.trim(),
      letter: name.charAt(0).toUpperCase(),
      bg: 'bg-[#2563eb]',
    };

    handleSelectAccount(newAcc);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col justify-end sm:items-center sm:justify-center bg-black/75 backdrop-blur-[2px] animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-[420px] max-h-[85vh] bg-[#292a2d] text-[#e8eaed] rounded-t-[28px] sm:rounded-[28px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 font-sans border border-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Android drag bar indicator */}
        <div className="w-full flex justify-center pt-2.5 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-[#5f6368] rounded-full" />
        </div>

        {/* Mascot App Logo & Title Header */}
        <div className="pt-4 pb-3 px-6 flex flex-col items-center text-center border-b border-[#3c4043]/50 relative">
          {/* App Mascot Icon (As seen in the screenshot) */}
          <div className="w-13 h-13 rounded-2xl overflow-hidden shadow-lg border border-white/10 mb-2.5 bg-gradient-to-tr from-cyan-900 to-indigo-900 flex items-center justify-center">
            <img 
              src="/src/assets/images/wibe_wave_mascot_1790069365261.jpg" 
              alt="Wibe Wave" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <h2 className="text-[22px] font-medium tracking-tight text-[#f1f3f4]">
            Choose an account
          </h2>
          <p className="text-[14px] text-[#9aa0a6] mt-0.5 font-normal">
            to continue to <span className="text-[#8ab4f8] font-medium">Wibe Wave</span>
          </p>

          {loading && (
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#3c4043] overflow-hidden">
              <div className="w-full h-full bg-[#8ab4f8] animate-[indeterminate_1.5s_infinite_linear]" />
            </div>
          )}
        </div>

        {/* Error message if any */}
        {error && (
          <div className="mx-6 mt-3 p-2.5 bg-red-900/30 border border-red-500/40 rounded-xl text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Account List Area */}
        <div className="overflow-y-auto flex-1 divide-y divide-[#3c4043]/40 py-1 scrollbar-thin scrollbar-thumb-gray-700">
          {!showCustomInput ? (
            <>
              {DEFAULT_GOOGLE_ACCOUNTS.map((acc) => {
                const isCurrentLoading = loading && selectedAccount?.id === acc.id;
                return (
                  <button
                    key={acc.id}
                    onClick={() => handleSelectAccount(acc)}
                    disabled={loading}
                    className="w-full px-6 py-3 flex items-center gap-4 hover:bg-[#35363a] active:bg-[#3c4043] transition-colors text-left cursor-pointer disabled:opacity-60 relative group"
                  >
                    {/* Circle Avatar */}
                    {acc.avatarUrl ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10 ring-2 ring-pink-500/30">
                        <img 
                          src={acc.avatarUrl} 
                          alt={acc.name} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ) : (
                      <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-bold text-white text-[17px] shadow-sm ${acc.bg || 'bg-amber-600'}`}>
                        {acc.letter || acc.name.charAt(0)}
                      </div>
                    )}

                    {/* Account Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[15px] font-medium text-[#e8eaed] truncate group-hover:text-white">
                        {acc.name}
                      </div>
                      <div className="text-[13px] text-[#9aa0a6] truncate font-normal">
                        {acc.email}
                      </div>
                    </div>

                    {isCurrentLoading && (
                      <div className="w-5 h-5 border-2 border-[#8ab4f8] border-t-transparent rounded-full animate-spin shrink-0" />
                    )}
                  </button>
                );
              })}

              {/* Use Another Account Button */}
              <button
                onClick={() => setShowCustomInput(true)}
                disabled={loading}
                className="w-full px-6 py-3.5 flex items-center gap-4 hover:bg-[#35363a] active:bg-[#3c4043] transition-colors text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-[#3c4043] flex items-center justify-center text-[#9aa0a6] shrink-0">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium text-[#e8eaed]">
                    Use another account
                  </div>
                </div>
              </button>
            </>
          ) : (
            /* Custom Account Form */
            <form onSubmit={handleCustomAccountSubmit} className="p-6 space-y-4">
              <button
                type="button"
                onClick={() => setShowCustomInput(false)}
                className="flex items-center gap-1.5 text-xs text-[#8ab4f8] hover:underline mb-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to account list</span>
              </button>

              <div>
                <label className="block text-xs text-[#9aa0a6] mb-1">
                  Google Email or Phone
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#202124] border border-[#5f6368] rounded-xl text-white text-sm focus:outline-none focus:border-[#8ab4f8]"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs text-[#9aa0a6] mb-1">
                  Display Name (optional)
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#202124] border border-[#5f6368] rounded-xl text-white text-sm focus:outline-none focus:border-[#8ab4f8]"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !customEmail.trim()}
                className="w-full py-2.5 mt-2 bg-[#8ab4f8] hover:bg-[#a8c7fa] text-[#1f1f1f] font-semibold text-sm rounded-xl transition cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Continue to Wibe Wave'}
              </button>
            </form>
          )}
        </div>

        {/* Google Privacy Policy & Terms Disclaimer */}
        <div className="px-6 py-4 bg-[#202124]/50 border-t border-[#3c4043]/30 text-[11.5px] leading-relaxed text-[#9aa0a6]">
          To continue, Google will share your name, email address, language preference, and profile picture with Wibe Wave. Before using Wibe Wave, you can review its privacy policy and terms of service.
        </div>
      </div>
    </div>
  );
}
