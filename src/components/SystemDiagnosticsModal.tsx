import React, { useState } from "react";
import { Cpu, ShieldCheck, Activity, Wifi, Zap, X, Server, RefreshCw, Flame, Gauge } from "lucide-react";
import { motion } from "motion/react";
import { cyberSynth } from "../utils/audioUtils";

interface DiagnosticsProps {
  onClose: () => void;
}

export default function SystemDiagnosticsModal({ onClose }: DiagnosticsProps) {
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [latency, setLatency] = useState(0);

  const handleCalibrate = () => {
    setIsCalibrating(true);
    cyberSynth.playStartupSound();
    setTimeout(() => {
      setLatency(0);
      setIsCalibrating(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-2xl rounded-xl border-2 border-[#00f0ff] bg-[#020b14]/95 p-5 shadow-[0_0_50px_rgba(0,240,255,0.3)] text-[#00f0ff] space-y-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ff003c]/40 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="animate-pulse text-[#ff003c]" size={18} />
            <h2 className="text-sm font-bold tracking-widest text-white uppercase">
              MASTER AI // REAL-TIME SYSTEM & DEVICE DIAGNOSTICS
            </h2>
          </div>
          <button
            onClick={() => {
              cyberSynth.playBeep(500, 0.04);
              onClose();
            }}
            className="p-1 text-white/60 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Master Pilot & Suit Core Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded border border-[#ff003c]/50 bg-[#ff003c]/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[#ff3366] text-[10px] font-bold">SOLE ADMIN & CREATOR:</span>
              <span className="px-1.5 py-0.5 bg-[#ff003c]/20 text-[#ff003c] text-[10px] rounded font-bold">
                ROOT_ALPHA_CLEARANCE
              </span>
            </div>
            <p className="text-base font-bold text-white tracking-wider">SIRAJ (سراج)</p>
            <p className="text-[10px] text-[#ff6688] font-mono">
              Identity Protocol: MASTER-TACTICAL-ONLINE
            </p>
          </div>

          <div className="p-3 rounded border border-[#ff003c]/50 bg-[#120104] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[#ff3366] text-[10px] font-bold">MASTER CORE STATUS:</span>
              <Flame size={14} className="text-[#ff003c] animate-pulse" />
            </div>
            <p className="text-base font-bold text-white tracking-wider">ONLINE [100% OPTIMAL]</p>
            <p className="text-[10px] text-[#ff6688] font-mono">Male Voice Engine: 100% READY</p>
          </div>
        </div>

        {/* Real-time Hardware & Suit Telemetry */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded border border-[#00f0ff]/30 bg-black/70 text-center space-y-1">
            <Cpu size={16} className="mx-auto text-[#00f0ff]" />
            <p className="text-[10px] text-[#00f0ff]/70 font-bold">NEURAL HUD LOAD</p>
            <p className="text-base font-bold text-white">2.4%</p>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-[#00f0ff] h-full w-[12%]" />
            </div>
          </div>

          <div className="p-2.5 rounded border border-[#ffd700]/30 bg-black/70 text-center space-y-1">
            <Wifi size={16} className="mx-auto text-[#ffd700]" />
            <p className="text-[10px] text-[#ffd700]/70 font-bold">HUD LATENCY</p>
            <p className="text-base font-bold text-white">{latency} ms</p>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-[#ffd700] h-full w-[100%]" />
            </div>
          </div>

          <div className="p-2.5 rounded border border-[#ff003c]/30 bg-black/70 text-center space-y-1">
            <Gauge size={16} className="mx-auto text-[#ff003c]" />
            <p className="text-[10px] text-[#ff003c]/80 font-bold">HULL INTEGRITY</p>
            <p className="text-base font-bold text-white">100%</p>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-[#ff003c] h-full w-[100%]" />
            </div>
          </div>

          <div className="p-2.5 rounded border border-[#00f0ff]/30 bg-black/70 text-center space-y-1">
            <Zap size={16} className="mx-auto text-[#00f0ff]" />
            <p className="text-[10px] text-[#00f0ff]/70 font-bold">TACTICAL VOICE</p>
            <p className="text-base font-bold text-white">ZERO-LATENCY</p>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-[#00f0ff] h-full w-[100%]" />
            </div>
          </div>
        </div>

        {/* HUD Diagnostics Actions */}
        <div className="border-t border-[#00f0ff]/30 pt-3 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={handleCalibrate}
            disabled={isCalibrating}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#00f0ff]/20 hover:bg-[#00f0ff]/35 border border-[#00f0ff]/60 text-xs text-[#00f0ff] font-bold transition-all disabled:opacity-40 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          >
            <RefreshCw size={13} className={isCalibrating ? "animate-spin text-[#ffd700]" : ""} />
            <span>{isCalibrating ? "RE-CALIBRATING HUD SENSORS..." : "RE-CALIBRATE HUD TELEMETRY"}</span>
          </button>

          <span className="text-[10.5px] text-[#ffd700] font-bold">
            [SYSTEMS: OPTIMAL | LATENCY: 0ms]
          </span>
        </div>
      </motion.div>
    </div>
  );
}
