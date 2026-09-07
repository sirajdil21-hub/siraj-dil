import React from "react";
import { Mic, Wrench, Lock, ShieldCheck } from "lucide-react";

interface QuickActionsCardProps {
  isVoiceActive: boolean;
  onToggleVoice: () => void;
  onDiagnostics: () => void;
  onSecurity: () => void;
  onVerification: () => void;
}

export default function QuickActionsCard({
  isVoiceActive,
  onToggleVoice,
  onDiagnostics,
  onSecurity,
  onVerification,
}: QuickActionsCardProps) {
  return (
    <div className="relative border border-[#00f0ff]/40 rounded-sm bg-[#04101b]/90 p-2 sm:p-2.5 flex flex-col gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.12)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-1">
        <span className="text-[11px] font-black tracking-widest text-[#00f0ff] uppercase">
          QUICK ACTIONS
        </span>
        <span className="text-[10px] text-[#00f0ff]/60 tracking-widest font-bold">
          ...
        </span>
      </div>

      {/* 2x2 Grid of Actions matching screenshot */}
      <div className="grid grid-cols-2 gap-1.5 pt-0.5">
        {/* 1. Voice Mode */}
        <button
          onClick={onToggleVoice}
          className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded border transition-all cursor-pointer ${
            isVoiceActive
              ? "bg-[#00f0ff]/25 border-[#00f0ff] text-white shadow-[0_0_15px_rgba(0,240,255,0.5)]"
              : "bg-black/60 border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/15 hover:border-[#00f0ff]"
          }`}
        >
          <Mic size={18} className={isVoiceActive ? "animate-bounce text-[#ffd700]" : ""} />
          <span className="text-[9px] font-bold mt-1 text-center leading-tight">
            Voice Mode
          </span>
        </button>

        {/* 2. System Diagnostics */}
        <button
          onClick={onDiagnostics}
          className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded border border-[#00f0ff]/30 bg-black/60 text-[#00f0ff] hover:bg-[#00f0ff]/15 hover:border-[#00f0ff] transition-all cursor-pointer"
        >
          <Wrench size={18} />
          <span className="text-[9px] font-bold mt-1 text-center leading-tight">
            System Diagnostics
          </span>
        </button>

        {/* 3. Security Protocol */}
        <button
          onClick={onSecurity}
          className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded border border-[#00f0ff]/30 bg-black/60 text-[#00f0ff] hover:bg-[#00f0ff]/15 hover:border-[#00f0ff] transition-all cursor-pointer"
        >
          <Lock size={18} />
          <span className="text-[9px] font-bold mt-1 text-center leading-tight">
            Security Protocol
          </span>
        </button>

        {/* 4. Security Verification / Shield */}
        <button
          onClick={onVerification}
          className="flex flex-col items-center justify-center p-1.5 sm:p-2 rounded border border-[#00f0ff]/30 bg-black/60 text-[#00f0ff] hover:bg-[#00f0ff]/15 hover:border-[#00f0ff] transition-all cursor-pointer"
        >
          <ShieldCheck size={18} />
          <span className="text-[9px] font-bold mt-1 text-center leading-tight">
            Security Check
          </span>
        </button>
      </div>
    </div>
  );
}
