"use client";

import React, { useState } from "react";
import { config } from "../config/pujaConfig";
import { BackgroundVideo } from "../components/BackgroundVideo";
import { AmbientEffects } from "../components/AmbientEffects";
import { Countdown } from "../components/Countdown";
import { MusicPlayer } from "../components/MusicPlayer";
import { IntroScreen } from "../components/IntroScreen";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleEnterExperience = () => {
    setShowIntro(false);
  };

  return (
    <main className="relative w-screen h-[100dvh] overflow-hidden flex flex-col justify-between items-center bg-black select-none pt-safe pb-safe px-safe">
      {/* 1. Fullscreen Background Video */}
      <BackgroundVideo src={config.backgroundVideo} />

      {/* 2. Ambient Particles: Shiuli Phool, Kashphul & Embers */}
      {config.enableAmbientParticles && <AmbientEffects />}

      {/* 3. Top Header Bar with Brand Badge */}
      <header className="w-full flex justify-center items-center pt-2 sm:pt-4 z-30 pointer-events-auto shrink-0">
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ios-glass-pill shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-ping" />
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-white font-bold">
            umaa • শারদোৎসব ২০২৬
          </span>
        </div>
      </header>

      {/* 4. Exact Center Stage Composition */}
      <div className="w-full flex-1 flex flex-col justify-center items-center gap-2 xs:gap-2.5 sm:gap-3 z-20 max-w-md mx-auto px-2 sm:px-3 my-auto">
        {/* Main Bengali Header & Live Days/Hours/Mins/Secs Countdown */}
        <Countdown
          targetDate={config.countdownDate}
          title={config.title}
          subtitle={config.subtitle}
        />

        {/* Music Player with Expandable / Minimizable Glass Architecture */}
        <MusicPlayer
          tracks={config.defaultTracks}
          youtubePlaylistId={config.youtubePlaylistId}
          shareText={config.shareText}
          shareUrl={config.shareUrl}
          isMinimized={isMinimized}
          onMinimizeChange={setIsMinimized}
        />
      </div>

      {/* 5. Bottom Fixed Subtle Footer (Only rendered when expanded, completely unmounted when minimized) */}
      {!isMinimized ? (
        <footer className="w-full flex justify-center items-center pb-2 z-20 pointer-events-none shrink-0 transition-opacity duration-200">
          <span className="text-[10px] sm:text-xs font-medium text-gray-300 font-mono tracking-wider">
            umaa.tech • Durga Puja 2026
          </span>
        </footer>
      ) : (
        <div className="h-4 pointer-events-none shrink-0" />
      )}

      {/* 6. Entrance Overlay */}
      <IntroScreen
        isVisible={showIntro}
        onEnter={handleEnterExperience}
      />
    </main>
  );
}
