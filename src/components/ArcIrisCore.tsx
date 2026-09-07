import React from "react";
import { motion } from "motion/react";

interface ArcIrisCoreProps {
  state: "idle" | "listening" | "processing" | "speaking";
}

export default function ArcIrisCore({ state }: ArcIrisCoreProps) {
  const isSpeaking = state === "speaking";
  const isListening = state === "listening";
  const isProcessing = state === "processing";

  // IRIS AI v1.8.3 State Colors:
  // Thinking = Blue (#0088ff / #00d4ff)
  // Speaking = Green (#00ff88 / #10b981)
  // Standby/Listening = White/Ice-Silver (#ffffff / #cbf3ff)
  const primaryColor = isProcessing
    ? "#0099ff"
    : isSpeaking
    ? "#00ff88"
    : "#ffffff";

  const accentColor = isProcessing
    ? "#00e5ff"
    : isSpeaking
    ? "#00ffaa"
    : "#00f0ff";

  return (
    <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[410px] md:h-[410px] lg:w-[440px] lg:h-[440px] flex items-center justify-center pointer-events-none select-none">
      {/* Outer Ambient Reactive Glow matching IRIS 1.8.3 State Colors */}
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.25, 0.95, 1.18, 1] : isProcessing ? [1, 1.12, 1] : [1, 1.05, 0.97, 1.03, 1],
          opacity: isSpeaking ? [0.65, 0.95, 0.55, 0.9, 0.65] : isProcessing ? [0.5, 0.8, 0.5] : [0.35, 0.5, 0.35],
        }}
        transition={{ duration: isSpeaking ? 0.7 : isProcessing ? 1.2 : 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[82%] h-[82%] rounded-full blur-[70px] transition-colors duration-500"
        style={{
          backgroundColor: isProcessing ? "#0066ff" : isSpeaking ? "#00ff88" : "#ffffff",
          opacity: 0.35,
        }}
      />

      {/* Layer 1: Outermost Ring with Arc Notch Brackets */}
      <div
        className="absolute w-[94%] h-[94%] rounded-full border transition-colors duration-500"
        style={{
          borderColor: `${accentColor}66`,
          boxShadow: `0 0 24px ${accentColor}40`,
        }}
      />
      <div
        className="absolute w-[98%] h-[98%] rounded-full border border-dashed transition-colors duration-500"
        style={{ borderColor: `${primaryColor}40` }}
      />

      {/* IRIS 1.8.3 Telemetry Watermark */}
      <div className="absolute top-2 sm:top-4 text-[7px] sm:text-[8px] font-mono tracking-widest text-center uppercase" style={{ color: primaryColor }}>
        IRIS X AI 1.8.3 // {isProcessing ? "THINKING [BLUE]" : isSpeaking ? "SPEAKING [GREEN]" : "STANDBY [WHITE]"}
      </div>

      {/* Layer 2: Rotating Outer Radial Ring with Segmented Blocks */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: isProcessing ? 10 : 32, repeat: Infinity, ease: "linear" }}
        className="absolute w-[88%] h-[88%] rounded-full border-2 transition-colors duration-500 flex items-center justify-center"
        style={{ borderColor: `${accentColor}70` }}
      >
        {/* 12 Outer Mechanical Tooth Blocks */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-4 sm:w-3 sm:h-5 rounded-xs transition-colors duration-500"
            style={{
              backgroundColor: `${accentColor}50`,
              border: `1px solid ${accentColor}`,
              transform: `rotate(${i * 30}deg) translateY(-${440 * 0.44}px)`,
            }}
          />
        ))}
      </motion.div>

      {/* Layer 3: Counter-Rotating Mechanical Spoke Wheel */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: isProcessing ? 7 : 22, repeat: Infinity, ease: "linear" }}
        className="absolute w-[76%] h-[76%] rounded-full border-[3px] transition-colors duration-500 flex items-center justify-center"
        style={{
          borderColor: `${primaryColor}90`,
          boxShadow: `inset 0 0 25px ${primaryColor}50`,
        }}
      >
        {/* 6 Large Radial Turbine Pistons */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute flex flex-col items-center justify-start h-full"
            style={{ transform: `rotate(${i * 60}deg)` }}
          >
            {/* Top Piston Clamp Head */}
            <div
              className="w-5 sm:w-7 h-6 sm:h-8 bg-[#041d2d] border-2 rounded-xs flex items-center justify-center transition-colors duration-500"
              style={{
                borderColor: accentColor,
                boxShadow: `0 0 14px ${accentColor}`,
              }}
            >
              <div
                className="w-1.5 h-3 rounded-full animate-pulse transition-colors duration-500"
                style={{ backgroundColor: accentColor }}
              />
            </div>
            {/* Piston Rod */}
            <div
              className="w-1.5 h-8 bg-gradient-to-b from-current to-transparent transition-colors duration-500"
              style={{ color: primaryColor }}
            />
          </div>
        ))}

        {/* 6 Intermediate Segmented Wedge Blocks */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-6 sm:w-8 h-3 sm:h-4 transition-colors duration-500"
            style={{
              backgroundColor: `${accentColor}30`,
              border: `1px solid ${accentColor}80`,
              transform: `rotate(${i * 60 + 30}deg) translateY(-${440 * 0.35}px)`,
            }}
          />
        ))}
      </motion.div>

      {/* Layer 4: Inner Iris Gear Aperture */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="absolute w-[56%] h-[56%] rounded-full border-2 border-dashed flex items-center justify-center transition-colors duration-500"
        style={{ borderColor: `${primaryColor}cc` }}
      >
        {/* Gear notches */}
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-2 transition-colors duration-500"
            style={{
              backgroundColor: `${accentColor}80`,
              transform: `rotate(${i * 15}deg) translateY(-${440 * 0.27}px)`,
            }}
          />
        ))}
      </motion.div>

      {/* Layer 5: Inner Circular Bezel Ring */}
      <div
        className="absolute w-[44%] h-[44%] rounded-full border-[2.5px] bg-[#02131f]/90 flex items-center justify-center transition-all duration-500"
        style={{
          borderColor: accentColor,
          boxShadow: `0 0 30px ${accentColor}90`,
        }}
      >
        {/* Layer 6: Center High-Tech Iris Core with Glowing Lens */}
        <motion.div
          animate={{
            scale: isSpeaking
              ? [1, 1.2, 0.9, 1.15, 1]
              : isProcessing
              ? [1, 1.1, 0.95, 1.08, 1]
              : isListening
              ? [1, 1.08, 1]
              : [1, 1.03, 1],
          }}
          transition={{
            duration: isSpeaking ? 0.6 : isProcessing ? 1.0 : isListening ? 1.2 : 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-[75%] h-[75%] rounded-full border-2 flex items-center justify-center overflow-hidden transition-all duration-500"
          style={{
            backgroundColor: isProcessing ? "#031c33" : isSpeaking ? "#022b1c" : "#0f2027",
            borderColor: primaryColor,
            boxShadow: `0 0 40px ${primaryColor}`,
          }}
        >
          {/* Internal Concentric Lens Reticles */}
          <div
            className="w-[70%] h-[70%] rounded-full border flex items-center justify-center transition-colors duration-500"
            style={{ borderColor: `${accentColor}90` }}
          >
            <div
              className="w-[50%] h-[50%] rounded-full border border-dashed flex items-center justify-center transition-colors duration-500"
              style={{ borderColor: `${primaryColor}cc` }}
            >
              {/* Intense Center Core Light Source */}
              <div
                className="w-4 sm:w-6 h-4 sm:h-6 rounded-full animate-pulse transition-all duration-500"
                style={{
                  backgroundColor: primaryColor,
                  boxShadow: `0 0 25px ${primaryColor}, 0 0 45px ${accentColor}`,
                }}
              />
            </div>
          </div>

          {/* Horizontal and Vertical Crosshair Beams */}
          <div
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent to-transparent transition-colors duration-500"
            style={{ backgroundImage: `linear-gradient(to right, transparent, ${primaryColor}, transparent)` }}
          />
          <div
            className="absolute h-full w-[1px] bg-gradient-to-b from-transparent to-transparent transition-colors duration-500"
            style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${primaryColor}, transparent)` }}
          />
        </motion.div>
      </div>

      {/* Layer 7: Outer Subtle Crosshair Guide Lines */}
      <div
        className="absolute w-[110%] h-[1px] bg-gradient-to-r from-transparent to-transparent transition-colors duration-500"
        style={{ backgroundImage: `linear-gradient(to right, transparent, ${accentColor}40, transparent)` }}
      />
      <div
        className="absolute h-[110%] w-[1px] bg-gradient-to-b from-transparent to-transparent transition-colors duration-500"
        style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${accentColor}40, transparent)` }}
      />
    </div>
  );
}
