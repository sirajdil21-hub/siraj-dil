import React, { useEffect, useRef } from "react";

interface TerminalCardProps {
  logs: { id: string; text: string; sender: "user" | "anam" | "system" }[];
  onClear?: () => void;
}

export default function TerminalCard({ logs, onClear }: TerminalCardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="relative border border-[#00f0ff]/40 rounded-sm bg-[#04101b]/90 p-2 sm:p-2.5 flex flex-col gap-1 shadow-[0_0_15px_rgba(0,240,255,0.12)]">
      {/* Header matching image: TERMINAL ... x */}
      <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-1">
        <span className="text-[11px] font-black tracking-widest text-[#00f0ff] uppercase">
          TERMINAL
        </span>
        <div className="flex items-center gap-2 text-[10px] text-[#00f0ff]/60 font-bold">
          <span>...</span>
          <button
            onClick={onClear}
            className="hover:text-[#ff003c] transition-colors cursor-pointer"
            title="Clear Terminal"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Terminal Text Area */}
      <div
        ref={containerRef}
        className="w-full h-[75px] sm:h-[85px] bg-black/70 rounded p-1.5 overflow-y-auto text-[8.5px] font-mono leading-relaxed space-y-1 scrollbar-thin scrollbar-thumb-[#00f0ff]/40"
      >
        <div className="text-[#00f0ff]/90">&gt; PAKISTAN DOPPLER WEATHER RADAR: ONLINE</div>
        <div className="text-white/80">&gt; MONSOON SURGE TRACK: 26.4 mm/hr (ISB/PUNJAB)</div>
        <div className="text-[#00ff88]">&gt; SATELLITE TELEMETRY (PKT): 100% NOMINAL</div>
        <div className="text-[#ffd700]">&gt; ANAM AI ASSISTANT: READY SIRAJ</div>

        {logs.map((log) => (
          <div
            key={log.id}
            className={
              log.sender === "user"
                ? "text-[#ffd700]"
                : log.sender === "anam"
                ? "text-[#00f0ff]"
                : "text-white/70"
            }
          >
            &gt; {log.text.slice(0, 80)}
            {log.text.length > 80 ? "..." : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
