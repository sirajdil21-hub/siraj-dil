import React from "react";
import { cyberSynth } from "../utils/audioUtils";

export interface VipAppItem {
  id: string;
  titleUrdu: string;
  titleEn: string;
  icon: string;
  badge: string;
  color: string;
  category: string;
}

export const VIP_TACTICAL_APPS: VipAppItem[] = [
  {
    id: "iris_ai_183",
    titleEn: "IRIS X AI v1.8.3 // PRO SUITE",
    titleUrdu: "آئرس اے آئی 1.8.3 گھوسٹ و وزٹس",
    icon: "🧿",
    badge: "v1.8.3 PRO",
    color: "#00ff88",
    category: "AI DESKTOP",
  },
  {
    id: "code_studio",
    titleEn: "AI CODE STUDIO // WEB & APP",
    titleUrdu: "کوڈنگ اسٹرکچر و ویب بلڈر",
    icon: "💻",
    badge: "IDE ARCHITECT",
    color: "#00f0ff",
    category: "DEV STUDIO",
  },
  {
    id: "radar",
    titleEn: "SATELLITE RADAR RECON",
    titleUrdu: "سیٹلائٹ مانیٹرنگ راڈار",
    icon: "🛰️",
    badge: "ACTIVE 38.2°E",
    color: "#00ff88",
    category: "DEFENSE",
  },
  {
    id: "weather",
    titleEn: "PAKISTAN WEATHER RADAR",
    titleUrdu: "قومی موسمیاتی کنٹرول سنٹر",
    icon: "📡",
    badge: "MONSOON PMD",
    color: "#00f0ff",
    category: "METEOROLOGY",
  },
  {
    id: "arc_core",
    titleEn: "QUANTUM ARC POWER CORE",
    titleUrdu: "آرک ری ایکٹر پاور مینیجر",
    icon: "⚡",
    badge: "3.8 GW FLUX",
    color: "#ffb703",
    category: "ENERGY",
  },
  {
    id: "security",
    titleEn: "BIOMETRIC VAULT [SIRAJ]",
    titleUrdu: "بائیو میٹرک سیکیورٹی والٹ",
    icon: "🔒",
    badge: "ROOT ACCESS",
    color: "#ff007f",
    category: "SECURITY",
  },
  {
    id: "camera",
    titleEn: "CYBER CAM & IR SENSORS",
    titleUrdu: "سائبر نائٹ ویژن کیمرہ",
    icon: "👁️",
    badge: "1080P IR",
    color: "#39ff14",
    category: "VISION",
  },
  {
    id: "synth",
    titleEn: "CYBER FREQUENCY SYNTH",
    titleUrdu: "آواز و فریکوئنسی جنریٹر",
    icon: "🎵",
    badge: "440HZ STEREO",
    color: "#bf5af2",
    category: "AUDIO",
  },
  {
    id: "comms",
    titleEn: "TACTICAL COMMUNICATOR",
    titleUrdu: "کال و واٹس ایپ کنٹرول",
    icon: "📱",
    badge: "SOS LINK",
    color: "#00e5ff",
    category: "UPLINK",
  },
  {
    id: "clock",
    titleEn: "PAKISTAN ATOMIC CLOCK",
    titleUrdu: "پاکستان ایٹمی گھڑی و اوقات",
    icon: "⏱️",
    badge: "UTC+5 PKT",
    color: "#ff003c",
    category: "CHRONO",
  },
];

interface VipTacticalAppDockProps {
  onOpenApp: (appId: string) => void;
  activeAppId?: string | null;
}

export default function VipTacticalAppDock({
  onOpenApp,
  activeAppId,
}: VipTacticalAppDockProps) {
  return (
    <div className="w-full bg-[#030d17]/85 border border-[#00f0ff]/40 rounded-md p-2 shadow-[0_0_20px_rgba(0,240,255,0.2)] backdrop-blur-md">
      {/* Header with full title */}
      <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#00f0ff]/20 text-[9px] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
          <span className="font-bold text-white tracking-widest uppercase">
            R.S. VIP TACTICAL APPS SUITE // کمانڈ سنٹر
          </span>
          <span className="hidden sm:inline px-1.5 py-0.2 bg-[#00f0ff]/20 text-[#00f0ff] text-[7.5px] rounded border border-[#00f0ff]/40">
            ROOT: SIRAJ (سراج)
          </span>
        </div>
        <div className="text-[#00ff88] text-[8px] tracking-wider">
          SYSTEM: 8 APPS ONLINE
        </div>
      </div>

      {/* Grid of Apps */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {VIP_TACTICAL_APPS.map((app) => {
          const isActive = activeAppId === app.id;
          return (
            <button
              key={app.id}
              onClick={() => {
                cyberSynth.playBeep(1100, 0.04);
                onOpenApp(app.id);
              }}
              className={`flex flex-col items-center justify-between p-2 rounded border transition-all cursor-pointer text-center relative group overflow-hidden ${
                isActive
                  ? "bg-[#00f0ff]/20 border-[#00f0ff] shadow-[0_0_15px_#00f0ff]"
                  : "bg-black/60 hover:bg-[#02182b] border-white/20 hover:border-[#00f0ff]"
              }`}
              style={{
                borderColor: isActive ? app.color : undefined,
              }}
            >
              {/* Top Category Tag */}
              <div className="w-full flex items-center justify-between text-[7px] text-white/50 tracking-wider font-mono">
                <span>{app.category}</span>
                <span
                  className="px-1 py-0.2 rounded font-bold"
                  style={{
                    color: app.color,
                    backgroundColor: `${app.color}18`,
                    border: `1px solid ${app.color}40`,
                  }}
                >
                  {app.badge}
                </span>
              </div>

              {/* Large Icon */}
              <div className="text-2xl my-1 group-hover:scale-110 transition-transform">
                {app.icon}
              </div>

              {/* Full Title (English + Urdu) */}
              <div className="w-full">
                <div className="text-[8.5px] font-bold text-white tracking-wider truncate font-mono uppercase leading-tight">
                  {app.titleEn}
                </div>
                <div
                  className="text-[8px] font-semibold tracking-wide truncate"
                  style={{ color: app.color }}
                >
                  {app.titleUrdu}
                </div>
              </div>

              {/* Glowing Bottom Line on Hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: app.color }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
