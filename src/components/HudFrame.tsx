import React from "react";

interface HudFrameProps {
  children: React.ReactNode;
}

export default function HudFrame({ children }: HudFrameProps) {
  return (
    <div className="relative w-full h-screen min-h-[640px] max-h-screen bg-[#030911] text-[#00f0ff] font-mono flex flex-col justify-between p-2 sm:p-4 md:p-5 overflow-hidden select-none">
      {/* Background Subtle Tech Grid & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.06)_0%,rgba(3,9,17,0.95)_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

      {/* Top Outer HUD Border & Tech Vents */}
      <div className="relative w-full flex items-center justify-between pointer-events-none z-20 shrink-0">
        {/* Top Left Angle Bracket */}
        <div className="flex items-center gap-1">
          <div className="w-8 sm:w-16 h-[2px] bg-[#00f0ff]/60" />
          <div className="w-3 h-3 border-t-2 border-l-2 border-[#00f0ff]" />
          <div className="w-12 sm:w-28 h-[2px] bg-[#00f0ff]/30" />
        </div>

        {/* Top Center Vents */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <span className="w-3 sm:w-5 h-1.5 border border-[#00f0ff]/50 bg-[#00f0ff]/10 transform skew-x-[-20deg]" />
            <span className="w-3 sm:w-5 h-1.5 border border-[#00f0ff]/50 bg-[#00f0ff]/10 transform skew-x-[-20deg]" />
            <span className="w-3 sm:w-5 h-1.5 border border-[#00f0ff]/50 bg-[#00f0ff]/10 transform skew-x-[-20deg]" />
            <span className="w-3 sm:w-5 h-1.5 border border-[#00f0ff]/50 bg-[#00f0ff]/10 transform skew-x-[-20deg]" />
          </div>
          <div className="text-[10px] tracking-[0.22em] text-[#00f0ff]/80 uppercase hidden sm:block font-bold">
            ANAM SYS // PAKISTAN TELEMETRY (PKT)
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 sm:w-5 h-1.5 border border-[#00f0ff]/50 bg-[#00f0ff]/10 transform skew-x-[20deg]" />
            <span className="w-3 sm:w-5 h-1.5 border border-[#00f0ff]/50 bg-[#00f0ff]/10 transform skew-x-[20deg]" />
            <span className="w-3 sm:w-5 h-1.5 border border-[#00f0ff]/50 bg-[#00f0ff]/10 transform skew-x-[20deg]" />
            <span className="w-3 sm:w-5 h-1.5 border border-[#00f0ff]/50 bg-[#00f0ff]/10 transform skew-x-[20deg]" />
          </div>
        </div>

        {/* Top Right Angle Bracket */}
        <div className="flex items-center gap-1">
          <div className="w-12 sm:w-28 h-[2px] bg-[#00f0ff]/30" />
          <div className="w-3 h-3 border-t-2 border-r-2 border-[#00f0ff]" />
          <div className="w-8 sm:w-16 h-[2px] bg-[#00f0ff]/60" />
        </div>
      </div>

      {/* Main Inner Content Area Surrounded by Outer Border Frame */}
      <div className="relative flex-1 w-full border border-[#00f0ff]/25 rounded-md my-1 p-2 sm:p-3 md:p-4 flex flex-col overflow-hidden bg-[#040e17]/85 backdrop-blur-md shadow-[inset_0_0_40px_rgba(0,240,255,0.06)]">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00f0ff] pointer-events-none" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00f0ff] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00f0ff] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00f0ff] pointer-events-none" />

        {/* Left Side Ticks */}
        <div className="absolute left-1 top-1/2 -translate-y-1/2 flex flex-col gap-2 pointer-events-none hidden md:flex">
          <span className="w-1 h-4 bg-[#00f0ff]/40 transform skew-y-12" />
          <span className="w-1 h-4 bg-[#00f0ff]/40 transform skew-y-12" />
          <span className="w-1 h-4 bg-[#00f0ff]/40 transform skew-y-12" />
        </div>

        {/* Right Side Ticks */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col gap-2 pointer-events-none hidden md:flex">
          <span className="w-1 h-4 bg-[#00f0ff]/40 transform -skew-y-12" />
          <span className="w-1 h-4 bg-[#00f0ff]/40 transform -skew-y-12" />
          <span className="w-1 h-4 bg-[#00f0ff]/40 transform -skew-y-12" />
        </div>

        {children}
      </div>

      {/* Bottom Outer HUD Border */}
      <div className="relative w-full flex items-center justify-between pointer-events-none z-20 shrink-0">
        <div className="flex items-center gap-1">
          <div className="w-8 sm:w-16 h-[2px] bg-[#00f0ff]/60" />
          <div className="w-3 h-3 border-b-2 border-l-2 border-[#00f0ff]" />
          <div className="w-12 sm:w-28 h-[2px] bg-[#00f0ff]/30" />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
          <span className="text-[9px] tracking-widest text-[#00f0ff]/80">ANAM AI // PAKISTAN LIVE RADAR & PROTOCOL</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-12 sm:w-28 h-[2px] bg-[#00f0ff]/30" />
          <div className="w-3 h-3 border-b-2 border-r-2 border-[#00f0ff]" />
          <div className="w-8 sm:w-16 h-[2px] bg-[#00f0ff]/60" />
        </div>
      </div>
    </div>
  );
}
