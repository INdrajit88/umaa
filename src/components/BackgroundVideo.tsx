"use client";

import React, { useRef, useEffect, useState } from "react";

interface BackgroundVideoProps {
  src: string;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is properly looping without black flashes
    const handleTimeUpdate = () => {
      // If within 0.15s of end, jump to start for seamless loop
      if (video.duration && video.currentTime > video.duration - 0.2) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    const handleLoaded = () => {
      setIsLoaded(true);
      video.play().catch(() => {});
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadeddata", handleLoaded);

    // Initial play attempt
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadeddata", handleLoaded);
    };
  }, [src]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none bg-black">
      {/* Cinematic Looping Video */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-80"
        }`}
      />

      {/* Atmospheric Gradients & Vignette for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)] pointer-events-none" />
      
      {/* Subtle Warm Amber Tint Layer for Bengali Puja Aesthetic */}
      <div className="absolute inset-0 bg-amber-950/10 mix-blend-color pointer-events-none" />
    </div>
  );
};
