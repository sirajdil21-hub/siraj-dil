import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cpu,
  HardDrive,
  Wifi,
  Activity,
  Battery,
  Shield,
  Zap,
  Mic,
  MicOff,
  Send,
  Power,
  RotateCcw,
  Moon,
  Lock,
  Search,
  Maximize2,
  Minimize2,
  Radio,
  Clock,
  Sparkles,
  CloudRain,
  Sun,
  Layers,
} from "lucide-react";
import IronManRedCenterpiece from "./IronManRedCenterpiece";
import MusicPlayerHud from "./MusicPlayerHud";
import AbcBackgroundVortex from "./AbcBackgroundVortex";
import { cyberSynth } from "../utils/audioUtils";

interface RedIronManHudProps {
  state: "idle" | "listening" | "processing" | "speaking";
  transcript: string;
  response: string;
  onVoiceToggle: () => void;
  onSendText: (text: string) => void;
  isVoiceActive: boolean;
  onOpenDiagnostics: () => void;
  onOpenSecurity: () => void;
}

export default function RedIronManHud({
  state,
  transcript,
  response,
  onVoiceToggle,
  onSendText,
  isVoiceActive,
  onOpenDiagnostics,
  onOpenSecurity,
}: RedIronManHudProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [inputText, setInputText] = useState("");
  const [cpuUsage, setCpuUsage] = useState(10);
  const [ramUsage, setRamUsage] = useState(43);
  const [dlSpeed, setDlSpeed] = useState(62.3);
  const [upSpeed, setUpSpeed] = useState(25.3);
  const [activeTab, setActiveTab] = useState<"general" | "pakistan" | "tools">("general");

  // Pakistan Live Weather quick data
  const [pakTemp, setPakTemp] = useState(30);
  const [pakCondition, setPakCondition] = useState("MONSOON RAIN (ISB/LHR)");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setCpuUsage(Math.floor(7 + Math.random() * 8));
      setDlSpeed(Number((55 + Math.random() * 15).toFixed(1)));
      setUpSpeed(Number((20 + Math.random() * 8).toFixed(1)));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    cyberSynth.playBeep(1200, 0.05);
    onSendText(inputText.trim());
    setInputText("");
  };

  const handleNodeAction = (label: string) => {
    cyberSynth.playBeep(900, 0.05);
    if (label === "Control Panel" || label === "Game Booster") {
      onOpenDiagnostics();
    } else if (label === "Settings" || label === "Security") {
      onOpenSecurity();
    } else if (label === "Music") {
      onSendText("Play Iron Man music");
    } else if (label === "THESIS") {
      onSendText("Explain the latest research in science and AI");
    } else if (label === "Network") {
      onSendText("What is my network status?");
    } else {
      onSendText(`Open ${label}`);
    }
  };

  const handlePowerAction = (action: string) => {
    cyberSynth.playBeep(500, 0.08);
    onSendText(`System power command: ${action}`);
  };

  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");
  const ampm = currentTime.getHours() >= 12 ? "PM" : "AM";
  const dateStr = currentTime.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const dayName = currentTime.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className="relative w-full h-full min-h-screen bg-[#070103] text-[#ff003c] font-mono select-none overflow-hidden flex flex-col justify-between p-1 sm:p-2 border-2 border-[#ff003c]/70 shadow-[inset_0_0_80px_rgba(255,0,60,0.25)]">
      {/* 🔴 FULL-SCREEN HIGH-SPEED ABC LOGO & PARTICLE VORTEX BACKGROUND */}
      <AbcBackgroundVortex speedMultiplier={1.5} />

      {/* Top Background Sci-Fi Corner Brackets and Curves */}
      <div className="absolute top-0 left-0 w-32 h-16 border-t-2 border-l-2 border-[#ff003c] pointer-events-none opacity-80 z-10" />
      <div className="absolute top-0 right-0 w-32 h-16 border-t-2 border-r-2 border-[#ff003c] pointer-events-none opacity-80 z-10" />
      <div className="absolute bottom-0 left-0 w-32 h-16 border-b-2 border-l-2 border-[#ff003c] pointer-events-none opacity-80 z-10" />
      <div className="absolute bottom-0 right-0 w-32 h-16 border-b-2 border-r-2 border-[#ff003c] pointer-events-none opacity-80 z-10" />

      {/* TOP HEADER BAR (Exact match to Reference Photo) */}
      <div className="relative z-20 w-full flex items-center justify-between border-b border-[#ff003c]/40 pb-1 px-2 bg-gradient-to-b from-[#180206] to-transparent">
        {/* Left Header: Tactical Info */}
        <div className="flex items-center gap-3">
          <div className="border border-[#ff003c]/60 px-2 py-0.5 rounded-xs bg-black/60 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff003c] animate-ping" />
            <span className="text-[10px] font-black tracking-widest text-white">
              TACTICAL CONTROL SYSTEM
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[8px] text-[#ff6688]">
            <span>RECYCLE: 2 ITEMS (16.4 KB)</span>
            <span>|</span>
            <span className="text-[#00ff88]">STATUS: ARMED</span>
          </div>
        </div>

        {/* Center Header: Large Digital Clock Display (10:19:48 AM STANDARD TIME) */}
        <div className="flex flex-col items-center">
          <div className="flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-black text-white tracking-widest drop-shadow-[0_0_10px_#ff003c]">
              {hours}:{minutes}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#ff3366]">
              :{seconds}
            </span>
            <span className="text-[9px] font-bold text-white ml-1">{ampm}</span>
          </div>
          <div className="text-[7.5px] tracking-[0.25em] text-[#ff6688] font-bold uppercase">
            STANDARD TIME // {dayName} {dateStr}
          </div>
        </div>

        {/* Right Header: Removable Drive / Fire Control (matching photo) */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end text-[8px] text-[#ff6688] font-mono">
            <span className="text-white font-bold">Removable Drive (F:)</span>
            <span>0.0 B | 0.0 B</span>
          </div>
          <div className="border border-[#ff003c]/60 px-2 py-0.5 rounded-xs bg-[#ff003c]/20 flex items-center gap-1">
            <span className="text-[10px] font-black tracking-widest text-[#ff3366]">
              FIRE CONTROL
            </span>
          </div>
        </div>
      </div>

      {/* MAIN 3-COLUMN LAYOUT */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-2 my-1 items-stretch overflow-y-auto lg:overflow-visible">
        
        {/* ================= LEFT COLUMN (Lg: 3 cols) ================= */}
        <div className="lg:col-span-3 flex flex-col justify-between gap-2">
          {/* Outer Left Dock Bar & Gauges Row */}
          <div className="flex gap-2 items-start">
            {/* Far Left Vertical App Dock (Asus, Maintenance, General, Visual Tools) */}
            <div className="w-9 shrink-0 flex flex-col items-center gap-1.5 py-1.5 px-0.5 bg-[#120104]/90 border border-[#ff003c]/50 rounded-xs">
              <span className="text-[7px] font-bold text-white rotate-[-90deg] my-1 uppercase">ASUS</span>
              <div className="w-5 h-5 rounded bg-red-600/30 border border-red-500 flex items-center justify-center text-[8px] text-white">⚙️</div>
              <span className="text-[6.5px] text-[#ff6688] rotate-[-90deg] my-2">Maint</span>
              <div className="w-5 h-5 rounded bg-blue-600/30 border border-blue-500 flex items-center justify-center text-[8px] text-white">🔧</div>
              <span className="text-[6.5px] text-[#ff6688] rotate-[-90deg] my-2">Gen</span>
              <div className="w-5 h-5 rounded bg-amber-600/30 border border-amber-500 flex items-center justify-center text-[8px] text-white">⭐</div>
              <span className="text-[6.5px] text-[#ff6688] rotate-[-90deg] my-2">Tools</span>
              <div className="w-5 h-5 rounded bg-purple-600/30 border border-purple-500 flex items-center justify-center text-[8px] text-white">🚀</div>
            </div>

            {/* Hardware Gauge Cards */}
            <div className="flex-1 flex flex-col gap-2">
              {/* RAM Circular Meter */}
              <div className="border border-[#ff003c]/50 rounded-xs bg-[#100104]/90 p-2 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-white">[RAM]</span>
                  <span className="text-[8px] text-[#ff6688]">[FREE: 2.24 GB]</span>
                  <span className="text-[8px] text-white/80">[USED: {ramUsage}%]</span>
                </div>
                {/* Dial Circle */}
                <div className="relative w-12 h-12 rounded-full border-2 border-[#ff003c] flex items-center justify-center bg-black/60 shadow-[0_0_10px_#ff003c]">
                  <span className="text-xs font-black text-white">{ramUsage}%</span>
                </div>
              </div>

              {/* CPU Hardware Monitor & Frequency Wave */}
              <div className="border border-[#ff003c]/50 rounded-xs bg-[#100104]/90 p-2 flex flex-col gap-1">
                <div className="flex items-center justify-between text-[9px]">
                  <span className="font-bold text-white flex items-center gap-1">
                    <Cpu size={10} className="text-[#ff003c]" /> CPU 2200 MHz
                  </span>
                  <span className="text-[#ff3366] font-black">{cpuUsage}% USAGE</span>
                </div>
                {/* Live Wave Line */}
                <div className="w-full h-7 bg-black/80 rounded border border-[#ff003c]/30 flex items-center px-1 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 100 20">
                    <path
                      d="M 0,10 L 20,10 L 25,2 L 30,18 L 35,5 L 40,15 L 45,10 L 65,10 L 70,0 L 75,20 L 80,10 L 100,10"
                      fill="none"
                      stroke="#ff003c"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div className="flex justify-between text-[7.5px] text-[#ff6688]">
                  <span>TEMP: 38.0°C</span>
                  <span>CORE 1-8 ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hard Drive C: Bar (matching photo: 216.6 GB FREE, 325.7 GB) */}
          <div className="border border-[#ff003c]/50 rounded-xs bg-[#100104]/90 p-2 flex flex-col gap-1">
            <div className="flex justify-between items-center text-[9px] font-bold text-white">
              <span className="flex items-center gap-1">
                <HardDrive size={10} className="text-[#ff003c]" /> C: SYSTEM DRIVE
              </span>
              <span className="text-[#ff6688]">216.6 GB FREE / 325.7 GB</span>
            </div>
            <div className="w-full h-2 bg-black/80 rounded border border-[#ff003c]/40 relative overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#ff003c] via-[#ff6600] to-[#ffd700] w-[66%]" />
            </div>
          </div>

          {/* LAN & WAN Speeds & Uptime Specs Box (Exact photo content) */}
          <div className="border border-[#ff003c]/50 rounded-xs bg-[#100104]/90 p-2 flex flex-col gap-1 text-[8.5px] leading-tight">
            <div className="flex items-center justify-between border-b border-[#ff003c]/30 pb-0.5">
              <span className="font-bold text-white">[UPTIME: 00 1:53]</span>
              <span className="text-[#00ff88]">POWER: AC LINE (100%)</span>
            </div>
            <div className="grid grid-cols-2 gap-x-2 pt-0.5 text-white/90">
              <div>Admin: <span className="text-[#ff3366] font-bold">Siraj [ROOT]</span></div>
              <div>System: <span className="text-white font-bold">Master-AI</span></div>
              <div>OS: <span className="text-[#ff3366]">Windows 11 / Tactical</span></div>
              <div>Battery: <span className="text-[#00ff88]">100% (AC Direct)</span></div>
              <div>LAN DN: <span className="text-white">{dlSpeed} KB/s</span></div>
              <div>LAN UP: <span className="text-white">{upSpeed} KB/s</span></div>
            </div>
          </div>
        </div>

        {/* ================= CENTER COLUMN (Lg: 6 cols) ================= */}
        <div className="lg:col-span-6 flex flex-col justify-between items-center gap-1">
          {/* Top Quick Status Pill */}
          <div className="flex items-center gap-2 bg-black/80 border border-[#ff003c]/60 px-3 py-0.5 rounded-full text-[8.5px] shadow-[0_0_15px_rgba(255,0,60,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c] animate-ping" />
            <span className="text-white font-bold tracking-wider">MASTER AI CORE // ADMIN: SIRAJ</span>
            <span className="text-[#ff6688]">|</span>
            <span className="text-[#00ff88]">MALE VOICE {isVoiceActive ? "ACTIVE" : "STANDBY"}</span>
          </div>

          {/* Symmetrical Iron Man Mask & Radiating 10 Arc Reactor Launcher Nodes */}
          <div className="flex-1 w-full flex items-center justify-center">
            <IronManRedCenterpiece state={state} onNodeClick={handleNodeAction} />
          </div>

          {/* Real-time Voice Response & Subtitle HUD overlay */}
          {(transcript || response) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-[#160206]/95 border border-[#ff003c] rounded p-2 text-[9.5px] text-white shadow-[0_0_20px_#ff003c]"
            >
              {transcript && (
                <div className="text-[#ff6688] font-bold">
                  ADMIN SIRAJ: <span className="text-white">{transcript}</span>
                </div>
              )}
              {response && (
                <div className="text-[#ff003c] font-bold mt-1">
                  MASTER: <span className="text-white">{response}</span>
                </div>
              )}
            </motion.div>
          )}

          {/* Interactive Bottom Command Input Bar */}
          <form
            onSubmit={handleFormSubmit}
            className="w-full flex items-center gap-1.5 bg-black/90 border border-[#ff003c] rounded-xs p-1 shadow-[0_0_15px_rgba(255,0,60,0.4)]"
          >
            <button
              type="button"
              onClick={onVoiceToggle}
              className={`px-2.5 py-1.5 rounded-xs flex items-center gap-1 text-[9px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                isVoiceActive
                  ? "bg-[#ff003c] text-white shadow-[0_0_12px_#ff003c]"
                  : "bg-[#200007] border border-[#ff003c]/60 text-[#ff6688] hover:bg-[#ff003c]/30"
              }`}
              title="Toggle Voice Mode"
            >
              {isVoiceActive ? <Mic size={12} className="animate-pulse" /> : <MicOff size={12} />}
              <span>{isVoiceActive ? "VOICE ON" : "VOICE"}</span>
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="COMMAND MASTER AI // ADMIN: SIRAJ..."
              className="flex-1 bg-transparent border-none outline-none text-white text-[10px] font-mono placeholder:text-white/40 px-2"
            />

            <button
              type="submit"
              className="px-3 py-1.5 bg-[#ff003c]/80 hover:bg-[#ff003c] text-white rounded-xs text-[9px] font-bold flex items-center gap-1 cursor-pointer transition-all shadow-[0_0_8px_#ff003c]"
            >
              <Send size={11} />
              <span>EXEC</span>
            </button>
          </form>
        </div>

        {/* ================= RIGHT COLUMN (Lg: 3 cols) ================= */}
        <div className="lg:col-span-3 flex flex-col justify-between gap-2">
          {/* Top Gauges Row: [SWAP] 6% & [CPU] 7% [TEMP 0.00 °C] */}
          <div className="flex gap-2">
            <div className="flex-1 border border-[#ff003c]/50 rounded-xs bg-[#100104]/90 p-1.5 flex flex-col items-center justify-center">
              <span className="text-[9px] font-bold text-white">[SWAP]</span>
              <div className="w-9 h-9 rounded-full border border-[#ff003c] flex items-center justify-center bg-black/60 my-0.5">
                <span className="text-[10px] font-black text-white">6%</span>
              </div>
              <span className="text-[7.5px] text-[#ff6688]">[OF] 7.95 GB</span>
            </div>

            <div className="flex-1 border border-[#ff003c]/50 rounded-xs bg-[#100104]/90 p-1.5 flex flex-col items-center justify-center">
              <span className="text-[9px] font-bold text-white">[CPU TEMP]</span>
              <div className="w-9 h-9 rounded-full border border-[#ff003c] flex items-center justify-center bg-black/60 my-0.5">
                <span className="text-[10px] font-black text-white">{pakTemp}°C</span>
              </div>
              <span className="text-[7.5px] text-[#00ff88]">NOMINAL</span>
            </div>

            {/* Far Right Vertical Tools Dock (Adobe & Multimedia tools) */}
            <div className="w-9 shrink-0 flex flex-col items-center gap-1.5 py-1.5 px-0.5 bg-[#120104]/90 border border-[#ff003c]/50 rounded-xs">
              <span className="text-[6.5px] font-bold text-white rotate-[-90deg] my-1 uppercase">Office</span>
              <div className="w-5 h-5 rounded bg-blue-900/40 border border-blue-400 flex items-center justify-center text-[7.5px] text-cyan-300 font-bold">Ps</div>
              <div className="w-5 h-5 rounded bg-amber-900/40 border border-amber-400 flex items-center justify-center text-[7.5px] text-amber-300 font-bold">Ai</div>
              <span className="text-[6.5px] text-[#ff6688] rotate-[-90deg] my-2">Media</span>
              <div className="w-5 h-5 rounded bg-purple-900/40 border border-purple-400 flex items-center justify-center text-[7.5px] text-purple-300 font-bold">Ae</div>
              <div className="w-5 h-5 rounded bg-green-900/40 border border-green-400 flex items-center justify-center text-[7.5px] text-green-300 font-bold">Au</div>
            </div>
          </div>

          {/* Mini Winamp Media Player HUD (matching photo) */}
          <MusicPlayerHud onSongChange={(t) => onSendText(`Playing ${t}`)} />

          {/* Weather & Time Speedometer Dial Widget (with Pakistan Live Sync!) */}
          <div className="border border-[#ff003c]/50 rounded-xs bg-[#100104]/90 p-2 flex flex-col gap-1.5">
            <div className="flex items-center justify-between border-b border-[#ff003c]/30 pb-0.5">
              <span className="text-[9px] font-bold text-white flex items-center gap-1">
                <CloudRain size={11} className="text-[#ff003c]" /> PAKISTAN & GLOBAL WEATHER
              </span>
              <span className="text-[8px] text-[#ffd700]">LIVE SYNC</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xl font-black text-white">{pakTemp}°C</span>
                <span className="text-[8px] text-[#ff6688] font-bold">{pakCondition}</span>
                <span className="text-[7.5px] text-white/80">ISB • LHR • KHI • MRE</span>
              </div>

              {/* Speedometer Radial Gauge */}
              <div className="relative w-14 h-14 rounded-full border-2 border-[#ff003c] flex items-center justify-center bg-black/70 shadow-[0_0_10px_#ff003c]">
                <div className="w-10 h-10 rounded-full border border-dashed border-[#ff6600] flex items-center justify-center">
                  <span className="text-xs font-black text-white">30°</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hard Drive E: (BackupDrive) & Live Frequency Graph */}
          <div className="border border-[#ff003c]/50 rounded-xs bg-[#100104]/90 p-2 flex flex-col gap-1">
            <div className="flex justify-between items-center text-[9px] font-bold text-white">
              <span className="flex items-center gap-1">
                <HardDrive size={10} className="text-[#ff003c]" /> E: BACKUP DRIVE
              </span>
              <span className="text-[#ff6688]">239.4 GB FREE / 270.5 GB</span>
            </div>
            <div className="w-full h-2 bg-black/80 rounded border border-[#ff003c]/40 relative overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#ff003c] to-[#ff3366] w-[88%]" />
            </div>

            {/* Live Upload & Download Speeds */}
            <div className="flex justify-between text-[8px] text-white/90 pt-0.5">
              <span>UPLOAD: <strong className="text-[#ff3366]">{upSpeed} KB/s</strong></span>
              <span>DOWNLOAD: <strong className="text-[#00ff88]">{dlSpeed} KB/s</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM TELEMETRY FOOTER & POWER CONTROLS (Exact match to Reference Photo) */}
      <div className="relative z-20 w-full flex flex-wrap items-center justify-between border-t border-[#ff003c]/40 pt-1 px-2 bg-gradient-to-t from-[#180206] to-transparent text-[8px] font-mono">
        {/* Connection Telemetry info */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-white/80">
          <div>HOST: <span className="text-[#ff3366] font-bold">MASTER-PC</span></div>
          <div>ADMIN: <span className="text-white font-bold">SIRAJ [ROOT]</span></div>
          <div>STATUS: <span className="text-[#00ff88] font-bold">CONNECTED</span></div>
          <div className="hidden md:block">LAN IP: <span className="text-white">192.168.1.105</span></div>
          <div className="hidden md:block">BANDWIDTH: <span className="text-[#ff3366]">100 MBPS</span></div>
          <div>PING: <span className="text-[#00ff88]">15 ms</span></div>
        </div>

        {/* 4 Red Power Action Buttons matching photo */}
        <div className="flex items-center gap-1.5 mt-1 sm:mt-0">
          <button
            onClick={() => handlePowerAction("Lock")}
            className="px-2 py-0.5 rounded-xs bg-black/80 border border-[#ff003c]/60 hover:bg-[#ff003c]/30 text-white flex items-center gap-1 cursor-pointer transition-all"
            title="Lock System"
          >
            <Lock size={9} className="text-[#ff3366]" />
            <span>LOCK</span>
          </button>
          <button
            onClick={() => handlePowerAction("Sleep")}
            className="px-2 py-0.5 rounded-xs bg-black/80 border border-[#ff003c]/60 hover:bg-[#ff003c]/30 text-white flex items-center gap-1 cursor-pointer transition-all"
            title="Sleep Mode"
          >
            <Moon size={9} className="text-[#ffd700]" />
            <span>SLEEP</span>
          </button>
          <button
            onClick={() => handlePowerAction("Restart")}
            className="px-2 py-0.5 rounded-xs bg-black/80 border border-[#ff003c]/60 hover:bg-[#ff003c]/30 text-white flex items-center gap-1 cursor-pointer transition-all"
            title="Restart OS"
          >
            <RotateCcw size={9} className="text-[#00ff88]" />
            <span>RESTART</span>
          </button>
          <button
            onClick={() => handlePowerAction("Shutdown")}
            className="px-2 py-0.5 rounded-xs bg-[#ff003c]/30 border border-[#ff003c] hover:bg-[#ff003c] text-white flex items-center gap-1 cursor-pointer transition-all shadow-[0_0_8px_#ff003c]"
            title="Shutdown"
          >
            <Power size={9} className="text-white" />
            <span>SHUTDOWN</span>
          </button>
        </div>
      </div>
    </div>
  );
}
