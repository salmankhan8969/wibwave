import React, { useState, useRef } from 'react';
import { 
  Camera, 
  ChevronRight, 
  User, 
  Calendar, 
  Smile, 
  Check, 
  X,
  Sparkles,
  Upload,
  RefreshCw,
  Crown
} from 'lucide-react';
import { UserProfile } from '../types';

interface MyProfileEditScreenProps {
  user: UserProfile;
  onBack: () => void;
  onUpdateProfile: (updated: {
    name: string;
    avatar: string;
    gender: 'Male' | 'Female';
    birthday: string;
    bio: string;
  }) => void;
}

export function MyProfileEditScreen({ user, onBack, onUpdateProfile }: MyProfileEditScreenProps) {
  // Matched to uploaded screenshot: "Dragon Fly", birthday "2009-09-21", couple photo
  const [username, setUsername] = useState('Dragon Fly');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [birthday, setBirthday] = useState('2009-09-21');
  const [declaration, setDeclaration] = useState('');
  const [avatar, setAvatar] = useState(
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&auto=format&fit=crop&q=80'
  );

  // Avatar action sheet modal state (open by default to match screenshot)
  const [showAvatarActionSheet, setShowAvatarActionSheet] = useState(true);

  // Sub-features for avatar selection
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showPhotoPickerModal, setShowPhotoPickerModal] = useState(false);
  const [showGifAvatarModal, setShowGifAvatarModal] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Active editing modals for text fields
  const [editingField, setEditingField] = useState<'username' | 'gender' | 'birthday' | 'declaration' | null>(null);
  const [tempInput, setTempInput] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleOpenEdit = (field: 'username' | 'gender' | 'birthday' | 'declaration') => {
    setEditingField(field);
    if (field === 'username') setTempInput(username);
    if (field === 'birthday') setTempInput(birthday);
    if (field === 'declaration') setTempInput(declaration);
  };

  const handleSaveField = () => {
    if (editingField === 'username' && tempInput.trim()) {
      setUsername(tempInput.trim());
    } else if (editingField === 'birthday' && tempInput.trim()) {
      setBirthday(tempInput.trim());
    } else if (editingField === 'declaration') {
      setDeclaration(tempInput.trim());
    }
    setEditingField(null);

    onUpdateProfile({
      name: editingField === 'username' ? tempInput.trim() : username,
      avatar,
      gender,
      birthday: editingField === 'birthday' ? tempInput.trim() : birthday,
      bio: editingField === 'declaration' ? tempInput.trim() : declaration,
    });
  };

  // 1. SHOOT PHOTO (CAMERA)
  const handleStartCamera = async () => {
    setShowAvatarActionSheet(false);
    setShowCameraModal(true);
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setCameraActive(true);
        }
      } else {
        setCameraError('Camera access not supported by browser environment.');
      }
    } catch {
      setCameraError('Camera access unavailable. You can use preset shots or gallery upload.');
    }
  };

  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 400;
      canvas.height = video.videoHeight || 400;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setAvatar(dataUrl);
        handleStopCamera();
        setShowCameraModal(false);
        onUpdateProfile({ name: username, avatar: dataUrl, gender, birthday, bio: declaration });
      }
    }
  };

  const handleStopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setShowCameraModal(false);
  };

  // 2. PHOTO AVATAR (GALLERY / FILE UPLOAD)
  const handleOpenPhotoPicker = () => {
    setShowAvatarActionSheet(false);
    setShowPhotoPickerModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const url = event.target.result as string;
          setAvatar(url);
          setShowPhotoPickerModal(false);
          onUpdateProfile({ name: username, avatar: url, gender, birthday, bio: declaration });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPresetAvatar = (url: string) => {
    setAvatar(url);
    setShowPhotoPickerModal(false);
    setShowGifAvatarModal(false);
    onUpdateProfile({ name: username, avatar: url, gender, birthday, bio: declaration });
  };

  // 3. GIF AVATAR (SVIP6)
  const handleOpenGifAvatar = () => {
    setShowAvatarActionSheet(false);
    setShowGifAvatarModal(true);
  };

  return (
    <div className="relative z-20 flex-1 flex flex-col bg-[#140c06] text-amber-50 select-none overflow-y-auto font-sans min-h-full">
      {/* Background Graphic Pattern Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-top pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage: `url('/src/assets/images/arabian_golden_lobby_bg_1790069591326.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#160d06]/95 to-[#0e0703] pointer-events-none z-0" />

      {/* 1. STATUS BAR (Exact match to screenshot: 1:19 with icons, 85%) */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-amber-200/90 font-medium px-4 pt-2 pb-1">
        <div className="flex items-center gap-1.5">
          <span>1:19</span>
          <span className="text-[10px]">👁️</span>
          <span className="text-[10px]">💬</span>
          <span className="text-[10px]">f</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span>ᛒ</span>
          <span>🔕</span>
          <span>📶</span>
          <span className="text-[11px] font-mono font-bold">🔋 85%</span>
        </div>
      </div>

      {/* 2. TOP APP BAR (Ornate Back Button + Centered "My profile" Title) */}
      <header className="relative z-10 flex items-center justify-between px-3.5 py-2.5">
        {/* Ornate Circular Back Button */}
        <button
          onClick={onBack}
          className="relative w-9 h-9 rounded-full bg-gradient-to-b from-[#3a200a] to-[#1a0e05] border border-amber-400/80 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer group"
          title="Back"
        >
          <div className="absolute -top-1 -left-1 text-[8px] text-amber-400">✧</div>
          <div className="absolute -bottom-1 -right-1 text-[8px] text-amber-400">✧</div>
          <span className="text-amber-200 group-hover:text-white text-base font-bold">‹</span>
        </button>

        {/* Title */}
        <h1 className="text-lg font-bold text-amber-100 tracking-wide drop-shadow">
          My profile
        </h1>

        <div className="w-9" />
      </header>

      {/* 3. BIG CIRCULAR AVATAR WITH CAMERA BADGE */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-5 pb-8">
        <div 
          className="relative group cursor-pointer" 
          onClick={() => setShowAvatarActionSheet(true)}
          title="Change profile avatar"
        >
          {/* Main Avatar Container */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-0.5 bg-gradient-to-tr from-amber-400/80 via-yellow-200 to-amber-600 shadow-2xl overflow-hidden ring-4 ring-black/60">
            <img 
              src={avatar} 
              alt="My Avatar" 
              className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Golden Camera Badge Button (Exact placement from screenshot) */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowAvatarActionSheet(true);
            }}
            className="absolute bottom-0 right-1 w-8 h-8 rounded-full bg-[#3d240d] border-2 border-amber-300 flex items-center justify-center text-amber-200 shadow-xl hover:scale-110 active:scale-95 transition cursor-pointer"
            title="Change Avatar"
          >
            <Camera className="w-4 h-4 text-amber-300" />
          </button>
        </div>
      </div>

      {/* 4. LIST OF EDITABLE PROFILE ROWS (Exact styling from screenshot) */}
      <div className="relative z-10 divide-y divide-amber-500/15 border-t border-b border-amber-500/20 bg-black/25 backdrop-blur-sm">
        {/* Row 1: Username */}
        <div 
          onClick={() => handleOpenEdit('username')}
          className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition group"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-amber-950/60 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <User className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-amber-100">Username</span>
          </div>

          <div className="flex items-center gap-2 max-w-[65%]">
            <span className="text-xs font-medium text-white truncate text-right drop-shadow">
              {username}
            </span>
            <ChevronRight className="w-4 h-4 text-amber-300/60 group-hover:text-amber-200 shrink-0" />
          </div>
        </div>

        {/* Row 2: Gender */}
        <div 
          onClick={() => handleOpenEdit('gender')}
          className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition group"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-amber-950/60 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <span className="text-sm">⚥</span>
            </div>
            <span className="text-sm font-semibold text-amber-100">Gender</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-white">
              {gender}
            </span>
            <span className={`text-xs px-1 rounded-full ${
              gender === 'Male' ? 'bg-cyan-600/30 text-cyan-400 border border-cyan-400/40' : 'bg-pink-600/30 text-pink-400 border border-pink-400/40'
            }`}>
              {gender === 'Male' ? '♂' : '♀'}
            </span>
          </div>
        </div>

        {/* Row 3: Birthday */}
        <div 
          onClick={() => handleOpenEdit('birthday')}
          className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition group"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-amber-950/60 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-amber-100">Birthday</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-amber-100/90">
              {birthday}
            </span>
            <ChevronRight className="w-4 h-4 text-amber-300/60 group-hover:text-amber-200 shrink-0" />
          </div>
        </div>

        {/* Row 4: Friends Declaration */}
        <div 
          onClick={() => handleOpenEdit('declaration')}
          className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition group"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-amber-950/60 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Smile className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-amber-100">Friends Declaration</span>
          </div>

          <div className="flex items-center gap-2 max-w-[50%]">
            <span className="text-xs text-amber-200/50 truncate">
              {declaration || 'Say something to friends...'}
            </span>
            <ChevronRight className="w-4 h-4 text-amber-300/60 group-hover:text-amber-200 shrink-0" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. BOTTOM ACTION SHEET MODAL (EXACT 100% MATCH TO USER'S SCREENSHOT) */}
      {/* ========================================================================= */}
      {showAvatarActionSheet && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end justify-center p-3 animate-fade-in">
          {/* Action Sheet Card Container */}
          <div className="w-full max-w-sm rounded-[28px] bg-[#1e1e24] border border-white/5 p-3.5 space-y-2.5 shadow-2xl">
            {/* Button 1: Shoot photo */}
            <button
              onClick={handleStartCamera}
              className="w-full py-4 rounded-2xl bg-[#34343a] text-white font-bold text-base hover:bg-[#3e3e46] active:scale-[0.99] transition shadow cursor-pointer text-center"
            >
              Shoot photo
            </button>

            {/* Button 2: Photo avatar */}
            <button
              onClick={handleOpenPhotoPicker}
              className="w-full py-4 rounded-2xl bg-[#34343a] text-white font-bold text-base hover:bg-[#3e3e46] active:scale-[0.99] transition shadow cursor-pointer text-center"
            >
              Photo avatar
            </button>

            {/* Button 3: Gif avatar [SVIP6] */}
            <button
              onClick={handleOpenGifAvatar}
              className="w-full py-4 rounded-2xl bg-[#34343a] text-amber-400 font-bold text-base hover:bg-[#3e3e46] active:scale-[0.99] transition shadow cursor-pointer flex items-center justify-center gap-2.5"
            >
              <span>Gif avatar</span>
              {/* SVIP6 Badge with Golden Crown and Gradient */}
              <div className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700 text-amber-950 font-black text-[10px] tracking-tight flex items-center gap-1 shadow border border-yellow-200/80">
                <Crown className="w-3 h-3 text-amber-900 fill-amber-900" />
                <span>SVIP6</span>
              </div>
            </button>

            {/* Cancel Button */}
            <button
              onClick={() => setShowAvatarActionSheet(false)}
              className="w-full pt-3 pb-2 text-center text-[#3b82f6] font-semibold text-base hover:opacity-80 active:scale-95 transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. SHOOT PHOTO (CAMERA) MODAL */}
      {/* ========================================================================= */}
      {showCameraModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-[#1e1e24] border border-amber-400/40 p-5 space-y-4 text-center">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="font-bold text-sm text-yellow-300">Shoot Profile Photo</h3>
              <button 
                onClick={handleStopCamera}
                className="w-7 h-7 rounded-full bg-black/40 text-gray-300 hover:text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {/* Camera Viewfinder */}
            <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-amber-400/80 shadow-2xl bg-black flex items-center justify-center">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />

              {!cameraActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/80 text-amber-200 text-xs">
                  <Camera className="w-8 h-8 mb-2 opacity-50 text-amber-300 animate-pulse" />
                  <p>{cameraError || 'Starting camera stream...'}</p>
                </div>
              )}
            </div>

            {/* Camera Actions */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={handleCapturePhoto}
                disabled={!cameraActive}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-300 to-amber-500 text-amber-950 font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition disabled:opacity-40 cursor-pointer flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Take Photo</span>
              </button>
              <button
                onClick={handleStopCamera}
                className="px-4 py-3 rounded-full bg-[#34343a] text-white text-xs font-bold hover:bg-[#40404a] transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. PHOTO AVATAR GALLERY & CUSTOM UPLOAD MODAL */}
      {/* ========================================================================= */}
      {showPhotoPickerModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-3">
          <div className="w-full max-w-sm rounded-3xl bg-[#1e1e24] border border-amber-400/40 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="font-bold text-base text-yellow-300">Choose Photo Avatar</h3>
              <button 
                onClick={() => setShowPhotoPickerModal(false)}
                className="w-7 h-7 rounded-full bg-black/40 text-gray-300 hover:text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {/* Custom Upload Button */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-500/20 border border-yellow-400/60 text-yellow-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-yellow-400/30 transition cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload from device / gallery</span>
            </button>

            <p className="text-xs text-amber-200/70">Or choose a trending party avatar:</p>

            <div className="grid grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
              {[
                { label: 'Couple (From Screenshot)', url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&auto=format&fit=crop&q=80' },
                { label: 'Stylish Glasses', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80' },
                { label: 'Sunset Party', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
                { label: 'Arabian Style', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
                { label: 'Golden Luxury', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80' },
                { label: 'VIP Night', url: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&auto=format&fit=crop&q=80' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectPresetAvatar(item.url)}
                  className={`relative rounded-2xl overflow-hidden aspect-square border-2 transition cursor-pointer hover:scale-105 group ${
                    avatar === item.url ? 'border-yellow-400 ring-2 ring-yellow-400/50' : 'border-white/10'
                  }`}
                >
                  <img src={item.url} alt={item.label} className="w-full h-full object-cover" />
                  {avatar === item.url && (
                    <div className="absolute inset-0 bg-yellow-400/20 flex items-center justify-center">
                      <Check className="w-6 h-6 text-yellow-300 drop-shadow" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. GIF AVATAR (SVIP6) MODAL */}
      {/* ========================================================================= */}
      {showGifAvatarModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-3">
          <div className="w-full max-w-sm rounded-3xl bg-[#1e1e24] border-2 border-yellow-400/70 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <h3 className="font-black text-base text-yellow-300">SVIP6 Gif Avatars</h3>
              </div>
              <button 
                onClick={() => setShowGifAvatarModal(false)}
                className="w-7 h-7 rounded-full bg-black/40 text-gray-300 hover:text-white flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-600/30 to-yellow-500/30 border border-yellow-400/40 text-xs text-amber-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-300 shrink-0" />
              <span>Exclusive animated loop avatars unlocked for your VIP tier!</span>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
              {[
                { title: 'Neon Dragon', preview: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=80', effect: 'Sparkle Neon' },
                { title: 'Golden Wings', preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&auto=format&fit=crop&q=80', effect: 'Golden Halo' },
                { title: 'Cyber Pulse', preview: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=300&auto=format&fit=crop&q=80', effect: 'Pulse Ring' },
                { title: 'Royal Star', preview: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=80', effect: 'Crown Glow' },
              ].map((gifItem, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectPresetAvatar(gifItem.preview)}
                  className="p-2.5 rounded-2xl bg-black/60 border border-yellow-400/40 hover:border-yellow-300 cursor-pointer text-center group transition"
                >
                  <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-yellow-400 group-hover:scale-105 transition-transform relative">
                    <img src={gifItem.preview} alt={gifItem.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 ring-2 ring-yellow-300 ring-offset-1 rounded-full animate-pulse" />
                  </div>
                  <span className="text-xs font-bold text-white mt-1.5 block">{gifItem.title}</span>
                  <span className="text-[10px] text-yellow-400 font-medium block">{gifItem.effect}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. MODALS FOR EDITING TEXT FIELDS */}
      {/* ========================================================================= */}
      {editingField && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#2a1708] to-[#120803] border-2 border-yellow-400/80 p-5 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
              <h3 className="font-extrabold text-base text-yellow-300 capitalize">
                Edit {editingField === 'declaration' ? 'Friends Declaration' : editingField}
              </h3>
              <button 
                onClick={() => setEditingField(null)}
                className="w-7 h-7 rounded-full bg-black/40 text-amber-200 hover:text-white flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {editingField === 'username' && (
              <div className="space-y-3">
                <p className="text-xs text-amber-200/70">Enter your new display name:</p>
                <input
                  type="text"
                  value={tempInput}
                  onChange={(e) => setTempInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-yellow-400/50 text-white font-medium text-sm focus:outline-none focus:border-yellow-300"
                  placeholder="Username..."
                />
                <button
                  onClick={handleSaveField}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-yellow-300 to-amber-500 text-amber-950 font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 cursor-pointer"
                >
                  Save Username
                </button>
              </div>
            )}

            {editingField === 'gender' && (
              <div className="space-y-3">
                <p className="text-xs text-amber-200/70">Select your gender:</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setGender('Male');
                      setEditingField(null);
                      onUpdateProfile({ name: username, avatar, gender: 'Male', birthday, bio: declaration });
                    }}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition cursor-pointer ${
                      gender === 'Male'
                        ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200 shadow-md'
                        : 'bg-black/40 border-white/10 text-gray-300 hover:border-cyan-400/50'
                    }`}
                  >
                    <span className="text-2xl">♂</span>
                    <span className="font-bold text-xs">Male</span>
                  </button>

                  <button
                    onClick={() => {
                      setGender('Female');
                      setEditingField(null);
                      onUpdateProfile({ name: username, avatar, gender: 'Female', birthday, bio: declaration });
                    }}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition cursor-pointer ${
                      gender === 'Female'
                        ? 'bg-rose-950/60 border-pink-400 text-pink-200 shadow-md'
                        : 'bg-black/40 border-white/10 text-gray-300 hover:border-pink-400/50'
                    }`}
                  >
                    <span className="text-2xl">♀</span>
                    <span className="font-bold text-xs">Female</span>
                  </button>
                </div>
              </div>
            )}

            {editingField === 'birthday' && (
              <div className="space-y-3">
                <p className="text-xs text-amber-200/70">Select your birthday date:</p>
                <input
                  type="date"
                  value={tempInput}
                  onChange={(e) => setTempInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-yellow-400/50 text-white font-medium text-sm focus:outline-none focus:border-yellow-300"
                />
                <button
                  onClick={handleSaveField}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-yellow-300 to-amber-500 text-amber-950 font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 cursor-pointer"
                >
                  Save Birthday
                </button>
              </div>
            )}

            {editingField === 'declaration' && (
              <div className="space-y-3">
                <p className="text-xs text-amber-200/70">Write your personal status / declaration:</p>
                <textarea
                  rows={3}
                  value={tempInput}
                  onChange={(e) => setTempInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-yellow-400/50 text-white text-xs focus:outline-none focus:border-yellow-300 resize-none"
                  placeholder="Welcome to my profile, let's voice party together..."
                />
                <button
                  onClick={handleSaveField}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-yellow-300 to-amber-500 text-amber-950 font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 cursor-pointer"
                >
                  Save Declaration
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
