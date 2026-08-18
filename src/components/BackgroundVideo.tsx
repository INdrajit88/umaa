"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface BackgroundVideoProps {
  src: string;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const attemptPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set muted explicitly on the DOM element for mobile autoplay compliance
    video.muted = true;
    video.defaultMuted = true;

    if (video.paused) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy prevented playback until user interaction
        });
      }
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Critical mobile and iOS DOM attributes
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true");
    video.setAttribute("x5-video-player-type", "h5-page");

    const handleLoadedData = () => {
      setIsLoaded(true);
      attemptPlay();
    };

    const handleCanPlay = () => {
      setIsLoaded(true);
      attemptPlay();
    };

    // Explicit fallback in case native loop attribute is interrupted or fires ended
    const handleEnded = () => {
      video.currentTime = 0;
      attemptPlay();
    };

    // Auto-resume if mobile OS / low-power mode pauses video while page is active
    const handlePause = () => {
      if (typeof document !== "undefined" && !document.hidden) {
        attemptPlay();
      }
    };

    // Resume when returning from lock screen, notification drawer, or tab switch
    const handleVisibilityChange = () => {
      if (typeof document !== "undefined" && !document.hidden) {
        attemptPlay();
      }
    };

    // Unlock playback on first user touch / tap (bypasses iOS Low Power Mode autoplay restrictions)
    const handleUserInteraction = () => {
      attemptPlay();
    };

    // Error recovery: reload and replay if video stalls or errors
    const handleError = () => {
      if (video) {
        video.load();
        attemptPlay();
      }
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("pause", handlePause);
    video.addEventListener("error", handleError);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("touchstart", handleUserInteraction, { passive: true });
    window.addEventListener("pointerdown", handleUserInteraction, { passive: true });
    window.addEventListener("click", handleUserInteraction, { passive: true });

    // Initial play attempt
    attemptPlay();

    // Periodic watchdog to ensure video never stays paused when screen is on
    const watchdogInterval = setInterval(() => {
      if (typeof document !== "undefined" && !document.hidden && video.paused) {
        attemptPlay();
      }
    }, 2000);

    return () => {
      clearInterval(watchdogInterval);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("error", handleError);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("pointerdown", handleUserInteraction);
      window.removeEventListener("click", handleUserInteraction);
    };
  }, [src, attemptPlay]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none bg-black">
      {/* Cinematic Seamless Looping Video */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
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
