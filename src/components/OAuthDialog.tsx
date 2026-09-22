import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, Shield, Globe, AlertTriangle } from 'lucide-react';
import { AuthProvider, UserProfile } from '../types';
import { GoogleIcon, SnapchatIcon, XTwitterIcon } from './SocialIcons';
import { signInOnline } from '../api';

interface OAuthDialogProps {
  provider: AuthProvider | null;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export function OAuthDialog({ provider, onClose, onSuccess }: OAuthDialogProps) {
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState(
    provider === 'google' ? 'smkhan8969@gmail.com' : ''
  );
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!provider) return null;

  const handleConfirm = async () => {
    setLoading(true);
    setErrorMessage(null);

    let defaultName = 'S.M. Khan';
    let defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
    let emailToSend = customEmail.trim() || undefined;

    if (provider === 'snapchat') {
      defaultName = 'WibeWave_Snap';
      defaultAvatar = 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80';
    } else if (provider === 'twitter') {
      defaultName = 'WaveVibes_X';
      defaultAvatar = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80';
    }

    try {
      const result = await signInOnline({
        provider,
        name: customName.trim() || defaultName,
        email: emailToSend,
        avatar: defaultAvatar,
      });

      setLoading(false);
      onSuccess(result.user);
    } catch (err: any) {
      console.error('Online sign in error:', err);
      setErrorMessage(err.message || 'Failed to authenticate online with server');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-sm bg-white text-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with provider badge & Online badge */}
        <div className="relative px-6 pt-6 pb-4 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {provider === 'google' && <GoogleIcon className="w-8 h-8" />}
            {provider === 'snapchat' && <SnapchatIcon className="w-8 h-8" />}
            {provider === 'twitter' && <XTwitterIcon className="w-8 h-8" />}
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-gray-900 leading-tight">
                  {provider === 'google' && 'Sign in with Google'}
                  {provider === 'snapchat' && 'Log in with Snapchat'}
                  {provider === 'twitter' && 'Authorize with X'}
                </h3>
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <Globe className="w-3 h-3 text-emerald-500 animate-pulse" />
                Live Online Server Sync
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {provider === 'google' && (
            <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold shadow-sm">
                S
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">smkhan8969@gmail.com</div>
                <div className="text-[11px] text-emerald-700 font-medium truncate">Online Cloud Profile Ready</div>
              </div>
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
          )}

          {provider === 'snapchat' && (
            <div className="p-3.5 bg-yellow-50/80 rounded-2xl border border-yellow-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFFC00] text-black flex items-center justify-center font-bold shadow-sm">
                👻
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900">Bitmoji & Profile Sync</div>
                <div className="text-[11px] text-emerald-700 font-medium">Online Cloud Profile Ready</div>
              </div>
              <CheckCircle className="w-5 h-5 text-amber-600" />
            </div>
          )}

          {provider === 'twitter' && (
            <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold shadow-sm">
                𝕏
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900">X Identity & Handle</div>
                <div className="text-[11px] text-emerald-700 font-medium">Online Cloud Profile Ready</div>
              </div>
              <CheckCircle className="w-5 h-5 text-gray-800" />
            </div>
          )}

          {/* Optional Display Name Customization */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
              Online Party Display Name
            </label>
            <input
              type="text"
              placeholder={provider === 'google' ? 'S.M. Khan' : 'Enter your party nickname'}
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm font-medium"
            />
          </div>

          <div className="flex items-start gap-2 text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-xl">
            <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Profile and coin balances are saved on the live online server database.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-amber-950 font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition disabled:opacity-75 cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 border-2 border-amber-950 border-t-transparent rounded-full animate-spin" />
                <span>Connecting...</span>
              </div>
            ) : (
              <>
                <span>Sign In Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
