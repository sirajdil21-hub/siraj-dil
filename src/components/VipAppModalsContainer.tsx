import React, { useState, useEffect } from "react";
import { cyberSynth } from "../utils/audioUtils";
import { getPakistanTimeInfo } from "../utils/timeUtils";

interface VipAppModalsContainerProps {
  activeAppId: string | null;
  onClose: () => void;
  onOpenUsbFlash?: () => void;
  onOpenDiagnostics?: () => void;
  onOpenSecurity?: () => void;
  onOpenCodeStudio?: () => void;
  onOpenIrisAi183?: () => void;
}

export default function VipAppModalsContainer({
  activeAppId,
  onClose,
  onOpenUsbFlash,
  onOpenDiagnostics,
  onOpenSecurity,
  onOpenCodeStudio,
  onOpenIrisAi183,
}: VipAppModalsContainerProps) {
  useEffect(() => {
    if (activeAppId === "code_studio") {
      onOpenCodeStudio?.();
      onClose();
    } else if (activeAppId === "iris_ai_183") {
      onOpenIrisAi183?.();
      onClose();
    }
  }, [activeAppId, onOpenCodeStudio, onOpenIrisAi183, onClose]);

  if (!activeAppId || activeAppId === "code_studio" || activeAppId === "iris_ai_183") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#030d1a] border-2 border-[#00f0ff] rounded-lg shadow-[0_0_40px_rgba(0,240,255,0.4)] overflow-hidden font-mono text-[#00f0ff] flex flex-col max-h-[90vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#02182b] border-b border-[#00f0ff]/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
            <span className="text-xs sm:text-sm font-black text-white tracking-widest uppercase">
              R.S. VIP TACTICAL SYSTEM //{" "}
              {activeAppId === "radar" && "SATELLITE RADAR RECON"}
              {activeAppId === "weather" && "PAKISTAN WEATHER RADAR"}
              {activeAppId === "arc_core" && "QUANTUM ARC POWER CORE"}
              {activeAppId === "security" && "BIOMETRIC VAULT [SIRAJ]"}
              {activeAppId === "camera" && "CYBER SURVEILLANCE CAM"}
              {activeAppId === "synth" && "CYBER FREQUENCY SYNTH"}
              {activeAppId === "comms" && "TACTICAL COMMUNICATOR"}
              {activeAppId === "clock" && "PAKISTAN ATOMIC CLOCK"}
            </span>
          </div>

          <button
            onClick={() => {
              cyberSynth.playBeep(600, 0.05);
              onClose();
            }}
            className="px-2.5 py-1 bg-red-600/30 hover:bg-red-600 text-white rounded text-xs font-bold border border-red-500 transition-all cursor-pointer"
          >
            ✕ بند کریں (CLOSE)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {activeAppId === "radar" && <SatelliteRadarApp />}
          {activeAppId === "weather" && <PakistanWeatherRadarApp />}
          {activeAppId === "arc_core" && <ArcReactorCoreApp />}
          {activeAppId === "security" && <BiometricSecurityVaultApp />}
          {activeAppId === "camera" && <CyberSurveillanceApp />}
          {activeAppId === "synth" && <AudioSynthApp />}
          {activeAppId === "comms" && <TacticalCommunicatorApp />}
          {activeAppId === "clock" && <PakistanAtomicClockApp />}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#02101e] border-t border-[#00f0ff]/30 text-[9px] text-white/70">
          <div>ROOT ADMIN: SIRAJ (سراج) // VIP PROTOCOL ACTIVE</div>
          <div className="text-[#00ff88]">STATUS: 100% OPERATIONAL</div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 1. SATELLITE RADAR RECON APP
// =========================================================================
function SatelliteRadarApp() {
  const [selectedSector, setSelectedSector] = useState("ISLAMABAD HQ");
  const [zoomLevel, setZoomLevel] = useState(2);
  const [isScanning, setIsScanning] = useState(true);

  const sectors = [
    { name: "ISLAMABAD HQ", coords: "33.6844° N, 73.0479° E", targets: 4, signal: "100%" },
    { name: "LAHORE SECTOR", coords: "31.5204° N, 74.3587° E", targets: 3, signal: "98%" },
    { name: "KARACHI COASTAL", coords: "24.8607° N, 67.0011° E", targets: 6, signal: "99%" },
    { name: "PESHAWAR NORTH", coords: "34.0151° N, 71.5249° E", targets: 2, signal: "95%" },
    { name: "QUETTA WEST", coords: "30.1798° N, 66.9750° E", targets: 3, signal: "97%" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-black/60 border border-[#00ff88]/40 rounded">
        <div>
          <div className="text-xs font-bold text-white uppercase">
            🛰️ سیٹلائٹ مانیٹرنگ راڈار (SATELLITE RECON)
          </div>
          <div className="text-[10px] text-[#00ff88]">
            PAK-SAT ORBITAL RADAR // LIVE TELEMETRY FEED
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              cyberSynth.playBeep(1200, 0.05);
              setIsScanning(!isScanning);
            }}
            className={`px-2.5 py-1 text-[10px] font-bold rounded border cursor-pointer ${
              isScanning
                ? "bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]"
                : "bg-black text-white/50 border-white/30"
            }`}
          >
            {isScanning ? "● SCANNING ACTIVE" : "PAUSED"}
          </button>
        </div>
      </div>

      {/* Sector Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {sectors.map((s) => (
          <button
            key={s.name}
            onClick={() => {
              cyberSynth.playBeep(900, 0.04);
              setSelectedSector(s.name);
            }}
            className={`p-2 rounded border text-left cursor-pointer transition-all ${
              selectedSector === s.name
                ? "bg-[#00ff88]/20 border-[#00ff88] text-white shadow-[0_0_10px_#00ff88]"
                : "bg-black/40 border-white/20 text-white/70 hover:border-[#00ff88]"
            }`}
          >
            <div className="text-xs font-bold">{s.name}</div>
            <div className="text-[8px] text-[#00ff88]">{s.coords}</div>
            <div className="text-[8px] text-white/50 mt-1 flex justify-between">
              <span>TARGETS: {s.targets}</span>
              <span className="text-[#00ff88]">SIG: {s.signal}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Radar Visualizer Screen */}
      <div className="relative w-full h-52 bg-[#020914] border border-[#00ff88]/50 rounded flex items-center justify-center overflow-hidden">
        {/* Radar Rings */}
        <div className="absolute w-44 h-44 rounded-full border border-[#00ff88]/30" />
        <div className="absolute w-32 h-32 rounded-full border border-[#00ff88]/40" />
        <div className="absolute w-20 h-20 rounded-full border border-[#00ff88]/50" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-[#00ff88]/30" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-[#00ff88]/30" />

        {/* Sweep */}
        {isScanning && (
          <div className="absolute w-44 h-44 rounded-full border-r-2 border-[#00ff88] animate-[spin_4s_linear_infinite]" />
        )}

        {/* Blips */}
        <div className="absolute top-12 left-24 w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
        <div className="absolute bottom-14 right-28 w-2 h-2 rounded-full bg-[#ffb703] animate-pulse" />
        <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-white animate-pulse" />

        <div className="relative z-10 text-center">
          <div className="text-sm font-black text-white drop-shadow-[0_0_8px_#00ff88]">
            {selectedSector}
          </div>
          <div className="text-[9px] text-[#00ff88]">STATUS: TARGETS LOCKED & TRACKED</div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 2. PAKISTAN WEATHER RADAR APP
// =========================================================================
function PakistanWeatherRadarApp() {
  const cities = [
    { name: "اسلام آباد (ISLAMABAD)", temp: "27°C", condition: "مون سون بارش", rain: "26 mm/h", humidity: "84%" },
    { name: "لاہور (LAHORE)", temp: "30°C", condition: "گرج چمک و بارش", rain: "38 mm/h", humidity: "88%" },
    { name: "کراچی (KARACHI)", temp: "31°C", condition: "ابر آلود و بونداباندی", rain: "4 mm/h", humidity: "76%" },
    { name: "پشاور (PESHAWAR)", temp: "32°C", condition: "تیز ہوائیں", rain: "12 mm/h", humidity: "65%" },
    { name: "کوئٹہ (QUETTA)", temp: "23°C", condition: "خوشگوار و صاف", rain: "0 mm/h", humidity: "35%" },
    { name: "مری (MURREE)", temp: "18°C", condition: "ٹھنڈی ہوا و کہرا", rain: "18 mm/h", humidity: "92%" },
  ];

  return (
    <div className="space-y-3">
      <div className="p-2.5 bg-[#011425] border border-[#00f0ff]/50 rounded flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-white">
            📡 پاکستان محکمہ موسمیات (PMD LIVE WEATHER RADAR)
          </div>
          <div className="text-[9px] text-[#00f0ff]">
            مون سون اسپیشل الرٹ // بالائی و میدانی علاقوں میں بارشوں کا سسٹم فعال
          </div>
        </div>
        <div className="px-2 py-0.5 bg-[#00f0ff]/20 text-[#00f0ff] text-[8px] font-bold rounded border border-[#00f0ff]/40">
          PMD 0125
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {cities.map((c) => (
          <div
            key={c.name}
            className="p-2.5 bg-black/60 border border-white/20 rounded hover:border-[#00f0ff] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-white">{c.name}</div>
              <div className="text-sm font-black text-[#00f0ff]">{c.temp}</div>
            </div>
            <div className="text-[10px] text-[#ffb703] font-semibold mt-1">
              {c.condition}
            </div>
            <div className="text-[8px] text-white/60 mt-1 flex justify-between">
              <span>بارش: {c.rain}</span>
              <span>نمی: {c.humidity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =========================================================================
// 3. QUANTUM ARC REACTOR POWER CORE APP
// =========================================================================
function ArcReactorCoreApp() {
  const [armorPower, setArmorPower] = useState(85);
  const [weaponPower, setWeaponPower] = useState(60);
  const [radarPower, setRadarPower] = useState(90);
  const [isOvercharged, setIsOvercharged] = useState(false);

  const handlePowerSurge = () => {
    cyberSynth.playOverrideSuccess();
    setIsOvercharged(true);
    setTimeout(() => setIsOvercharged(false), 3000);
  };

  return (
    <div className="space-y-4">
      <div className="p-3 bg-black/70 border border-[#ffb703]/50 rounded flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-white">
            ⚡ QUANTUM ARC REACTOR POWER DISTRIBUTION
          </div>
          <div className="text-[9px] text-[#ffb703]">
            TOTAL CORE GENERATION: 3.8 GIGAWATTS // FLUX: STABLE
          </div>
        </div>
        <button
          onClick={handlePowerSurge}
          className={`px-3 py-1.5 rounded text-xs font-black uppercase cursor-pointer transition-all ${
            isOvercharged
              ? "bg-[#ff003c] text-white animate-pulse shadow-[0_0_20px_#ff003c]"
              : "bg-[#ffb703] text-black hover:bg-white shadow-[0_0_10px_#ffb703]"
          }`}
        >
          {isOvercharged ? "⚡ POWER OVERLOAD (120%)" : "EMERGENCY SURGE"}
        </button>
      </div>

      {/* Sliders */}
      <div className="space-y-3 bg-[#011425] p-3 rounded border border-white/20">
        <div>
          <div className="flex justify-between text-xs font-bold text-white mb-1">
            <span>ARMOR & SHIELDS (آرمر شیلڈ)</span>
            <span className="text-[#00f0ff]">{armorPower}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={armorPower}
            onChange={(e) => setArmorPower(Number(e.target.value))}
            className="w-full accent-[#00f0ff] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-white mb-1">
            <span>TACTICAL WEAPONRY (ہتھیار سسٹمز)</span>
            <span className="text-[#ff003c]">{weaponPower}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={weaponPower}
            onChange={(e) => setWeaponPower(Number(e.target.value))}
            className="w-full accent-[#ff003c] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-white mb-1">
            <span>RADAR & SAT-LINK (راڈار سگنلز)</span>
            <span className="text-[#00ff88]">{radarPower}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={radarPower}
            onChange={(e) => setRadarPower(Number(e.target.value))}
            className="w-full accent-[#00ff88] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 4. BIOMETRIC SECURITY VAULT APP
// =========================================================================
function BiometricSecurityVaultApp() {
  const [isScanning, setIsScanning] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleScan = () => {
    cyberSynth.playBeep(950, 0.1);
    setIsScanning(true);
    setTimeout(() => {
      cyberSynth.playOverrideSuccess();
      setIsScanning(false);
      setIsVerified(true);
    }, 1500);
  };

  return (
    <div className="space-y-4 text-center">
      <div className="p-3 bg-black/60 border border-[#ff007f]/50 rounded">
        <div className="text-xs font-bold text-white">
          🔒 بائیو میٹرک سیکیورٹی والٹ (BIOMETRIC SECURITY VAULT)
        </div>
        <div className="text-[9px] text-[#ff007f]">
          AUTHENTICATION FOR ROOT USER: SIRAJ (سراج)
        </div>
      </div>

      <div className="py-4 flex flex-col items-center justify-center">
        <button
          onClick={handleScan}
          disabled={isScanning}
          className={`w-28 h-28 rounded-full border-2 flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden ${
            isVerified
              ? "border-[#00ff88] bg-[#00ff88]/10 shadow-[0_0_25px_#00ff88]"
              : isScanning
              ? "border-[#ff007f] bg-[#ff007f]/20 animate-pulse shadow-[0_0_25px_#ff007f]"
              : "border-[#00f0ff] bg-black/80 hover:bg-[#00f0ff]/10 shadow-[0_0_15px_#00f0ff]"
          }`}
        >
          <div className="text-3xl">👆</div>
          <div className="text-[8px] font-bold text-white mt-1">
            {isScanning ? "SCANNING..." : isVerified ? "VERIFIED" : "TAP TO SCAN"}
          </div>
        </button>

        <div className="mt-3 text-xs font-bold">
          {isVerified ? (
            <span className="text-[#00ff88]">
              ✓ ایڈمن سراج: بائیو میٹرک تصدیق کامیاب! تمام سسٹمز ان لاک ہیں۔
            </span>
          ) : isScanning ? (
            <span className="text-[#ff007f]">لیزر اسکیننگ جاری ہے...</span>
          ) : (
            <span className="text-white/60">
              انگلی رکھیں تاکہ سیکیورٹی والٹ کو ان لاک کیا جا سکے۔
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 5. CYBER SURVEILLANCE CAM APP
// =========================================================================
function CyberSurveillanceApp() {
  const [filter, setFilter] = useState<"standard" | "night_vision" | "thermal">("night_vision");

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-2 bg-black/70 border border-[#39ff14]/40 rounded">
        <div className="text-xs font-bold text-white">
          👁️ سائبر نائٹ ویژن کیمرہ (CYBER SURVEILLANCE)
        </div>
        <div className="flex gap-1">
          {(["standard", "night_vision", "thermal"] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                cyberSynth.playBeep(1100, 0.04);
                setFilter(f);
              }}
              className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase cursor-pointer border ${
                filter === f
                  ? "bg-[#39ff14] text-black border-[#39ff14]"
                  : "bg-black text-white/70 border-white/20"
              }`}
            >
              {f.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated HUD Camera Feed */}
      <div
        className={`relative w-full h-56 rounded border-2 overflow-hidden flex items-center justify-center ${
          filter === "night_vision"
            ? "border-[#39ff14] bg-[#011a05]"
            : filter === "thermal"
            ? "border-[#ff003c] bg-gradient-to-tr from-[#020024] via-[#790909] to-[#ffb703]"
            : "border-[#00f0ff] bg-[#020d18]"
        }`}
      >
        {/* Crosshair Target Box */}
        <div className="w-28 h-28 border border-white/60 relative flex items-center justify-center">
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white" />
          <span className="text-[9px] font-black text-white bg-black/60 px-1 py-0.2 rounded">
            TARGET LOCKED
          </span>
        </div>

        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none" />

        <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded">
          IR FPS: 60 // ISO: 3200 // ZOOM: 4.2X
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 6. CYBER FREQUENCY SYNTH APP
// =========================================================================
function AudioSynthApp() {
  const [frequency, setFrequency] = useState(440);

  const playTone = (freq: number) => {
    cyberSynth.playBeep(freq, 0.15);
  };

  return (
    <div className="space-y-4">
      <div className="p-2.5 bg-black/60 border border-[#bf5af2]/40 rounded flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-white">
            🎵 سائبر فریکوئنسی جنریٹر (AUDIO FREQUENCY SYNTH)
          </div>
          <div className="text-[9px] text-[#bf5af2]">
            STEREO OSCILLATOR // SOUND EFFECTS LAUNCHER
          </div>
        </div>
        <div className="text-xs font-bold text-white">{frequency} HZ</div>
      </div>

      {/* Frequency Slider */}
      <div className="bg-[#020d18] p-3 rounded border border-white/20">
        <input
          type="range"
          min="100"
          max="2000"
          step="20"
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          className="w-full accent-[#bf5af2] cursor-pointer"
        />
        <div className="flex justify-between text-[8px] text-white/50 mt-1">
          <span>100 HZ (BASS)</span>
          <span>440 HZ (STANDARD)</span>
          <span>2000 HZ (CYBER TREBLE)</span>
        </div>
      </div>

      {/* Soundboard Triggers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { label: "⚡ LASER CHARGE", freq: 1200 },
          { label: "🚨 TACTICAL SIREN", freq: 850 },
          { label: "🛰️ SAT PING", freq: 1600 },
          { label: "💥 CORE PULSE", freq: 220 },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => playTone(item.freq)}
            className="p-2 bg-[#bf5af2]/20 hover:bg-[#bf5af2] text-[#bf5af2] hover:text-black border border-[#bf5af2] rounded text-[9px] font-bold uppercase transition-all cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// =========================================================================
// 7. TACTICAL COMMUNICATOR APP
// =========================================================================
function TacticalCommunicatorApp() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("سلام، میں R.S. سسٹم سے رابطہ کر رہا ہوں۔");

  const handleSendWhatsApp = () => {
    cyberSynth.playOverrideSuccess();
    const cleanNum = phoneNumber.replace(/[^0-9]/g, "");
    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-3">
      <div className="p-2.5 bg-black/60 border border-[#00e5ff]/40 rounded">
        <div className="text-xs font-bold text-white">
          📱 ٹیکٹیکل واٹس ایپ و کمیونیکیٹر (TACTICAL COMMUNICATOR)
        </div>
        <div className="text-[9px] text-[#00e5ff]">
          ڈائریکٹ واٹس ایپ اور فون کالز کے لیے فوری ڈائلر
        </div>
      </div>

      <div className="space-y-2 bg-[#02101e] p-3 rounded border border-white/20">
        <div>
          <label className="text-[9px] text-white/70 block mb-1">
            فون نمبر لکھیں (بشمول ملک کا کوڈ، مثلاً: 923001234567):
          </label>
          <input
            type="text"
            placeholder="92300xxxxxxx"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full bg-black/80 border border-[#00e5ff]/50 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00e5ff]"
          />
        </div>

        <div>
          <label className="text-[9px] text-white/70 block mb-1">پیغام (MESSAGE):</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-black/80 border border-[#00e5ff]/50 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00e5ff]"
          />
        </div>

        <button
          onClick={handleSendWhatsApp}
          className="w-full py-2 bg-[#00ff88] hover:bg-white text-black font-black text-xs uppercase rounded cursor-pointer transition-all shadow-[0_0_12px_#00ff88]"
        >
          واٹس ایپ پر فوری بھیجیں (SEND VIA WHATSAPP)
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// 8. PAKISTAN ATOMIC CLOCK APP
// =========================================================================
function PakistanAtomicClockApp() {
  const [timeInfo, setTimeInfo] = useState(() => getPakistanTimeInfo());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeInfo(getPakistanTimeInfo());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 text-center">
      <div className="p-3 bg-black/70 border border-[#ff003c]/40 rounded">
        <div className="text-xs font-bold text-white">
          ⏱️ پاکستان معیاری وقت و ایٹمی گھڑی (PAKISTAN ATOMIC CLOCK)
        </div>
        <div className="text-[9px] text-[#ff003c]">
          TIMEZONE: ASIA/KARACHI (UTC+5:00) // HIGH PRECISION SYNC
        </div>
      </div>

      <div className="py-4 bg-[#020c18] border border-[#00f0ff]/50 rounded">
        <div className="text-4xl sm:text-5xl font-black text-white tracking-widest drop-shadow-[0_0_15px_#00f0ff]">
          {timeInfo.time24}
          <span className="text-xl text-[#00ff88]">.{timeInfo.milliseconds}</span>
        </div>
        <div className="text-base font-bold text-[#ffb703] tracking-widest mt-1">
          {timeInfo.time12}
        </div>
        <div className="text-xs text-white/70 tracking-wider mt-1">
          {timeInfo.day} • {timeInfo.dateFull}
        </div>
      </div>

      {/* Pakistan Prayer & Solar Timeline */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-[8.5px] font-mono">
        <div className="p-1.5 bg-black/60 border border-white/20 rounded">
          <div className="text-white/50">فجر (FAJR)</div>
          <div className="font-bold text-[#00f0ff]">04:42 AM</div>
        </div>
        <div className="p-1.5 bg-black/60 border border-white/20 rounded">
          <div className="text-white/50">ظہر (DHUHR)</div>
          <div className="font-bold text-[#00f0ff]">12:15 PM</div>
        </div>
        <div className="p-1.5 bg-black/60 border border-white/20 rounded">
          <div className="text-white/50">عصر (ASR)</div>
          <div className="font-bold text-[#00f0ff]">04:48 PM</div>
        </div>
        <div className="p-1.5 bg-black/60 border border-white/20 rounded">
          <div className="text-white/50">مغرب (MAGHRIB)</div>
          <div className="font-bold text-[#00f0ff]">06:35 PM</div>
        </div>
        <div className="p-1.5 bg-black/60 border border-white/20 rounded">
          <div className="text-white/50">عشاء (ISHA)</div>
          <div className="font-bold text-[#00f0ff]">07:54 PM</div>
        </div>
      </div>
    </div>
  );
}
