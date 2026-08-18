"use client";

import React, { useEffect, useRef, useState } from "react";

interface AndroidWavyScrubberProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onSeek: (time: number) => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export const AndroidWavyScrubber: React.FC<AndroidWavyScrubberProps> = ({
  currentTime,
  duration,
  isPlaying,
  onSeek,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(300);

  // Time interpolation references for 60fps buttery movement
  const lastSyncTimeRef = useRef<number>(currentTime);
  const lastSyncTimestampRef = useRef<number>(Date.now());
  const isDraggingRef = useRef(false);
  const [dragRatio, setDragRatio] = useState<number | null>(null);

  // State
  const [displaySeconds, setDisplaySeconds] = useState(currentTime);
  const [phaseOffset, setPhaseOffset] = useState(0);
  const [amplitude, setAmplitude] = useState(0);

  // Sync with player prop updates
  useEffect(() => {
    if (!isDraggingRef.current) {
      lastSyncTimeRef.current = currentTime;
      lastSyncTimestampRef.current = Date.now();
      setDisplaySeconds(currentTime);
    }
  }, [currentTime]);

  // Track container width
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // 60FPS continuous loop
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const now = Date.now();

      // Continuous time interpolation
      if (isPlaying && !isDraggingRef.current && duration > 0) {
        const elapsed = (now - lastSyncTimestampRef.current) / 1000;
        setDisplaySeconds(Math.min(duration, lastSyncTimeRef.current + elapsed));
      }

      // Smooth slow wave phase progression
      if (isPlaying) {
        setPhaseOffset((prev) => (prev + 0.28) % 1000);
      }

      // Smooth amplitude easing (ease in when playing, ease out to flat line when paused)
      const targetAmp = isPlaying ? 2.8 : 0;
      setAmplitude((prev) => prev + (targetAmp - prev) * 0.08);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, duration]);

  // Current progress calculation
  const activeRatio =
    dragRatio !== null
      ? dragRatio
      : duration > 0
      ? Math.max(0, Math.min(1, displaySeconds / duration))
      : 0;

  const playedWidth = activeRatio * containerWidth;
  const centerY = 16;
  const wavelength = 32; // Exact Pixel wave cycle length

  // Generate ultra-smooth Pixel Bezier wave path
  const generatePixelBezierPath = () => {
    if (playedWidth <= 1) return `M 0 ${centerY} L 0 ${centerY}`;

    let path = `M 0 ${centerY}`;
    const step = 2;

    for (let x = 0; x <= playedWidth; x += step) {
      const startTaper = Math.min(1, x / 10);
      const endTaper = Math.min(1, (playedWidth - x) / 10);
      const taper = startTaper * endTaper;

      const angle = ((x + phaseOffset) / wavelength) * Math.PI * 2;
      const y = centerY + Math.sin(angle) * amplitude * taper;
      path += ` L ${x.toFixed(1)} ${y.toFixed(2)}`;
    }

    return path;
  };

  // Drag Handlers for Mobile & Desktop
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    container.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;
    updateSeek(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updateSeek(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const container = containerRef.current;
    if (container) {
      container.releasePointerCapture(e.pointerId);
      const rect = container.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      onSeek(ratio * duration);
      lastSyncTimeRef.current = ratio * duration;
      lastSyncTimestampRef.current = Date.now();
      setDisplaySeconds(ratio * duration);
    }
    setDragRatio(null);
  };

  const updateSeek = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setDragRatio(ratio);
    setDisplaySeconds(ratio * duration);
  };

  return (
    <div className="w-full flex flex-col gap-0.5 px-1 sm:px-2 select-none">
      {/* Mobile Optimized Touch Scrubber Area */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="w-full h-8 sm:h-8 cursor-pointer flex items-center relative touch-none group"
      >
        <svg
          className="w-full h-full overflow-visible"
          viewBox={`0 0 ${Math.max(1, containerWidth)} 32`}
          preserveAspectRatio="none"
        >
          {/* 1. Unplayed Track */}
          <line
            x1={0}
            y1={centerY}
            x2={containerWidth}
            y2={centerY}
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth={4}
            strokeLinecap="round"
          />

          {/* 2. Google Pixel Dynamic Green Squiggly Wave */}
          <path
            d={generatePixelBezierPath()}
            fill="none"
            stroke="#34D399"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 0 6px rgba(52, 211, 153, 0.5))",
            }}
          />

          {/* 3. Pixel Floating Head Thumb */}
          {playedWidth > 0 && (
            <g transform={`translate(${Math.max(4, Math.min(containerWidth - 4, playedWidth))}, ${centerY})`}>
              {/* Outer halo */}
              <circle
                r={isDraggingRef.current ? 11 : 8.5}
                fill="rgba(52, 211, 153, 0.35)"
                className="transition-all duration-150"
              />
              {/* Solid inner core */}
              <circle
                r={isDraggingRef.current ? 6.5 : 5.5}
                fill="#34D399"
                stroke="#064E3B"
                strokeWidth={1.5}
                className="transition-all duration-150"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Timestamps */}
      <div className="flex justify-between text-[11px] sm:text-xs font-mono text-gray-300 font-medium px-0.5 -mt-1.5 sm:-mt-1">
        <span>{formatTime(dragRatio !== null ? dragRatio * duration : displaySeconds)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};
