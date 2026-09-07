import React from "react";
import { VipWallpaperType } from "./VipWallpaperEngine";
import { cyberSynth } from "../utils/audioUtils";

interface VipWallpaperSwitcherProps {
  currentWallpaper: VipWallpaperType;
  onChangeWallpaper: (type: VipWallpaperType) => void;
}

const WALLPAPERS: { id: VipWallpaperType; labelEn: string; labelUrdu: string; icon: string }[] = [
  {
    id: "stream",
    labelEn: "ABC LIGHT STREAM",
    labelUrdu: "اے بی سی نیون لائنیں",
    icon: "🔤",
  },
  {
    id: "arc_reactor",
    labelEn: "QUANTUM ARC CORE",
    labelUrdu: "3D آرک ری ایکٹر",
    icon: "⚡",
  },
  {
    id: "pakistan_radar",
    labelEn: "PAK DEFENSE RADAR",
    labelUrdu: "پاکستان راڈار وال پیپر",
    icon: "📡",
  },
  {
    id: "cyber_globe",
    labelEn: "3D ORBITAL GLOBE",
    labelUrdu: "ہولوگرافک گلوب",
    icon: "🌐",
  },
  {
    id: "cyber_grid",
    labelEn: "SYNTH HORIZON GRID",
    labelUrdu: "سائبر نیون گرڈ",
    icon: "🌆",
  },
];

export default function VipWallpaperSwitcher({
  currentWallpaper,
  onChangeWallpaper,
}: VipWallpaperSwitcherProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#030e1c]/90 border border-[#00f0ff]/40 rounded-md backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.2)]">
      <div className="flex items-center gap-1 px-1.5 text-[8px] font-mono text-[#00f0ff] uppercase font-bold tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
        <span>🎨 VIP وال پیپر:</span>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        {WALLPAPERS.map((item) => {
          const isActive = currentWallpaper === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                cyberSynth.playBeep(isActive ? 900 : 1300, 0.04);
                onChangeWallpaper(item.id);
              }}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-mono font-bold transition-all cursor-pointer border ${
                isActive
                  ? "bg-[#00f0ff] text-black border-[#00f0ff] shadow-[0_0_10px_#00f0ff]"
                  : "bg-black/60 text-white/80 border-white/20 hover:border-[#00f0ff] hover:text-white"
              }`}
              title={item.labelUrdu}
            >
              <span>{item.icon}</span>
              <span className="tracking-wide uppercase">{item.labelEn}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
