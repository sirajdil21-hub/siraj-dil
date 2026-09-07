import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArmorTheme } from "../types";
import { cyberSynth } from "../utils/audioUtils";

import ironMan0 from "../assets/ironman/System/IronMan0.png";
import ironMan1 from "../assets/ironman/System/IronMan1.png";
import ironMan2 from "../assets/ironman/System/IronMan2.png";
import inRingImg from "../assets/ironman/Time/inring.png";
import outRingImg from "../assets/ironman/Time/outring.png";

interface SuitHologramChamberProps {
  type: "top_radar" | "bottom_online";
  theme: ArmorTheme;
  onClick?: () => void;
}

const STANCES = [
  { img: ironMan0, name: "READY", title: "STANCE 1 // PATROL DEFENSE" },
  { img: ironMan1, name: "COMBAT", title: "STANCE 2 // REPULSOR BLAST" },
  { img: ironMan2, name: "HERO", title: "STANCE 3 // TACTICAL COMMAND" },
];

export default function SuitHologramChamber({
  type,
  theme,
  onClick,
}: SuitHologramChamberProps) {
  const isTop = type === "top_radar";
  const [stanceIdx, setStanceIdx] = useState(0);

  const color =
    theme === "combat"
      ? "#ff003c"
      : theme === "stealth"
      ? "#00ffaa"
      : isTop
      ? "#00ffcc"
      : "#00f0ff";

  const glowRgba =
    theme === "combat"
      ? "rgba(255, 0, 60, 0.4)"
      : theme === "stealth"
      ? "rgba(0, 255, 170, 0.4)"
      : "rgba(0, 240, 255, 0.45)";

  const currentStance = STANCES[stanceIdx];

  const handleContainerClick = () => {
    cyberSynth.playBeep(920 + stanceIdx * 120, 0.04);
    // Cycle stance on click
    setStanceIdx((prev) => (prev + 1) % STANCES.length);
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleContainerClick}
      className={`relative flex flex-col items-center justify-center select-none cursor-pointer group ${
        isTop ? "w-28 h-28 sm:w-32 sm:h-32" : "w-40 h-44 sm:w-44 sm:h-48"
      }`}
      title={isTop ? "Mark VII Tactical Radar (Click to Switch)" : "Mark VII Suit Chamber (Click to Change Stance)"}
    >
      {/* 1. Concentric Rotating Holographic Ring Graphics */}
      <motion.img
        src={outRingImg}
        alt="Outer Ring"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-40 mix-blend-screen"
        style={{
          filter: `drop-shadow(0 0 6px ${glowRgba}) hue-rotate(${
            theme === "combat" ? "130deg" : theme === "stealth" ? "260deg" : "0deg"
          })`,
        }}
      />

      <motion.img
        src={inRingImg}
        alt="Inner Ring"
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-contain pointer-events-none opacity-50 mix-blend-screen"
        style={{
          filter: `drop-shadow(0 0 4px ${glowRgba}) hue-rotate(${
            theme === "combat" ? "130deg" : theme === "stealth" ? "260deg" : "0deg"
          })`,
        }}
      />

      {/* 2. Soft Ambient Background Glow */}
      <div
        className="absolute w-24 h-28 rounded-full blur-xl opacity-20 pointer-events-none transition-colors"
        style={{ backgroundColor: color }}
      />

      {/* 3. Radar Sweep Effect for Top Radar */}
      {isTop && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-cyan-400/20 to-transparent pointer-events-none"
        />
      )}

      {/* 4. AUTHENTIC 3D REALISTIC IRON MAN MARK VII SUIT MODEL */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={stanceIdx}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative flex flex-col items-center justify-center"
          >
            <img
              src={currentStance.img}
              alt="Iron Man Mark VII Suit"
              className={`object-contain transition-all drop-shadow-[0_0_12px_rgba(0,240,255,0.7)] group-hover:drop-shadow-[0_0_18px_rgba(0,240,255,0.9)] ${
                isTop ? "h-20 sm:h-24" : "h-32 sm:h-36"
              }`}
              style={{
                filter: `drop-shadow(0 0 10px ${glowRgba}) contrast(1.15) brightness(1.05)`,
              }}
            />

            {/* Glowing Chest Arc Light Highlight */}
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-3 h-3 rounded-full blur-xs pointer-events-none"
              style={{
                top: isTop ? "38%" : "35%",
                left: "48%",
                transform: "translate(-50%, -50%)",
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}, 0 0 18px #ffffff`,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 5. Holographic Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          className="w-full h-4 bg-gradient-to-b from-transparent via-[#00f0ff]/25 to-transparent"
        />
      </div>

      {/* 6. High-Tech Sub-Label & Stance Indicator / ONLINE Badge */}
      {!isTop ? (
        <div className="absolute -bottom-2 z-20 flex flex-col items-center">
          <div className="bg-[#00f0ff] text-black text-[9px] font-black font-mono px-3 py-0.5 rounded shadow-[0_0_12px_#00f0ff] uppercase tracking-wider">
            ONLINE
          </div>
          <span className="text-[7px] font-mono text-[#00f0ff] tracking-widest mt-0.5">
            MK-VII // {currentStance.name}
          </span>
        </div>
      ) : (
        <div className="absolute bottom-1 flex items-center gap-1 text-[8px] font-mono tracking-widest text-[#00f0ff]/80">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
          <span>RADAR ACTIVE</span>
        </div>
      )}

      {/* Target Reticle Crosshairs */}
      <div className="absolute top-1/2 left-1 w-2 h-px bg-white/50 pointer-events-none" />
      <div className="absolute top-1/2 right-1 w-2 h-px bg-white/50 pointer-events-none" />
      <div className="absolute top-1 left-1/2 h-2 w-px bg-white/50 pointer-events-none" />
      <div className="absolute bottom-1 left-1/2 h-2 w-px bg-white/50 pointer-events-none" />
    </div>
  );
}
