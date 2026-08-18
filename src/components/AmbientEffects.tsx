"use client";

import React, { useEffect, useRef } from "react";

interface AmbientEffectsProps {
  isPlaying?: boolean;
}

export const AmbientEffects: React.FC<AmbientEffectsProps> = ({ isPlaying = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Particles: Kashphul (কাশফুল), Golden Embers, and Shiuli (শিউলি ফুল)
    const items: Array<{
      type: "sparkle" | "shiuli" | "kashphul";
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotSpeed: number;
      opacity: number;
      swayOffset: number;
      swaySpeed: number;
    }> = [];

    const totalCount = 35;
    for (let i = 0; i < totalCount; i++) {
      const type = i % 5 === 0 ? "shiuli" : i % 2 === 0 ? "kashphul" : "sparkle";
      items.push({
        type,
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === "shiuli" ? Math.random() * 5 + 6 : Math.random() * 2.5 + 1,
        speedX: Math.random() * 0.4 + 0.15,
        speedY: type === "shiuli" ? Math.random() * 0.4 + 0.25 : -(Math.random() * 0.35 + 0.1),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.5 + 0.2,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const drawShiuli = (x: number, y: number, size: number, rot: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = opacity;

      // Draw 5 white petals
      ctx.fillStyle = "rgba(255, 254, 245, 0.9)";
      for (let p = 0; p < 5; p++) {
        ctx.beginPath();
        ctx.rotate((Math.PI * 2) / 5);
        ctx.ellipse(0, size * 0.6, size * 0.28, size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw iconic bright orange/saffron stem core
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = "#FF6B35";
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#FF6B35";
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.swayOffset += item.swaySpeed;
        const sway = Math.sin(item.swayOffset) * (item.type === "shiuli" ? 0.8 : 0.4);

        item.x += item.speedX + sway;
        item.y += item.speedY * (isPlaying ? 1.25 : 0.85);
        item.rotation += item.rotSpeed;

        // Boundaries wrap
        if (item.type === "shiuli") {
          if (item.y > height + 20) {
            item.y = -20;
            item.x = Math.random() * width;
          }
        } else {
          if (item.y < -10) {
            item.y = height + 10;
            item.x = Math.random() * width;
          }
        }
        if (item.x > width + 20) item.x = -20;

        if (item.type === "shiuli") {
          drawShiuli(item.x, item.y, item.size, item.rotation, item.opacity * (isPlaying ? 1 : 0.85));
        } else if (item.type === "kashphul") {
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${item.opacity * 0.6})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
          ctx.fill();
        } else {
          // Golden Sparkle
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 191, 36, ${item.opacity * (isPlaying ? 1.3 : 0.9)})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(245, 158, 11, 0.8)";
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-75 transition-opacity duration-1000"
    />
  );
};
