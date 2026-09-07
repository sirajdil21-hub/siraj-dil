import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Folder,
  Globe,
  FileText,
  Sliders,
  Download,
  Zap,
  Film,
  GraduationCap,
  Music,
  Settings,
} from "lucide-react";
import { cyberSynth } from "../utils/audioUtils";

interface IronManRedCenterpieceProps {
  state: "idle" | "listening" | "processing" | "speaking";
  onNodeClick?: (label: string) => void;
}

const LAUNCHER_NODES = [
  { id: "comp", label: "Computer", icon: Folder, angle: -140, color: "#ff003c" },
  { id: "net", label: "Network", icon: Globe, angle: -40, color: "#ff003c" },
  { id: "doc", label: "Documents", icon: FileText, angle: -160, color: "#ff003c" },
  { id: "cp", label: "Control Panel", icon: Sliders, angle: -20, color: "#ff003c" },
  { id: "dl", label: "Downloads", icon: Download, angle: -175, color: "#ff003c" },
  { id: "gb", label: "Game Booster", icon: Zap, angle: -5, color: "#ff003c" },
  { id: "mov", label: "Movies", icon: Film, angle: 165, color: "#ff003c" },
  { id: "the", label: "THESIS", icon: GraduationCap, angle: 15, color: "#ff003c" },
  { id: "mus", label: "Music", icon: Music, angle: 140, color: "#ff003c" },
  { id: "set", label: "Settings", icon: Settings, angle: 40, color: "#ff003c" },
];

export default function IronManRedCenterpiece({
  state,
  onNodeClick,
}: IronManRedCenterpieceProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const isSpeaking = state === "speaking";
  const isListening = state === "listening";

  const handleNodeSelect = (label: string) => {
    cyberSynth.playBeep(950, 0.05);
    setActiveNode(label);
    if (onNodeClick) onNodeClick(label);
    setTimeout(() => setActiveNode(null), 1200);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Background Holographic Red Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,0,60,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,0,60,0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Iron Man Armor & Helmet Centerpiece */}
      <div className="relative w-[280px] sm:w-[320px] h-[220px] sm:h-[250px] flex items-center justify-center">
        {/* Glow halo behind helmet */}
        <motion.div
          animate={{
            scale: isSpeaking ? [1, 1.12, 1] : isListening ? [1, 1.06, 1] : 1,
            opacity: isSpeaking ? [0.4, 0.75, 0.4] : 0.35,
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute w-[240px] h-[240px] rounded-full bg-[#ff003c] blur-3xl pointer-events-none"
        />

        {/* Vector Symmetrical Iron Man Mark VII Mask with Glowing Eyes */}
        <svg
          viewBox="0 0 300 260"
          className="w-full h-full drop-shadow-[0_0_25px_rgba(255,0,60,0.8)]"
        >
          <defs>
            <linearGradient id="redArmorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff1a40" />
              <stop offset="40%" stopColor="#b30024" />
              <stop offset="100%" stopColor="#4a000d" />
            </linearGradient>

            <linearGradient id="goldPlateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#805b00" />
            </linearGradient>

            <linearGradient id="eyeGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#ffb3c1" />
              <stop offset="100%" stopColor="#ff003c" />
            </linearGradient>

            <filter id="eyeNeonGlow">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Armor Shoulders & Trapezoids */}
          <polygon
            points="20,240 65,190 110,210 150,225 190,210 235,190 280,240 240,260 60,260"
            fill="url(#redArmorGrad)"
            stroke="#ff003c"
            strokeWidth="2"
          />

          {/* Neck Gasket & Tech Lines */}
          <path
            d="M 120,180 L 120,215 M 150,180 L 150,225 M 180,180 L 180,215"
            stroke="#ff003c"
            strokeWidth="2.5"
            strokeOpacity="0.8"
          />
          <polygon
            points="115,185 150,205 185,185 175,175 125,175"
            fill="#200007"
            stroke="#ff003c"
            strokeWidth="1.5"
          />

          {/* Helmet Outer Skull Dome */}
          <path
            d="M 75,110 C 75,40 100,15 150,15 C 200,15 225,40 225,110 C 225,150 205,185 150,185 C 95,185 75,150 75,110 Z"
            fill="url(#redArmorGrad)"
            stroke="#ff003c"
            strokeWidth="2.5"
          />

          {/* Outer Ear pods */}
          <polygon
            points="65,95 75,90 75,130 65,125"
            fill="#80001a"
            stroke="#ff003c"
            strokeWidth="1.5"
          />
          <polygon
            points="235,95 225,90 225,130 235,125"
            fill="#80001a"
            stroke="#ff003c"
            strokeWidth="1.5"
          />

          {/* Faceplate Mask (Gold / Red Contour) */}
          <path
            d="M 98,68 L 150,60 L 202,68 L 210,115 L 195,135 L 180,165 L 150,172 L 120,165 L 105,135 L 90,115 Z"
            fill="#180105"
            stroke="#ff003c"
            strokeWidth="2"
          />

          {/* Forehead Ridge */}
          <polygon
            points="115,45 150,38 185,45 178,62 122,62"
            fill="#a30022"
            stroke="#ff003c"
            strokeWidth="1.5"
          />

          {/* Cheek Armor Insets */}
          <polygon
            points="95,100 115,100 110,135 93,125"
            fill="#660014"
            stroke="#ff003c"
            strokeWidth="1.2"
          />
          <polygon
            points="205,100 185,100 190,135 207,125"
            fill="#660014"
            stroke="#ff003c"
            strokeWidth="1.2"
          />

          {/* Jaw / Mouth Slit */}
          <polygon
            points="128,145 172,145 165,160 135,160"
            fill="#080002"
            stroke="#ff003c"
            strokeWidth="1.5"
          />
          <line
            x1="140"
            y1="152"
            x2="160"
            y2="152"
            stroke="#ff3366"
            strokeWidth="2"
          />

          {/* Left Eye Slit (Glowing White / Red Neon) */}
          <polygon
            points="106,92 138,98 135,105 110,102"
            fill="url(#eyeGlowGrad)"
            filter="url(#eyeNeonGlow)"
          />
          <polygon
            points="109,94 135,99 133,103 112,101"
            fill="#ffffff"
          />

          {/* Right Eye Slit (Glowing White / Red Neon) */}
          <polygon
            points="194,92 162,98 165,105 190,102"
            fill="url(#eyeGlowGrad)"
            filter="url(#eyeNeonGlow)"
          />
          <polygon
            points="191,94 165,99 167,103 188,101"
            fill="#ffffff"
          />

          {/* HUD Target Lock Lines around eyes */}
          <circle
            cx="150"
            cy="100"
            r="65"
            fill="none"
            stroke="#ff003c"
            strokeWidth="0.8"
            strokeDasharray="4 6"
            strokeOpacity="0.6"
          />
        </svg>

        {/* Dynamic Voice Status Badge under mask */}
        <div className="absolute bottom-1 px-3 py-0.5 rounded-full bg-black/80 border border-[#ff003c] text-[8px] font-mono tracking-widest text-[#ff3366] flex items-center gap-1.5 shadow-[0_0_10px_#ff003c]">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isSpeaking
                ? "bg-[#ffffff] animate-ping"
                : isListening
                ? "bg-[#ffcc00] animate-bounce"
                : "bg-[#ff003c]"
            }`}
          />
          <span>{isSpeaking ? "JARVIS / ANAM: SPEAKING" : isListening ? "LISTENING (SIRAJ)" : "MARK VII ONLINE"}</span>
        </div>
      </div>

      {/* Bottom Center: Arc Reactor & Multi-Node Menu Launcher (Matching photo) */}
      <div className="relative w-[340px] sm:w-[420px] h-[210px] sm:h-[230px] flex items-center justify-center">
        {/* Radiating Concentric Rings matching photo */}
        <div className="absolute w-[160px] h-[160px] rounded-full border border-[#ff003c]/40 flex items-center justify-center pointer-events-none">
          <div className="w-[125px] h-[125px] rounded-full border border-[#ff003c]/60 border-dashed animate-[spin_20s_linear_infinite]" />
          <div className="absolute w-[95px] h-[95px] rounded-full border border-[#ff003c]/80 flex items-center justify-center">
            <div className="w-[70px] h-[70px] rounded-full border border-[#ff6600]/80 border-t-transparent animate-[spin_10s_linear_infinite_reverse]" />
          </div>
        </div>

        {/* Central Glowing Arc Reactor Core */}
        <motion.div
          animate={{
            scale: isSpeaking ? [1, 1.15, 1] : [1, 1.05, 1],
            boxShadow: isSpeaking
              ? "0 0 35px #ff003c, inset 0 0 20px #ffffff"
              : "0 0 20px #ff003c, inset 0 0 10px #ff6600",
          }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#ffffff] via-[#ff1a40] to-[#660012] border-2 border-white flex items-center justify-center cursor-pointer"
          onClick={() => handleNodeSelect("Jarvis Voice")}
          title="Central Arc Core"
        >
          {/* Inner turbine segments */}
          <div className="w-10 h-10 rounded-full border-2 border-[#1a0005] bg-black/40 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_12px_#ffffff]" />
          </div>
        </motion.div>

        {/* Left & Right Fan of 10 System Nodes (Computer, Network, Documents, Control Panel, etc.) */}
        <div className="absolute inset-0 flex items-center justify-between pointer-events-auto px-2 sm:px-4">
          {/* Left Column of Nodes: Computer, Documents, Downloads, Movies, Music */}
          <div className="flex flex-col gap-1.5 items-start">
            {LAUNCHER_NODES.slice(0, 5).map((node) => {
              const Icon = node.icon;
              const isSel = activeNode === node.label;
              return (
                <motion.button
                  key={node.id}
                  whileHover={{ scale: 1.08, x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNodeSelect(node.label)}
                  className={`flex items-center gap-2 px-2.5 py-1 rounded border transition-all cursor-pointer font-mono text-[10px] tracking-wider uppercase backdrop-blur-sm ${
                    isSel
                      ? "bg-[#ff003c] text-white border-white shadow-[0_0_15px_#ff003c]"
                      : "bg-[#180206]/85 border-[#ff003c]/60 text-white/90 hover:border-white hover:text-white hover:bg-[#ff003c]/30"
                  }`}
                >
                  <Icon size={12} className="text-[#ff3366]" />
                  <span className="font-bold">{node.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Column of Nodes: Network, Control Panel, Game Booster, THESIS, Settings */}
          <div className="flex flex-col gap-1.5 items-end">
            {LAUNCHER_NODES.slice(5).map((node) => {
              const Icon = node.icon;
              const isSel = activeNode === node.label;
              return (
                <motion.button
                  key={node.id}
                  whileHover={{ scale: 1.08, x: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNodeSelect(node.label)}
                  className={`flex items-center gap-2 px-2.5 py-1 rounded border transition-all cursor-pointer font-mono text-[10px] tracking-wider uppercase backdrop-blur-sm ${
                    isSel
                      ? "bg-[#ff003c] text-white border-white shadow-[0_0_15px_#ff003c]"
                      : "bg-[#180206]/85 border-[#ff003c]/60 text-white/90 hover:border-white hover:text-white hover:bg-[#ff003c]/30"
                  }`}
                >
                  <span className="font-bold">{node.label}</span>
                  <Icon size={12} className="text-[#ff3366]" />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Bottom Red Angle Bracket pointer (matching photo) */}
        <div className="absolute bottom-0 text-center flex flex-col items-center">
          <span className="text-[7.5px] font-mono text-[#ff3366] tracking-widest uppercase">
            MASTER ARC PROTOCOL // ADMIN: SIRAJ
          </span>
          <span className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#ff003c] to-transparent mt-0.5" />
        </div>
      </div>
    </div>
  );
}
