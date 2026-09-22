import React from 'react';

export function GoogleIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.57l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

export function SnapchatIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`${className} bg-[#FFFC00] rounded-xl flex items-center justify-center p-1 shadow-sm`}>
      <svg viewBox="0 0 24 24" className="w-full h-full fill-black stroke-black stroke-[0.8]" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
          d="M12 3.5c-3.1 0-5 2.1-5 4.5 0 .8.2 1.7.3 2.1-.4.1-.9.2-1.3.4-.4.2-.7.5-.7.9 0 .6.6.9 1.1.9.4 0 .9-.1 1.4-.2.1.8.6 1.8 1.4 2.3-.6.5-1.5.8-2.2 1.1-.6.2-.9.6-.9 1 0 .6.7 1 1.6 1 .5 0 1.1-.1 1.7-.3-.1.4-.1.8 0 1.1.2.6.9.7 1.6.5.6-.2 1.3-.6 2-.6.7 0 1.4.4 2 .6.7.2 1.4.1 1.6-.5.1-.3.1-.7 0-1.1.6.2 1.2.3 1.7.3.9 0 1.6-.4 1.6-1 0-.4-.3-.8-.9-1-.7-.3-1.6-.6-2.2-1.1.8-.5 1.3-1.5 1.4-2.3.5.1 1 .2 1.4.2.5 0 1.1-.3 1.1-.9 0-.4-.3-.7-.7-.9-.4-.2-.9-.3-1.3-.4.1-.4.3-1.3.3-2.1 0-2.4-1.9-4.5-5-4.5z"
        />
      </svg>
    </div>
  );
}

export function XTwitterIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`${className} bg-black rounded-full flex items-center justify-center p-1.5 shadow-sm`}>
      <svg viewBox="0 0 24 24" className="w-full h-full fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </div>
  );
}
