import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CloudRain,
  CloudLightning,
  Sun,
  CloudSun,
  Wind,
  Droplets,
  Thermometer,
  Compass,
  AlertTriangle,
} from "lucide-react";

export interface PakistanCityWeather {
  id: string;
  name: string;
  urduName: string;
  province: string;
  temp: number;
  feelsLike: number;
  condition: string;
  urduCondition: string;
  iconType: "heavy_rain" | "thunderstorm" | "cloudy" | "light_rain" | "sunny";
  rainfall: string; // e.g. "24.5 mm/hr"
  rainChance: number; // e.g. 90
  humidity: number; // e.g. 84
  wind: string; // e.g. "16 km/h NW"
  radarCoords: { x: number; y: number }; // percentage on Pakistan map
  floodWarning?: boolean;
}

export const PAKISTAN_CITIES: PakistanCityWeather[] = [
  {
    id: "isb",
    name: "ISLAMABAD",
    urduName: "اسلام آباد",
    province: "Capital Territory",
    temp: 27,
    feelsLike: 29,
    condition: "HEAVY MONSOON RAIN",
    urduCondition: "موسلا دھار مون سون بارش",
    iconType: "heavy_rain",
    rainfall: "26.4 mm/hr",
    rainChance: 92,
    humidity: 86,
    wind: "15 km/h NE",
    radarCoords: { x: 58, y: 32 },
    floodWarning: true,
  },
  {
    id: "lhr",
    name: "LAHORE",
    urduName: "لاہور",
    province: "Punjab",
    temp: 30,
    feelsLike: 34,
    condition: "THUNDERSTORM & RAIN",
    urduCondition: "گرج چمک اور بارش",
    iconType: "thunderstorm",
    rainfall: "19.8 mm/hr",
    rainChance: 85,
    humidity: 80,
    wind: "18 km/h E",
    radarCoords: { x: 67, y: 44 },
    floodWarning: true,
  },
  {
    id: "khi",
    name: "KARACHI",
    urduName: "کراچی",
    province: "Sindh",
    temp: 31,
    feelsLike: 36,
    condition: "OVERCAST & DRIZZLE",
    urduCondition: "ابر آلود اور سمندری بونداباندی",
    iconType: "light_rain",
    rainfall: "4.2 mm/hr",
    rainChance: 55,
    humidity: 82,
    wind: "28 km/h SW",
    radarCoords: { x: 34, y: 88 },
  },
  {
    id: "pew",
    name: "PESHAWAR",
    urduName: "پشاور",
    province: "Khyber Pakhtunkhwa",
    temp: 32,
    feelsLike: 35,
    condition: "SCATTERED SHOWERS",
    urduCondition: "وقفے وقفے سے تیز بارش",
    iconType: "heavy_rain",
    rainfall: "14.5 mm/hr",
    rainChance: 75,
    humidity: 68,
    wind: "12 km/h NW",
    radarCoords: { x: 50, y: 28 },
  },
  {
    id: "mre",
    name: "MURREE",
    urduName: "مری",
    province: "Galyat / Punjab",
    temp: 18,
    feelsLike: 17,
    condition: "DENSE FOG & TORRENTIAL RAIN",
    urduCondition: "شدید دھند اور بارش",
    iconType: "heavy_rain",
    rainfall: "34.0 mm/hr",
    rainChance: 98,
    humidity: 95,
    wind: "22 km/h N",
    radarCoords: { x: 62, y: 29 },
    floodWarning: true,
  },
  {
    id: "uet",
    name: "QUETTA",
    urduName: "کوئٹہ",
    province: "Balochistan",
    temp: 23,
    feelsLike: 22,
    condition: "PARTLY CLOUDY / BREEZY",
    urduCondition: "مطلع جزوی ابر آلود",
    iconType: "cloudy",
    rainfall: "0.0 mm/hr",
    rainChance: 15,
    humidity: 34,
    wind: "19 km/h W",
    radarCoords: { x: 28, y: 52 },
  },
];

export default function WeatherReportCard() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const city = PAKISTAN_CITIES[selectedIdx];

  // Auto cycle city every 8 seconds if not manually clicked
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIdx((prev) => (prev + 1) % PAKISTAN_CITIES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative border border-[#00f0ff]/40 rounded-sm bg-[#04101b]/95 p-2 sm:p-2.5 flex flex-col gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.14)]">
      {/* Card Header matching reference UI */}
      <div className="flex items-center justify-between border-b border-[#00f0ff]/20 pb-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
          <span className="text-[10.5px] font-black tracking-widest text-[#00f0ff] uppercase">
            PAKISTAN WEATHER REPORT
          </span>
        </div>
        <div className="flex items-center gap-1 text-[9px] text-[#ffd700] font-mono">
          <span>PMD LIVE RADAR</span>
        </div>
      </div>

      {/* City Switcher Tabs */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto pb-0.5 scrollbar-none">
        {PAKISTAN_CITIES.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => setSelectedIdx(idx)}
            className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
              idx === selectedIdx
                ? "bg-[#00f0ff] text-black shadow-[0_0_8px_#00f0ff]"
                : "bg-black/60 border border-[#00f0ff]/30 text-[#00f0ff]/80 hover:bg-[#00f0ff]/20"
            }`}
          >
            {c.name.slice(0, 4)}
          </button>
        ))}
      </div>

      {/* Current City Metrics & Weather Icon */}
      <AnimatePresence mode="wait">
        <motion.div
          key={city.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-1"
        >
          {/* Main Temp & Urdu Name Display */}
          <div className="flex items-center justify-between bg-black/60 border border-[#00f0ff]/20 rounded p-1.5">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-white tracking-tighter">
                  {city.temp}°C
                </span>
                <span className="text-[9px] font-bold text-[#ffd700]">
                  (Feels {city.feelsLike}°C)
                </span>
              </div>
              <div className="text-[10px] font-bold text-[#00f0ff] tracking-wide flex items-center gap-1">
                <span>{city.name}, PAK</span>
                <span className="text-white/60">|</span>
                <span className="text-[#00ff88]">{city.urduName}</span>
              </div>
            </div>

            {/* Weather Animated Icon */}
            <div className="flex flex-col items-center justify-center p-1 bg-[#00f0ff]/10 rounded border border-[#00f0ff]/40">
              {city.iconType === "heavy_rain" && (
                <CloudRain size={24} className="text-[#00f0ff] animate-pulse" />
              )}
              {city.iconType === "thunderstorm" && (
                <CloudLightning size={24} className="text-[#ffd700] animate-bounce" />
              )}
              {city.iconType === "light_rain" && (
                <CloudRain size={22} className="text-[#00f0ff]" />
              )}
              {city.iconType === "cloudy" && (
                <CloudSun size={24} className="text-[#ffd700]" />
              )}
              {city.iconType === "sunny" && (
                <Sun size={24} className="text-[#ffd700] animate-spin" />
              )}
              <span className="text-[7.5px] text-white/90 mt-0.5 font-bold">
                {city.rainChance}% RAIN
              </span>
            </div>
          </div>

          {/* Real-time Monsoon & Rain Metrics */}
          <div className="grid grid-cols-3 gap-1 text-[8.5px] font-mono">
            {/* Rainfall Rate */}
            <div className="bg-black/60 border border-[#00f0ff]/20 rounded p-1 flex flex-col">
              <span className="text-white/60 flex items-center gap-0.5">
                <Droplets size={9} className="text-[#00f0ff]" /> بارش
              </span>
              <span className="text-[#00f0ff] font-bold text-[9px] truncate">
                {city.rainfall}
              </span>
            </div>

            {/* Humidity */}
            <div className="bg-black/60 border border-[#00f0ff]/20 rounded p-1 flex flex-col">
              <span className="text-white/60 flex items-center gap-0.5">
                <Thermometer size={9} className="text-[#00ff88]" /> نمی
              </span>
              <span className="text-[#00ff88] font-bold text-[9px]">
                {city.humidity}% Humid
              </span>
            </div>

            {/* Wind */}
            <div className="bg-black/60 border border-[#00f0ff]/20 rounded p-1 flex flex-col">
              <span className="text-white/60 flex items-center gap-0.5">
                <Wind size={9} className="text-[#ffd700]" /> ہوا
              </span>
              <span className="text-[#ffd700] font-bold text-[9px] truncate">
                {city.wind}
              </span>
            </div>
          </div>

          {/* Condition Description & Urdu Status */}
          <div className="text-[8.5px] font-mono leading-tight px-1 flex items-center justify-between text-white/90">
            <span className="text-[#00f0ff] font-semibold truncate">
              {city.condition}
            </span>
            <span className="text-[#00ff88] text-[9px] font-urdu shrink-0 ml-1">
              {city.urduCondition}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pakistan Satellite & Doppler Rain Radar Screen */}
      <div className="relative w-full h-[80px] sm:h-[90px] rounded bg-black/80 border border-[#00f0ff]/30 overflow-hidden flex items-center justify-center">
        {/* Pakistan Map Tactical Wireframe Silhouette */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
        >
          {/* Map Grid */}
          <defs>
            <pattern id="radarGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,240,255,0.15)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#radarGrid)" />

          {/* Pakistan Geometric Contour Outline */}
          <polygon
            points="70,10 115,8 145,22 135,45 105,75 75,92 50,85 40,65 55,45 65,30"
            fill="rgba(0, 240, 255, 0.08)"
            stroke="#00f0ff"
            strokeWidth="1.2"
            strokeDasharray="2,2"
          />
          {/* Indus River Arteries */}
          <path
            d="M 125,18 Q 110,40 90,65 T 65,88"
            fill="none"
            stroke="#00ff88"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />
        </svg>

        {/* Tactical Radar Ring Center */}
        <div className="relative w-[70px] h-[70px] rounded-full border border-[#00ff88]/50 flex items-center justify-center">
          <div className="w-[48px] h-[48px] rounded-full border border-[#00ff88]/30 flex items-center justify-center">
            <div className="w-[24px] h-[24px] rounded-full border border-[#00ff88]/20" />
          </div>

          {/* Crosshair beams */}
          <div className="absolute w-full h-[1px] bg-[#00ff88]/30" />
          <div className="absolute h-full w-[1px] bg-[#00ff88]/30" />

          {/* Rotating Doppler Rain Scan Beam */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(0,255,136,0.65) 0deg, rgba(0,240,255,0.3) 45deg, transparent 70deg)",
            }}
          />
        </div>

        {/* Live Rain Storm Cells on Pakistan Map */}
        <span
          className="absolute top-[28%] left-[58%] w-2 h-2 rounded-full bg-[#00f0ff] animate-ping"
          title="Monsoon Cloud Cluster (Punjab/ISB)"
        />
        <span
          className="absolute top-[42%] left-[67%] w-1.5 h-1.5 rounded-full bg-[#ffd700] animate-ping"
          title="Storm Cell (Lahore)"
        />
        <span
          className="absolute bottom-[20%] left-[36%] w-1.5 h-1.5 rounded-full bg-[#00ff88]"
          title="Coastal Cloud (Karachi)"
        />

        {/* Selected City Marker on Radar */}
        <motion.div
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute w-2 h-2 rounded-full bg-[#ff003c] border border-white shadow-[0_0_8px_#ff003c]"
          style={{
            left: `${city.radarCoords.x}%`,
            top: `${city.radarCoords.y}%`,
          }}
        />

        {/* Radar Overlay Label */}
        <div className="absolute bottom-1 right-1.5 text-[7.5px] font-mono text-[#00ff88] bg-black/80 px-1 py-0.2 rounded border border-[#00ff88]/30">
          PAK SATELLITE: {city.name} RADAR
        </div>
      </div>
    </div>
  );
}
