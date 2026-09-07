import React from "react";
import { motion } from "motion/react";
import brainImg from "../assets/images/ai_neural_brain_nodes_1788017329641.jpg";

interface AiCoreStatusCardProps {
  activityLevel?: number;
}

export default function AiCoreStatusCard({ activityLevel = 1 }: AiCoreStatusCardProps) {
  return (
    <div className="relative border border-[#00f0ff]/40 rounded-sm bg-[#04101b]/90 p-2 sm:p-2.5 flex flex-col gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.12)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-1">
        <span className="text-[11px] font-black tracking-widest text-[#00f0ff] uppercase">
          A.I. CORE STATUS
        </span>
        <span className="text-[10px] text-[#00f0ff]/60 tracking-widest font-bold">
          ...
        </span>
      </div>

      {/* Subheader */}
      <div className="flex items-center justify-between text-[9px] text-white/70">
        <span>Activity nodes</span>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-[1px] bg-[#00f0ff]/40" />
          <span className="text-[#00ff88]">Activity</span>
        </div>
      </div>

      {/* Holographic 3D Neural Brain Display */}
      <div className="relative w-full h-[95px] sm:h-[110px] rounded bg-black/60 border border-[#00f0ff]/20 overflow-hidden flex items-center justify-center p-1">
        <img
          src={brainImg}
          alt="AI Brain Nodes"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain filter contrast-125 brightness-110"
        />

        {/* Dynamic Glowing Synaptic Nodes on top of the brain */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="absolute top-[32%] left-[45%] w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88]"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }}
          className="absolute top-[48%] left-[30%] w-1.5 h-1.5 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]"
        />
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: 0.8 }}
          className="absolute top-[55%] right-[38%] w-2 h-2 rounded-full bg-[#ffd700] shadow-[0_0_8px_#ffd700]"
        />
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.2 }}
          className="absolute top-[28%] right-[32%] w-1.5 h-1.5 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88]"
        />

        {/* Scan beam */}
        <motion.div
          animate={{ y: [-45, 45] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/80 to-transparent"
        />
      </div>

      {/* Bottom Telemetry Metrics matching image */}
      <div className="flex items-end justify-between text-[9px] font-mono leading-tight pt-0.5">
        <div className="flex flex-col text-white/70">
          <div>Activity nodes: <span className="text-[#00ff88] font-bold">{activityLevel}</span></div>
          <div>AI Parameter: <span className="text-[#00f0ff]">3.2</span></div>
          <div>AI Parameters: <span className="text-white/90">0/8</span></div>
          <div>AI Parameters: <span className="text-[#ffd700]">22%</span></div>
        </div>
        <div className="text-[9px] text-[#00ff88] tracking-widest font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
          ACTIVE
        </div>
      </div>
    </div>
  );
}
