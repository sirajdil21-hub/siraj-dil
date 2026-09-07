import React, { useEffect, useRef } from "react";

interface MatrixProps {
  opacity?: number;
  speed?: number;
  active?: boolean;
}

export default function MatrixBackground({
  opacity = 0.85,
  speed = 1.2,
  active = true,
}: MatrixProps) {
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
    };
    window.addEventListener("resize", handleResize);

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ANAM_SIRAJ_AI_ASSISTANT_VOICE_SYSTEM_ONLINE_MATRIX_CODE_#@$%&*<>{}+=~";
    const fontSize = 15;
    const columns = Math.floor(width / (fontSize * 0.9));
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -80));

    const render = () => {
      if (!active) {
        ctx.fillStyle = "rgba(2, 8, 18, 0.2)";
        ctx.fillRect(0, 0, width, height);
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.fillStyle = "rgba(2, 8, 18, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px "Courier New", "Share Tech Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * (fontSize * 0.9);
        const y = drops[i] * fontSize;

        // Head character (bright glowing white / cyan / gold)
        if (i % 6 === 0) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 8;
        } else if (i % 3 === 0) {
          ctx.fillStyle = "#00f0ff";
          ctx.shadowColor = "#00f0ff";
          ctx.shadowBlur = 6;
        } else if (i % 2 === 0) {
          ctx.fillStyle = "#00ff88";
          ctx.shadowColor = "#00ff88";
          ctx.shadowBlur = 4;
        } else {
          ctx.fillStyle = "#ffd700";
          ctx.shadowColor = "#ffd700";
          ctx.shadowBlur = 4;
        }

        ctx.fillText(text, x, y);

        // Reset shadow for performance
        ctx.shadowBlur = 0;

        // Trail character
        if (i % 4 === 0) {
          ctx.fillStyle = "rgba(0, 240, 255, 0.85)";
        } else if (i % 2 === 0) {
          ctx.fillStyle = "rgba(0, 255, 136, 0.8)";
        } else {
          ctx.fillStyle = "rgba(255, 215, 0, 0.8)";
        }

        ctx.fillText(text, x, y - fontSize);

        if (y > height && Math.random() > 0.965) {
          drops[i] = 0;
        }

        drops[i] += speed;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700"
      style={{ opacity }}
    />
  );
}
