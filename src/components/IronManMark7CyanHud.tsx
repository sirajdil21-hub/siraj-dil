import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mic,
  MicOff,
  Send,
  Cpu,
  HardDrive,
  Wifi,
  Shield,
  ShieldAlert,
  Volume2,
  VolumeX,
  RefreshCw,
  Zap,
  Terminal,
  Compass,
  Layers,
  Power,
  ChevronRight,
  Radio,
  Sliders,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { cyberSynth } from "../utils/audioUtils";
import { AppState, ArmorTheme, TelemetryData } from "../types";
import CyberGlobe3D from "./CyberGlobe3D";
import IronManHelmetCenter from "./IronManHelmetCenter";
import VisualsMonitor from "./VisualsMonitor";
import SuitHologramChamber from "./SuitHologramChamber";
import VipWallpaperEngine, { VipWallpaperType } from "./VipWallpaperEngine";
import VipWallpaperSwitcher from "./VipWallpaperSwitcher";
import VipTacticalAppDock from "./VipTacticalAppDock";
import VipAppModalsContainer from "./VipAppModalsContainer";
import RealtimeBatteryIndicator from "./RealtimeBatteryIndicator";
import { getPakistanTimeInfo } from "../utils/timeUtils";

interface IronManMark7CyanHudProps {
  state: AppState;
  transcript: string;
  response: string;
  onVoiceToggle: () => void;
  onSendText: (text: string) => void;
  isVoiceActive: boolean;
  onOpenDiagnostics: () => void;
  onOpenSecurity: () => void;
  onOpenUsbFlash?: () => void;
  onOpenCodeStudio?: () => void;
  onOpenIrisAi183?: () => void;
  onSwitchToSniper057?: () => void;
}

export default function IronManMark7CyanHud({
  state,
  transcript,
  response,
  onVoiceToggle,
  onSendText,
  isVoiceActive,
  onOpenDiagnostics,
  onOpenSecurity,
  onOpenUsbFlash,
  onOpenCodeStudio,
  onOpenIrisAi183,
  onSwitchToSniper057,
}: IronManMark7CyanHudProps) {
  const [inputText, setInputText] = useState("");
  const [theme, setTheme] = useState<ArmorTheme>("cyan");
  const [currentWallpaper, setCurrentWallpaper] = useState<VipWallpaperType>("stream");
  const [activeVipApp, setActiveVipApp] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState({
    time24: "22:17",
    time12: "10:17 PM",
    seconds: "45",
    day: "SATURDAY",
    dateFull: "MARCH 21, 2015",
    dateShort: "21.03.15",
    dayShort: "Sat",
  });

  const [telemetry, setTelemetry] = useState<TelemetryData>({
    cpuUsage: 60,
    cpuSpeed: 3003,
    ramPercent: 62,
    ramUsedGB: 1.2,
    ramTotalGB: 1.9,
    batteryPercent: 100,
    uptimeSeconds: 84600,
    networkUp: 282.0,
    networkDown: 2.5,
    timeStr: "22:17",
    dateStr: "21.03.15",
    weatherCondition: "mostly cloudy",
    weatherTempC: 13,
  });

  // Dynamic live clock synced to Pakistan Standard Time (PKT - UTC+5)
  useEffect(() => {
    const updateTime = () => {
      const pkt = getPakistanTimeInfo();
      setCurrentTime({
        time24: pkt.timeHoursMinutes,
        time12: pkt.time12,
        seconds: pkt.seconds,
        day: pkt.day,
        dateFull: pkt.dateFull,
        dateShort: pkt.dateShort,
        dayShort: pkt.day.slice(0, 3),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Theme Colors
  const themeColors = {
    cyan: {
      primary: "#00f0ff",
      accent: "#ff003c",
      border: "rgba(0, 240, 255, 0.4)",
      glow: "rgba(0, 240, 255, 0.5)",
    },
    combat: {
      primary: "#ff003c",
      accent: "#ffd700",
      border: "rgba(255, 0, 60, 0.4)",
      glow: "rgba(255, 0, 60, 0.5)",
    },
    stealth: {
      primary: "#00ffaa",
      accent: "#a855f7",
      border: "rgba(0, 255, 170, 0.4)",
      glow: "rgba(0, 255, 170, 0.5)",
    },
  }[theme];

  const handleThemeChange = (newTheme: ArmorTheme) => {
    cyberSynth.playModeSwitch();
    setTheme(newTheme);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    cyberSynth.playBeep(1200, 0.04);
    onSendText(inputText.trim());
    setInputText("");
  };

  const handleQuickCommand = (cmd: string) => {
    cyberSynth.playBeep(1100, 0.04);
    onSendText(cmd);
  };

  return (
    <div className="relative w-full h-full bg-[#020912] text-[#00f0ff] font-mono select-none overflow-x-hidden overflow-y-auto flex flex-col justify-between p-2 sm:p-3">
      {/* Background Circuit Grid & Subtle Cyber Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.15) 0%, transparent 70%), linear-gradient(to right, rgba(0, 240, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 30px 30px, 30px 30px",
        }}
      />

      {/* VIP Dynamic Wallpaper Engine */}
      <VipWallpaperEngine currentWallpaper={currentWallpaper} />

      {/* Top Outer Frame Screws & Ruler Markings matching 3974763.jpg */}
      <div className="relative z-10 w-full flex items-center justify-between border-b border-[#00f0ff]/30 pb-1.5 mb-1 text-[9px]">
        {/* Top-Left Screws & Title */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-white/70">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]" />
            <span className="w-2 h-2 rounded-full border border-[#00f0ff]" />
          </div>
          <span className="font-bold tracking-widest text-white uppercase flex items-center gap-2">
            R.S. MARK VII // TACTICAL HUD
            <span className="px-1.5 py-0.2 bg-[#00f0ff] text-black text-[8px] font-black rounded">
              ROOT: SIRAJ (سراج)
            </span>
          </span>
        </div>

        {/* Center: Interactive Armor Mode Switcher & Tactical 057 HUD Switcher */}
        <div className="flex items-center gap-1">
          <span className="text-[8px] text-white/50 uppercase hidden md:inline">Armor Mode:</span>
          {(["cyan", "combat", "stealth"] as ArmorTheme[]).map((m) => (
            <button
              key={m}
              onClick={() => handleThemeChange(m)}
              className={`px-2 py-0.5 rounded text-[8px] font-black uppercase transition-all cursor-pointer border ${
                theme === m
                  ? "bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_10px_#00f0ff]"
                  : "bg-black/60 text-white/70 border-white/20 hover:border-[#00f0ff]"
              }`}
            >
              {m === "cyan" ? "MARK VII" : m === "combat" ? "WAR MACHINE" : "STEALTH"}
            </button>
          ))}

          {onSwitchToSniper057 && (
            <button
              onClick={() => {
                cyberSynth.playBeep(1200, 0.04);
                onSwitchToSniper057();
              }}
              className="ml-1 px-2 py-0.5 rounded text-[8px] font-black uppercase transition-all cursor-pointer border border-[#00f0ff] bg-[#00f0ff]/20 hover:bg-[#00f0ff] text-[#00f0ff] hover:text-black shadow-[0_0_8px_rgba(0,240,255,0.4)]"
              title="Switch to full Sniper Radical Screen 057 HUD"
            >
              🎯 HUD 057 SCREEN
            </button>
          )}

          {/* IRIS AI 1.8.3 Direct Launcher */}
          {onOpenIrisAi183 && (
            <button
              onClick={() => {
                cyberSynth.playBeep(1400, 0.04);
                onOpenIrisAi183();
              }}
              className="ml-1 px-2.5 py-0.5 rounded text-[8px] font-black uppercase transition-all cursor-pointer border border-[#00ff88] bg-gradient-to-r from-[#00ff88]/20 to-[#00f0ff]/20 hover:from-[#00ff88] hover:to-[#00f0ff] text-[#00ff88] hover:text-black shadow-[0_0_12px_rgba(0,255,136,0.4)] flex items-center gap-1"
              title="IRIS X AI v1.8.3 پرو سوٹ کھولیں"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
              <span>IRIS 1.8.3 PRO</span>
            </button>
          )}

          {/* AI Code Studio Direct Launcher */}
          {onOpenCodeStudio && (
            <button
              onClick={() => {
                cyberSynth.playBeep(1200, 0.04);
                onOpenCodeStudio();
              }}
              className="ml-1 px-2.5 py-0.5 rounded text-[8px] font-black uppercase transition-all cursor-pointer border border-[#00f0ff] bg-gradient-to-r from-[#00f0ff]/20 to-[#00ff88]/20 hover:from-[#00f0ff] hover:to-[#00ff88] text-[#00f0ff] hover:text-black shadow-[0_0_10px_rgba(0,240,255,0.4)] flex items-center gap-1"
              title="ایپس اور ویب سائٹس کا مکمل کوڈنگ اسٹرکچر کھولیں"
            >
              <span className="font-mono font-bold">&lt;/&gt;</span>
              <span>AI CODE STUDIO</span>
            </button>
          )}
        </div>

        {/* Top-Right Telemetry & Battery Readout */}
        <div className="flex items-center gap-2 sm:gap-3 text-[8.5px] text-[#00f0ff]/80">
          <RealtimeBatteryIndicator variant="mark7" />
          <span className="hidden sm:inline">ANALOG // ONLINE</span>
          <div className="flex items-center gap-1 font-bold text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
            <span>SYS: OPTIMAL</span>
          </div>
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
          <span>VIP MARK VII SUITE // ROOT: SIRAJ</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MASTER 3-COLUMN LAYOUT MATCHING 3974763.jpg */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 items-start">
        
        {/* ----------------------------------------------------------------------- */}
        {/* LEFT COLUMN (Cols: 1-3) */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-3 flex flex-col space-y-3">
          {/* 1. TOP-LEFT: Hexagonal Honeycomb Matrix & Telemetry Clock */}
          <div className="border border-[#00f0ff]/40 bg-[#020d18]/80 rounded-md p-2.5 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <div className="flex items-start justify-between">
              {/* Hexagonal Honeycomb Matrix from 3974763.jpg */}
              <div className="space-y-1">
                <div className="text-[8px] font-bold text-[#00f0ff] tracking-wider uppercase">
                  HONEYCOMB MATRIX
                </div>
                {/* SVG Honeycomb Cluster */}
                <svg viewBox="0 0 100 65" className="w-24 h-16 text-[#00f0ff]">
                  <g fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.8">
                    <polygon points="15,5 25,0 35,5 35,17 25,22 15,17" />
                    <polygon points="35,5 45,0 55,5 55,17 45,22 35,17" />
                    <polygon points="55,5 65,0 75,5 75,17 65,22 55,17" />
                    <polygon points="5,22 15,17 25,22 25,34 15,39 5,34" fill="#00f0ff" fillOpacity="0.2" />
                    <polygon points="25,22 35,17 45,22 45,34 35,39 25,34" />
                    <polygon points="45,22 55,17 65,22 65,34 55,39 45,34" fill="#00f0ff" fillOpacity="0.3" />
                    <polygon points="65,22 75,17 85,22 85,34 75,39 65,34" />
                    <polygon points="15,39 25,34 35,39 35,51 25,56 15,51" />
                    <polygon points="35,39 45,34 55,39 55,51 45,56 35,51" fill="#00f0ff" fillOpacity="0.1" />
                    <polygon points="55,39 65,34 75,39 75,51 65,56 55,51" />
                  </g>
                </svg>
              </div>

              {/* Holographic Radar with Suit Model */}
              <div className="flex flex-col items-center">
                <SuitHologramChamber type="top_radar" theme={theme} onClick={onOpenSecurity} />
              </div>
            </div>

            {/* Large Digital Clock synced to Pakistan Standard Time */}
            <div className="mt-2 pt-2 border-t border-[#00f0ff]/20">
              <div className="flex items-center justify-between">
                <div className="text-3xl font-black text-white tracking-widest leading-none drop-shadow-[0_0_12px_rgba(0,240,255,0.7)]">
                  {currentTime.time24}
                </div>
                <div className="text-[8px] font-mono text-[#00ff88] bg-[#00ff88]/10 px-1.5 py-0.5 rounded border border-[#00ff88]/40">
                  PKT (UTC+5)
                </div>
              </div>
              <div className="text-xs font-bold text-[#00f0ff] tracking-widest uppercase mt-1 flex items-center justify-between">
                <span>{currentTime.day}</span>
                <span className="text-[8px] text-[#00ff88]">پاکستان کا وقت [SAVED]</span>
              </div>
              <div className="text-[9px] text-white/70 tracking-wider">
                {currentTime.dateFull}
              </div>
            </div>
          </div>

          {/* 2. MID-LEFT: 3D Wireframe Cyber Globe & 3D Cylindrical Data Bars */}
          <div className="border border-[#00f0ff]/40 bg-[#020d18]/80 rounded-md p-2.5 shadow-[0_0_15px_rgba(0,240,255,0.2)] flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-[8px] font-bold text-[#00f0ff] pb-1 border-b border-[#00f0ff]/20">
              <span>ORBITAL DEFENSE GRID</span>
              <span className="text-[#00ff88]">SAT-LINK: ACTIVE</span>
            </div>

            {/* 3D Wireframe Globe with drag-to-rotate */}
            <div className="my-1">
              <CyberGlobe3D themeColor={themeColors.primary} size={150} />
            </div>

            {/* 3D Isometric Cylindrical Data Bars & Large RAM stats from 3974763.jpg */}
            <div className="w-full flex items-end justify-between pt-2 border-t border-[#00f0ff]/20">
              {/* Stacked 3D Isometric Cylinders */}
              <div className="flex items-end gap-1.5 h-16">
                {[
                  { h: 32, label: "L1" },
                  { h: 48, label: "L2" },
                  { h: 60, label: "L3" },
                  { h: 40, label: "L4" },
                ].map((col, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className="w-4 rounded-t border border-[#00f0ff] bg-gradient-to-t from-[#00f0ff]/30 to-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.4)]"
                      style={{ height: `${col.h}px` }}
                    />
                    <span className="text-[7px] text-white/60 mt-0.5">{col.label}</span>
                  </div>
                ))}
              </div>

              {/* Large Typography: `62 RAM` and `100%` from 3974763.jpg */}
              <div className="text-right">
                <div className="text-3xl font-black text-white leading-none">
                  {telemetry.ramPercent}
                </div>
                <div className="text-sm font-bold text-[#00f0ff] tracking-widest">
                  RAM
                </div>
                <div className="text-[9px] text-[#00ff88] font-bold mt-1">
                  100% HEALTH
                </div>
              </div>
            </div>
          </div>

          {/* 3. BOTTOM-LEFT: Flight Avionics Gauge & Windows Orb Shortcuts */}
          <div className="border border-[#00f0ff]/40 bg-[#020d18]/80 rounded-md p-2 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <div className="flex items-center justify-between">
              {/* Avengers "A" circular dial & flight meter from 3974763.jpg */}
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full border-2 border-[#00f0ff] flex items-center justify-center bg-black/60 shadow-[0_0_8px_#00f0ff]">
                  <span className="text-base font-black text-white italic">A</span>
                </div>
                <div>
                  <div className="text-[8px] text-[#00f0ff] font-bold tracking-wider">
                    FLIGHT AVIONICS
                  </div>
                  <div className="text-sm font-black text-white">
                    {currentTime.time12}
                  </div>
                  <div className="text-[7.5px] text-white/60">
                    DATE: {currentTime.dateShort}
                  </div>
                </div>
              </div>

              {/* Flight mode status */}
              <div className="text-right text-[7.5px] text-[#00ff88]">
                <div className="font-bold">FLIGHT MODE</div>
                <div className="text-white/70">ENGAGED</div>
              </div>
            </div>

            {/* Quick Drive Shortcuts matching 3974763.jpg: `[C:] [D:] [CPU] [RAM]` */}
            <div className="flex items-center justify-between gap-1 mt-2 pt-1.5 border-t border-[#00f0ff]/20 text-[8px] font-bold">
              {[
                { label: "C:", sub: "98G" },
                { label: "D:", sub: "500G" },
                { label: "CPU", sub: "3.0G" },
                { label: "RAM", sub: "1.9G" },
              ].map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    cyberSynth.playBeep(900, 0.03);
                    onOpenDiagnostics();
                  }}
                  className="flex-1 py-1 bg-black/60 hover:bg-[#00f0ff]/20 border border-[#00f0ff]/40 rounded text-center text-[#00f0ff] hover:text-white transition-all cursor-pointer"
                >
                  <div className="leading-tight">{btn.label}</div>
                  <div className="text-[6.5px] text-white/50">{btn.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* CENTER COLUMN (Cols: 4-8) - IRON MAN HELMET & ARC REACTOR */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-6 flex flex-col items-center justify-between min-h-[460px]">
          {/* Centerpiece: Symmetrical Glowing Iron Man Helmet, Collar & Arc Reactor */}
          <div className="w-full flex-1 flex flex-col items-center justify-center">
            <IronManHelmetCenter
              state={state}
              theme={theme}
              onReactorClick={onVoiceToggle}
              onHelmetClick={onOpenDiagnostics}
            />
          </div>

          {/* AI Response Display & Live Voice Assistant Bubble */}
          <div className="w-full max-w-xl mt-2 bg-[#020d18]/90 border-2 border-[#00f0ff] rounded-lg p-3 shadow-[0_0_25px_rgba(0,240,255,0.3)] space-y-2">
            <div className="flex items-center justify-between border-b border-[#00f0ff]/30 pb-1.5">
              <div className="flex items-center gap-2">
                <Radio
                  size={14}
                  className={`${
                    state === "speaking"
                      ? "text-[#00ff88] animate-spin"
                      : state === "listening"
                      ? "text-[#ff003c] animate-pulse"
                      : "text-[#00f0ff]"
                  }`}
                />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                  MASTER AI VOICE CORE // SIRAJ COMMAND CENTER
                </span>
              </div>

              {/* Status Indicator Pill */}
              <div className="flex items-center gap-1 text-[8.5px]">
                <span
                  className={`w-2 h-2 rounded-full ${
                    state === "speaking"
                      ? "bg-[#00ff88] animate-ping"
                      : state === "listening"
                      ? "bg-[#ff003c] animate-ping"
                      : "bg-[#00f0ff]"
                  }`}
                />
                <span className="font-bold uppercase text-white">
                  {state === "speaking"
                    ? "SPEAKING"
                    : state === "listening"
                    ? "LISTENING..."
                    : state === "processing"
                    ? "THINKING..."
                    : "ONLINE"}
                </span>
              </div>
            </div>

            {/* Dynamic Response Box */}
            <div className="text-xs text-[#00f0ff] leading-relaxed max-h-20 overflow-y-auto font-mono">
              {transcript && (
                <div className="text-[#00ff88] font-bold text-[10px] mb-1">
                  سراج: "{transcript}"
                </div>
              )}
              <div className="text-white text-xs">{response}</div>
            </div>

            {/* Command Text Input & Voice Trigger Bar */}
            <form onSubmit={handleFormSubmit} className="flex items-center gap-1.5 pt-1 border-t border-[#00f0ff]/20">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="حکم کریں سراج... یا بولنے کے لیے مائیک دبائیں"
                className="flex-1 bg-black/80 border border-[#00f0ff]/50 rounded px-2.5 py-1 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#00f0ff] shadow-inner font-mono"
              />

              {/* Send Button */}
              <button
                type="submit"
                className="px-3 py-1 bg-[#00f0ff] hover:bg-white text-black font-black text-xs rounded transition-all cursor-pointer shadow-[0_0_10px_#00f0ff]"
              >
                <Send size={12} />
              </button>

              {/* Microphone / Voice Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  cyberSynth.playBeep(900, 0.04);
                  onVoiceToggle();
                }}
                className={`p-1.5 rounded border transition-all cursor-pointer ${
                  isVoiceActive
                    ? "bg-[#ff003c] border-[#ff003c] text-white animate-pulse shadow-[0_0_12px_#ff003c]"
                    : "bg-black/60 border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/30"
                }`}
                title="Toggle Voice Assistant"
              >
                {isVoiceActive ? <Mic size={14} /> : <MicOff size={14} />}
              </button>
            </form>

            {/* Quick Tactical Command Pills for Siraj */}
            <div className="flex flex-wrap items-center gap-1 pt-1 text-[8px]">
              <span className="text-white/50">فوری حکم:</span>
              {[
                "موسم کا حال بتاؤ",
                "سسٹم ڈائیگنوسٹک",
                "کیمرہ اسکینر کھولو",
                "سیکیورٹی ایکٹیو کرو",
                "USB فل فلیش",
              ].map((cmd, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleQuickCommand(cmd)}
                  className="px-1.5 py-0.5 rounded bg-black/60 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/30 hover:border-[#00f0ff] transition-all cursor-pointer"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* RIGHT COLUMN (Cols: 9-12) */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-3 flex flex-col space-y-3">
          {/* 1. TOP-RIGHT: "Visuals" Monitor Screen & Power Controls */}
          <div className="border border-[#00f0ff]/40 bg-[#020d18]/80 rounded-md p-2.5 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <VisualsMonitor
              theme={theme}
              onOpenDiagnostics={onOpenDiagnostics}
              onOpenSecurity={onOpenSecurity}
              onOpenUsbFlash={onOpenUsbFlash}
            />
          </div>

          {/* 2. MID-RIGHT: Weather & Atmospheric Analysis Radar + Multi-Ring CPU/RAM Gauges */}
          <div className="border border-[#00f0ff]/40 bg-[#020d18]/80 rounded-md p-2.5 shadow-[0_0_15px_rgba(0,240,255,0.2)] space-y-2">
            {/* Atmospheric Analysis Scope from 3974763.jpg */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white tracking-wider lowercase">
                  mostly cloudy
                </div>
                <div className="text-[8px] text-[#00f0ff]/80 uppercase">
                  Atmospheric Analysis
                </div>
              </div>

              {/* Radar Reticle Crosshairs scope */}
              <div className="relative w-12 h-12 rounded-full border border-[#00f0ff] flex items-center justify-center bg-black/60 shadow-[0_0_8px_rgba(0,240,255,0.4)]">
                <div className="w-8 h-8 rounded-full border border-dashed border-[#00f0ff]/60 animate-spin" />
                <div className="w-4 h-4 rounded-full border border-[#ff003c]" />
                <span className="w-1 h-1 rounded-full bg-[#ff003c]" />
              </div>
            </div>

            {/* Multi-Ring CPU & RAM Speedometer Dials from 3974763.jpg */}
            <div className="pt-2 border-t border-[#00f0ff]/20 flex items-center justify-between">
              {/* CPU Gauge */}
              <div className="flex flex-col items-center">
                <div className="text-[7.5px] text-white/60 uppercase">CPU SPEED</div>
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#003344" strokeWidth="4" />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="#00f0ff"
                      strokeWidth="4"
                      strokeDasharray="201"
                      strokeDashoffset={201 - (201 * telemetry.cpuUsage) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-black text-white">{telemetry.cpuUsage}%</span>
                    <span className="text-[6.5px] text-[#00f0ff]">3003 MHz</span>
                  </div>
                </div>
                <span className="text-[7.5px] font-bold text-[#00f0ff]">3003 MHz</span>
              </div>

              {/* RAM Concentric Dial */}
              <div className="flex flex-col items-center">
                <div className="text-[7.5px] text-white/60 uppercase">RAM MEMORY</div>
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#003344" strokeWidth="4" />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="#00ff88"
                      strokeWidth="4"
                      strokeDasharray="201"
                      strokeDashoffset={201 - (201 * telemetry.ramPercent) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-black text-white">{telemetry.ramPercent}%</span>
                    <span className="text-[6.5px] text-white/60">1.2 GB</span>
                  </div>
                </div>
                <span className="text-[7.5px] font-bold text-[#00ff88]">Of 1.9 GB</span>
              </div>
            </div>
          </div>

          {/* 3. BOTTOM-RIGHT: "ONLINE" Holographic Suit Armor Chamber & Status Box */}
          <div className="border border-[#00f0ff]/40 bg-[#020d18]/80 rounded-md p-2.5 shadow-[0_0_15px_rgba(0,240,255,0.2)] flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-[8px] font-bold text-[#00f0ff] pb-1 border-b border-[#00f0ff]/20">
              <span>MARK VII ARMOR POD</span>
              <span className="text-white/60">21 | Sat</span>
            </div>

            {/* Circular Suit Pod with Kneeling/Standing Hologram (from 3974763.jpg) */}
            <div className="my-1">
              <SuitHologramChamber type="bottom_online" theme={theme} onClick={onOpenDiagnostics} />
            </div>

            {/* Status Bracket from 3974763.jpg: `STATUS 0 ITMS, 0.00 B` + Media Buttons */}
            <div className="w-full mt-3 pt-2 border-t border-[#00f0ff]/20 flex items-center justify-between text-[8px] font-mono">
              <div>
                <span className="text-white/60">STATUS:</span>{" "}
                <span className="text-[#00ff88] font-bold">0 ITMS, 0.00 B</span>
              </div>

              {/* Media Player bracket buttons: `|<< << [] >> >>|` from 3974763.jpg */}
              <div className="flex items-center gap-1 text-[#00f0ff]">
                <button
                  onClick={() => cyberSynth.playBeep(700, 0.02)}
                  className="hover:text-white cursor-pointer"
                >
                  |◄
                </button>
                <button
                  onClick={() => cyberSynth.playBeep(750, 0.02)}
                  className="hover:text-white cursor-pointer"
                >
                  ◄◄
                </button>
                <button
                  onClick={() => cyberSynth.playBeep(800, 0.02)}
                  className="hover:text-white cursor-pointer"
                >
                  ■
                </button>
                <button
                  onClick={() => cyberSynth.playBeep(850, 0.02)}
                  className="hover:text-white cursor-pointer"
                >
                  ►►
                </button>
                <button
                  onClick={() => cyberSynth.playBeep(900, 0.02)}
                  className="hover:text-white cursor-pointer"
                >
                  ►|
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* VIP TACTICAL APPS SUITE (8 Full Featured Interactive Apps) */}
      <div className="relative z-10 w-full my-2">
        <VipTacticalAppDock
          onOpenApp={(appId) => {
            if (appId === "iris_ai_183") {
              onOpenIrisAi183?.();
            } else if (appId === "code_studio") {
              onOpenCodeStudio?.();
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
        onOpenSecurity={onOpenSecurity}
        onOpenCodeStudio={onOpenCodeStudio}
        onOpenIrisAi183={onOpenIrisAi183}
      />

      {/* Bottom Taskbar Status Line matching 3974763.jpg */}
      <div className="relative z-10 w-full flex items-center justify-between border-t border-[#00f0ff]/30 pt-1.5 mt-2 text-[8px] text-[#00f0ff]/80">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold">STARK INDUSTRIES AI OPERATING SYSTEM v7.4</span>
          <span>BAUD: 115200</span>
          <span>IP: 91.219.164.5</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Direct USB Flash & Hard Reset button */}
          <button
            onClick={onOpenUsbFlash}
            className="px-2 py-0.5 rounded bg-[#ff003c]/20 hover:bg-[#ff003c] text-[#ff003c] hover:text-white border border-[#ff003c] text-[8px] font-black transition-all cursor-pointer flex items-center gap-1 shadow-[0_0_8px_rgba(255,0,60,0.3)]"
          >
            <Zap size={10} />
            USB ڈیٹا کیبل فل فلیش
          </button>

          <span className="text-white/60">ROOT ADMIN: SIRAJ (سراج)</span>
        </div>
      </div>
    </div>
  );
}
