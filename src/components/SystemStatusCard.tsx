import React, { useEffect, useState } from "react";

export default function SystemStatusCard() {
  const [cpuHistory, setCpuHistory] = useState<number[]>([
    20, 35, 75, 40, 25, 60, 30, 85, 45, 30, 55, 70, 40, 65, 35, 90, 45, 60, 30,
  ]);
  const [netHistory, setNetHistory] = useState<number[]>([
    10, 15, 12, 18, 14, 22, 60, 45, 80, 50, 65, 30, 20, 15, 10,
  ]);
  const [cpuMs, setCpuMs] = useState(15);
  const [ramUsage, setRamUsage] = useState(24.33);
  const [netUsage, setNetUsage] = useState(0.96);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuHistory((prev) => {
        const nextVal = Math.floor(Math.random() * 65) + 20;
        return [...prev.slice(1), nextVal];
      });
      setNetHistory((prev) => {
        const nextVal = Math.floor(Math.random() * 70) + 10;
        return [...prev.slice(1), nextVal];
      });
      setCpuMs(Math.floor(Math.random() * 6) + 13);
      setNetUsage(parseFloat((Math.random() * 0.4 + 0.8).toFixed(2)));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Build SVG path for CPU wave
  const cpuPoints = cpuHistory
    .map((val, idx) => {
      const x = (idx / (cpuHistory.length - 1)) * 200;
      const y = 35 - (val / 100) * 30;
      return `${x},${y}`;
    })
    .join(" ");

  // Build SVG path for Net wave
  const netPoints = netHistory
    .map((val, idx) => {
      const x = (idx / (netHistory.length - 1)) * 200;
      const y = 32 - (val / 100) * 28;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative border border-[#00f0ff]/40 rounded-sm bg-[#04101b]/90 p-2 sm:p-2.5 flex flex-col gap-2 shadow-[0_0_15px_rgba(0,240,255,0.12)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-1">
        <span className="text-[11px] font-black tracking-widest text-[#00f0ff] uppercase">
          SYSTEM STATUS
        </span>
        <span className="text-[10px] text-[#00f0ff]/60 tracking-widest font-bold">
          ...
        </span>
      </div>

      {/* CPU Section */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between text-[9.5px]">
          <span className="text-white/80 font-bold">CPU</span>
          <span className="text-[#00f0ff] font-semibold">{cpuMs} ms time</span>
        </div>
        <div className="w-full h-9 bg-black/60 rounded border border-[#00f0ff]/20 relative overflow-hidden flex items-end">
          <svg className="w-full h-full" viewBox="0 0 200 35" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="#00f0ff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={cpuPoints}
            />
            <polygon
              fill="rgba(0, 240, 255, 0.15)"
              points={`0,35 ${cpuPoints} 200,35`}
            />
          </svg>
        </div>
      </div>

      {/* RAM Section */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between text-[9.5px]">
          <span className="text-white/80 font-bold">RAM</span>
          <span className="text-[#00ff88] font-semibold">{ramUsage} RAM</span>
        </div>
        <div className="w-full h-7 bg-black/60 rounded border border-[#00f0ff]/20 relative overflow-hidden flex items-center p-1">
          {/* Plateau green graph */}
          <div className="w-full h-full relative flex items-end">
            <div className="w-[30%] h-[35%] bg-[#00ff88]/30 border-t-2 border-[#00ff88]" />
            <div className="w-[15%] h-[75%] bg-[#00ff88]/30 border-t-2 border-[#00ff88]" />
            <div className="w-[35%] h-[35%] bg-[#00ff88]/30 border-t-2 border-[#00ff88]" />
            <div className="w-[20%] h-[70%] bg-[#00ff88]/30 border-t-2 border-[#00ff88]" />
          </div>
        </div>
      </div>

      {/* NETWORK Section */}
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between text-[9.5px]">
          <span className="text-white/80 font-bold">NETWORK</span>
          <span className="text-[#00f0ff] font-semibold">{netUsage} usage</span>
        </div>
        <div className="w-full h-9 bg-black/60 rounded border border-[#00f0ff]/20 relative overflow-hidden flex items-end">
          <svg className="w-full h-full" viewBox="0 0 200 32" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke="#00f0ff"
              strokeWidth="1.6"
              strokeLinecap="round"
              points={netPoints}
            />
            <polygon
              fill="rgba(0, 240, 255, 0.2)"
              points={`0,32 ${netPoints} 200,32`}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
