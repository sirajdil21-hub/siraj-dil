import React, { useState } from "react";
import { motion } from "motion/react";
import { MicOff, ShieldAlert, Terminal, RefreshCw, Keyboard, CheckCircle, Sparkles } from "lucide-react";
import { cyberSynth } from "../utils/audioUtils";

interface Props {
  onClose: () => void;
  onOpenKeyboard?: () => void;
  onPermissionGranted?: () => void;
}

export default function PermissionModal({ onClose, onOpenKeyboard, onPermissionGranted }: Props) {
  const [isRequesting, setIsRequesting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    setErrorMsg(null);
    cyberSynth.playBeep(900, 0.05);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
        },
      });

      // Release test tracks immediately
      stream.getTracks().forEach((track) => track.stop());

      cyberSynth.playOverrideSuccess();
      setSuccessMsg("Microphone authorization granted. Tactical link ready.");

      setTimeout(() => {
        if (onPermissionGranted) {
          onPermissionGranted();
        }
        onClose();
      }, 1000);
    } catch (err: any) {
      console.warn("User declined or browser blocked microphone permission:", err);
      cyberSynth.playBeep(350, 0.1);
      setErrorMsg("Microphone permission was not allowed. Please click the lock (🔒) icon in your address bar.");
      setIsRequesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 font-mono select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="w-full max-w-md bg-[#020b14]/95 border-2 border-[#ff003c]/70 rounded-xl p-5 shadow-[0_0_50px_rgba(255,0,60,0.35)] flex flex-col items-center text-center relative overflow-hidden text-[#00f0ff]"
      >
        {/* Top holographic accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff003c] via-[#ffd700] to-[#00f0ff]" />

        {/* Icon */}
        <div className="w-13 h-13 rounded-full bg-[#ff003c]/15 border border-[#ff003c]/50 flex items-center justify-center mb-3 mt-1 shadow-[0_0_20px_rgba(255,0,60,0.3)]">
          <MicOff size={26} className="text-[#ff003c]" />
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-1.5 text-xs text-[#ff003c] font-bold mb-1 tracking-widest uppercase">
          <ShieldAlert size={14} />
          <span>MICROPHONE OVERRIDE CLEARANCE</span>
        </div>

        <h2 className="text-lg font-black text-white tracking-wide mb-1">
          TACTICAL AUDIO SENSOR REQUIRED
        </h2>
        <p className="text-[#00f0ff]/80 text-xs mb-4 leading-relaxed">
          Master requires browser microphone clearance to process real-time voice commands for Admin <strong className="text-[#ffd700]">Siraj (سراج)</strong>.
        </p>

        {/* Instruction Card */}
        <div className="bg-black/80 border border-[#00f0ff]/30 rounded-lg p-3 text-left w-full mb-4 text-xs text-white/80 space-y-2">
          <div className="flex items-center gap-1.5 text-[#ffd700] font-bold text-[11px]">
            <Terminal size={13} />
            <span>HOW TO AUTHORIZE ACCESS:</span>
          </div>
          <ol className="list-decimal pl-4 space-y-1 text-[11px] text-[#00f0ff]/90">
            <li>Click the <strong className="text-white">Lock (🔒) or Tune (⚙️)</strong> icon in your browser address bar.</li>
            <li>Set <strong className="text-[#ffd700]">Microphone</strong> to <strong className="text-white">Allow</strong>.</li>
            <li>Click <strong className="text-white">Authorize Microphone Link</strong> below.</li>
          </ol>
        </div>

        {/* Messages */}
        {successMsg && (
          <div className="mb-3 p-2 bg-[#00ff66]/15 border border-[#00ff66]/60 rounded text-xs text-[#00ff66] font-bold flex items-center justify-center gap-1.5 w-full">
            <CheckCircle size={14} />
            <span>{successMsg}</span>
          </div>
        )}
        {errorMsg && (
          <div className="mb-3 p-2 bg-[#ff003c]/15 border border-[#ff003c]/60 rounded text-xs text-[#ff003c] font-semibold w-full text-left">
            {errorMsg}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col w-full gap-2 text-xs">
          <button
            onClick={handleRequestPermission}
            disabled={isRequesting || !!successMsg}
            className="w-full py-2.5 px-4 bg-[#ffd700] hover:bg-[#ffe033] text-black font-black rounded transition-all shadow-[0_0_20px_rgba(255,215,0,0.5)] flex items-center justify-center gap-2 disabled:opacity-50 tracking-wider"
          >
            <Sparkles size={14} />
            <span>{isRequesting ? "REQUESTING BROWSER CLEARANCE..." : "AUTHORIZE MICROPHONE LINK"}</span>
          </button>

          {onOpenKeyboard && (
            <button
              onClick={() => {
                cyberSynth.playBeep(1100, 0.04);
                onClose();
                onOpenKeyboard();
              }}
              className="w-full py-2 px-4 bg-[#00f0ff]/15 hover:bg-[#00f0ff]/25 text-[#00f0ff] border border-[#00f0ff]/40 rounded font-bold transition-all flex items-center justify-center gap-2"
            >
              <Keyboard size={14} />
              <span>TYPE COMMAND INSTEAD (KEYBOARD HUD)</span>
            </button>
          )}

          <div className="flex gap-2 w-full mt-1">
            <button
              onClick={() => {
                cyberSynth.playStartupSound();
                window.location.reload();
              }}
              className="flex-1 py-1.5 px-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded border border-white/10 transition-colors flex items-center justify-center gap-1 text-[11px]"
            >
              <RefreshCw size={12} />
              <span>REFRESH APP</span>
            </button>
            <button
              onClick={() => {
                cyberSynth.playBeep(400, 0.04);
                onClose();
              }}
              className="flex-1 py-1.5 px-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded border border-white/10 transition-colors text-[11px]"
            >
              DISMISS
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
