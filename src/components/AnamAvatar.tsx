import React from "react";
import { motion } from "motion/react";
import anamFrontFaceImg from "../assets/images/anam_front_face_avatar_1788014037048.jpg";

interface AnamAvatarProps {
  state: "idle" | "listening" | "processing" | "speaking";
}

export default function AnamAvatar({ state }: AnamAvatarProps) {
  const isSpeaking = state === "speaking";
  const isListening = state === "listening";
  const isProcessing = state === "processing";

  return (
    <div className="relative flex flex-col items-center justify-center pointer-events-none select-none">
      {/* Outer Sound Wave Echo Ripples when speaking/listening */}
      {(isSpeaking || isListening) && (
        <>
          <motion.div
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: [1, 1.45, 1.75], opacity: [0.7, 0.35, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            className="absolute w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px] rounded-full border border-[#00f0ff]/60"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: [1, 1.35, 1.6], opacity: [0.6, 0.25, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            className="absolute w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px] rounded-full border border-[#ffd700]/50"
          />
        </>
      )}

      {/* Cybernetic Rotating HUD Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: isProcessing ? 8 : 24, repeat: Infinity, ease: "linear" }}
        className="absolute w-[245px] h-[245px] sm:w-[295px] sm:h-[295px] md:w-[350px] md:h-[350px] rounded-full border border-dashed border-[#00f0ff]/50"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute w-[265px] h-[265px] sm:w-[315px] sm:h-[315px] md:w-[370px] md:h-[370px] rounded-full border-[1.5px] border-dotted border-[#ffd700]/40"
      />

      {/* Center Hologram Avatar Circle with Straight Front-Facing Portrait */}
      <motion.div
        animate={{
          scale: isSpeaking
            ? [1, 1.06, 0.98, 1.05, 1]
            : isListening
            ? [1, 1.04, 1]
            : isProcessing
            ? [1, 1.08, 0.97, 1.04, 1]
            : [1, 1.02, 1],
        }}
        transition={{
          duration: isSpeaking ? 0.8 : isListening ? 1.4 : isProcessing ? 0.6 : 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-[210px] h-[210px] sm:w-[250px] sm:h-[250px] md:w-[290px] md:h-[290px] rounded-full p-1.5 bg-gradient-to-tr from-[#00f0ff] via-[#ffd700] to-[#ff003c] shadow-[0_0_40px_rgba(0,240,255,0.7)] flex items-center justify-center overflow-hidden"
      >
        {/* Inner Dark Mask Frame */}
        <div className="w-full h-full rounded-full bg-[#020813] overflow-hidden relative flex items-center justify-center">
          {/* Avatar Image with Straight Forward Facing Face */}
          <img
            src={anamFrontFaceImg}
            alt="Anam Front Face AI Avatar"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter contrast-110 brightness-105 transition-all duration-300"
          />

          {/* Holographic Cyan & Gold Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020813]/60 via-transparent to-[#00f0ff]/20 mix-blend-screen" />

          {/* Dynamic Laser Scanning Line */}
          <motion.div
            animate={{ y: [-140, 140] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_15px_#00f0ff]"
          />

          {/* Center Glowing Reticle Ring */}
          <div className="absolute inset-2 rounded-full border border-[#00f0ff]/40 pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}
