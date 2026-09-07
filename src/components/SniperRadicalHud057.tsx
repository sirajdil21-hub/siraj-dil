import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Mic,
  MicOff,
  Send,
  Radio,
  Sliders,
  Shield,
  Zap,
  Activity,
  Maximize2,
  RefreshCw,
} from "lucide-react";
import { cyberSynth } from "../utils/audioUtils";
import { AppState } from "../types";
import VipWallpaperEngine, { VipWallpaperType } from "./VipWallpaperEngine";
import VipWallpaperSwitcher from "./VipWallpaperSwitcher";
import VipTacticalAppDock from "./VipTacticalAppDock";
import VipAppModalsContainer from "./VipAppModalsContainer";
import RealtimeBatteryIndicator from "./RealtimeBatteryIndicator";
import {
  getPakistanTimeInfo,
  savePakistanTimeSync,
  PakistanTimeInfo,
} from "../utils/timeUtils";

interface SniperRadicalHud057Props {
  state: AppState;
  transcript: string;
  response: string;
  onVoiceToggle: () => void;
  onSendText: (text: string) => void;
  isVoiceActive: boolean;
  onOpenDiagnostics: () => void;
  onOpenUsbFlash?: () => void;
  onOpenCodeStudio?: () => void;
  onOpenIrisAi183?: () => void;
  onSwitchToMark7: () => void;
}

export default function SniperRadicalHud057({
  state,
  transcript,
  response,
  onVoiceToggle,
  onSendText,
  isVoiceActive,
  onOpenDiagnostics,
  onOpenUsbFlash,
  onOpenCodeStudio,
  onOpenIrisAi183,
  onSwitchToMark7,
}: SniperRadicalHud057Props) {
  const [inputText, setInputText] = useState("");
  const [timer1, setTimer1] = useState("00:00:03.542");
  const [timer2, setTimer2] = useState("00:00:03.458");
  const [targetLocked, setTargetLocked] = useState(true);
  const [pktInfo, setPktInfo] = useState<PakistanTimeInfo>(() => getPakistanTimeInfo());
  const [justSavedTime, setJustSavedTime] = useState(false);
  const [currentWallpaper, setCurrentWallpaper] = useState<VipWallpaperType>("stream");
  const [activeVipApp, setActiveVipApp] = useState<string | null>(null);

  // Exact Pakistan Time (PKT UTC+5) sync and local saving
  useEffect(() => {
    savePakistanTimeSync();
    const interval = setInterval(() => {
      setPktInfo(getPakistanTimeInfo());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleManualSavePkt = () => {
    const updated = savePakistanTimeSync();
    setPktInfo(updated);
    cyberSynth.playBeep(1400, 0.06);
    setJustSavedTime(true);
    setTimeout(() => setJustSavedTime(false), 2000);
  };

  // Microsecond running timer matching the screenshot
  useEffect(() => {
    let start = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const ms1 = (diff % 1000).toString().padStart(3, "0");
      const sec1 = (Math.floor(diff / 1000) % 60).toString().padStart(2, "0");
      const min1 = (Math.floor(diff / 60000) % 60).toString().padStart(2, "0");
      const hr1 = Math.floor(diff / 3600000).toString().padStart(2, "0");
      setTimer1(`${hr1}:${min1}:${sec1}.${ms1}`);

      const diff2 = diff + 916;
      const ms2 = (diff2 % 1000).toString().padStart(3, "0");
      const sec2 = (Math.floor(diff2 / 1000) % 60).toString().padStart(2, "0");
      const min2 = (Math.floor(diff2 / 60000) % 60).toString().padStart(2, "0");
      const hr2 = Math.floor(diff2 / 3600000).toString().padStart(2, "0");
      setTimer2(`${hr2}:${min2}:${sec2}.${ms2}`);
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    cyberSynth.playBeep(1200, 0.04);
    onSendText(inputText.trim());
    setInputText("");
  };

  return (
    <div className="relative w-full min-h-screen bg-[#03060a] text-[#00f0ff] font-mono select-none overflow-x-hidden p-2 sm:p-4 flex flex-col justify-between">
      {/* Background Micro Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 240, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* VIP Dynamic Wallpaper Engine (Stream, Arc Reactor, Pakistan Radar, Globe, Grid) */}
      <VipWallpaperEngine currentWallpaper={currentWallpaper} />

      {/* ------------------------------------------------------------- */}
      {/* 1. TOP HEADER BANNER (Exact match to 6175b497434385.5ec50554ccf42.webp) */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 w-full flex items-center justify-between gap-2 mb-1.5">
        {/* Left Top Header Box */}
        <div className="flex items-center gap-1 sm:gap-2 px-2.5 py-1 border border-[#00f0ff]/40 bg-[#030d17]/80 rounded-xs text-[8px] sm:text-[10px] text-white/90">
          <span className="w-1.5 h-1.5 bg-[#00f0ff]" />
          <span className="tracking-wider uppercase">
            HUD UI / COVID 19 / MISSION / BATTLE 2020
          </span>
          <span className="text-[#00f0ff]/60 cursor-pointer ml-1 hover:text-white" onClick={onSwitchToMark7}>✕</span>
        </div>

        {/* Center: R.S. In Big Capital ABC & Tactical Reticle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Top Crosshair Icon */}
          <div className="hidden md:flex items-center justify-center w-7 h-7 relative text-[#00f0ff]">
            <div className="absolute inset-0 border border-[#00f0ff]/50 rotate-45" />
            <span className="text-[11px] font-black">+</span>
          </div>

          {/* R.S. CAPITAL ABC HERO BADGE */}
          <div className="flex items-center gap-1.5 px-3 py-0.5 border border-[#00f0ff] bg-black/85 rounded text-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.6)]">
            <span className="text-[#00f0ff] text-xs">◈</span>
            <span className="text-white text-sm sm:text-base tracking-[0.25em] font-black drop-shadow-[0_0_8px_#00f0ff]">
              R.S.
            </span>
            <span className="text-[#00f0ff] text-xs">◈</span>
          </div>

          {/* Exact Pakistan Standard Time (PKT - UTC+5) Saved Badge */}
          <button
            onClick={handleManualSavePkt}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-mono border transition-all cursor-pointer ${
              justSavedTime
                ? "bg-[#00ff88] text-black border-[#00ff88] shadow-[0_0_12px_#00ff88]"
                : "bg-black/80 text-[#00ff88] border-[#00ff88]/60 hover:border-[#00ff88] shadow-[0_0_8px_rgba(0,255,136,0.3)]"
            }`}
            title="پاکستان کا ایگزیکٹ وقت سنکرونائز اور سیو کریں"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="font-bold">PKT: {pktInfo.time12}</span>
            <span className="text-[7px] text-white/80 bg-[#00ff88]/20 px-1 py-0.2 rounded font-sans uppercase">
              {justSavedTime ? "✓ SAVED" : "SAVED"}
            </span>
          </button>

          {/* Real-Time Device Battery Status Indicator */}
          <RealtimeBatteryIndicator variant="sniper" />

          {/* IRIS AI 1.8.3 Pro Direct Launcher */}
          {onOpenIrisAi183 && (
            <button
              onClick={() => {
                cyberSynth.playBeep(1400, 0.04);
                onOpenIrisAi183();
              }}
              className="flex items-center gap-1.5 px-2.5 py-0.5 bg-gradient-to-r from-[#00ff88]/20 to-[#00f0ff]/20 hover:from-[#00ff88] hover:to-[#00f0ff] text-[#00ff88] hover:text-black border border-[#00ff88] rounded text-[8px] sm:text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_12px_rgba(0,255,136,0.4)]"
              title="IRIS X AI v1.8.3 پرو سوٹ کھولیں (Quiz PRO, Tic-Tac-Toe, Ghost Control, Hardware settings)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
              <span>IRIS AI v1.8.3 PRO</span>
            </button>
          )}

          {/* AI Code Studio Direct Launcher */}
          {onOpenCodeStudio && (
            <button
              onClick={() => {
                cyberSynth.playBeep(1200, 0.04);
                onOpenCodeStudio();
              }}
              className="flex items-center gap-1.5 px-2.5 py-0.5 bg-gradient-to-r from-[#00f0ff]/20 to-[#00ff88]/20 hover:from-[#00f0ff] hover:to-[#00ff88] text-[#00f0ff] hover:text-black border border-[#00f0ff] rounded text-[8px] sm:text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.4)]"
              title="ایپس اور ویب سائٹس کا مکمل کوڈنگ اسٹرکچر کھولیں"
            >
              <span className="font-mono font-bold">&lt;/&gt;</span>
              <span>AI CODE STUDIO // کوڈنگ سٹرکچر</span>
            </button>
          )}

          <button
            onClick={() => {
              cyberSynth.playBeep(950, 0.04);
              onSwitchToMark7();
            }}
            className="px-2.5 py-0.5 bg-[#00f0ff]/10 hover:bg-[#00f0ff] text-[#00f0ff] hover:text-black border border-[#00f0ff]/60 hover:border-[#00f0ff] rounded text-[8px] sm:text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_8px_rgba(0,240,255,0.2)]"
            title="Switch to Mark VII Armor HUD"
          >
            ← MARK VII
          </button>
        </div>

        {/* Right Top Header Box with R.S. in Capital Letters */}
        <div className="flex items-center gap-1 sm:gap-2 px-2.5 py-1 border border-[#00f0ff]/40 bg-[#030d17]/80 rounded-xs text-[8px] sm:text-[10px] text-white/90">
          <span className="tracking-wider uppercase font-bold text-[#00f0ff]">
            R.S. / AGENT SIRAJ / MISSION / ACTIVE 265 Z
          </span>
          <span className="w-1.5 h-1.5 bg-[#00f0ff]" />
          <span className="text-[#00f0ff]/60 cursor-pointer ml-1 hover:text-white" onClick={onOpenDiagnostics}>✕</span>
        </div>
      </div>

      {/* VIP Dynamic Wallpaper Switcher Bar */}
      <div className="relative z-10 w-full mb-2 flex items-center justify-between gap-2 overflow-x-auto pb-1">
        <VipWallpaperSwitcher
          currentWallpaper={currentWallpaper}
          onChangeWallpaper={setCurrentWallpaper}
        />
        <div className="hidden md:flex items-center gap-2 px-2 py-1 bg-black/60 border border-[#00f0ff]/30 rounded text-[8.5px] text-[#00ff88] whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
          <span>VIP OS SUITE ACTIVE // ROOT: SIRAJ</span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN 3-PANEL TACTICAL WORKSPACE */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-3 items-center flex-1">
        
        {/* ============================================================= */}
        {/* LEFT COLUMN (Cols: 1-3) */}
        {/* ============================================================= */}
        <div className="lg:col-span-3 flex flex-col space-y-3">
          
          {/* TOP-LEFT PANEL: R.S. HUD UI SCREENS + SATELLITE DISH + ARC GAUGE */}
          <div className="border border-[#00f0ff]/30 bg-[#030b14]/85 p-3 rounded-xs relative">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-black tracking-widest text-[#00f0ff] drop-shadow-[0_0_10px_#00f0ff]">
                  R.S.
                </div>
                <div className="text-[9px] tracking-widest text-[#00f0ff]/70 -mt-0.5 uppercase font-bold">
                  HUD UI SCREENS
                </div>
              </div>

              {/* 3D Radar Satellite Dish Graphic */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg viewBox="0 0 60 60" className="w-full h-full text-[#00f0ff] overflow-visible">
                  {/* Dish reflector */}
                  <ellipse cx="30" cy="24" rx="20" ry="12" fill="none" stroke="#00f0ff" strokeWidth="1.5" />
                  <ellipse cx="30" cy="24" rx="14" ry="8" fill="none" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="3 2" />
                  {/* Central receiver feed horn */}
                  <line x1="30" y1="24" x2="38" y2="12" stroke="#00f0ff" strokeWidth="2" />
                  <circle cx="38" cy="12" r="2.5" fill="#00f0ff" />
                  {/* Pedestal stand */}
                  <path d="M 24 36 L 36 36 L 40 50 L 20 50 Z" fill="none" stroke="#00f0ff" strokeWidth="1.2" />
                  <line x1="30" y1="36" x2="30" y2="24" stroke="#00f0ff" strokeWidth="1.5" />
                  <circle cx="30" cy="50" r="3" fill="#00f0ff" />
                </svg>
              </div>

              {/* Readout Numbers */}
              <div className="text-right">
                <div className="text-[8px] text-white/50">82</div>
                <div className="text-2xl sm:text-3xl font-mono text-white/90 font-bold leading-none">
                  46
                </div>
                <div className="text-[8px] text-white/50">42.</div>
              </div>
            </div>

            {/* Millisecond Timer & Pakistan Standard Time */}
            <div className="mt-2 text-xs font-mono text-white tracking-wider border-b border-[#00f0ff]/20 pb-1 flex items-center justify-between">
              <div>{timer1}</div>
              <div className="text-[10px] text-[#00ff88] font-bold">
                PKT {pktInfo.time24}
              </div>
            </div>
            <div className="text-[7.5px] text-[#00ff88] font-mono tracking-wider flex items-center justify-between pt-0.5 border-b border-[#00f0ff]/10 pb-0.5">
              <span>● پاکستان معیاری وقت (SAVED)</span>
              <span className="text-white/60">{pktInfo.dateShort} ({pktInfo.day.slice(0, 3)})</span>
            </div>

            {/* G3 Section + Arc Progress Ring */}
            <div className="flex items-center justify-between mt-2">
              <div className="space-y-0.5 text-[7px] text-white/60 font-mono leading-tight">
                <div className="text-lg font-black text-white font-mono leading-none mb-1">
                  G3 <span className="text-[8px] text-white/40">.93</span>
                </div>
                <div>// JZX / VIRUS</div>
                <div>SYSTEM OK / 0125</div>
                <div>TEMPERATURE: OPTIMAL</div>
                <div>xcvgroup_infeoxvcx</div>
                <div>vacnt nblocksmt</div>
                <div>CHECK / 0X40101720</div>
                <div className="text-[#00f0ff]">G3 XZ / 0125</div>
              </div>

              {/* Segmented Arc Ring (26 93 86 53) */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute -top-1 -left-1 text-[7px] text-white/40">26</div>
                <div className="absolute -top-1 -right-1 text-[7px] text-white/40">93</div>
                <div className="absolute -bottom-1 -left-1 text-[7px] text-white/40">86</div>
                <div className="absolute -bottom-1 -right-1 text-[7px] text-white/40">53</div>

                <svg viewBox="0 0 80 80" className="w-full h-full">
                  <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(0,240,255,0.15)" strokeWidth="4" />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="30"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="4"
                    strokeDasharray="140"
                    strokeDashoffset="45"
                    strokeLinecap="round"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "40px 40px" }}
                  />
                  <circle cx="40" cy="40" r="22" fill="none" stroke="#00f0ff" strokeWidth="0.8" strokeDasharray="3 3" />
                  <circle cx="40" cy="40" r="3" fill="#00f0ff" />
                </svg>
              </div>
            </div>

            {/* Coordinate Grid Numbers */}
            <div className="grid grid-cols-4 gap-1 text-[8px] text-white/60 font-mono mt-2 pt-2 border-t border-[#00f0ff]/20">
              <div>35</div>
              <div>46</div>
              <div>71</div>
              <div>26</div>
              <div className="text-[#00f0ff] font-bold">24</div>
              <div>35</div>
              <div>31</div>
              <div>86</div>
            </div>
          </div>

          {/* BOTTOM-LEFT PANEL: G5 + LED SERVER BLADES + G6 + C4 */}
          <div className="border border-[#00f0ff]/30 bg-[#030b14]/85 p-3 rounded-xs relative">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5 text-[7px] text-white/60 font-mono leading-tight">
                <div className="text-lg font-black text-white font-mono leading-none mb-1">
                  G5 <span className="text-[8px] text-white/40">.15</span>
                </div>
                <div>// JZX / VIRUS</div>
                <div>xcvgroup_infeoxvcx</div>
                <div>vacnt nblocksmt</div>
                <div>CHECK / 0X40101720</div>
                <div className="text-[#00f0ff]">X9 XZ / 0125</div>
              </div>

              {/* LED Server Blade Array (2 Columns of 6 Glowing Units) */}
              <div className="flex items-center gap-1.5 p-1.5 border border-[#00f0ff]/30 bg-black/60 rounded">
                <div className="flex flex-col gap-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-xs bg-[#00f0ff] shadow-[0_0_4px_#00f0ff]" />
                      <span className="w-3 h-1 bg-[#00f0ff]/40" />
                      <span className="w-1 h-1 rounded-full bg-[#00ff88]" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-xs bg-[#00f0ff] shadow-[0_0_4px_#00f0ff]" />
                      <span className="w-3 h-1 bg-[#00f0ff]/40" />
                      <span className="w-1 h-1 rounded-full bg-[#00ff88]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Millisecond Timer 2 */}
            <div className="mt-2 text-xs font-mono text-white tracking-wider border-b border-[#00f0ff]/20 pb-1">
              {timer2}
            </div>

            {/* G6 and C4 Reticle Box */}
            <div className="flex items-center justify-between mt-2 pt-1">
              <div>
                <div className="text-base font-black text-white font-mono">
                  G6 <span className="text-[7.5px] text-white/40">.93</span>
                </div>
                <div className="text-[7px] text-white/50">// JZX / VIRUS</div>
              </div>

              {/* C4 with Chevron Target */}
              <div className="flex items-center gap-2">
                <div>
                  <div className="text-base font-black text-[#00f0ff] font-mono">
                    C4 <span className="text-[7.5px] text-white/40">.26</span>
                  </div>
                  <div className="text-[7px] text-white/50">19 .86</div>
                </div>

                <div className="w-8 h-8 relative flex items-center justify-center">
                  <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border-t border-l border-[#00f0ff]" />
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 border-t border-r border-[#00f0ff]" />
                  <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 border-b border-l border-[#00f0ff]" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b border-r border-[#00f0ff]" />
                  <span className="text-[10px] text-[#00f0ff]">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* CENTER COLUMN (Cols: 4-9) - ICONIC SNIPER RADICAL RETICLE 057 */}
        {/* ============================================================= */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          
          {/* Main Reticle Screen Frame */}
          <div className="relative w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] flex items-center justify-center">
            
            {/* Ambient Cyan Glow */}
            <div className="absolute w-72 h-72 rounded-full bg-[#00f0ff]/10 blur-3xl pointer-events-none" />

            {/* SVG Master Artwork: Exact recreation of 6175b497434385.5ec50554ccf42.webp */}
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full overflow-visible select-none"
            >
              <defs>
                <filter id="cyanNeonGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 1. Header Text inside Reticle Circle */}
              <text
                x="250"
                y="85"
                textAnchor="middle"
                fill="#00f0ff"
                fontSize="7.5"
                fontFamily="monospace"
                letterSpacing="2"
                opacity="0.8"
              >
                SNIPER RADICAL / R.S. 0125
              </text>
              <text
                x="250"
                y="98"
                textAnchor="middle"
                fill="#00f0ff"
                fontSize="9.5"
                fontFamily="monospace"
                fontWeight="bold"
                letterSpacing="3"
                filter="url(#cyanNeonGlow)"
              >
                HUD UI SCREEN / 057
              </text>
              <text
                x="250"
                y="110"
                textAnchor="middle"
                fill="#00ff88"
                fontSize="6.5"
                fontFamily="monospace"
                letterSpacing="1.2"
                opacity="0.9"
              >
                PKT: {pktInfo.time12} [UTC+5 SAVED]
              </text>

              {/* Small top target crosshair mark */}
              <g transform="translate(250, 60)">
                <line x1="0" y1="-6" x2="0" y2="6" stroke="#00f0ff" strokeWidth="1" />
                <line x1="-6" y1="0" x2="6" y2="0" stroke="#00f0ff" strokeWidth="1" />
                <circle cx="0" cy="0" r="3" fill="none" stroke="#00f0ff" strokeWidth="0.8" />
              </g>

              {/* 2. Outer Concentric Circles */}
              <circle
                cx="250"
                cy="250"
                r="220"
                fill="none"
                stroke="rgba(0,240,255,0.2)"
                strokeWidth="1.2"
              />
              <circle
                cx="250"
                cy="250"
                r="200"
                fill="none"
                stroke="rgba(0,240,255,0.4)"
                strokeWidth="1"
                strokeDasharray="6 4"
              />
              <circle
                cx="250"
                cy="250"
                r="180"
                fill="none"
                stroke="rgba(0,240,255,0.15)"
                strokeWidth="0.8"
              />

              {/* 3. Outer Reticle Corner Arc Brackets */}
              {/* Top Left */}
              <path
                d="M 170 115 A 190 190 0 0 0 115 170"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="2.8"
                strokeLinecap="round"
                filter="url(#cyanNeonGlow)"
              />
              {/* Top Right */}
              <path
                d="M 330 115 A 190 190 0 0 1 385 170"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="2.8"
                strokeLinecap="round"
                filter="url(#cyanNeonGlow)"
              />
              {/* Bottom Left */}
              <path
                d="M 115 330 A 190 190 0 0 0 170 385"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="2.8"
                strokeLinecap="round"
                filter="url(#cyanNeonGlow)"
              />
              {/* Bottom Right */}
              <path
                d="M 385 330 A 190 190 0 0 1 330 385"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="2.8"
                strokeLinecap="round"
                filter="url(#cyanNeonGlow)"
              />

              {/* 4. Topographical / Sonar Terrain Grid Lines */}
              <g stroke="rgba(0,240,255,0.18)" strokeWidth="0.6" fill="none">
                <path d="M 140 220 Q 200 180 250 200 T 360 220" />
                <path d="M 130 240 Q 190 210 250 220 T 370 240" />
                <path d="M 130 260 Q 190 290 250 280 T 370 260" />
                <path d="M 140 280 Q 200 320 250 300 T 360 280" />
                <ellipse cx="250" cy="250" rx="140" ry="80" strokeDasharray="3 4" opacity="0.4" />
                <ellipse cx="250" cy="250" rx="110" ry="60" opacity="0.3" />
              </g>

              {/* 5. Radial Degree Ticks */}
              {Array.from({ length: 48 }).map((_, i) => {
                const angle = (i * 360) / 48;
                return (
                  <line
                    key={i}
                    x1="250"
                    y1="55"
                    x2="250"
                    y2={i % 4 === 0 ? "65" : "60"}
                    stroke="#00f0ff"
                    strokeWidth={i % 4 === 0 ? "1.2" : "0.6"}
                    opacity={i % 4 === 0 ? 0.7 : 0.3}
                    transform={`rotate(${angle} 250 250)`}
                  />
                );
              })}

              {/* 6. Compass Markers: E (East - Left) and W (West - Right) */}
              {/* Left 'E' Node */}
              <g transform="translate(145, 250)">
                <line x1="-50" y1="0" x2="-20" y2="0" stroke="#00f0ff" strokeWidth="1.2" />
                <circle cx="-10" cy="0" r="5" fill="none" stroke="#00f0ff" strokeWidth="1.2" />
                <circle cx="-10" cy="0" r="1.5" fill="#00f0ff" />
                <text
                  x="8"
                  y="4.5"
                  textAnchor="middle"
                  fill="#00f0ff"
                  fontSize="13"
                  fontFamily="monospace"
                  fontWeight="bold"
                  filter="url(#cyanNeonGlow)"
                >
                  E
                </text>
                {/* Degree ticks */}
                <path d="M -2 12 L -2 18 M -2 -12 L -2 -18" stroke="#00f0ff" strokeWidth="1" />
              </g>

              {/* Right 'W' Node */}
              <g transform="translate(355, 250)">
                <text
                  x="-8"
                  y="4.5"
                  textAnchor="middle"
                  fill="#00f0ff"
                  fontSize="13"
                  fontFamily="monospace"
                  fontWeight="bold"
                  filter="url(#cyanNeonGlow)"
                >
                  W
                </text>
                <circle cx="10" cy="0" r="5" fill="none" stroke="#00f0ff" strokeWidth="1.2" />
                <circle cx="10" cy="0" r="1.5" fill="#00f0ff" />
                <line x1="20" y1="0" x2="50" y2="0" stroke="#00f0ff" strokeWidth="1.2" />
                {/* Degree ticks */}
                <path d="M 2 12 L 2 18 M 2 -12 L 2 -18" stroke="#00f0ff" strokeWidth="1" />
              </g>

              {/* 7. Center Crosshair Cardinal Lines */}
              <line x1="250" y1="120" x2="250" y2="180" stroke="#00f0ff" strokeWidth="1.2" />
              <line x1="250" y1="320" x2="250" y2="380" stroke="#00f0ff" strokeWidth="1.2" />
              <circle cx="250" cy="180" r="2.5" fill="#00f0ff" />
              <circle cx="250" cy="320" r="2.5" fill="#00f0ff" />

              {/* 8. THE ICONIC SCI-FI BUTTERFLY / VISOR BRACKETS (Central Reticle) */}
              <g filter="url(#cyanNeonGlow)">
                {/* Left Bracket Wing */}
                <path
                  d="M 200 165 L 170 165 L 170 230 L 195 230 L 200 220 L 200 205 L 210 205 L 210 220 L 205 230 L 205 240 L 190 250 L 205 260 L 205 270 L 210 280 L 210 295 L 200 295 L 200 280 L 195 270 L 170 270 L 170 335 L 200 335"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2.6"
                  strokeLinejoin="miter"
                  strokeLinecap="round"
                />

                {/* Right Bracket Wing (Symmetric Mirror) */}
                <path
                  d="M 300 165 L 330 165 L 330 230 L 305 230 L 300 220 L 300 205 L 290 205 L 290 220 L 295 230 L 295 240 L 310 250 L 295 260 L 295 270 L 290 280 L 290 295 L 300 295 L 300 280 L 305 270 L 330 270 L 330 335 L 300 335"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2.6"
                  strokeLinejoin="miter"
                  strokeLinecap="round"
                />

                {/* Stepped Inner Accents */}
                <path d="M 215 190 L 230 190 L 235 200" fill="none" stroke="#00f0ff" strokeWidth="1.4" />
                <path d="M 285 190 L 270 190 L 265 200" fill="none" stroke="#00f0ff" strokeWidth="1.4" />
                <path d="M 215 310 L 230 310 L 235 300" fill="none" stroke="#00f0ff" strokeWidth="1.4" />
                <path d="M 285 310 L 270 310 L 265 300" fill="none" stroke="#00f0ff" strokeWidth="1.4" />
              </g>

              {/* 9. Dead Center Hexagon with 'X' ([X] Target Core) */}
              <g
                transform="translate(250, 250)"
                className="cursor-pointer"
                onClick={() => {
                  cyberSynth.playBeep(1400, 0.05);
                  setTargetLocked(!targetLocked);
                }}
              >
                {/* Outer Target Diamond/Hexagon */}
                <polygon
                  points="0,-16 14,-8 14,8 0,16 -14,8 -14,-8"
                  fill="#020a14"
                  stroke="#00f0ff"
                  strokeWidth="2"
                  filter="url(#cyanNeonGlow)"
                />

                {/* Central Letter 'X' */}
                <text
                  x="0"
                  y="4.5"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="900"
                  filter="url(#cyanNeonGlow)"
                >
                  X
                </text>

                {/* Pulsing Aim Circle */}
                <motion.circle
                  r="24"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  animate={{ rotate: 360, scale: [1, 1.08, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
              </g>

              {/* 10. Horizontal Target Alignment Dots */}
              <circle cx="160" cy="250" r="2.5" fill="#00f0ff" />
              <circle cx="210" cy="250" r="2" fill="#ffffff" opacity="0.8" />
              <circle cx="290" cy="250" r="2" fill="#ffffff" opacity="0.8" />
              <circle cx="340" cy="250" r="2.5" fill="#00f0ff" />

              {/* Diagonal Target Markers */}
              <circle cx="180" cy="180" r="2" fill="#00f0ff" opacity="0.6" />
              <circle cx="320" cy="180" r="2" fill="#00f0ff" opacity="0.6" />
              <circle cx="180" cy="320" r="2" fill="#00f0ff" opacity="0.6" />
              <circle cx="320" cy="320" r="2" fill="#00f0ff" opacity="0.6" />
            </svg>

            {/* Clickable Target Lock Indicator */}
            <div
              onClick={() => {
                cyberSynth.playBeep(1100, 0.04);
                setTargetLocked(!targetLocked);
              }}
              className="absolute bottom-2 bg-black/80 border border-[#00f0ff]/50 px-3 py-0.5 rounded-full text-[8.5px] font-mono text-[#00f0ff] cursor-pointer hover:bg-[#00f0ff]/20 transition-all shadow-[0_0_10px_rgba(0,240,255,0.4)]"
            >
              ● SNIPER LOCK: {targetLocked ? "ACQUIRED [X]" : "SCANNING..."}
            </div>
          </div>

          {/* AI Response Display & Command Bar in Sniper HUD */}
          <div className="w-full max-w-xl mt-2 bg-[#020d18]/90 border border-[#00f0ff]/80 rounded p-2.5 shadow-[0_0_20px_rgba(0,240,255,0.25)] space-y-1.5">
            <div className="flex items-center justify-between border-b border-[#00f0ff]/30 pb-1">
              <div className="flex items-center gap-1.5 text-[9px] text-white font-bold">
                <Radio
                  size={12}
                  className={`${
                    state === "speaking"
                      ? "text-[#00ff88] animate-spin"
                      : state === "listening"
                      ? "text-[#ff003c] animate-pulse"
                      : "text-[#00f0ff]"
                  }`}
                />
                <span>RADICAL 057 // SIRAJ COMMAND INTERFACE</span>
              </div>
              <span className="text-[8px] text-[#00ff88] font-bold">
                {state === "speaking"
                  ? "TRANSMITTING..."
                  : state === "listening"
                  ? "RECORDING..."
                  : "STANDBY // READY"}
              </span>
            </div>

            {/* Response text */}
            <div className="text-[11px] text-white leading-relaxed max-h-16 overflow-y-auto font-mono">
              {transcript && (
                <span className="text-[#00ff88] font-bold">سراج: "{transcript}" </span>
              )}
              {response}
            </div>

            {/* Input form */}
            <form onSubmit={handleFormSubmit} className="flex items-center gap-1.5 pt-1">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="کمانڈ درج کریں سراج..."
                className="flex-1 bg-black/80 border border-[#00f0ff]/50 rounded px-2 py-0.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00f0ff] font-mono"
              />
              <button
                type="submit"
                className="px-2.5 py-0.5 bg-[#00f0ff] hover:bg-white text-black font-bold text-xs rounded transition-all cursor-pointer"
              >
                <Send size={11} />
              </button>
              <button
                type="button"
                onClick={() => {
                  cyberSynth.playBeep(900, 0.04);
                  onVoiceToggle();
                }}
                className={`p-1 rounded border transition-all cursor-pointer ${
                  isVoiceActive
                    ? "bg-[#ff003c] border-[#ff003c] text-white"
                    : "bg-black/60 border-[#00f0ff] text-[#00f0ff]"
                }`}
              >
                {isVoiceActive ? <Mic size={13} /> : <MicOff size={13} />}
              </button>
            </form>
          </div>
        </div>

        {/* ============================================================= */}
        {/* RIGHT COLUMN (Cols: 10-12) */}
        {/* ============================================================= */}
        <div className="lg:col-span-3 flex flex-col space-y-3">
          
          {/* TOP-RIGHT PANEL: PARTICLE ORBIT RING + X5 + CHEVRON RETICLE + X6 */}
          <div className="border border-[#00f0ff]/30 bg-[#030b14]/85 p-3 rounded-xs relative">
            <div className="flex items-start justify-between">
              {/* Dotted Orbit Particle Ring */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute -top-1 -left-1 text-[7px] text-white/40">26</div>
                <div className="absolute -top-1 -right-1 text-[7px] text-white/40">26</div>
                <div className="absolute -bottom-1 -left-1 text-[7px] text-white/40">86</div>
                <div className="absolute -bottom-1 -right-1 text-[7px] text-white/40">86</div>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 rounded-full border border-dashed border-[#00f0ff]/60 flex items-center justify-center"
                >
                  <div className="w-8 h-8 rounded-full border border-dotted border-[#00f0ff]" />
                </motion.div>
              </div>

              {/* X5 Section */}
              <div className="text-right">
                <div className="text-xl sm:text-2xl font-black text-white font-mono leading-none">
                  X5 <span className="text-[7.5px] text-white/40">.93</span>
                </div>
                <div className="space-y-0.5 text-[6.5px] text-white/50 font-mono mt-1">
                  <div>// JZX / NANO TE</div>
                  <div>SYSTEM OK / 0125</div>
                  <div>cks = tgldiuetsize +</div>
                  <div className="text-[#00f0ff]">G8 XZ / 0125</div>
                </div>
              </div>
            </div>

            {/* Middle Chevron Crosshair Target `><` */}
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#00f0ff]/20">
              <div className="text-xs font-mono text-white/70">
                26 .93
                <div className="text-xs text-white/70">86 .53</div>
              </div>

              {/* 4 Diagonal Chevron Brackets */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00f0ff]" />
                <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00f0ff]" />
                <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00f0ff]" />
                <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00f0ff]" />
                <span className="text-xs text-[#00f0ff] font-black">+</span>
              </div>

              {/* X6 Section */}
              <div className="text-right">
                <div className="text-lg font-black text-white font-mono leading-none">
                  X6 <span className="text-[7px] text-white/40">.93</span>
                </div>
                <div className="text-[6.5px] text-white/50 font-mono mt-0.5">
                  <div>// JZX / NANO TE</div>
                  <div className="text-[#00f0ff]">G8 XZ / 0125</div>
                </div>
              </div>
            </div>

            {/* Millisecond Timer */}
            <div className="mt-2 text-xs font-mono text-white tracking-wider border-t border-[#00f0ff]/20 pt-1">
              {timer1}
            </div>
          </div>

          {/* BOTTOM-RIGHT PANEL: DUAL AUDIO/ENERGY BARS (CYAN & RED) + B3 + X9 */}
          <div className="border border-[#00f0ff]/30 bg-[#030b14]/85 p-3 rounded-xs relative">
            
            {/* Dual Level Equalizer Meters from Screenshot: Left Cyan, Right RED! */}
            <div className="flex items-center justify-between pb-2 border-b border-[#00f0ff]/20">
              {/* Cyan Level Bank (2 cols x 6 rows) */}
              <div className="space-y-1">
                <div className="text-[7.5px] text-[#00f0ff] font-bold tracking-wider">
                  PRIMARY // FLUX
                </div>
                <div className="flex gap-1">
                  <div className="flex flex-col gap-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-5 h-1.5 rounded-full border border-[#00f0ff]/40 ${
                          i >= 4 ? "bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]" : "bg-black/50"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-col gap-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-5 h-1.5 rounded-full border border-[#00f0ff]/40 ${
                          i >= 4 ? "bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]" : "bg-black/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Red Warning/Combat Level Bank (2 cols x 6 rows) */}
              <div className="space-y-1 text-right">
                <div className="text-[7.5px] text-[#ff003c] font-bold tracking-wider">
                  TACTICAL // CRITICAL
                </div>
                <div className="flex gap-1 justify-end">
                  <div className="flex flex-col gap-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-5 h-1.5 rounded-full border border-[#ff003c]/40 ${
                          i >= 2 ? "bg-[#ff003c] shadow-[0_0_6px_#ff003c]" : "bg-black/50"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-col gap-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-5 h-1.5 rounded-full border border-[#ff003c]/40 ${
                          i >= 2 ? "bg-[#ff003c] shadow-[0_0_6px_#ff003c]" : "bg-black/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Coordinate Grid Numbers */}
            <div className="grid grid-cols-4 gap-1 text-[8px] text-white/60 font-mono mt-2">
              <div>46</div>
              <div>48</div>
              <div>35</div>
              <div>93</div>
              <div className="text-[#00f0ff] font-bold">24</div>
              <div>08</div>
              <div>35</div>
              <div>53</div>
            </div>

            {/* Millisecond Timer 2 */}
            <div className="mt-2 text-xs font-mono text-white tracking-wider border-t border-[#00f0ff]/20 pt-1">
              {timer2}
            </div>

            {/* B3 Crossed Slits and X9 */}
            <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#00f0ff]/20">
              {/* B3 with Crossed Target Slits */}
              <div>
                <div className="text-lg font-black text-white font-mono">
                  B3 <span className="text-[7.5px] text-white/40">.93</span>
                </div>
                <div className="w-10 h-6 relative flex items-center justify-center">
                  <svg viewBox="0 0 40 24" className="w-full h-full text-[#00f0ff]">
                    <line x1="0" y1="0" x2="40" y2="24" stroke="#00f0ff" strokeWidth="1" />
                    <line x1="0" y1="24" x2="40" y2="0" stroke="#00f0ff" strokeWidth="1" />
                  </svg>
                  <span className="absolute text-[7px] text-white/40">.53</span>
                </div>
              </div>

              {/* X9 */}
              <div className="text-right">
                <div className="text-lg font-black text-white font-mono leading-none">
                  X9 <span className="text-[7.5px] text-white/40">.93</span>
                </div>
                <div className="space-y-0.5 text-[6.5px] text-white/50 font-mono mt-0.5">
                  <div>// JZX / VIRUS</div>
                  <div>cks = tgldiuetsize +</div>
                  <div className="text-[#00f0ff]">X9 XZ / 0125</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outer Chin Framing Bracket from 6175b497434385.5ec50554ccf42.webp */}
      <div className="relative w-full max-w-4xl mx-auto my-1 px-4 pointer-events-none">
        <svg viewBox="0 0 800 24" className="w-full h-4 text-[#00f0ff] overflow-visible">
          <circle cx="20" cy="8" r="2.5" fill="#00f0ff" />
          <path
            d="M 20 8 L 220 8 Q 240 8 260 16 L 360 18 Q 400 20 440 18 L 540 16 Q 560 8 580 8 L 780 8"
            fill="none"
            stroke="rgba(0, 240, 255, 0.45)"
            strokeWidth="1.2"
          />
          <circle cx="780" cy="8" r="2.5" fill="#00f0ff" />
        </svg>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. VIP TACTICAL APPS SUITE (8 Full Featured Interactive Apps) */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 w-full my-2">
        <VipTacticalAppDock
          onOpenApp={(appId) => {
            if (appId === "iris_ai_183") {
              onOpenIrisAi183?.();
            } else if (appId === "code_studio") {
              onOpenCodeStudio?.();
            } else if (appId === "camera") {
              // Can open the camera modal or cyber surveillance app
              setActiveVipApp("camera");
            } else {
              setActiveVipApp(appId);
            }
          }}
          activeAppId={activeVipApp}
        />
      </div>

      {/* VIP Interactive App Holographic Modals */}
      <VipAppModalsContainer
        activeAppId={activeVipApp}
        onClose={() => setActiveVipApp(null)}
        onOpenUsbFlash={onOpenUsbFlash}
        onOpenDiagnostics={onOpenDiagnostics}
        onOpenCodeStudio={onOpenCodeStudio}
        onOpenIrisAi183={onOpenIrisAi183}
      />

      {/* ------------------------------------------------------------- */}
      {/* 4. BOTTOM FOOTER BAR WITH SYSTEM CONTROLS & FLASH OPTION */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#00f0ff]/30 text-[9px]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              cyberSynth.playBeep(1000, 0.04);
              onSwitchToMark7();
            }}
            className="px-2.5 py-1 bg-[#00f0ff]/20 hover:bg-[#00f0ff] text-[#00f0ff] hover:text-black border border-[#00f0ff] rounded font-bold cursor-pointer transition-all"
          >
            ● MARK VII ARMOR VIEW
          </button>

          {onOpenUsbFlash && (
            <button
              onClick={() => {
                cyberSynth.playBeep(850, 0.04);
                onOpenUsbFlash();
              }}
              className="px-2 py-1 bg-black/60 hover:bg-[#ff003c]/20 text-white/80 hover:text-white border border-white/30 rounded cursor-pointer transition-all"
            >
              USB DATA CABLE FLASH
            </button>
          )}
        </div>

        <div className="text-white/60 text-[8px] tracking-wider">
          <span className="text-[#00f0ff] font-black mr-1 text-[9px]">R.S.</span> TACTICAL HUD 057 // ROOT USER: <span className="text-[#00f0ff] font-bold">SIRAJ (سراج)</span> // PKT: <span className="text-[#00ff88] font-bold">{pktInfo.time12} ({pktInfo.dateShort})</span> [SAVED] // ALL SENSORS 100%
        </div>
      </div>
    </div>
  );
}
