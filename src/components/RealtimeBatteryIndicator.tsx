import React, { useState, useEffect, useRef } from "react";
import {
  Battery,
  BatteryCharging,
  BatteryFull,
  BatteryMedium,
  BatteryLow,
  BatteryWarning,
  Zap,
  ShieldCheck,
  Activity,
  Cpu,
  Info,
  X,
  Volume2,
  AlertTriangle,
  Radio,
} from "lucide-react";
import { cyberSynth, speakInstantTTS, triggerLowPowerWarning } from "../utils/audioUtils";

export { triggerLowPowerWarning };

interface RealtimeBatteryIndicatorProps {
  variant?: "sniper" | "mark7";
  className?: string;
  showDetailsModalOnClick?: boolean;
}

export interface BatteryData {
  level: number; // 0 to 100
  charging: boolean;
  chargingTime: number; // seconds or Infinity
  dischargingTime: number; // seconds or Infinity
  supported: boolean;
  voltage: string;
  temperature: string;
  health: string;
}

export function useBatteryStatus(): BatteryData {
  const [batteryData, setBatteryData] = useState<BatteryData>({
    level: 88,
    charging: true,
    chargingTime: 0,
    dischargingTime: Infinity,
    supported: false,
    voltage: "4.18V",
    temperature: "31.4°C",
    health: "OPTIMAL (100%)",
  });

  useEffect(() => {
    let batteryInstance: any = null;

    const updateBatteryInfo = (bat: any) => {
      const lvl = Math.round(bat.level * 100);
      setBatteryData((prev) => ({
        ...prev,
        level: lvl,
        charging: bat.charging,
        chargingTime: bat.chargingTime,
        dischargingTime: bat.dischargingTime,
        supported: true,
        voltage: bat.charging ? "4.21V" : "4.05V",
        temperature: bat.charging ? "32.8°C" : "30.5°C",
        health: lvl > 20 ? "OPTIMAL (99%)" : "LOW VOLTAGE ALERT",
      }));
    };

    if (typeof navigator !== "undefined" && "getBattery" in navigator) {
      (navigator as any)
        .getBattery()
        .then((bat: any) => {
          batteryInstance = bat;
          updateBatteryInfo(bat);

          bat.addEventListener("levelchange", () => updateBatteryInfo(bat));
          bat.addEventListener("chargingchange", () => updateBatteryInfo(bat));
          bat.addEventListener("chargingtimechange", () => updateBatteryInfo(bat));
          bat.addEventListener("dischargingtimechange", () => updateBatteryInfo(bat));
        })
        .catch(() => {
          // Fallback handled in state
        });
    }

    return () => {
      if (batteryInstance) {
        try {
          batteryInstance.removeEventListener("levelchange", () => updateBatteryInfo(batteryInstance));
          batteryInstance.removeEventListener("chargingchange", () => updateBatteryInfo(batteryInstance));
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  return batteryData;
}

export default function RealtimeBatteryIndicator({
  variant = "sniper",
  className = "",
  showDetailsModalOnClick = true,
}: RealtimeBatteryIndicatorProps) {
  const battery = useBatteryStatus();
  const [showModal, setShowModal] = useState(false);
  const [criticalThreshold, setCriticalThreshold] = useState<number>(100);
  const [isWarningActive, setIsWarningActive] = useState<boolean>(false);
  const lastAlertedLevelRef = useRef<number | null>(null);

  // Automated voice-based 'Low Power' warning via speaker system when battery level reaches critical threshold of 100%
  useEffect(() => {
    if (battery.level >= criticalThreshold && lastAlertedLevelRef.current !== battery.level) {
      lastAlertedLevelRef.current = battery.level;
      setIsWarningActive(true);
      triggerLowPowerWarning(battery.level, criticalThreshold, false);
      const timer = setTimeout(() => setIsWarningActive(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [battery.level, criticalThreshold]);

  // Determine Battery Color & Theme
  let statusColor = "#00ff88"; // Neon green
  let glowColor = "rgba(0, 255, 136, 0.4)";
  let badgeText = "OPTIMAL";

  if (battery.level <= 20) {
    statusColor = "#ff3366"; // Red alert
    glowColor = "rgba(255, 51, 102, 0.5)";
    badgeText = "CRITICAL";
  } else if (battery.level <= 50) {
    statusColor = "#ffd700"; // Gold / Amber
    glowColor = "rgba(255, 215, 0, 0.4)";
    badgeText = "NOMINAL";
  } else if (!battery.charging && battery.level > 80) {
    statusColor = "#00f0ff"; // High-tech Cyan
    glowColor = "rgba(0, 240, 255, 0.4)";
    badgeText = "CHARGED";
  }

  const getBatteryIcon = () => {
    if (battery.charging) {
      return <BatteryCharging className="w-3.5 h-3.5 text-[#00ff88] animate-pulse" />;
    }
    if (battery.level <= 15) {
      return <BatteryWarning className="w-3.5 h-3.5 text-red-500 animate-bounce" />;
    }
    if (battery.level <= 35) {
      return <BatteryLow className="w-3.5 h-3.5 text-yellow-400" />;
    }
    if (battery.level <= 75) {
      return <BatteryMedium className="w-3.5 h-3.5 text-[#00f0ff]" />;
    }
    return <BatteryFull className="w-3.5 h-3.5 text-[#00ff88]" />;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    cyberSynth.playBeep(1250, 0.04);
    if (showDetailsModalOnClick) {
      setShowModal(true);
    }
    const urduMsg = `سراج، ڈیوائس کا بیٹری لیول ${battery.level} فیصد ہے اور ${
      battery.charging ? "چارجنگ ایکٹیو ہے" : "بیٹری بیک اپ پر ہے"
    }۔ پاور سسٹم مستحکم ہے۔`;
    speakInstantTTS(urduMsg, undefined, false);
  };

  return (
    <>
      {/* Top Bar Tactical Interactive Pill */}
      <button
        id="hud-realtime-battery-indicator"
        onClick={handleClick}
        className={`group relative flex items-center gap-1.5 px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-mono border transition-all cursor-pointer bg-black/80 hover:bg-black/95 ${
          variant === "mark7"
            ? "border-[#00f0ff]/40 hover:border-[#00f0ff]"
            : "border-[#00ff88]/50 hover:border-[#00ff88]"
        } ${className}`}
        style={{
          boxShadow: `0 0 10px ${glowColor}`,
          borderColor: statusColor,
        }}
        title={`Real-Time Device Battery: ${battery.level}% (${
          battery.charging ? "AC Charging" : "On Battery"
        }) - Click for power diagnostics & voice report`}
      >
        {/* Dynamic Battery Icon */}
        <div className="flex items-center justify-center">{getBatteryIcon()}</div>

        {/* Battery Percentage */}
        <div className="flex items-center gap-1 font-bold tracking-wider">
          <span style={{ color: statusColor }}>{battery.level}%</span>
          {battery.charging && (
            <Zap className="w-2.5 h-2.5 text-[#00ff88] fill-[#00ff88] animate-pulse" />
          )}
        </div>

        {/* Micro 4-Segment Tactical Power Gauge (Visible on sm+ screens) */}
        <div className="hidden sm:flex items-center gap-0.5 ml-0.5">
          {[1, 2, 3, 4].map((seg) => {
            const isLit = battery.level >= seg * 25 - 12;
            return (
              <span
                key={seg}
                className="w-1 h-2 rounded-[1px] transition-all"
                style={{
                  backgroundColor: isLit ? statusColor : "rgba(255,255,255,0.1)",
                  boxShadow: isLit ? `0 0 4px ${statusColor}` : "none",
                }}
              />
            );
          })}
        </div>

        {/* Live Power Source Badge */}
        <span
          className="text-[7px] px-1 py-0.2 rounded font-sans uppercase font-black"
          style={{
            backgroundColor: `${statusColor}22`,
            color: statusColor,
            border: `1px solid ${statusColor}44`,
          }}
        >
          {battery.charging ? "AC PWR" : "BATT"}
        </span>

        {/* Subtle Live Radar Ping */}
        <span
          className="w-1.5 h-1.5 rounded-full animate-ping"
          style={{ backgroundColor: statusColor }}
        />
      </button>

      {/* Real-time Battery & Power Diagnostics Modal / Popover */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-md bg-[#020d18] border-2 rounded-xl p-4 sm:p-5 text-[#00f0ff] font-mono shadow-[0_0_40px_rgba(0,255,136,0.3)] space-y-4"
            style={{ borderColor: statusColor }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#00f0ff]/30 pb-2.5">
              <div className="flex items-center gap-2">
                <div
                  className="p-1.5 rounded-lg border flex items-center justify-center shadow-[0_0_10px_rgba(0,255,136,0.4)]"
                  style={{
                    backgroundColor: `${statusColor}15`,
                    borderColor: statusColor,
                  }}
                >
                  {getBatteryIcon()}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                    DEVICE POWER TELEMETRY // بیٹری اسٹیٹس
                  </h3>
                  <div className="text-[9px] text-[#00f0ff]/80">
                    REAL-TIME CELL VOLTAGE & CHARGING MONITOR
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  cyberSynth.playBeep(800, 0.04);
                  setShowModal(false);
                }}
                className="p-1 rounded-lg bg-red-950/40 border border-red-500/50 hover:bg-red-500 hover:text-black text-red-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Giant Battery Gauge Readout */}
            <div className="bg-black/60 border border-[#00f0ff]/30 rounded-xl p-4 flex flex-col items-center justify-center space-y-3">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-4xl sm:text-5xl font-black font-mono tracking-tight drop-shadow-[0_0_15px_#00ff88]"
                  style={{ color: statusColor }}
                >
                  {battery.level}%
                </span>
                <span className="text-xs font-bold text-white uppercase font-sans">
                  {battery.charging ? "CHARGING ACTIVE" : "DISCHARGING"}
                </span>
              </div>

              {/* High-Tech Segmented Progress Bar */}
              <div className="w-full bg-black/80 h-3 rounded-full border border-white/20 overflow-hidden p-0.5 flex gap-1">
                {Array.from({ length: 10 }).map((_, idx) => {
                  const filled = battery.level >= (idx + 1) * 10 - 5;
                  return (
                    <div
                      key={idx}
                      className="flex-1 h-full rounded-xs transition-all duration-500"
                      style={{
                        backgroundColor: filled ? statusColor : "rgba(255,255,255,0.08)",
                        boxShadow: filled ? `0 0 6px ${statusColor}` : "none",
                      }}
                    />
                  );
                })}
              </div>

              <div className="flex items-center justify-between w-full text-[10px] text-gray-300">
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-[#00ff88]" />
                  <span>State: {badgeText}</span>
                </span>
                <span className="text-[#00f0ff]">
                  Source: {battery.charging ? "AC Wall / High-Speed Hub" : "Internal Li-Ion Cell"}
                </span>
              </div>
            </div>

            {/* Telemetry Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-black/50 border border-[#00f0ff]/20 p-2.5 rounded-lg space-y-1">
                <span className="text-[9px] text-gray-400 uppercase flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-[#00f0ff]" />
                  <span>CORE VOLTAGE</span>
                </span>
                <span className="text-white font-bold">{battery.voltage}</span>
              </div>

              <div className="bg-black/50 border border-[#00f0ff]/20 p-2.5 rounded-lg space-y-1">
                <span className="text-[9px] text-gray-400 uppercase flex items-center gap-1">
                  <Activity className="w-3 h-3 text-[#00ff88]" />
                  <span>CELL TEMPERATURE</span>
                </span>
                <span className="text-[#00ff88] font-bold">{battery.temperature}</span>
              </div>

              <div className="bg-black/50 border border-[#00f0ff]/20 p-2.5 rounded-lg space-y-1">
                <span className="text-[9px] text-gray-400 uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#00ff88]" />
                  <span>CELL HEALTH</span>
                </span>
                <span className="text-white font-bold">{battery.health}</span>
              </div>

              <div className="bg-black/50 border border-[#00f0ff]/20 p-2.5 rounded-lg space-y-1">
                <span className="text-[9px] text-gray-400 uppercase flex items-center gap-1">
                  <Info className="w-3 h-3 text-[#00f0ff]" />
                  <span>API SENSOR</span>
                </span>
                <span className="text-[#00f0ff] font-bold">
                  {battery.supported ? "LIVE SENSOR (W3C)" : "SIMULATED CELL"}
                </span>
              </div>
            </div>

            {/* Voice-Based 'Low Power' Critical Warning Control Panel */}
            <div className="bg-red-950/20 border border-red-500/40 rounded-xl p-3 space-y-2.5 shadow-[0_0_15px_rgba(255,51,102,0.15)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wide">
                    VOICE 'LOW POWER' WARNING // اسپیکر سسٹم
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] text-gray-400 uppercase">THRESHOLD:</span>
                  {[100, 20, 15].map((th) => (
                    <button
                      key={th}
                      onClick={() => {
                        cyberSynth.playBeep(1100, 0.03);
                        setCriticalThreshold(th);
                      }}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                        criticalThreshold === th
                          ? "bg-red-500 text-black shadow-[0_0_8px_rgba(255,51,102,0.6)]"
                          : "bg-black/60 border border-red-500/30 text-gray-300 hover:border-red-400"
                      }`}
                    >
                      {th}%
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-[9.5px] text-gray-300 leading-relaxed font-sans">
                اگر بیٹری لیول کریٹیکل تھریشولڈ (<span className="text-red-400 font-mono font-bold">{criticalThreshold}%</span>) پر پہنچتا ہے تو اسپیکر سسٹم سے خودکار ٹیکٹیکل سائرن اور صوتی 'لو پاور' الرٹ اناؤنس کیا جائے گا۔
              </p>

              <button
                id="btn-trigger-low-power-warning-test"
                onClick={() => {
                  triggerLowPowerWarning(battery.level, criticalThreshold, true);
                  setIsWarningActive(true);
                  setTimeout(() => setIsWarningActive(false), 3000);
                }}
                className="w-full py-2 px-3 rounded-lg font-mono font-bold text-xs uppercase transition-all cursor-pointer flex items-center justify-center gap-2 border border-red-500/80 bg-red-600/30 hover:bg-red-600 hover:text-black text-red-200 shadow-[0_0_15px_rgba(255,51,102,0.4)]"
              >
                <Volume2 className={`w-4 h-4 ${isWarningActive ? "animate-bounce text-yellow-300" : ""}`} />
                <span>
                  {isWarningActive
                    ? "ALERT BROADCASTING OVER SPEAKERS..."
                    : `TRIGGER 'LOW POWER' WARNING (${criticalThreshold}% THRESHOLD)`}
                </span>
                <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              </button>
            </div>

            {/* Voice Announcement Action */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[9px] text-[#00f0ff]/70">
                ADMIN: SIRAJ DIL // VIP ROOT CLEARANCE
              </span>
              <button
                onClick={() => {
                  cyberSynth.playOverrideSuccess();
                  const msg = `سراج، بیٹری لیول ${battery.level} فیصد ہے اور ${
                    battery.charging ? "چارجنگ جاری ہے" : "بیٹری موڈ فعال ہے"
                  }۔ سسٹم کا درجہ حرارت ${battery.temperature} اور وولٹیج ${battery.voltage} بالکل نارمل ہے۔`;
                  speakInstantTTS(msg, undefined, false);
                }}
                className="px-3 py-1 bg-[#00ff88] hover:bg-white text-black font-bold text-xs rounded transition-all cursor-pointer flex items-center gap-1 shadow-[0_0_10px_#00ff88]"
              >
                <Zap className="w-3 h-3" />
                <span>VOICE REPORT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
