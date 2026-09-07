import React, { useState } from "react";
import { motion } from "motion/react";
import { cyberSynth } from "../utils/audioUtils";
import { AppState, ArmorTheme } from "../types";

import outRingImg from "../assets/ironman/Time/outring.png";
import inRingImg from "../assets/ironman/Time/inring.png";

interface IronManHelmetCenterProps {
  state: AppState;
  theme: ArmorTheme;
  onReactorClick?: () => void;
  onHelmetClick?: () => void;
}

export default function IronManHelmetCenter({
  state,
  theme,
  onReactorClick,
  onHelmetClick,
}: IronManHelmetCenterProps) {
  const [isSurging, setIsSurging] = useState(false);
  const [centerMode, setCenterMode] = useState<"reactor" | "sniper">("reactor");

  // Color mapping based on theme
  const getThemeColors = () => {
    switch (theme) {
      case "combat":
        return {
          primary: "#ff003c",
          glow: "rgba(255, 0, 60, 0.7)",
          accent: "#ffd700",
          core: "#ffffff",
          eyeGlow: "#ff3366",
        };
      case "stealth":
        return {
          primary: "#00ffaa",
          glow: "rgba(0, 255, 170, 0.7)",
          accent: "#a855f7",
          core: "#ffffff",
          eyeGlow: "#00ffaa",
        };
      case "cyan":
      default:
        return {
          primary: "#00f0ff",
          glow: "rgba(0, 240, 255, 0.8)",
          accent: "#ff003c", // The iconic red tick arc from 3974763.jpg!
          core: "#ffffff",
          eyeGlow: "#00f0ff",
        };
    }
  };

  const colors = getThemeColors();
  const isSpeaking = state === "speaking";
  const isListening = state === "listening";

  const handleSurge = () => {
    cyberSynth.playReactorSurge();
    setIsSurging(true);
    if (onReactorClick) onReactorClick();
    setTimeout(() => setIsSurging(false), 900);
  };

  const handleHelmet = () => {
    cyberSynth.playBeep(1100, 0.05);
    if (onHelmetClick) onHelmetClick();
  };

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none">
      {/* Background Soft Glow */}
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.15, 1] : isListening ? [1, 1.08, 1] : 1,
          opacity: isSpeaking ? [0.35, 0.65, 0.35] : 0.28,
        }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-80 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: colors.primary }}
      />

      {/* Main Container for Arc Reactor */}
      <div className="relative w-[340px] sm:w-[400px] flex flex-col items-center justify-center">
        
        {/* Switch between Arc Reactor and Sniper Radical Reticle (from uploaded reference image) */}
        <div className="flex items-center gap-1.5 mb-1 z-10">
          <button
            type="button"
            onClick={() => {
              cyberSynth.playBeep(850, 0.03);
              setCenterMode("reactor");
            }}
            className={`px-2.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase transition-all cursor-pointer border ${
              centerMode === "reactor"
                ? "bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_8px_#00f0ff]"
                : "bg-black/60 text-white/60 border-white/20 hover:border-[#00f0ff]"
            }`}
          >
            ⚛️ ARC REACTOR CORE
          </button>
          <button
            type="button"
            onClick={() => {
              cyberSynth.playBeep(1100, 0.04);
              setCenterMode("sniper");
            }}
            className={`px-2.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase transition-all cursor-pointer border ${
              centerMode === "sniper"
                ? "bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_8px_#00f0ff]"
                : "bg-black/60 text-white/60 border-white/20 hover:border-[#00f0ff]"
            }`}
          >
            🎯 SNIPER 057 RETICLE
          </button>
        </div>

        {centerMode === "reactor" ? (
          /* CHEST ARC REACTOR WITH CONCENTRIC MECHANICAL RINGS */
          <div
            id="chest-arc-reactor"
            onClick={handleSurge}
            className="relative w-72 h-72 sm:w-80 sm:h-80 my-2 flex items-center justify-center cursor-pointer group"
            title="Stark Arc Reactor Core (Click for AI Voice / Reactor Surge)"
          >
          {/* Rotating OutRing */}
          <motion.img
            src={outRingImg}
            alt="Reactor Outer Ring"
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-60 mix-blend-screen"
            style={{
              filter: `drop-shadow(0 0 8px ${colors.glow}) hue-rotate(${
                theme === "combat" ? "130deg" : theme === "stealth" ? "260deg" : "0deg"
              })`,
            }}
          />

          {/* Counter-Rotating InRing */}
          <motion.img
            src={inRingImg}
            alt="Reactor Inner Ring"
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute inset-5 w-[calc(100%-40px)] h-[calc(100%-40px)] object-contain pointer-events-none opacity-70 mix-blend-screen"
            style={{
              filter: `drop-shadow(0 0 6px ${colors.glow}) hue-rotate(${
                theme === "combat" ? "130deg" : theme === "stealth" ? "260deg" : "0deg"
              })`,
            }}
          />

          {/* SVG Overlay for Mechanical Teeth, Red Tick Arc and 10:17 HUD Badge */}
          <svg viewBox="0 0 240 240" className="w-full h-full overflow-visible pointer-events-none">
            <defs>
              <radialGradient id="reactorCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="35%" stopColor={colors.primary} stopOpacity="0.9" />
                <stop offset="70%" stopColor={colors.primary} stopOpacity="0.3" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g transform="translate(120, 120)">
              {/* Outer Ticked Ring */}
              <motion.circle
                r="105"
                fill="none"
                stroke={colors.primary}
                strokeWidth="1"
                strokeDasharray="3 5 8 5"
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              />

              {/* The Iconic Red Warning Arc (Upper-Left Segment from 3974763.jpg) */}
              <path
                d="M -75 -56 A 94 94 0 0 1 -24 -90"
                fill="none"
                stroke="#ff003c"
                strokeWidth="4.5"
                strokeLinecap="round"
                filter="drop-shadow(0 0 6px #ff003c)"
              />
              {/* Red Warning Ticks */}
              <path
                d="M -82 -62 A 102 102 0 0 1 -28 -98"
                fill="none"
                stroke="#ff003c"
                strokeWidth="2.5"
                strokeDasharray="2 3"
              />

              {/* Mini HUD Badge `10:17` at 10 o'clock position (from 3974763.jpg) */}
              <g transform="translate(-86, -48) rotate(-35)">
                <rect
                  x="-16"
                  y="-7"
                  width="32"
                  height="14"
                  fill="#000000"
                  stroke={colors.primary}
                  strokeWidth="1"
                  rx="2"
                />
                <text
                  x="0"
                  y="3.5"
                  textAnchor="middle"
                  fill={colors.primary}
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  10:17
                </text>
              </g>

              {/* Radial Degree Ticks */}
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * 360) / 24;
                return (
                  <line
                    key={i}
                    x1="0"
                    y1="-70"
                    x2="0"
                    y2={i % 6 === 0 ? "-60" : "-65"}
                    stroke={i < 4 ? "#ff003c" : colors.primary}
                    strokeWidth={i % 6 === 0 ? "1.6" : "0.8"}
                    transform={`rotate(${angle})`}
                    opacity={0.8}
                  />
                );
              })}

              {/* Concentric Inner Core Frame */}
              <circle
                r="34"
                fill="#01101e"
                stroke={colors.primary}
                strokeWidth="2"
              />

              {/* Pulsing Central Glowing Iris */}
              <motion.circle
                r="24"
                fill="url(#reactorCoreGlow)"
                animate={{
                  scale: isSurging
                    ? [1, 1.4, 1.1]
                    : isSpeaking
                    ? [1, 1.25, 1]
                    : [1, 1.12, 1],
                  opacity: isSurging ? 1 : isSpeaking ? 0.95 : 0.85,
                }}
                transition={{ duration: isSurging ? 0.4 : 1.4, repeat: Infinity }}
              />

              {/* Center Core Number `08` from 3974763.jpg */}
              <circle cx="0" cy="0" r="14" fill={colors.primary} fillOpacity="0.3" />
              <text
                x="0"
                y="4.5"
                textAnchor="middle"
                fill="#ffffff"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="900"
                filter="drop-shadow(0 0 5px #00f0ff)"
              >
                08
              </text>

              {/* Crosshair Cardinal Reticle Lines */}
              <line x1="-50" y1="0" x2="-36" y2="0" stroke={colors.primary} strokeWidth="1.2" />
              <line x1="36" y1="0" x2="50" y2="0" stroke={colors.primary} strokeWidth="1.2" />
              <line x1="0" y1="-50" x2="0" y2="-36" stroke={colors.primary} strokeWidth="1.2" />
              <line x1="0" y1="36" x2="0" y2="50" stroke={colors.primary} strokeWidth="1.2" />
            </g>
          </svg>

          {/* Floating Interactive Reactor Tooltip / Prompt */}
          <div
            onClick={handleSurge}
            className="absolute -bottom-2 bg-black/85 border border-[#00f0ff]/50 px-2.5 py-0.5 rounded-full text-[8px] font-mono text-[#00f0ff] cursor-pointer hover:bg-[#00f0ff]/20 transition-all shadow-[0_0_10px_rgba(0,240,255,0.4)]"
          >
            ● ARC REACTOR CORE // CLICK FOR VOICE AI
          </div>
        </div>
        ) : (
          /* SNIPER RADICAL 057 RETICLE (From 6175b497434385.5ec50554ccf42.webp) */
          <div
            id="sniper-radical-057"
            onClick={handleSurge}
            className="relative w-72 h-72 sm:w-80 sm:h-80 my-2 flex items-center justify-center cursor-pointer group"
            title="Sniper Radical Screen 057 Reticle (Click for Target Ping)"
          >
            <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible select-none pointer-events-none">
              <defs>
                <filter id="centerCyanGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Title inside circle */}
              <text x="250" y="80" textAnchor="middle" fill="#00f0ff" fontSize="8" fontFamily="monospace" opacity="0.75">
                SNIPER RADICAL / JZX 0125
              </text>
              <text x="250" y="94" textAnchor="middle" fill="#00f0ff" fontSize="10" fontFamily="monospace" fontWeight="bold" filter="url(#centerCyanGlow)">
                HUD UI SCREEN / 057
              </text>

              {/* Concentric rings */}
              <circle cx="250" cy="250" r="220" fill="none" stroke="rgba(0,240,255,0.25)" strokeWidth="1.2" />
              <circle cx="250" cy="250" r="195" fill="none" stroke="rgba(0,240,255,0.4)" strokeWidth="1" strokeDasharray="6 4" />
              <circle cx="250" cy="250" r="170" fill="none" stroke="rgba(0,240,255,0.15)" strokeWidth="0.8" />

              {/* Outer Corner Arc Brackets */}
              <path d="M 170 115 A 190 190 0 0 0 115 170" fill="none" stroke="#00f0ff" strokeWidth="2.8" strokeLinecap="round" filter="url(#centerCyanGlow)" />
              <path d="M 330 115 A 190 190 0 0 1 385 170" fill="none" stroke="#00f0ff" strokeWidth="2.8" strokeLinecap="round" filter="url(#centerCyanGlow)" />
              <path d="M 115 330 A 190 190 0 0 0 170 385" fill="none" stroke="#00f0ff" strokeWidth="2.8" strokeLinecap="round" filter="url(#centerCyanGlow)" />
              <path d="M 385 330 A 190 190 0 0 1 330 385" fill="none" stroke="#00f0ff" strokeWidth="2.8" strokeLinecap="round" filter="url(#centerCyanGlow)" />

              {/* Topographical contours */}
              <g stroke="rgba(0,240,255,0.2)" strokeWidth="0.6" fill="none">
                <path d="M 140 220 Q 200 180 250 200 T 360 220" />
                <path d="M 130 240 Q 190 210 250 220 T 370 240" />
                <path d="M 130 260 Q 190 290 250 280 T 370 260" />
                <path d="M 140 280 Q 200 320 250 300 T 360 280" />
              </g>

              {/* Compass E (Left) and W (Right) */}
              <g transform="translate(145, 250)">
                <line x1="-50" y1="0" x2="-20" y2="0" stroke="#00f0ff" strokeWidth="1.2" />
                <circle cx="-10" cy="0" r="5" fill="none" stroke="#00f0ff" strokeWidth="1.2" />
                <circle cx="-10" cy="0" r="1.5" fill="#00f0ff" />
                <text x="8" y="4.5" textAnchor="middle" fill="#00f0ff" fontSize="13" fontFamily="monospace" fontWeight="bold" filter="url(#centerCyanGlow)">
                  E
                </text>
              </g>
              <g transform="translate(355, 250)">
                <text x="-8" y="4.5" textAnchor="middle" fill="#00f0ff" fontSize="13" fontFamily="monospace" fontWeight="bold" filter="url(#centerCyanGlow)">
                  W
                </text>
                <circle cx="10" cy="0" r="5" fill="none" stroke="#00f0ff" strokeWidth="1.2" />
                <circle cx="10" cy="0" r="1.5" fill="#00f0ff" />
                <line x1="20" y1="0" x2="50" y2="0" stroke="#00f0ff" strokeWidth="1.2" />
              </g>

              {/* Visor Butterfly Wing Brackets */}
              <g filter="url(#centerCyanGlow)">
                <path
                  d="M 200 165 L 170 165 L 170 230 L 195 230 L 200 220 L 200 205 L 210 205 L 210 220 L 205 230 L 205 240 L 190 250 L 205 260 L 205 270 L 210 280 L 210 295 L 200 295 L 200 280 L 195 270 L 170 270 L 170 335 L 200 335"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                <path
                  d="M 300 165 L 330 165 L 330 230 L 305 230 L 300 220 L 300 205 L 290 205 L 290 220 L 295 230 L 295 240 L 310 250 L 295 260 L 295 270 L 290 280 L 290 295 L 300 295 L 300 280 L 305 270 L 330 270 L 330 335 L 300 335"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
              </g>

              {/* Dead Center Hexagon with 'X' */}
              <g transform="translate(250, 250)">
                <polygon points="0,-16 14,-8 14,8 0,16 -14,8 -14,-8" fill="#020a14" stroke="#00f0ff" strokeWidth="2" filter="url(#centerCyanGlow)" />
                <text x="0" y="4.5" textAnchor="middle" fill="#ffffff" fontSize="12" fontFamily="monospace" fontWeight="900" filter="url(#centerCyanGlow)">
                  X
                </text>
                <circle r="24" fill="none" stroke="#00f0ff" strokeWidth="1" strokeDasharray="4 4" />
              </g>
            </svg>

            {/* Tooltip prompt */}
            <div
              onClick={handleSurge}
              className="absolute -bottom-2 bg-black/85 border border-[#00f0ff]/50 px-2.5 py-0.5 rounded-full text-[8px] font-mono text-[#00f0ff] cursor-pointer hover:bg-[#00f0ff]/20 transition-all shadow-[0_0_10px_rgba(0,240,255,0.4)]"
            >
              ● SNIPER RADICAL 057 // TARGET LOCKED [X]
            </div>
          </div>
        )}
      </div>

      {/* Sub-Telemetry stats beneath the reactor (Exact text from 3974763.jpg) */}
      <div className="w-full max-w-[340px] flex items-center justify-between text-[9px] font-mono text-[#00f0ff]/80 mt-2 px-4 py-1 border-t border-b border-[#00f0ff]/20 bg-black/40">
        <div>
          <span className="text-white/60">TOTAL:</span>{" "}
          <span className="font-bold text-white">1.9 GB</span>
        </div>
        <div className="text-[#00f0ff] font-bold">61.86%</div>
        <div className="flex items-center gap-1">
          <span className="text-[#ff003c] font-bold">60%</span>
          <span className="text-white/50">17</span>
        </div>
        <div>
          <span className="text-white/60">CPU 2:</span>{" "}
          <span className="text-[#00ff88]">OK</span>
        </div>
      </div>
    </div>
  );
}

