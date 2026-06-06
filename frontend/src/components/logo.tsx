import React from "react";

export function KogniteLogo({ className = "", showText = true }: { className?: string, showText?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Kognite Graphic Icon */}
      <svg 
        width="40" 
        height="40" 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="shrink-0 drop-shadow-[0_0_15px_rgba(220,199,161,0.3)]"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5EBD7" />
            <stop offset="0.5" stopColor="#E8D8B9" />
            <stop offset="1" stopColor="#DCC7A1" />
          </linearGradient>
          <linearGradient id="goldGradientDark" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#DCC7A1" />
            <stop offset="1" stopColor="#A89269" />
          </linearGradient>
        </defs>

        {/* Network Lines */}
        <path d="M45 50L25 25M45 50L15 50M45 50L25 75M25 25L15 50L25 75" stroke="url(#goldGradientDark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Network Nodes */}
        <circle cx="25" cy="25" r="5" fill="url(#goldGradient)" />
        <circle cx="15" cy="50" r="4" fill="url(#goldGradient)" />
        <circle cx="25" cy="75" r="5" fill="url(#goldGradient)" />
        
        {/* Central Core */}
        <circle cx="45" cy="50" r="7" fill="#FFF" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />

        {/* Right Sweeping K-Shapes */}
        <path d="M48 45C60 30 70 20 90 20C90 35 75 45 55 50L48 45Z" fill="url(#goldGradient)" />
        <path d="M48 55C60 70 70 80 90 80C90 65 75 55 55 50L48 55Z" fill="url(#goldGradientDark)" />
      </svg>

      {/* Kognite Text */}
      {showText && (
        <span 
          className="font-bold text-[26px] tracking-[0.25em] text-white" 
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          KOGNIT<span className="text-[#DCC7A1]">E</span>
        </span>
      )}
    </div>
  );
}
