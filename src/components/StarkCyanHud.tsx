import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Radio,
  Wifi,
  Power,
  RefreshCw,
  HardDrive,
  Trash2,
  Mail,
  Film,
  Camera,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Square,
  Sliders,
  Terminal,
  Activity,
  Maximize2,
  Minimize2,
  Compass,
  Layers,
  Cpu,
  Zap,
} from "lucide-react";
import { cyberSynth } from "../utils/audioUtils";

interface StarkCyanHudProps {
  state: "idle" | "listening" | "processing" | "speaking";
  transcript: string;
  response: string;
  onVoiceToggle: () => void;
  onSendText: (text: string) => void;
  isVoiceActive: boolean;
  onOpenDiagnostics: () => void;
  onOpenSecurity: () => void;
  onOpenUsbFlash?: () => void;
}

export default function StarkCyanHud({
  state,
  transcript,
  response,
  onVoiceToggle,
  onSendText,
  isVoiceActive,
  onOpenDiagnostics,
  onOpenSecurity,
  onOpenUsbFlash,
}: StarkCyanHudProps) {
  const [inputText, setInputText] = useState("");
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);
  const [trackProgress, setTrackProgress] = useState(38); // 01:06 / 02:40
  const [volumeLevel, setVolumeLevel] = useState(85);
  const [cpuCore0, setCpuCore0] = useState(74);
  const [cpuCore1, setCpuCore1] = useState(57);
  const [ramUsage, setRamUsage] = useState(75);
  const [swapUsage, setSwapUsage] = useState(49);
  const [dlSpeed, setDlSpeed] = useState(2.5);
  const [upSpeed, setUpSpeed] = useState(282.0);
  const [currentTime, setCurrentTime] = useState({
    hour: "01",
    minute: "06",
    second: "39",
    dayName: "Четверг",
    dayNum: 21,
    monthName: "Июнь",
  });
  const [activeTab, setActiveTab] = useState<string>("Programs");
  const [showVoiceDrawer, setShowVoiceDrawer] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Live time ticker & stats fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime({
        hour: String(now.getHours()).padStart(2, "0"),
        minute: String(now.getMinutes()).padStart(2, "0"),
        second: String(now.getSeconds()).padStart(2, "0"),
        dayName: "Четверг",
        dayNum: 21,
        monthName: "Июнь",
      });

      // Subtle dynamic HUD fluctuations
      setCpuCore0((prev) => Math.min(98, Math.max(30, prev + Math.floor(Math.random() * 7 - 3))));
      setCpuCore1((prev) => Math.min(95, Math.max(25, prev + Math.floor(Math.random() * 7 - 3))));
      setDlSpeed((prev) => +(Math.max(0.8, prev + (Math.random() * 0.6 - 0.3))).toFixed(1));
      setUpSpeed((prev) => +(Math.max(120, prev + (Math.random() * 12 - 6))).toFixed(1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Oscilloscope & Waveform Background Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.04;

      const w = canvas.width;
      const h = canvas.height;

      // Draw subtle background circuit lines
      ctx.strokeStyle = "rgba(0, 240, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let y = 40; y < h; y += 80) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      for (let x = 60; x < w; x += 120) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      ctx.stroke();

      // Oscilloscope waveform for upload/download (Bottom Right)
      const graphY = h * 0.82;
      const graphX = w * 0.58;
      const graphW = w * 0.28;

      ctx.strokeStyle = "rgba(0, 240, 255, 0.75)";
      ctx.lineWidth = 1.2;
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 6;

      ctx.beginPath();
      for (let i = 0; i < graphW; i += 3) {
        const freq1 = Math.sin((i * 0.08) + t * 3) * 6;
        const freq2 = Math.cos((i * 0.15) - t * 2) * 4;
        const noise = (Math.random() - 0.5) * (isPlayingMusic ? 5 : 2);
        const y = graphY + freq1 + freq2 + noise;
        if (i === 0) ctx.moveTo(graphX + i, y);
        else ctx.lineTo(graphX + i, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isPlayingMusic]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    cyberSynth.playBeep(900, 0.04);
    onSendText(inputText.trim());
    setInputText("");
  };

  return (
    <div className="relative w-full h-full min-h-screen bg-[#010912] text-[#00f0ff] font-mono select-none overflow-x-hidden overflow-y-auto sm:overflow-hidden flex flex-col justify-between p-1 sm:p-2.5">
      {/* Background Interactive Oscilloscope & Cyber Trace Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-80" />

      {/* Ambient Radial Cyan Glow Centers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(0,240,255,0.09)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/5 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,200,255,0.06)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* 1. TOP NUMBERED CALIBRATION RULER (01 to 30) with [21] Highlighted */}
      {/* ========================================================================= */}
      <header className="relative z-10 w-full flex flex-col gap-1 border-b border-[#00f0ff]/30 pb-1 px-1 sm:px-3 bg-gradient-to-b from-[#021526]/80 to-transparent">
        {/* Number scale line */}
        <div className="flex items-center justify-between text-[8.5px] sm:text-[10px] md:text-[11px] font-mono text-[#00f0ff]/60 tracking-wider overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
          {Array.from({ length: 30 }, (_, i) => {
            const numStr = String(i + 1).padStart(2, "0");
            const isSelected = i + 1 === 21;
            return (
              <span
                key={numStr}
                className={`px-1 sm:px-1.5 py-0.5 cursor-pointer transition-all ${
                  isSelected
                    ? "bg-[#00f0ff] text-black font-black shadow-[0_0_12px_#00f0ff] rounded-sm scale-110"
                    : "hover:text-[#00f0ff] hover:scale-105"
                }`}
              >
                {numStr}
              </span>
            );
          })}
        </div>

        {/* Top Secondary Header Bar: Digital Clock, Track Title, RAM Gauge, Mini Timer & Volume */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
          {/* Top Left: Day & Digital Time */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#00f0ff]/70 tracking-widest uppercase">
                {currentTime.dayName}
              </span>
              <div className="flex items-center gap-1.5 border border-[#00f0ff]/60 bg-black/60 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(0,240,255,0.25)]">
                <span className="text-[#00f0ff] text-xs sm:text-sm font-bold tracking-widest">
                  {currentTime.hour} : {currentTime.minute}
                </span>
                <span className="text-[9px] text-[#00f0ff]/70 font-mono">
                  {currentTime.second}
                </span>
              </div>
            </div>
          </div>

          {/* Top Center: Track Title "Laichzeit" - "Rammstein" with HUD Lines */}
          <div className="flex items-center gap-3">
            <div className="text-center flex flex-col items-center">
              <div className="flex items-center gap-2">
                <span className="w-6 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#00f0ff]" />
                <h1
                  className="text-base sm:text-lg font-black tracking-wider uppercase text-white drop-shadow-[0_0_10px_#00f0ff]"
                  style={{ fontFamily: "'Eurostile', 'Orbitron', sans-serif" }}
                >
                  Laichzeit
                </h1>
                <span className="w-6 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#00f0ff]" />
              </div>
              <span className="text-[9px] sm:text-[10px] text-[#00f0ff]/80 tracking-[0.25em] uppercase">
                ═ Rammstein ═
              </span>
            </div>

            {/* RAM: 75 / SWAP: 49 Circular Gauge */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="#003554"
                  strokeWidth="2.5"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2.5"
                  strokeDasharray={`${ramUsage} 100`}
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_6px_#00f0ff]"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="11"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="1.5"
                  strokeDasharray={`${swapUsage} 100`}
                  opacity="0.7"
                />
              </svg>
              <div className="absolute text-center flex flex-col text-[7.5px] leading-tight text-white font-bold">
                <span>RAM: <span className="text-[#00f0ff]">{ramUsage}</span></span>
                <span>SWAP: <span className="text-[#00f0ff]">{swapUsage}</span></span>
              </div>
            </div>

            {/* Media Controls ◄◄ || ►► */}
            <div className="flex items-center gap-1 bg-black/50 border border-[#00f0ff]/40 px-1.5 py-0.5 rounded text-[10px]">
              <button
                onClick={() => {
                  cyberSynth.playBeep(600, 0.04);
                  setTrackProgress((p) => Math.max(0, p - 10));
                }}
                className="hover:text-white p-0.5 cursor-pointer"
              >
                ◄◄
              </button>
              <button
                onClick={() => {
                  cyberSynth.playBeep(800, 0.04);
                  setIsPlayingMusic(!isPlayingMusic);
                }}
                className="hover:text-white px-1 text-white font-bold cursor-pointer"
              >
                {isPlayingMusic ? "||" : "►"}
              </button>
              <button
                onClick={() => {
                  cyberSynth.playBeep(950, 0.04);
                  setTrackProgress((p) => Math.min(100, p + 10));
                }}
                className="hover:text-white p-0.5 cursor-pointer"
              >
                ►►
              </button>
            </div>
          </div>

          {/* Top Right: Clock Meter 2:40 & Volume Slider & News List */}
          <div className="flex items-center gap-3">
            {/* Clock Gauge 2:40 */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r="17"
                  fill="none"
                  stroke="#003554"
                  strokeWidth="2"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="17"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2.5"
                  strokeDasharray="75 25"
                  className="drop-shadow-[0_0_6px_#00f0ff]"
                />
              </svg>
              <span className="absolute text-xs sm:text-sm font-bold text-white tracking-widest drop-shadow-[0_0_6px_#00f0ff]">
                2:40
              </span>
            </div>

            {/* Volume Vertical Slider */}
            <div className="flex items-center gap-1.5">
              <Volume2 size={16} className="text-[#00f0ff] animate-pulse" />
              <div className="relative h-12 w-2 bg-black/70 border border-[#00f0ff]/50 rounded-full flex flex-col justify-end p-0.5">
                <div
                  className="w-full bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]"
                  style={{ height: `${volumeLevel}%` }}
                />
              </div>
            </div>

            {/* News / Links Column ("Новости") */}
            <div className="hidden lg:flex flex-col text-[8.5px] leading-tight text-right text-[#00f0ff]/80">
              <span className="text-[9px] text-[#00f0ff] font-bold tracking-wider">
                Новости
              </span>
              <a href="#kinopoisk" className="hover:text-white transition-colors">
                Kinopoisk
              </a>
              <a href="#bronenosets" className="hover:text-white transition-colors">
                Броненосец
              </a>
              <a href="#bagrovy" className="hover:text-white transition-colors">
                Багровый цвет снегопада
              </a>
              <a href="#muzyka" className="hover:text-white transition-colors">
                Музыка нас связала
              </a>
              <a href="#gavr" className="hover:text-white transition-colors">
                Гавр
              </a>
              <a href="#klub" className="hover:text-white transition-colors">
                Клуб безбашенных
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN TRIPLE-SECTION DESKTOP (Left Controls | Center Arc Reactor | Right Weather) */}
      {/* ========================================================================= */}
      <main className="relative z-10 w-full flex-1 grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4 my-1 items-center">
        {/* ----------------------------------------------------------------------- */}
        {/* LEFT COLUMN: Calendar Gauge, CPU, Drive, Stark Expo 2010, Power, Comm */}
        {/* ----------------------------------------------------------------------- */}
        <section className="md:col-span-3 flex flex-col justify-between gap-3 text-xs pr-1">
          {/* Top Left: "Июнь 21" Calendar Circular Dial & CPU Gauge */}
          <div className="flex items-center gap-3">
            {/* June 21 Dial */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#003554"
                  strokeWidth="3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="3"
                  strokeDasharray="220 70"
                  className="drop-shadow-[0_0_10px_#00f0ff]"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="37"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="1.5"
                  strokeDasharray="8 6"
                  opacity="0.8"
                />
                {/* Pointer triangles */}
                <polygon points="50,2 47,8 53,8" fill="#00f0ff" />
                <polygon points="50,98 47,92 53,92" fill="#00f0ff" />
              </svg>
              <div className="absolute text-center flex flex-col items-center">
                <span className="text-[11px] text-[#00f0ff]/90 tracking-widest uppercase">
                  Июнь
                </span>
                <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_0_12px_#00f0ff]">
                  21
                </span>
              </div>
            </div>

            {/* CPU Gauge (CPU: 0: 74, 1: 57) */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="#003554"
                  strokeWidth="4"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="4"
                  strokeDasharray={`${cpuCore0 * 2.1} 220`}
                  className="drop-shadow-[0_0_8px_#00f0ff]"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="26"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2.5"
                  strokeDasharray={`${cpuCore1 * 1.6} 170`}
                  opacity="0.85"
                />
              </svg>
              <div className="absolute text-center flex flex-col text-[8.5px] leading-tight text-white font-bold">
                <span className="text-[#00f0ff] font-mono">CPU:</span>
                <span>0: <span className="text-[#00f0ff]">{cpuCore0}</span></span>
                <span>1: <span className="text-[#00f0ff]">{cpuCore1}</span></span>
              </div>
            </div>
          </div>

          {/* Hard Drive Section: "Полный объем: 100 G", "Локальный диск", "Свободно: 2 G" */}
          <div className="flex items-center gap-2.5 bg-[#021526]/50 border-l-2 border-[#00f0ff] p-1.5 rounded-r">
            <div className="w-8 h-8 rounded-full border border-[#00f0ff] flex items-center justify-center text-[#00f0ff] animate-[spin_8s_linear_infinite]">
              <HardDrive size={16} />
            </div>
            <div className="text-[9px] leading-tight">
              <div>Полный объем: <span className="text-white font-bold">100 G</span></div>
              <div className="text-[#00f0ff] font-bold">Локальный диск [C:]</div>
              <div>Свободно: <span className="text-white font-bold">2 G</span></div>
            </div>
          </div>

          {/* Holographic "STARK EXPO 2010." Logo & Electrons */}
          <div className="relative py-1 flex items-center justify-start gap-2">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 border border-[#00f0ff]/50 rounded-full animate-[spin_4s_linear_infinite]" />
              <div className="absolute inset-1 border border-dashed border-[#00f0ff]/70 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
            </div>
            <div>
              <span className="text-[7.5px] tracking-widest text-[#00f0ff]/70 uppercase block">
                STARK
              </span>
              <h3
                className="text-xl sm:text-2xl font-black tracking-wider text-white drop-shadow-[0_0_15px_#00f0ff] uppercase leading-none"
                style={{ fontFamily: "'Eurostile', 'Orbitron', sans-serif" }}
              >
                EXPO
              </h3>
              <span className="text-[9px] font-mono text-[#00f0ff] tracking-widest">
                2010.
              </span>
            </div>
          </div>

          {/* Energy 100% / Энергия 100% Высокий & Корзина 0 Файлов */}
          <div className="grid grid-cols-2 gap-2 text-[8.5px]">
            {/* Energy Dial */}
            <div className="p-1.5 border border-[#00f0ff]/40 bg-black/40 rounded flex items-center gap-1.5">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 30 30">
                  <circle cx="15" cy="15" r="12" fill="none" stroke="#003554" strokeWidth="2" />
                  <circle
                    cx="15"
                    cy="15"
                    r="12"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="2.5"
                    strokeDasharray="75 25"
                  />
                </svg>
                <span className="absolute text-[8px] font-bold text-white">100%</span>
              </div>
              <div>
                <span className="text-white font-bold block">Энергия</span>
                <span className="text-[#00ff88]">Высокий</span>
              </div>
            </div>

            {/* Trash Bin */}
            <div className="p-1.5 border border-[#00f0ff]/40 bg-black/40 rounded flex items-center gap-1.5">
              <Trash2 size={16} className="text-[#00f0ff]" />
              <div>
                <span className="text-white font-bold block">Корзина</span>
                <span className="text-[#00f0ff]/70">0 Файлов</span>
              </div>
            </div>
          </div>

          {/* System Uptime: "Время работы: 1 д 4 ч 0 мин" */}
          <div className="text-[8.5px] text-[#00f0ff]/80 font-mono">
            Время работы: <span className="text-white font-bold">1 д 4 ч 0 мин</span>
          </div>

          {/* Windows Start Orb & Communication Links */}
          <div className="flex items-center gap-2 pt-1 border-t border-[#00f0ff]/30">
            {/* Windows Orb */}
            <div className="w-8 h-8 rounded-full border-2 border-[#00f0ff] bg-[#00f0ff]/20 flex items-center justify-center text-white shadow-[0_0_12px_#00f0ff] cursor-pointer hover:scale-110 transition-transform">
              <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                <span className="bg-[#ff3b30] rounded-tl-sm" />
                <span className="bg-[#34c759] rounded-tr-sm" />
                <span className="bg-[#007aff] rounded-bl-sm" />
                <span className="bg-[#ffcc00] rounded-br-sm" />
              </div>
            </div>

            <div className="text-[8px] leading-tight">
              <div className="text-white font-bold">Коммуникация: Новых писем</div>
              <div className="text-[#00f0ff]/70 flex items-center gap-1">
                <span>► Mail.ru Агент</span>
                <span>► Вконтакте Агент</span>
              </div>
            </div>
          </div>

          {/* Bottom Left Speedometer (0.0k / 1.6k) & IP Address */}
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#003554" strokeWidth="2" />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2"
                  strokeDasharray="40 50"
                  className="drop-shadow-[0_0_6px_#00f0ff]"
                />
              </svg>
              <div className="absolute text-[7px] text-white font-bold text-center leading-none">
                <div>0.0k</div>
                <div className="text-[#00f0ff]">1.6k</div>
              </div>
            </div>
            <div className="text-[9px] font-mono text-white font-bold">
              IP: <span className="text-[#00f0ff]">91.219.164.5</span>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------- */}
        {/* CENTER COLUMN: The Iconic Concentric Arc Reactor & Orbital Nodes */}
        {/* ----------------------------------------------------------------------- */}
        <section className="md:col-span-6 flex flex-col items-center justify-center relative my-2 sm:my-0">
          {/* Main Giant Multi-Ring Arc Reactor */}
          <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] flex items-center justify-center">
            {/* Outer Radial Segmented Ticks Circle */}
            <svg
              className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite]"
              viewBox="0 0 400 400"
            >
              {/* Radial Ticks */}
              {Array.from({ length: 60 }).map((_, i) => (
                <line
                  key={i}
                  x1="200"
                  y1="10"
                  x2="200"
                  y2={i % 5 === 0 ? "24" : "18"}
                  stroke={i % 5 === 0 ? "#00f0ff" : "rgba(0, 240, 255, 0.4)"}
                  strokeWidth={i % 5 === 0 ? "2" : "1"}
                  transform={`rotate(${i * 6} 200 200)`}
                />
              ))}
              <circle
                cx="200"
                cy="200"
                r="175"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="1.5"
                strokeDasharray="15 25 5 25"
                opacity="0.75"
              />
            </svg>

            {/* Counter-Rotating Mid Track with Red Accent Arc (Upper Left) */}
            <svg
              className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] animate-[spin_25s_linear_infinite_reverse]"
              viewBox="0 0 360 360"
            >
              <circle
                cx="180"
                cy="180"
                r="150"
                fill="none"
                stroke="#003554"
                strokeWidth="4"
              />
              <circle
                cx="180"
                cy="180"
                r="150"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="4"
                strokeDasharray="180 300"
                className="drop-shadow-[0_0_12px_#00f0ff]"
              />
              {/* Distinctive Red Accent Arc from the Reference Photo */}
              <circle
                cx="180"
                cy="180"
                r="150"
                fill="none"
                stroke="#ff003c"
                strokeWidth="6"
                strokeDasharray="70 800"
                strokeDashoffset="120"
                className="drop-shadow-[0_0_15px_#ff003c]"
              />
              <circle
                cx="180"
                cy="180"
                r="130"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="1.5"
                strokeDasharray="6 10"
                opacity="0.8"
              />
            </svg>

            {/* Inner Segmented Cyan Dial */}
            <svg
              className="absolute inset-12 w-[calc(100%-96px)] h-[calc(100%-96px)] animate-[spin_15s_linear_infinite]"
              viewBox="0 0 300 300"
            >
              <circle
                cx="150"
                cy="150"
                r="110"
                fill="none"
                stroke="#00f0ff"
                strokeWidth="2.5"
                strokeDasharray="30 20 60 20"
              />
              <circle
                cx="150"
                cy="150"
                r="90"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="3"
                strokeDasharray="120 120"
                opacity="0.9"
              />
            </svg>

            {/* Glowing Core Reactor Sphere (Interactive Voice Core) */}
            <motion.div
              onClick={() => {
                cyberSynth.playBeep(1100, 0.05);
                onVoiceToggle();
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="relative z-20 w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-[#00f0ff] bg-gradient-to-br from-[#00f0ff] via-[#0077b6] to-[#010912] shadow-[0_0_40px_#00f0ff,inset_0_0_30px_#ffffff] flex flex-col items-center justify-center cursor-pointer group"
            >
              {/* Inner Pulsating Iris */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/80 bg-[radial-gradient(circle,#ffffff_0%,#00f0ff_60%,#010912_100%)] flex items-center justify-center transition-all ${
                  isVoiceActive || state === "speaking" ? "animate-pulse scale-110 shadow-[0_0_30px_#ffffff]" : ""
                }`}
              >
                {isVoiceActive ? (
                  <Mic size={24} className="text-black drop-shadow-[0_0_6px_#ffffff]" />
                ) : (
                  <Zap size={22} className="text-black drop-shadow-[0_0_6px_#00f0ff]" />
                )}
              </div>
              <span className="text-[7.5px] font-mono text-black font-black uppercase tracking-widest mt-1 bg-[#00f0ff] px-1 rounded">
                {isVoiceActive ? "MASTER ACTIVE" : "TAP TO TALK"}
              </span>
            </motion.div>

            {/* Orbiting Orbital Text Labels (Exact from Photo) */}
            {/* Top Node: Dead Space */}
            <div className="absolute top-8 left-1/3 text-[10px] sm:text-[11px] font-bold text-white tracking-widest uppercase hover:text-[#00f0ff] cursor-pointer drop-shadow-[0_0_8px_#00f0ff]">
              Dead Space
            </div>
            {/* Top-Left: Limbo */}
            <div className="absolute top-14 left-16 text-[9.5px] sm:text-[10px] font-bold text-[#00f0ff] tracking-wider uppercase hover:text-white cursor-pointer">
              Limbo
            </div>
            {/* Left Upper: Bastion */}
            <div className="absolute top-24 left-10 text-[9.5px] sm:text-[10px] font-bold text-white tracking-wider uppercase hover:text-[#00f0ff] cursor-pointer">
              Bastion
            </div>
            {/* Left Mid: AIMP 2 */}
            <div className="absolute top-44 left-6 text-[10px] sm:text-[11px] font-bold text-white tracking-wider uppercase hover:text-[#00f0ff] cursor-pointer">
              AIMP 2
            </div>
            {/* Left Lower: Sprint Layout 5.0 */}
            <div className="absolute top-56 left-4 text-[9px] sm:text-[10px] font-bold text-[#00f0ff] tracking-wider uppercase hover:text-white cursor-pointer">
              Sprint Layout 5.0
            </div>
            {/* Bottom-Left: Arduino */}
            <div className="absolute bottom-16 left-12 text-[10px] font-bold text-white tracking-wider uppercase hover:text-[#00f0ff] cursor-pointer">
              Arduino
            </div>
            {/* Bottom: Панель управления (Control Panel) */}
            <div
              onClick={() => {
                cyberSynth.playBeep(700, 0.04);
                onOpenDiagnostics();
              }}
              className="absolute bottom-6 left-1/4 text-[10px] sm:text-[11px] font-bold text-[#00f0ff] tracking-wider uppercase hover:text-white cursor-pointer bg-black/60 px-2 py-0.5 border border-[#00f0ff]/50 rounded shadow-[0_0_10px_rgba(0,240,255,0.3)]"
            >
              Панель управления
            </div>
          </div>

          {/* Under Arc Reactor: Category Buttons & Taskbar & STARK INDUSTRIES */}
          <div className="flex flex-col items-center gap-2 mt-2 w-full max-w-sm">
            {/* Category Navigation Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[9px] font-bold">
              {["Games", "Programs", "Skydrive", "Electronics"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    cyberSynth.playBeep(850, 0.03);
                    setActiveTab(tab);
                  }}
                  className={`px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_12px_#00f0ff]"
                      : "bg-black/40 text-[#00f0ff] border-[#00f0ff]/40 hover:border-[#00f0ff]"
                  }`}
                >
                  ● {tab}
                </button>
              ))}
            </div>

            {/* Taskbar Icon & Sleek STARK INDUSTRIES Logo */}
            <div className="flex items-center justify-center gap-3 w-full">
              {/* Taskbar / USB Flash widget */}
              <button
                onClick={() => {
                  cyberSynth.playBeep(1100, 0.05);
                  if (onOpenUsbFlash) onOpenUsbFlash();
                  else onOpenDiagnostics();
                }}
                title="موبائل ڈیٹا کیبل فل فلیش اور ری سیٹ کنسول"
                className="flex flex-col items-center text-[7.5px] text-[#00f0ff] hover:text-white transition-colors cursor-pointer group"
              >
                <div className="w-5 h-5 border border-[#00f0ff] rounded flex items-center justify-center group-hover:bg-[#00f0ff] group-hover:text-black transition-all shadow-[0_0_8px_#00f0ff]">
                  <span className="w-2 h-2 rounded-full bg-[#00f0ff] group-hover:bg-black" />
                </div>
                <span className="tracking-widest mt-0.5">FLASH/RESET</span>
              </button>

              {/* Iconic Forward-Leaning STARK INDUSTRIES Typography */}
              <div className="flex items-center gap-2">
                <span className="w-8 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent to-[#00f0ff]" />
                <h2
                  className="text-lg sm:text-2xl font-black italic tracking-widest text-white drop-shadow-[0_0_15px_#00f0ff] uppercase"
                  style={{
                    fontFamily: "'Eurostile', 'Orbitron', 'Impact', sans-serif",
                    letterSpacing: "0.15em",
                  }}
                >
                  STARK INDUSTRIES
                </h2>
                <span className="w-8 sm:w-16 h-[1.5px] bg-gradient-to-l from-transparent to-[#00f0ff]" />
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------------------- */}
        {/* RIGHT COLUMN: Holographic Icons (Art, Trash), Oscilloscope, Weather Station */}
        {/* ----------------------------------------------------------------------- */}
        <section className="md:col-span-3 flex flex-col justify-between gap-2 text-xs pl-1">
          {/* Top Far Right: Moscow Weather Station Widget */}
          <div className="bg-[#021526]/60 border border-[#00f0ff]/40 rounded-lg p-2.5 shadow-[0_0_20px_rgba(0,240,255,0.2)] text-[9px] leading-tight space-y-1.5">
            {/* Header: Location & Refresh Time */}
            <div className="flex items-center justify-between border-b border-[#00f0ff]/30 pb-1">
              <span className="text-xs sm:text-sm font-bold text-white tracking-wider">
                Moscow, Russia
              </span>
              <span className="text-[7.5px] text-[#00f0ff]/70 font-mono">
                Обновлено 6/21/12 12:30 ПП
              </span>
            </div>

            {/* Current Temp & Moon Orb */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_0_15px_#00f0ff]">
                  13°C
                </span>
                <span className="text-xs text-[#00f0ff] font-bold block">Ясно</span>
              </div>
              {/* Moon / Cosmic Orb */}
              <div className="w-12 h-12 rounded-full bg-[radial-gradient(circle,#ffffff_10%,#8ecae6_50%,#023047_100%)] border border-white/60 shadow-[0_0_15px_#00f0ff]" />
            </div>

            {/* Meteorological Parameters */}
            <div className="grid grid-cols-2 gap-x-2 text-[8px] text-[#00f0ff]/90 border-b border-[#00f0ff]/20 pb-1">
              <div>Влажность: <span className="text-white font-bold">77%</span></div>
              <div>Ощущается: <span className="text-white font-bold">13°</span></div>
              <div>Осадки: <span className="text-white font-bold">0%</span></div>
              <div>Видимость: <span className="text-white font-bold">10.0 км.</span></div>
              <div>Ветер: <span className="text-white font-bold">3 км/ч. (ЗСЗ)</span></div>
              <div>Восход: <span className="text-white font-bold">4:44 ПП</span></div>
              <div className="col-span-2">Закат солнца: <span className="text-white font-bold">10:18 ДП</span></div>
            </div>

            {/* 7-Day Forecast List (Exact from Photo) */}
            <div className="space-y-1 max-h-36 overflow-y-auto pr-1 text-[8px]">
              <div className="flex items-center justify-between hover:bg-white/5 px-1 py-0.5 rounded">
                <div>
                  <span className="text-white font-bold block">Сегодня ночью</span>
                  <span className="text-[#00f0ff]/70">Переменная облачность</span>
                </div>
                <span className="text-white font-bold text-[9px]">11° ☁</span>
              </div>

              <div className="flex items-center justify-between hover:bg-white/5 px-1 py-0.5 rounded">
                <div>
                  <span className="text-white font-bold block">Завтра (Июнь, 21)</span>
                  <span className="text-[#ffd700]">Солнечно</span>
                </div>
                <span className="text-white font-bold text-[9px]">23° / 11° ☀</span>
              </div>

              <div className="flex items-center justify-between hover:bg-white/5 px-1 py-0.5 rounded">
                <div>
                  <span className="text-white font-bold block">Пятница (Июнь, 22)</span>
                  <span className="text-[#00f0ff]">Ясно</span>
                </div>
                <span className="text-white font-bold text-[9px]">23° / 11° ✨</span>
              </div>

              <div className="flex items-center justify-between hover:bg-white/5 px-1 py-0.5 rounded">
                <div>
                  <span className="text-white font-bold block">Суббота (Июнь, 23)</span>
                  <span className="text-[#00f0ff]/70">Переменная облачность</span>
                </div>
                <span className="text-white font-bold text-[9px]">19° / 12° ☁</span>
              </div>

              <div className="flex items-center justify-between hover:bg-white/5 px-1 py-0.5 rounded">
                <div>
                  <span className="text-white font-bold block">Воскресенье (Июнь, 24)</span>
                  <span className="text-[#00f0ff]">Осадки (Дождь)</span>
                </div>
                <span className="text-white font-bold text-[9px]">17° / 11° 🌧</span>
              </div>
            </div>
          </div>

          {/* Right Mid: Holographic Wireframe Icons "Art" and "Trash" */}
          <div className="flex items-center justify-around py-1">
            {/* Art Projector Icon */}
            <div className="flex flex-col items-center text-center cursor-pointer hover:scale-110 transition-transform">
              <div className="w-12 h-10 border border-[#00f0ff] rounded bg-[#00f0ff]/10 flex items-center justify-center text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.4)]">
                <Film size={20} />
              </div>
              <span className="text-[9px] font-bold text-white mt-0.5">Art</span>
            </div>

            {/* Trash Bin Icon */}
            <div className="flex flex-col items-center text-center cursor-pointer hover:scale-110 transition-transform">
              <div className="w-12 h-10 border border-[#00f0ff] rounded bg-[#00f0ff]/10 flex items-center justify-center text-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.4)]">
                <Trash2 size={20} />
              </div>
              <span className="text-[9px] font-bold text-white mt-0.5">Trash</span>
            </div>
          </div>

          {/* Oscilloscope Stats: "Загрузка 2.5 k / 169.39 G" & "Выгрузка 282.0 / 32.96 G" */}
          <div className="bg-black/50 border border-[#00f0ff]/30 p-1.5 rounded text-[8.5px] font-mono leading-tight space-y-1">
            <div className="flex items-center justify-between">
              <span>Загрузка:</span>
              <span className="text-white font-bold">
                {dlSpeed} k <span className="text-[#00f0ff]">169.39 G</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Выгрузка:</span>
              <span className="text-white font-bold">
                {upSpeed} <span className="text-[#00f0ff]">32.96 G</span>
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 3. BOTTOM WINAMP / AIMP CYBER MEDIA DOCK & INTERACTIVE COMMAND/VOICE BAR */}
      {/* ========================================================================= */}
      <footer className="relative z-20 w-full flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#00f0ff]/40 pt-1.5 px-2 bg-gradient-to-t from-[#021526] to-transparent">
        {/* Interactive Master AI Command Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 w-full flex items-center gap-1.5 bg-black/70 border border-[#00f0ff]/60 px-2 py-1 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.25)]"
        >
          <button
            type="button"
            onClick={onVoiceToggle}
            className={`p-1 rounded-full transition-all cursor-pointer ${
              isVoiceActive
                ? "bg-[#00f0ff] text-black animate-pulse shadow-[0_0_10px_#00f0ff]"
                : "text-[#00f0ff] hover:bg-[#00f0ff]/20"
            }`}
            title="Toggle Voice"
          >
            {isVoiceActive ? <Mic size={14} /> : <MicOff size={14} />}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="COMMAND STARK MASTER AI // ADMIN: SIRAJ (سراج)..."
            className="flex-1 bg-transparent border-none outline-none text-[#00f0ff] text-[10px] sm:text-xs font-mono placeholder:text-[#00f0ff]/40 px-1"
          />

          <button
            type="submit"
            className="p-1 text-[#00f0ff] hover:text-white hover:bg-[#00f0ff]/20 rounded-full transition-colors cursor-pointer"
          >
            <Send size={13} />
          </button>
        </form>

        {/* Futuristic Glass Winamp Player Dock (Exact match to Photo: |◄ ◄◄ ► || ■ ►► ►| 02:40) */}
        <div className="flex items-center gap-2 bg-[#021526]/80 border border-[#00f0ff]/50 px-3 py-1 rounded-lg text-xs shadow-[0_0_15px_rgba(0,240,255,0.3)]">
          <button
            onClick={() => {
              cyberSynth.playBeep(600, 0.03);
              setTrackProgress(0);
            }}
            className="text-[#00f0ff] hover:text-white p-0.5 cursor-pointer text-[10px]"
          >
            |◄
          </button>
          <button
            onClick={() => {
              cyberSynth.playBeep(700, 0.03);
              setTrackProgress((p) => Math.max(0, p - 10));
            }}
            className="text-[#00f0ff] hover:text-white p-0.5 cursor-pointer text-[10px]"
          >
            ◄◄
          </button>
          <button
            onClick={() => {
              cyberSynth.playBeep(850, 0.03);
              setIsPlayingMusic(!isPlayingMusic);
            }}
            className="text-white font-bold px-1 hover:text-[#00f0ff] cursor-pointer text-[11px]"
          >
            {isPlayingMusic ? "||" : "►"}
          </button>
          <button
            onClick={() => {
              cyberSynth.playBeep(400, 0.03);
              setIsPlayingMusic(false);
              setTrackProgress(0);
            }}
            className="text-[#00f0ff] hover:text-white p-0.5 cursor-pointer text-[10px]"
          >
            ■
          </button>
          <button
            onClick={() => {
              cyberSynth.playBeep(950, 0.03);
              setTrackProgress((p) => Math.min(100, p + 10));
            }}
            className="text-[#00f0ff] hover:text-white p-0.5 cursor-pointer text-[10px]"
          >
            ►►
          </button>
          <button
            onClick={() => {
              cyberSynth.playBeep(1100, 0.03);
              setTrackProgress(100);
            }}
            className="text-[#00f0ff] hover:text-white p-0.5 cursor-pointer text-[10px]"
          >
            ►|
          </button>

          {/* Equalizer Wavelet Bar */}
          <div className="flex items-center gap-0.5 h-3 px-1">
            {[40, 80, 60, 95, 70, 50, 85].map((h, i) => (
              <span
                key={i}
                className="w-0.5 bg-[#00f0ff] rounded-full animate-pulse"
                style={{
                  height: isPlayingMusic ? `${h}%` : "20%",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          <span className="text-[10px] font-mono text-white font-bold tracking-widest">
            02:40
          </span>
        </div>
      </footer>

      {/* Live AI Speech Bubble floating above Arc Reactor if transcript/response exists */}
      <AnimatePresence>
        {(transcript || response) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[90%] bg-black/90 border border-[#00f0ff] p-3 rounded-xl shadow-[0_0_30px_rgba(0,240,255,0.4)] text-xs font-mono space-y-1 backdrop-blur-md"
          >
            {transcript && (
              <div className="text-[#00f0ff]">
                <span className="font-bold">ADMIN SIRAJ: </span>
                <span className="text-white">{transcript}</span>
              </div>
            )}
            {response && (
              <div className="text-[#00e5ff]">
                <span className="font-bold">MASTER SYSTEM: </span>
                <span className="text-white">{response}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
