import React, { useEffect, useRef } from "react";

interface AbcRainBackgroundProps {
  speedMultiplier?: number;
}

export default function AbcBackgroundVortex({
  speedMultiplier = 1.0,
}: AbcRainBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initColumns();
    };

    window.addEventListener("resize", handleResize);

    // Full small alphabet characters: a b c d e f g h i j k l m n o p q r s t u v w x y z
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const fontSize = 13; // Crisp small letter size
    let columns = Math.floor(width / (fontSize + 4));
    let drops: number[] = [];
    let speeds: number[] = [];
    let brightness: number[] = [];

    const initColumns = () => {
      columns = Math.floor(width / (fontSize + 4));
      drops = [];
      speeds = [];
      brightness = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -50); // Start staggered above screen
        speeds[i] = (Math.random() * 1.5 + 1.2) * speedMultiplier; // High-speed scrolling
        brightness[i] = Math.random();
      }
    };

    initColumns();

    let lastTime = performance.now();

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.67, 2); // normalize delta time
      lastTime = time;

      // Dark translucent black to create glowing trails behind falling letters
      ctx.fillStyle = "rgba(4, 0, 2, 0.22)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px "Fira Code", monospace, "Courier New"`;

      for (let i = 0; i < drops.length; i++) {
        const charIndex = Math.floor(Math.random() * alphabet.length);
        const char = alphabet[charIndex];
        const x = i * (fontSize + 4) + 4;
        const y = drops[i] * (fontSize + 3);

        // Leading head character is bright white / glowing pink-red
        if (Math.random() > 0.85) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#ff003c";
          ctx.shadowBlur = 8;
        } else if (brightness[i] > 0.5) {
          ctx.fillStyle = "#ff1a4a"; // Vivid glowing red
          ctx.shadowColor = "#ff003c";
          ctx.shadowBlur = 4;
        } else {
          ctx.fillStyle = "#cc002e"; // Rich crimson
          ctx.shadowBlur = 0;
        }

        if (y > 0 && y < height + 30) {
          ctx.fillText(char, x, y);
        }

        // Reset drop to top once it falls past screen bottom
        if (y > height && Math.random() > 0.965) {
          drops[i] = 0;
          speeds[i] = (Math.random() * 1.5 + 1.2) * speedMultiplier;
        }

        drops[i] += speeds[i] * delta;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speedMultiplier]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      {/* Matrix-style full small alphabet streaming lines cascading downwards */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-65 mix-blend-screen"
      />
    </div>
  );
}
