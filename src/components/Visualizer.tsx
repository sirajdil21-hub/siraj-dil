import { motion } from "motion/react";
import AnamAvatar from "./AnamAvatar";

type VisualizerState = "idle" | "listening" | "processing" | "speaking";

interface VisualizerProps {
  state: VisualizerState;
}

export default function Visualizer({ state }: VisualizerProps) {
  const getTheme = () => {
    switch (state) {
      case "listening":
        return {
          coreColor: "#00f0ff",
          accentColor: "#ffd700",
          statusText: "AUDIO SCAN: LISTENING TO SIRAJ",
          modeBadge: "LISTENING // SIRAJ",
        };
      case "processing":
        return {
          coreColor: "#ffd700",
          accentColor: "#ff003c",
          statusText: "ANAM NEURAL COMPUTING",
          modeBadge: "PROCESSING COMMAND",
        };
      case "speaking":
        return {
          coreColor: "#00f0ff",
          accentColor: "#ff003c",
          statusText: "ANAM LIVE VOICE SYNTHESIS",
          modeBadge: "ANAM ACTIVE VOICE",
        };
      default:
        return {
          coreColor: "#00f0ff",
          accentColor: "#ffd700",
          statusText: "ANAM STANDBY // READY FOR SIRAJ",
          modeBadge: "SYSTEMS NOMINAL",
        };
    }
  };

  const theme = getTheme();

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
      {/* Dynamic Ambient Arc Glow */}
      <motion.div
        animate={{
          scale: state === "speaking" ? [1, 1.25, 0.95, 1.2, 1] : [1, 1.1, 0.9, 1.05, 1],
          opacity: state === "speaking" ? [0.25, 0.45, 0.25] : [0.12, 0.25, 0.12],
        }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[46vw] max-w-[500px] h-[46vw] max-h-[500px] rounded-full blur-[120px]"
        style={{ backgroundColor: theme.coreColor }}
      />

      {/* Target Reticle Crosshairs */}
      <div className="absolute w-[88vw] max-w-[800px] h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/30 to-transparent pointer-events-none" />
      <div className="absolute h-[88vw] max-h-[800px] w-[1px] bg-gradient-to-b from-transparent via-[#00f0ff]/30 to-transparent pointer-events-none" />

      {/* Outer Tactical Radar Rings */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[70vw] max-w-[600px] h-[70vw] max-h-[600px] rounded-full border border-dashed border-[#00f0ff]/30 opacity-35"
      />

      <motion.div
        animate={{ rotate: [-360, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute w-[56vw] max-w-[480px] h-[56vw] max-h-[480px] rounded-full border-[1.5px] border-dotted border-[#ffd700]/35 opacity-40"
      />

      {/* Anam Hologram Girl Avatar Centerpiece */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <AnamAvatar state={state} />

        {/* Anam Identity & Telemetry Badge */}
        <div className="relative mt-3 flex flex-col items-center justify-center pointer-events-auto select-none">
          {/* Main Title */}
          <div className="flex items-center gap-2">
            <span className="font-mono font-black text-2xl sm:text-3xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ffd700] to-[#ffffff] drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]">
              ANAM (انم)
            </span>
          </div>

          {/* Subtitle Badge */}
          <div className="mt-1 flex items-center gap-2 bg-black/90 px-3.5 py-1 rounded-full border border-[#00f0ff]/60 shadow-[0_0_20px_rgba(0,240,255,0.4)] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
            <span className="font-mono font-black text-[11px] md:text-xs text-white tracking-[0.15em]">
              AI VOICE ASSISTANT
            </span>
            <span className="text-[#00f0ff] font-mono text-[10px]">|</span>
            <span className="px-1.5 py-0.2 bg-[#ffd700]/20 text-[#ffd700] font-mono text-[9px] rounded font-bold">
              SIRAJ (سراج)
            </span>
          </div>

          {/* Dynamic Sound Waveform Bars */}
          <div className="flex items-center gap-1 mt-2 h-3.5">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const isSpeaking = state === "speaking";
              const isListening = state === "listening";
              return (
                <motion.div
                  key={i}
                  animate={
                    isSpeaking
                      ? {
                          height: [3, 14, 4, 12, 3],
                          transition: { duration: 0.25 + i * 0.03, repeat: Infinity },
                        }
                      : isListening
                      ? {
                          height: [3, 9, 3],
                          transition: { duration: 0.45 + i * 0.05, repeat: Infinity },
                        }
                      : { height: 3 }
                  }
                  className="w-[2.5px] rounded-full"
                  style={{
                    backgroundColor: i % 2 === 0 ? "#00f0ff" : i % 3 === 0 ? "#ffd700" : "#00ff88",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

