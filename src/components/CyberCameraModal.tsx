import React, { useEffect, useRef, useState } from "react";
import { Camera, X, Eye, Shield, Target, Download, Sparkles, Crosshair } from "lucide-react";
import { motion } from "motion/react";
import { cyberSynth } from "../utils/audioUtils";

interface CyberCameraProps {
  onClose: () => void;
}

export default function CyberCameraModal({ onClose }: CyberCameraProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [filterMode, setFilterMode] = useState<"hud" | "thermal" | "night" | "raw">("hud");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  useEffect(() => {
    let activeStream: MediaStream | null = null;

    async function startCamera() {
      try {
        cyberSynth.playBeep(880, 0.1);
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user",
          },
          audio: false,
        });

        activeStream = mediaStream;
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err: any) {
        console.error("Camera access failed:", err);
        setCameraError(
          "Camera access denied or device not found. Please verify permissions."
        );
      }
    }

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    if (!videoRef.current) return;
    cyberSynth.playOverrideSuccess();

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (filterMode === "hud") {
      ctx.filter = "contrast(130%) brightness(115%) saturate(120%)";
    } else if (filterMode === "thermal") {
      ctx.filter = "invert(100%) hue-rotate(180deg) saturate(200%)";
    } else if (filterMode === "night") {
      ctx.filter = "grayscale(100%) brightness(140%) contrast(180%)";
    }

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    setCapturedImage(dataUrl);
  };

  const getFilterStyle = () => {
    switch (filterMode) {
      case "hud":
        return "contrast-125 brightness-110 saturate-125 drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]";
      case "thermal":
        return "invert contrast-150 saturate-200 hue-rotate-180";
      case "night":
        return "grayscale contrast-200 brightness-125 sepia hue-rotate-[90deg]";
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-3xl rounded-xl border-2 border-[#00f0ff] bg-[#020b14]/95 p-4 shadow-[0_0_50px_rgba(0,240,255,0.35)] overflow-hidden flex flex-col gap-3"
      >
        {/* Header HUD */}
        <div className="flex items-center justify-between border-b border-[#00f0ff]/40 pb-2 text-xs text-[#00f0ff]">
          <div className="flex items-center gap-2">
            <Crosshair size={16} className="text-[#ffd700] animate-spin-slow" />
            <span className="font-bold tracking-wider text-white">
              JARVIS TACTICAL OPTICAL HUD :: SCANNING
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-2 py-0.5 bg-[#ffd700]/20 border border-[#ffd700]/50 text-[10px] rounded text-[#ffd700] font-bold">
              COMMANDER LOCK: SIRAJ DIL
            </span>
            <button
              onClick={() => {
                cyberSynth.playBeep(500, 0.04);
                if (stream) {
                  stream.getTracks().forEach((t) => t.stop());
                }
                onClose();
              }}
              className="p-1 rounded hover:bg-[#ff003c]/20 hover:text-[#ff003c] transition-colors text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Video Viewport with Cyber HUD Overlays */}
        <div className="relative aspect-video w-full rounded-lg border border-[#00f0ff]/50 bg-black overflow-hidden flex items-center justify-center">
          {cameraError ? (
            <div className="text-center p-6 text-red-400 space-y-2">
              <Shield size={36} className="mx-auto text-[#ff003c] mb-2" />
              <p className="font-bold text-sm">OPTICAL SENSORS OFFLINE</p>
              <p className="text-xs text-white/60">{cameraError}</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`h-full w-full object-cover transition-all duration-300 ${getFilterStyle()}`}
              />

              {/* Cyber HUD Grid & Targeting Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,240,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />

              {/* Cyber HUD Reticle Target Box */}
              <div className="absolute inset-8 sm:inset-14 border border-[#00f0ff]/50 pointer-events-none flex flex-col justify-between p-2">
                <div className="flex justify-between items-start">
                  <div className="w-5 h-5 border-t-2 border-l-2 border-[#ffd700]" />
                  <span className="text-[10px] text-[#00f0ff] bg-black/70 px-2 py-0.5 rounded border border-[#00f0ff]/40 font-bold">
                    JARVIS HUD :: 60 FPS
                  </span>
                  <div className="w-5 h-5 border-t-2 border-r-2 border-[#ffd700]" />
                </div>

                {/* Center Crosshair Lock */}
                <div className="self-center flex flex-col items-center">
                  <Target size={42} className="text-[#00f0ff] animate-pulse" />
                  <span className="text-[9.5px] text-[#ffd700] mt-1 font-bold tracking-widest bg-black/80 px-2.5 py-0.5 rounded border border-[#ffd700]/40">
                    BIO-AUTH: SIRAJ DIL [LOCK 100%]
                  </span>
                </div>

                <div className="flex justify-between items-end">
                  <div className="w-5 h-5 border-b-2 border-l-2 border-[#ff003c]" />
                  <span className="text-[10px] text-[#ffd700] bg-black/70 px-1.5 rounded font-bold">
                    SYSTEMS: OPTIMAL | 0ms
                  </span>
                  <div className="w-5 h-5 border-b-2 border-r-2 border-[#ff003c]" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Camera Control Panel */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          {/* Filter Modes */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#ffd700] text-[11px] font-bold mr-1">HUD VISION:</span>
            {(["hud", "thermal", "night", "raw"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  cyberSynth.playBeep(1200, 0.03);
                  setFilterMode(mode);
                }}
                className={`px-2.5 py-1 rounded text-[11px] uppercase font-bold transition-all ${
                  filterMode === mode
                    ? "bg-[#00f0ff] text-black shadow-[0_0_12px_rgba(0,240,255,0.8)]"
                    : "bg-white/5 text-[#00f0ff] hover:bg-[#00f0ff]/20 border border-[#00f0ff]/30"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCapture}
              disabled={!!cameraError}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#ffd700] hover:bg-[#ffea00] text-black font-bold rounded text-xs transition-all shadow-[0_0_15px_rgba(255,215,0,0.6)] disabled:opacity-40"
            >
              <Sparkles size={14} />
              <span>CAPTURE HUD SNAPSHOT</span>
            </button>
          </div>
        </div>

        {/* Captured Snapshot Preview Modal if any */}
        {capturedImage && (
          <div className="mt-2 p-2 rounded border border-[#00f0ff]/40 bg-black/85 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={capturedImage}
                alt="Captured Snapshot"
                className="w-16 h-10 object-cover rounded border border-[#00f0ff]"
              />
              <span className="text-xs text-[#00f0ff] font-bold">
                HUD SNAPSHOT SAVED TO STARK TELEMETRY LOG
              </span>
            </div>
            <a
              href={capturedImage}
              download="stark_hud_optical_capture.png"
              className="flex items-center gap-1 px-3 py-1 bg-[#00f0ff]/20 hover:bg-[#00f0ff]/40 text-[#00f0ff] border border-[#00f0ff]/40 rounded text-xs font-bold transition-colors"
            >
              <Download size={13} />
              <span>DOWNLOAD</span>
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}
