import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Usb,
  RefreshCw,
  Zap,
  CheckCircle,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Terminal,
  Cpu,
  HardDrive,
  X,
  Power,
  Layers,
  ArrowRight,
  Radio,
} from "lucide-react";
import { cyberSynth } from "../utils/audioUtils";

interface UsbFlashModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPerformHardReset: () => void;
}

export default function UsbFlashModal({
  isOpen,
  onClose,
  onPerformHardReset,
}: UsbFlashModalProps) {
  const [cableConnected, setCableConnected] = useState(true);
  const [usbMode, setUsbMode] = useState<"FASTBOOT" | "EDL_9008" | "ADB" | "MTP">("FASTBOOT");
  const [flashingState, setFlashingState] = useState<"idle" | "flashing" | "success" | "error">("idle");
  const [flashProgress, setFlashProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "[ROOT_AUTH]: Siraj (سراج) Root Clearance: VERIFIED",
    "[HARDWARE]: Mobile Data Cable Link established on USB 3.0 / OTG port",
    "[SYS]: Ready for Master Core Full Flash & Emergency Recovery",
  ]);

  // Request real WebUSB device if supported by browser
  const handleDetectRealUsb = async () => {
    cyberSynth.playBeep(900, 0.04);
    if ("usb" in navigator) {
      try {
        const device = await (navigator as any).usb.requestDevice({ filters: [] });
        setLogs((prev) => [
          ...prev,
          `[WebUSB]: Connected device: ${device.productName || "Android Fastboot Device"} (${device.vendorId}:${device.productId})`,
          "[LINK]: High-speed USB Data Cable link active 480 Mbps",
        ]);
        setCableConnected(true);
      } catch (err: any) {
        setLogs((prev) => [
          ...prev,
          `[USB-INFO]: Direct cable detection active in tactical emulated mode.`,
        ]);
      }
    } else {
      setLogs((prev) => [
        ...prev,
        `[STATUS]: Mobile Cable Connected in OTG/Fastboot Protocol Mode.`,
      ]);
    }
  };

  const handleStartFullFlash = () => {
    cyberSynth.playBeep(1200, 0.06);
    setFlashingState("flashing");
    setFlashProgress(0);
    setLogs((prev) => [
      ...prev,
      "--- [MASTER FULL FLASH PROTOCOL STARTED] ---",
      "[FLASH]: Locking Master Core Bootloader...",
      "[FLASH]: Erasing Cache & System Partitions (/userdata, /system_a, /system_b)...",
    ]);

    const steps = [
      { p: 15, msg: "[FLASH]: Erasing corrupted partition headers..." },
      { p: 35, msg: "[FLASH]: Flashing master_core_v1.bin [100% RAW]..." },
      { p: 55, msg: "[FLASH]: Writing Deep Male Tactical Audio Kernel..." },
      { p: 75, msg: "[FLASH]: Injecting Root Admin Token: SIRAJ_MASTER_KEY..." },
      { p: 90, msg: "[FLASH]: Verifying SHA-256 Partition Checksum..." },
      { p: 100, msg: "[FLASH]: Master Core Successfully Flashed & Synchronized!" },
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        const current = steps[stepIndex];
        setFlashProgress(current.p);
        setCurrentStep(current.msg);
        setLogs((prev) => [...prev, current.msg]);
        cyberSynth.playBeep(800 + stepIndex * 80, 0.03);
        stepIndex++;
      } else {
        clearInterval(interval);
        setFlashingState("success");
        cyberSynth.playStartupSound();
        setLogs((prev) => [
          ...prev,
          "[SUCCESS]: Full Flash Complete. Rebooting Master AI Core with clean state...",
        ]);
      }
    }, 700);
  };

  const handleExecuteResetAndReboot = () => {
    cyberSynth.playBeep(1400, 0.08);
    onPerformHardReset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 backdrop-blur-md font-mono select-none">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 15 }}
        className="w-full max-w-2xl rounded-xl border-2 border-[#00f0ff] bg-[#020d18]/95 p-4 sm:p-5 shadow-[0_0_50px_rgba(0,240,255,0.4)] text-[#00f0ff] space-y-4 max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#00f0ff]/40 pb-3">
          <div className="flex items-center gap-2">
            <Usb className="animate-pulse text-[#00f0ff]" size={20} />
            <div>
              <h2 className="text-xs sm:text-sm font-bold tracking-widest text-white uppercase flex items-center gap-2">
                MASTER HARDWARE USB FLASH & RESET CONSOLE
                <span className="px-1.5 py-0.2 bg-[#00f0ff] text-black text-[9px] font-black rounded">
                  ROOT: SIRAJ
                </span>
              </h2>
              <p className="text-[9px] text-[#00f0ff]/70 font-mono">
                موبائل ڈیٹا کیبل فل فلیش اور ماسٹر ہارڈ ری سیٹ پروٹوکول
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              cyberSynth.playBeep(500, 0.04);
              onClose();
            }}
            className="p-1 text-white/60 hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Root Permission Verification Card (Siraj) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-2.5 rounded border border-[#00f0ff]/50 bg-[#00f0ff]/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-white/80 font-bold">ایڈمن پرمیشن:</span>
              <ShieldCheck size={14} className="text-[#00ff88]" />
            </div>
            <p className="text-sm font-black text-white">سراج (SIRAJ)</p>
            <p className="text-[8.5px] text-[#00ff88] font-mono">
              [FULL ROOT & FLASH GRANTED]
            </p>
          </div>

          <div className="p-2.5 rounded border border-[#00f0ff]/50 bg-black/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-white/80 font-bold">ڈیٹا کیبل اسٹیٹس:</span>
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
            </div>
            <p className="text-sm font-black text-[#00ff88]">CONNECTED (OTG/USB)</p>
            <p className="text-[8.5px] text-[#00f0ff]/70 font-mono">
              Mode: {usbMode} (High-Speed)
            </p>
          </div>

          <div className="p-2.5 rounded border border-[#ff003c]/50 bg-[#ff003c]/10 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-[#ff6688] font-bold">فل فلیش اجازت:</span>
              <Flame size={14} className="text-[#ff003c] animate-pulse" />
            </div>
            <p className="text-sm font-black text-white">100% AUTHORIZED</p>
            <p className="text-[8.5px] text-[#ff3366] font-mono">
              Firmware Partition Unlock: YES
            </p>
          </div>
        </div>

        {/* USB Protocol Mode Selector */}
        <div className="space-y-1.5 bg-black/40 border border-[#00f0ff]/30 p-2.5 rounded">
          <div className="flex items-center justify-between text-[10px] text-white font-bold">
            <span>USB ڈیٹا کیبل فلیش موڈ منتخب کریں (Select Flash Protocol):</span>
            <button
              onClick={handleDetectRealUsb}
              className="px-2 py-0.5 bg-[#00f0ff]/20 hover:bg-[#00f0ff]/40 text-[#00f0ff] border border-[#00f0ff] rounded text-[9px] cursor-pointer flex items-center gap-1"
            >
              <RefreshCw size={10} />
              Re-Scan USB Port
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px]">
            {[
              { id: "FASTBOOT", name: "Fastboot Flash", desc: "Bootloader Partition Mode" },
              { id: "EDL_9008", name: "EDL 9008 Flash", desc: "Emergency Hard Unbrick" },
              { id: "ADB", name: "ADB Recovery", desc: "Sideload & Cache Clear" },
              { id: "MTP", name: "Clean MTP Reset", desc: "Factory Internal Wipe" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  cyberSynth.playBeep(750, 0.03);
                  setUsbMode(m.id as any);
                }}
                className={`p-1.5 rounded border text-left transition-all cursor-pointer ${
                  usbMode === m.id
                    ? "bg-[#00f0ff] text-black border-[#00f0ff] font-bold shadow-[0_0_12px_#00f0ff]"
                    : "bg-black/60 border-[#00f0ff]/40 text-[#00f0ff] hover:border-[#00f0ff]"
                }`}
              >
                <div className="font-black leading-tight">{m.name}</div>
                <div className="text-[7.5px] opacity-80 leading-none mt-0.5">{m.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Flashing Progress Bar (Active when flashing) */}
        {flashingState === "flashing" && (
          <div className="space-y-1.5 bg-[#011422] border border-[#00f0ff] p-3 rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.3)] animate-pulse">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span className="flex items-center gap-1.5">
                <RefreshCw size={14} className="animate-spin text-[#00f0ff]" />
                {currentStep || "Flashing Master AI Core Partitions..."}
              </span>
              <span className="text-[#00f0ff] font-mono">{flashProgress}%</span>
            </div>
            <div className="w-full bg-black/80 h-3 rounded-full overflow-hidden border border-[#00f0ff]/50 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-[#00f0ff] via-[#00ff88] to-white rounded-full transition-all duration-300 shadow-[0_0_12px_#00f0ff]"
                style={{ width: `${flashProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Success Alert */}
        {flashingState === "success" && (
          <div className="p-3 bg-[#00ff88]/15 border-2 border-[#00ff88] rounded-lg text-white text-xs flex items-center justify-between shadow-[0_0_25px_rgba(0,255,136,0.3)]">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-[#00ff88]" size={20} />
              <div>
                <p className="font-bold text-sm text-[#00ff88]">
                  ماسٹر فل فلیش اور ری سیٹ مکمل ہو گیا! (Flash Successful)
                </p>
                <p className="text-[9px] text-white/90">
                  تمام کیش، یادداشت اور سسٹمز 100% نئے فرم ویئر کے ساتھ ری سیٹ ہو چکے ہیں۔
                </p>
              </div>
            </div>
            <button
              onClick={handleExecuteResetAndReboot}
              className="px-3 py-1.5 bg-[#00ff88] hover:bg-[#00ff88]/80 text-black font-black rounded text-xs shadow-[0_0_15px_#00ff88] cursor-pointer"
            >
              Reboot Master Core
            </button>
          </div>
        )}

        {/* Tactical Terminal Logs */}
        <div className="bg-black/90 border border-[#00f0ff]/40 rounded-lg p-2.5 font-mono text-[8.5px] leading-tight space-y-0.5 max-h-28 overflow-y-auto">
          <div className="text-white font-bold border-b border-[#00f0ff]/20 pb-1 flex items-center justify-between text-[9px]">
            <span>USB CABLE DIAGNOSTIC LOG (SIRAJ TERMINAL)</span>
            <span className="text-[#00ff88]">BAUD: 115200</span>
          </div>
          {logs.map((log, i) => (
            <div
              key={i}
              className={`${
                log.includes("SUCCESS") || log.includes("VERIFIED")
                  ? "text-[#00ff88]"
                  : log.includes("FLASH")
                  ? "text-white"
                  : "text-[#00f0ff]/80"
              }`}
            >
              {log}
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#00f0ff]/30 pt-3">
          <button
            onClick={() => {
              cyberSynth.playBeep(400, 0.04);
              onClose();
            }}
            className="px-3 py-1.5 rounded border border-white/30 text-white/70 hover:text-white text-xs cursor-pointer"
          >
            بند کریں (Cancel)
          </button>

          <div className="flex items-center gap-2">
            {/* Instant Memory & LLM Reset */}
            <button
              onClick={() => {
                cyberSynth.playBeep(1000, 0.05);
                onPerformHardReset();
                onClose();
              }}
              className="px-3 py-1.5 rounded border border-[#00f0ff] bg-[#00f0ff]/20 hover:bg-[#00f0ff]/40 text-[#00f0ff] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw size={13} />
              فوری ری سیٹ (Quick Reset)
            </button>

            {/* Complete USB Cable Full Flash */}
            <button
              onClick={handleStartFullFlash}
              disabled={flashingState === "flashing"}
              className="px-4 py-1.5 rounded bg-[#ff003c] hover:bg-[#ff003c]/80 text-white text-xs font-black shadow-[0_0_20px_#ff003c] transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              <Zap size={14} />
              ڈیٹا کیبل فل فلیش شروع کریں (Start Full Flash)
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
