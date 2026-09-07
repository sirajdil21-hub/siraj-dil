import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Play,
  Pause,
  Radio,
  Camera,
  Compass,
  Cpu,
  Volume2,
  VolumeX,
  Power,
  Sliders,
  Maximize2,
  Scan,
} from "lucide-react";
import { cyberSynth } from "../utils/audioUtils";
import { VisualsMode, ArmorTheme } from "../types";

interface VisualsMonitorProps {
  theme: ArmorTheme;
  onOpenDiagnostics: () => void;
  onOpenSecurity: () => void;
  onOpenUsbFlash?: () => void;
  onOpenFullCamera?: () => void;
}

export default function VisualsMonitor({
  theme,
  onOpenDiagnostics,
  onOpenSecurity,
  onOpenUsbFlash,
  onOpenFullCamera,
}: VisualsMonitorProps) {
  const [activeMode, setActiveMode] = useState<VisualsMode>("spectrum");
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const themeColor =
    theme === "combat" ? "#ff003c" : theme === "stealth" ? "#00ffaa" : "#00f0ff";

  // Frequency spectrum animated bars
  const [bars, setBars] = useState<number[]>([
    45, 78, 62, 90, 54, 82, 35, 95, 68, 88, 42, 70, 85, 60,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prev) =>
        prev.map(() =>
          isPlayingMusic
            ? Math.floor(Math.random() * 65 + 35)
            : Math.floor(Math.random() * 35 + 15)
        )
      );
    }, 120);
    return () => clearInterval(interval);
  }, [isPlayingMusic]);

  // Handle Camera mini feed
  useEffect(() => {
    if (activeMode === "camera") {
      navigator.mediaDevices
        ?.getUserMedia({ video: { width: 320, height: 240 } })
        .then((stream) => {
          setCameraStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          // Camera denied or unavailable
        });
    } else {
      if (cameraStream) {
        cameraStream.getTracks().forEach((t) => t.stop());
        setCameraStream(null);
      }
    }

    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [activeMode]);

  const handleToggleMusic = () => {
    cyberSynth.playBeep(850, 0.04);
    cyberSynth.toggleAmbientMusic((playing) => setIsPlayingMusic(playing));
  };

  const handleModeChange = (mode: VisualsMode) => {
    cyberSynth.playBeep(980, 0.03);
    setActiveMode(mode);
  };

  return (
    <div className="flex flex-col space-y-2 select-none">
      {/* Top Header: "Visuals" label + frequency equalizer bars + System Power Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00f0ff] uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
            Visuals
          </span>

          {/* Audio frequency mini equalizer bars matching 3974763.jpg */}
          <div className="flex items-end gap-0.5 h-3">
            {[4, 8, 12, 7, 11, 5, 9, 3].map((h, i) => (
              <span
                key={i}
                className="w-0.5 bg-[#00f0ff] rounded-t"
                style={{
                  height: `${h}px`,
                  opacity: isPlayingMusic ? 1 : 0.6,
                }}
              />
            ))}
          </div>
        </div>

        {/* System Control & Power Icons matching 3974763.jpg `( ) ⏻ ⏼ ⏽ ⎋` */}
        <div className="flex items-center gap-1">
          {/* Target Scan */}
          <button
            onClick={onOpenSecurity}
            title="Security Scan"
            className="w-5 h-5 rounded-full border border-[#00f0ff]/60 flex items-center justify-center text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all cursor-pointer"
          >
            <Scan size={10} />
          </button>

          {/* Diagnostics Modal */}
          <button
            onClick={onOpenDiagnostics}
            title="System Diagnostics"
            className="w-5 h-5 rounded-full border border-[#00f0ff]/60 flex items-center justify-center text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all cursor-pointer"
          >
            <Cpu size={10} />
          </button>

          {/* USB Flash & Recovery */}
          <button
            onClick={onOpenUsbFlash}
            title="USB Flash & Reset Recovery"
            className="w-5 h-5 rounded-full border border-[#ff003c]/70 flex items-center justify-center text-[#ff003c] hover:bg-[#ff003c] hover:text-white transition-all cursor-pointer"
          >
            <Power size={10} />
          </button>
        </div>
      </div>

      {/* Main "Visuals" Monitor Screen matching 3974763.jpg */}
      <div className="relative w-full h-[125px] sm:h-[135px] bg-[#020d18] border-2 border-[#00f0ff] rounded-md overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.3)] flex flex-col justify-between p-2">
        {/* Screen Chamfer Corner Accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white" />

        {/* Background Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.4) 2px, rgba(0, 240, 255, 0.4) 4px)",
          }}
        />

        {/* Screen Content based on active mode */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          {/* Mode 1: Spectrum / Audio Beat Visualizer (Default) */}
          {activeMode === "spectrum" && (
            <div className="w-full h-full flex flex-col justify-between py-1">
              <div className="flex items-center justify-between text-[8px] font-mono text-[#00f0ff]/80">
                <span className="flex items-center gap-1 font-bold">
                  {isPlayingMusic ? (
                    <Volume2 size={10} className="text-[#00ff88] animate-pulse" />
                  ) : (
                    <VolumeX size={10} className="text-white/50" />
                  )}
                  STARK TACTICAL SYNTH FREQ // 44.1 kHz
                </span>
                <span className="text-[#00ff88] font-bold">
                  {isPlayingMusic ? "PLAYING" : "STANDBY"}
                </span>
              </div>

              {/* Dynamic Waveform Bars */}
              <div className="flex items-end justify-between gap-1 h-14 px-2">
                {bars.map((val, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 0.1 }}
                    className="w-full rounded-t bg-gradient-to-t from-[#00f0ff]/40 via-[#00f0ff] to-white"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-[7.5px] font-mono text-white/60">
                <span>CH-1: 65.4 Hz [BASS]</span>
                <span>CH-2: 4.5 kHz [HI-HAT]</span>
                <span>CH-3: 1100 Hz [LEAD]</span>
              </div>
            </div>
          )}

          {/* Mode 2: Camera Mini Feed */}
          {activeMode === "camera" && (
            <div className="relative w-full h-full flex items-center justify-center bg-black rounded overflow-hidden">
              {cameraStream ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover opacity-80"
                />
              ) : (
                <div className="text-center text-[8.5px] text-[#00f0ff] font-mono space-y-1">
                  <Camera size={18} className="mx-auto text-[#00f0ff] animate-pulse" />
                  <p>CYBER HUD CAMERA SCANNER</p>
                  <p className="text-white/60 text-[7.5px]">Click below to open full HUD camera</p>
                </div>
              )}
              {/* Reticle Overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-16 h-16 border border-[#00f0ff]/60 rounded-full animate-ping" />
                <div className="w-10 h-10 border border-[#ff003c] rounded flex items-center justify-center">
                  <span className="w-1 h-1 bg-[#ff003c]" />
                </div>
              </div>
            </div>
          )}

          {/* Mode 3: Radar Scanner */}
          {activeMode === "radar" && (
            <div className="relative w-full h-full flex items-center justify-center bg-[#010810] rounded overflow-hidden">
              <div className="relative w-24 h-24 rounded-full border border-[#00f0ff]/60 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-[#00f0ff]/40" />
                <div className="w-8 h-8 rounded-full border border-[#00f0ff]/30" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00f0ff]/30 to-transparent rounded-full"
                />
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff003c] animate-ping" />
              </div>
              <div className="absolute bottom-1 right-2 text-[7.5px] font-mono text-[#00f0ff]">
                TARGET: SIRAJ BASE // CLEAR
              </div>
            </div>
          )}

          {/* Mode 4: Neural AI Core */}
          {activeMode === "neural" && (
            <div className="w-full h-full flex flex-col justify-center items-center space-y-1 text-center font-mono">
              <div className="flex items-center gap-1.5 text-[8.5px] text-[#00ff88]">
                <Radio size={12} className="animate-spin text-[#00ff88]" />
                GEMINI TACTICAL SYNAPSE ONLINE
              </div>
              <p className="text-[7.5px] text-[#00f0ff]/80">
                Context Window: Active | Latency: 42ms | Root: Siraj
              </p>
              <div className="w-4/5 bg-black/60 h-1.5 rounded-full border border-[#00f0ff]/40 overflow-hidden">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-1/2 h-full bg-[#00f0ff]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Screen Mode Switches & Music Play Controller */}
      <div className="flex items-center justify-between text-[8px] font-mono">
        <div className="flex items-center gap-1">
          {[
            { id: "spectrum", label: "SPECTRUM", icon: Radio },
            { id: "camera", label: "CAM", icon: Camera },
            { id: "radar", label: "RADAR", icon: Compass },
            { id: "neural", label: "NEURAL", icon: Cpu },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => handleModeChange(m.id as VisualsMode)}
              className={`px-1.5 py-0.5 rounded border transition-all cursor-pointer flex items-center gap-1 ${
                activeMode === m.id
                  ? "bg-[#00f0ff] text-black border-[#00f0ff] font-bold"
                  : "bg-black/60 text-[#00f0ff] border-[#00f0ff]/40 hover:border-[#00f0ff]"
              }`}
            >
              <m.icon size={8} />
              {m.label}
            </button>
          ))}
        </div>

        {/* Music Play/Stop Toggle */}
        <button
          onClick={handleToggleMusic}
          className={`px-2 py-0.5 rounded border text-[8px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
            isPlayingMusic
              ? "bg-[#00ff88] text-black border-[#00ff88] shadow-[0_0_8px_#00ff88]"
              : "bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff] hover:bg-[#00f0ff]/40"
          }`}
        >
          {isPlayingMusic ? <Pause size={9} /> : <Play size={9} />}
          {isPlayingMusic ? "PAUSE BEAT" : "PLAY BEAT"}
        </button>
      </div>
    </div>
  );
}
