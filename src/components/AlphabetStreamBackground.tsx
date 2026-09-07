import React, { useEffect, useRef } from "react";

// Single A to Z Letters for Pure Cyber Digital Light Stream
const ALPHABET_CHARS = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
  "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
  "U", "V", "W", "X", "Y", "Z", "R", "S", "0", "1", "7"
];

// Vivid Cyber Neon Color Themes for Individual Vertical Light Columns
const NEON_PALETTES = [
  { main: "#00f0ff", glow: "rgba(0, 240, 255, 0.9)", head: "#ffffff", name: "Cyan" },
  { main: "#00ff66", glow: "rgba(0, 255, 102, 0.9)", head: "#ffffff", name: "Matrix Green" },
  { main: "#ff007f", glow: "rgba(255, 0, 127, 0.9)", head: "#ffffff", name: "Hot Magenta" },
  { main: "#ffb703", glow: "rgba(255, 183, 3, 0.9)", head: "#fff9db", name: "Cyber Amber" },
  { main: "#39ff14", glow: "rgba(57, 255, 20, 0.9)", head: "#ffffff", name: "Toxic Lime" },
  { main: "#bf5af2", glow: "rgba(191, 90, 242, 0.9)", head: "#ffffff", name: "Electric Violet" },
  { main: "#ff003c", glow: "rgba(255, 0, 60, 0.9)", head: "#ffe5ea", name: "Hacker Crimson" },
  { main: "#00e5ff", glow: "rgba(0, 229, 255, 0.9)", head: "#ffffff", name: "Ice Blue" },
];

interface ColumnStream {
  x: number;
  y: number;
  speed: number;
  trailLength: number;
  chars: string[];
  paletteIndex: number;
  fontSize: number;
  stepCounter: number;
  mutationSpeed: number;
}

export default function AlphabetStreamBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const charSpacing = 18; // Vertical distance between stacked letters
    const colSpacing = 24;  // Horizontal distance between vertical light lines
    let columns: ColumnStream[] = [];

    const createColumn = (x: number, randomizeY = true): ColumnStream => {
      const trailLength = Math.floor(Math.random() * 18) + 12; // 12 to 30 letters long light trail
      const chars: string[] = [];
      for (let i = 0; i < trailLength; i++) {
        chars.push(ALPHABET_CHARS[Math.floor(Math.random() * ALPHABET_CHARS.length)]);
      }

      return {
        x,
        y: randomizeY ? Math.random() * -height * 1.2 : -trailLength * charSpacing,
        // Fast, smooth cascading speeds (between 4.5px and 9.5px per tick)
        speed: 4.8 + Math.random() * 5.2,
        trailLength,
        chars,
        paletteIndex: Math.floor(Math.random() * NEON_PALETTES.length),
        fontSize: Math.random() > 0.4 ? 13 : 11.5,
        stepCounter: 0,
        mutationSpeed: Math.floor(Math.random() * 4) + 3,
      };
    };

    const initColumns = () => {
      columns = [];
      const colCount = Math.ceil(width / colSpacing);
      for (let i = 0; i < colCount; i++) {
        // Stagger every column across the entire width
        columns.push(createColumn(i * colSpacing + 6, true));
      }
    };

    initColumns();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initColumns();
    };

    window.addEventListener("resize", handleResize);

    // Render loop
    const render = () => {
      // Smooth fade trail: clear with subtle dark slate to create glowing light streaks
      ctx.fillStyle = "rgba(3, 6, 10, 0.22)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = "bold 13px 'Courier New', Courier, monospace";
      ctx.textAlign = "center";

      for (let c = 0; c < columns.length; c++) {
        const col = columns[c];
        const palette = NEON_PALETTES[col.paletteIndex % NEON_PALETTES.length];

        // Smooth downward movement
        col.y += col.speed;
        col.stepCounter++;

        // Randomly mutate characters inside the light line for dynamic code effect
        if (col.stepCounter % col.mutationSpeed === 0) {
          const randIdx = Math.floor(Math.random() * col.trailLength);
          col.chars[randIdx] =
            ALPHABET_CHARS[Math.floor(Math.random() * ALPHABET_CHARS.length)];
        }

        // Draw the vertical line of stacked single ABC letters
        for (let i = 0; i < col.trailLength; i++) {
          const charY = col.y - i * charSpacing;

          // Skip drawing if outside screen view
          if (charY < -20 || charY > height + 40) continue;

          const char = col.chars[i];

          if (i === 0) {
            // ========================================================
            // 1. LEADING HEAD: ULTRA-BRIGHT GLOWING LIGHT BULLET
            // ========================================================
            ctx.fillStyle = palette.head;
            ctx.shadowColor = palette.glow;
            ctx.shadowBlur = 14;
            ctx.font = `900 ${col.fontSize + 1.5}px 'Courier New', Courier, monospace`;
            ctx.fillText(char, col.x, charY);

            // Subtle highlight cross beam on the head
            ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(col.x - 4, charY - 4);
            ctx.lineTo(col.x + 4, charY - 4);
            ctx.stroke();
          } else if (i < 4) {
            // ========================================================
            // 2. NEAR-HEAD: VIVID NEON GLOW (A, B, C single letters)
            // ========================================================
            ctx.fillStyle = palette.main;
            ctx.shadowColor = palette.glow;
            ctx.shadowBlur = 8;
            ctx.font = `bold ${col.fontSize}px 'Courier New', Courier, monospace`;
            ctx.fillText(char, col.x, charY);
          } else {
            // ========================================================
            // 3. FADING TRAIL: GRADUAL LIGHT DECAY
            // ========================================================
            const fadeRatio = 1 - (i / col.trailLength);
            ctx.fillStyle = palette.main;
            ctx.shadowBlur = 0;
            ctx.globalAlpha = Math.max(0.08, fadeRatio * 0.75);
            ctx.font = `600 ${col.fontSize - 0.5}px 'Courier New', Courier, monospace`;
            ctx.fillText(char, col.x, charY);
            ctx.globalAlpha = 1.0;
          }
        }

        // Reset shadow for next column
        ctx.shadowBlur = 0;

        // When the entire light beam has fallen past the bottom, reset at top
        if (col.y - col.trailLength * charSpacing > height) {
          col.y = -Math.random() * 120 - 20;
          col.speed = 4.8 + Math.random() * 5.2; // Fast random speed
          col.paletteIndex = Math.floor(Math.random() * NEON_PALETTES.length); // New vibrant color
          // Reshuffle letters
          for (let k = 0; k < col.trailLength; k++) {
            col.chars[k] =
              ALPHABET_CHARS[Math.floor(Math.random() * ALPHABET_CHARS.length)];
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // First clear to pure dark
    ctx.fillStyle = "#03060a";
    ctx.fillRect(0, 0, width, height);

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* 1. Ultra-Smooth 60FPS Cyber Hacking Canvas (Single Stacked Letters Streaming Downward) */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-75"
        style={{
          filter: "contrast(1.15) brightness(1.1)",
        }}
      />

      {/* 2. Cyber Scanlines & Matrix Texture Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0px, rgba(0, 0, 0, 0.4) 1px, transparent 1px, transparent 2px)",
        }}
      />

      {/* 3. Soft vignette gradients on borders so HUD controls stay crystal-clear */}
      <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#03060a] to-transparent z-1 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#03060a] to-transparent z-1 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#03060a] to-transparent z-1 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#03060a] to-transparent z-1 pointer-events-none" />
    </div>
  );
}
