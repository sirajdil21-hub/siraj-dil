import React, { useEffect, useRef } from "react";
import AlphabetStreamBackground from "./AlphabetStreamBackground";

export type VipWallpaperType =
  | "stream"
  | "arc_reactor"
  | "pakistan_radar"
  | "cyber_globe"
  | "cyber_grid";

interface VipWallpaperEngineProps {
  currentWallpaper: VipWallpaperType;
}

export default function VipWallpaperEngine({ currentWallpaper }: VipWallpaperEngineProps) {
  if (currentWallpaper === "stream") {
    return <AlphabetStreamBackground />;
  }

  if (currentWallpaper === "arc_reactor") {
    return <ArcReactorWallpaper />;
  }

  if (currentWallpaper === "pakistan_radar") {
    return <PakistanRadarWallpaper />;
  }

  if (currentWallpaper === "cyber_globe") {
    return <CyberGlobeWallpaper />;
  }

  if (currentWallpaper === "cyber_grid") {
    return <CyberGridWallpaper />;
  }

  return <AlphabetStreamBackground />;
}

// =========================================================================
// 1. ARC REACTOR 3D QUANTUM CORE WALLPAPER
// =========================================================================
function ArcReactorWallpaper() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center bg-[#02050a]">
      {/* Background Starfield / Particle Nebula */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0, 240, 255, 0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Central Rotating Plasma Core */}
      <div className="relative w-[500px] h-[500px] flex items-center justify-center">
        {/* Deep background ambient glow */}
        <div className="absolute w-80 h-80 rounded-full bg-[#00f0ff]/10 blur-3xl animate-pulse" />
        <div className="absolute w-60 h-60 rounded-full bg-[#00ff88]/10 blur-2xl animate-ping opacity-30" />

        {/* Outer Ring 1 - Slow Clockwise */}
        <div className="absolute w-[440px] h-[440px] rounded-full border border-[#00f0ff]/30 border-dashed animate-[spin_40s_linear_infinite]" />

        {/* Outer Ring 2 - Segmented Arcs Counter-Clockwise */}
        <div className="absolute w-[380px] h-[380px] rounded-full border-2 border-t-[#00f0ff] border-r-transparent border-b-[#00ff88] border-l-transparent animate-[spin_25s_linear_infinite_reverse] opacity-70" />

        {/* Arc Segments SVG */}
        <svg
          viewBox="0 0 300 300"
          className="absolute w-[340px] h-[340px] animate-[spin_18s_linear_infinite]"
        >
          <circle
            cx="150"
            cy="150"
            r="130"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="2"
            strokeDasharray="15 35"
            opacity="0.8"
          />
          <circle
            cx="150"
            cy="150"
            r="110"
            fill="none"
            stroke="#ffb703"
            strokeWidth="1.5"
            strokeDasharray="40 20 10 20"
            opacity="0.7"
          />
          {/* Reactor Coils */}
          {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
            <rect
              key={deg}
              x="142"
              y="22"
              width="16"
              height="28"
              rx="4"
              fill="#00f0ff"
              opacity="0.85"
              transform={`rotate(${deg} 150 150)`}
              className="drop-shadow-[0_0_8px_#00f0ff]"
            />
          ))}
        </svg>

        {/* Middle Core Ring */}
        <div className="absolute w-[200px] h-[200px] rounded-full border-4 border-[#00f0ff]/60 shadow-[0_0_30px_rgba(0,240,255,0.6)] flex items-center justify-center animate-[spin_12s_linear_infinite_reverse]">
          <div className="w-[170px] h-[170px] rounded-full border border-white/50 border-dotted" />
        </div>

        {/* Inner High-Energy Core */}
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-[#00f0ff] via-[#ffffff] to-[#00ff88] shadow-[0_0_50px_#00f0ff] flex items-center justify-center animate-pulse">
          <div className="w-16 h-16 rounded-full bg-[#03060a] flex items-center justify-center border border-[#00f0ff]">
            <span className="text-white text-xs font-black tracking-widest drop-shadow-[0_0_10px_#00f0ff]">
              R.S.
            </span>
          </div>
        </div>
      </div>

      {/* Floating Telemetry Text */}
      <div className="absolute top-16 left-12 text-[10px] font-mono text-[#00f0ff]/50 space-y-1">
        <div>CORE OUTPUT: 3.8 GW // STABLE</div>
        <div>MAGNETIC SHIELD: 100% ACTIVE</div>
        <div>TEMPERATURE: 4,200 KELVIN</div>
      </div>
      <div className="absolute bottom-16 right-12 text-[10px] font-mono text-[#00ff88]/50 text-right space-y-1">
        <div>ENERGY VECTOR: QUANTUM FLUX</div>
        <div>OPERATING MODE: CONTINUOUS</div>
        <div>AUTHORIZED: ROOT_SIRAJ</div>
      </div>
    </div>
  );
}

// =========================================================================
// 2. PAKISTAN STRATEGIC DEFENSE RADAR WALLPAPER
// =========================================================================
function PakistanRadarWallpaper() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.42;

    const cities = [
      { name: "ISLAMABAD (HQ)", x: cx + 25, y: cy - 70, status: "DEFENSE GRID: 100%" },
      { name: "LAHORE", x: cx + 70, y: cy - 20, status: "RADAR ACTIVE" },
      { name: "KARACHI (FLEET)", x: cx - 60, y: cy + 130, status: "NAVAL UPLINK" },
      { name: "PESHAWAR", x: cx - 20, y: cy - 90, status: "SECTOR SECURE" },
      { name: "QUETTA", x: cx - 110, y: cy + 10, status: "BORDER RADAR" },
      { name: "MURREE (AIR DEF)", x: cx + 45, y: cy - 85, status: "WEATHER RADAR" },
    ];

    const render = () => {
      // Fade trail
      ctx.fillStyle = "rgba(2, 6, 12, 0.2)";
      ctx.fillRect(0, 0, width, height);

      // Draw Range Circles
      ctx.strokeStyle = "rgba(0, 255, 136, 0.25)";
      ctx.lineWidth = 1;
      for (let r = radius * 0.25; r <= radius; r += radius * 0.25) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw Axis crosshair lines
      ctx.beginPath();
      ctx.moveTo(cx - radius - 20, cy);
      ctx.lineTo(cx + radius + 20, cy);
      ctx.moveTo(cx, cy - radius - 20);
      ctx.lineTo(cx, cy + radius + 20);
      ctx.stroke();

      // Rotating Radar Sweep Beam
      angle += 0.035;
      const sweepX = cx + Math.cos(angle) * radius;
      const sweepY = cy + Math.sin(angle) * radius;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, "rgba(0, 255, 136, 0.4)");
      grad.addColorStop(1, "rgba(0, 255, 136, 0.0)");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle - 0.45, angle);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Sweep leading line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sweepX, sweepY);
      ctx.strokeStyle = "#00ff88";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Draw Pakistan City Nodes with pulsing dots
      cities.forEach((city) => {
        ctx.fillStyle = "#00ff88";
        ctx.shadowColor = "#00ff88";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(city.x, city.y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(0, 255, 136, 0.4)";
        ctx.beginPath();
        ctx.arc(city.x, city.y, 9, 0, Math.PI * 2);
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px monospace";
        ctx.fillText(city.name, city.x + 12, city.y - 2);
        ctx.fillStyle = "rgba(0, 255, 136, 0.7)";
        ctx.font = "7.5px monospace";
        ctx.fillText(city.status, city.x + 12, city.y + 8);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 bg-[#02070f]">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-14 left-8 text-xs font-mono text-[#00ff88] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
        <span>PAKISTAN STRATEGIC DEFENSE RADAR // ASIA/KARACHI 0125</span>
      </div>
    </div>
  );
}

// =========================================================================
// 3. HOLOGRAPHIC 3D CYBER GLOBE WALLPAPER
// =========================================================================
function CyberGlobeWallpaper() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center bg-[#02050e]">
      {/* Deep Space Starfield */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0, 240, 255, 0.2) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Rotating 3D Holographic Globe Framework */}
      <div className="relative w-[520px] h-[520px] flex items-center justify-center">
        {/* Ambient Halo */}
        <div className="absolute w-[450px] h-[450px] rounded-full bg-[#00f0ff]/10 blur-3xl" />

        {/* Longitude Ellipses with 3D rotation */}
        <div className="absolute w-[440px] h-[440px] rounded-full border border-[#00f0ff]/40 animate-[spin_30s_linear_infinite]" />
        <div className="absolute w-[220px] h-[440px] rounded-full border border-[#00f0ff]/30 animate-[spin_20s_linear_infinite]" />
        <div className="absolute w-[110px] h-[440px] rounded-full border border-[#00ff88]/30 animate-[spin_15s_linear_infinite_reverse]" />

        {/* Latitude Rings */}
        <div className="absolute w-[420px] h-[160px] rounded-full border border-[#00f0ff]/40 [transform:rotateX(65deg)]" />
        <div className="absolute w-[360px] h-[120px] rounded-full border border-[#ffb703]/30 [transform:rotateX(65deg)_translateY(-80px)]" />
        <div className="absolute w-[360px] h-[120px] rounded-full border border-[#ffb703]/30 [transform:rotateX(65deg)_translateY(80px)]" />

        {/* Orbiting Satellite Trails */}
        <div className="absolute w-[500px] h-[180px] rounded-full border border-dashed border-[#00f0ff]/60 [transform:rotate(-35deg)_rotateX(70deg)] animate-[spin_16s_linear_infinite]">
          <div className="absolute top-0 left-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#00f0ff]" />
        </div>

        {/* Central Core Marker */}
        <div className="w-16 h-16 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff] flex items-center justify-center shadow-[0_0_20px_#00f0ff]">
          <div className="w-3 h-3 rounded-full bg-white animate-ping" />
        </div>
      </div>

      <div className="absolute top-14 right-10 text-[9px] font-mono text-[#00f0ff]/60 text-right space-y-0.5">
        <div>GLOBAL ORBITAL RECONNAISSANCE</div>
        <div>SAT-ID: PAK-SAT-1R // 38.2°E</div>
        <div>COORDINATES: 33.6844° N, 73.0479° E</div>
      </div>
    </div>
  );
}

// =========================================================================
// 4. CYBER SYNTHWAVE HORIZON GRID WALLPAPER
// =========================================================================
function CyberGridWallpaper() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 bg-[#030208]">
      {/* Neon Digital Sun on the Horizon */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-t from-[#ff007f] via-[#ffb703] to-transparent shadow-[0_0_70px_rgba(255,0,127,0.7)] flex flex-col justify-end overflow-hidden">
        {/* Sun Blinds Lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-full bg-[#030208]"
            style={{ height: `${i * 2 + 3}px`, marginBottom: `${i * 2 + 3}px` }}
          />
        ))}
      </div>

      {/* Horizon Line Glow */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent shadow-[0_0_20px_#00f0ff]" />

      {/* 3D Perspective Moving Grid */}
      <div
        className="absolute top-1/2 left-0 right-0 bottom-0 overflow-hidden"
        style={{
          perspective: "400px",
          perspectiveOrigin: "50% 0%",
        }}
      >
        <div
          className="w-full h-[200%] origin-top animate-[cybergrid_10s_linear_infinite]"
          style={{
            transform: "rotateX(75deg)",
            backgroundImage:
              "linear-gradient(to right, rgba(0, 240, 255, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 0, 127, 0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <style>{`
        @keyframes cybergrid {
          0% { background-position: 0 0; }
          100% { background-position: 0 400px; }
        }
      `}</style>
    </div>
  );
}
