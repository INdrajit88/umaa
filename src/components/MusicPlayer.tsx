"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Track } from "../types/player";
import { useYouTubePlayer } from "../hooks/useYouTubePlayer";
import { useLiveUsers } from "../hooks/useLiveUsers";
import { Artwork } from "./Artwork";
import { Controls } from "./Controls";
import { AudioVisualizer } from "./AudioVisualizer";
import { PlaylistDrawer } from "./PlaylistDrawer";
import { ShareButton } from "./ShareButton";
import { ListMusic, ChevronDown, ChevronUp, Play, Pause, SkipForward, Music } from "lucide-react";

interface MusicPlayerProps {
  tracks: Track[];
  youtubePlaylistId?: string;
  shareText: string;
  shareUrl?: string;
  isMinimized?: boolean;
  onMinimizeChange?: (minimized: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  tracks,
  youtubePlaylistId,
  shareText,
  shareUrl = "https://umaa.tech",
  isMinimized: controlledMinimized,
  onMinimizeChange,
}) => {
  const [internalMinimized, setInternalMinimized] = useState(false);
  const isMinimized = controlledMinimized !== undefined ? controlledMinimized : internalMinimized;

  const handleSetMinimized = (val: boolean) => {
    setInternalMinimized(val);
    if (onMinimizeChange) onMinimizeChange(val);
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { count: liveUsersCount } = useLiveUsers(84);

  const {
    playerState,
    currentTrack,
    togglePlay,
    playTrackByIndex,
    handleNextTrack,
    handlePrevTrack,
    seekTo,
    setVolume,
    toggleMute,
    toggleShuffle,
    toggleRepeat,
  } = useYouTubePlayer(tracks, youtubePlaylistId);

  return (
    <>
      {/* Hidden YouTube IFrame Container for audio playback */}
      <div
        className="fixed -bottom-96 -left-96 w-10 h-10 opacity-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div id="hidden-yt-player" />
      </div>

      {/* Slide-in / Bottom Sheet Playlist Drawer */}
      <PlaylistDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        tracks={tracks}
        currentTrackIndex={playerState.currentTrackIndex}
        isPlaying={playerState.isPlaying}
        onSelectTrack={playTrackByIndex}
      />

      <AnimatePresence mode="wait">
        {!isMinimized ? (
          /* ================= FULL EXPANDED PLAYER ================= */
          <motion.div
            key="full-player"
            layoutId="umaa-player-container"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 40 }}
            transition={{ type: "spring", damping: 26, stiffness: 240, mass: 0.8 }}
            className="w-full flex flex-col items-center z-20 max-w-sm sm:max-w-md px-1 xs:px-2 sm:px-4 select-none"
          >
            {/* Apple iOS Liquid Ultra-Glass Card with Specular Sheen */}
            <div className="w-full flex flex-col items-center py-3 sm:py-4 px-3.5 sm:px-6 rounded-[28px] sm:rounded-[36px] ios-ultra-glass relative overflow-hidden shadow-2xl">
              {/* Top Header: Live Users Pill, Visualizer, and Minimize Action Button */}
              <div className="w-full flex items-center justify-between px-1 mb-0.5 sm:mb-1 relative z-10">
                {/* Live Listeners Badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full ios-glass-pill text-[11px] sm:text-xs text-white">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#34D399] animate-pulse" />
                  <span className="font-bold font-mono text-[#FFD166]">{liveUsersCount}</span>
                  <span className="text-[10px] sm:text-[11px] text-gray-200 font-bengaliSans">জন শুনছেন</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <AudioVisualizer isPlaying={playerState.isPlaying} barCount={8} />
                    <span className="text-[10px] sm:text-[11px] font-mono text-gray-200 font-medium">
                      {String(playerState.currentTrackIndex + 1).padStart(2, "0")}/{String(tracks.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Minimize Player Button */}
                  <button
                    onClick={() => handleSetMinimized(true)}
                    title="Minimize Player"
                    className="p-1.5 rounded-full ios-glass-pill text-gray-300 hover:text-white hover:bg-white/20 active:scale-95 transition-all ml-1"
                  >
                    <ChevronDown className="w-4 h-4 text-[#34D399]" />
                  </button>
                </div>
              </div>

              {/* Artwork Card */}
              <div className="relative z-10">
                <Artwork track={currentTrack} isPlaying={playerState.isPlaying} />
              </div>

              {/* Track Title & Artist */}
              <div className="w-full text-center my-0.5 sm:my-1 min-h-[42px] sm:min-h-[46px] flex flex-col justify-center relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTrack.id || currentTrack.youtubeId}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center px-1"
                  >
                    <h2 className="text-xs xs:text-sm sm:text-base font-bold text-white tracking-tight truncate max-w-full font-bengali drop-shadow-md">
                      {currentTrack.title}
                    </h2>
                    <p className="text-[11px] sm:text-xs text-gray-300 mt-0.5 truncate max-w-full font-bengaliSans">
                      {currentTrack.artist}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls with Pixel Wave Scrubber */}
              <div className="w-full mt-0.5 sm:mt-1 relative z-10">
                <Controls
                  playerState={playerState}
                  onTogglePlay={togglePlay}
                  onNext={handleNextTrack}
                  onPrev={handlePrevTrack}
                  onSeek={seekTo}
                  onVolumeChange={setVolume}
                  onToggleMute={toggleMute}
                  onToggleShuffle={toggleShuffle}
                  onToggleRepeat={toggleRepeat}
                />
              </div>

              {/* Bottom Actions: Playlist Drawer & Share */}
              <div className="w-full flex items-center justify-between mt-2.5 sm:mt-3.5 pt-2 sm:pt-3 border-t border-white/15 relative z-10">
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ios-glass-pill text-[11px] sm:text-xs text-white font-medium transition-all active:scale-95"
                >
                  <ListMusic className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#34D399]" />
                  <span className="font-bengaliSans">Playlist ({tracks.length})</span>
                </button>

                <ShareButton shareText={shareText} shareUrl={shareUrl || "https://umaa.tech"} />
              </div>
            </div>
          </motion.div>
        ) : (
          /* ================= MINIMIZED FLOATING GLASS DOCK (PERFECTLY CENTERED & NO FOOTER OVERLAP) ================= */
          <div
            key="mini-player-wrapper"
            className="fixed bottom-5 sm:bottom-6 inset-x-0 flex justify-center items-center z-40 px-3 pointer-events-none"
          >
            <motion.div
              layoutId="umaa-player-container"
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.92 }}
              transition={{ type: "spring", damping: 26, stiffness: 240, mass: 0.8 }}
              className="w-full max-w-lg select-none pointer-events-auto"
            >
              <div className="w-full flex items-center justify-between p-2.5 sm:p-3 px-3.5 sm:px-5 rounded-[28px] sm:rounded-[32px] ios-ultra-glass border border-white/30 shadow-2xl backdrop-blur-3xl">
                {/* Left: Enlarged Vinyl Artwork & Details with Live Sound Visualizer (Tap to expand) */}
                <div
                  onClick={() => handleSetMinimized(false)}
                  className="flex items-center gap-3 sm:gap-3.5 min-w-0 cursor-pointer flex-1 mr-2 active:opacity-85 transition-opacity"
                >
                  {/* Enlarged Vinyl-Spin Artwork */}
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 border-2 border-white/30 bg-[#1E1E1E] shadow-lg flex items-center justify-center">
                    {currentTrack.artworkUrl ? (
                      <img
                        src={currentTrack.artworkUrl}
                        alt={currentTrack.title}
                        className={`w-full h-full object-cover ${
                          playerState.isPlaying ? "animate-[spin_10s_linear_infinite]" : ""
                        }`}
                      />
                    ) : (
                      <Music className="w-6 h-6 text-[#34D399]" />
                    )}
                    {/* Vinyl Center Core */}
                    <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-black border border-white/60 shadow" />
                  </div>

                  {/* Track Details & Sound Animation Visualizer */}
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm md:text-base font-bold text-white truncate font-bengali">
                        {currentTrack.title}
                      </span>
                      {/* Live Equalizer Sound Wave Animation */}
                      <AudioVisualizer isPlaying={playerState.isPlaying} barCount={5} />
                    </div>
                    <span className="text-[11px] sm:text-xs text-gray-300 truncate font-bengaliSans mt-0.5">
                      {currentTrack.artist}
                    </span>
                  </div>
                </div>

                {/* Right: Enlarged Quick Controls & Expand Button */}
                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                  {/* Enlarged Play / Pause FAB */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#34D399] text-[#064E3B] hover:bg-[#6EE7B7] flex items-center justify-center active:scale-90 transition-all shadow-lg"
                    title={playerState.isPlaying ? "Pause" : "Play"}
                  >
                    {playerState.isPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    )}
                  </button>

                  {/* Skip Next */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextTrack();
                    }}
                    className="p-2 sm:p-2.5 rounded-full text-white hover:text-[#34D399] hover:bg-white/10 active:scale-90 transition-all"
                    title="Next Track"
                  >
                    <SkipForward className="w-5 h-5 fill-current" />
                  </button>

                  {/* Expand Full Player Button */}
                  <button
                    onClick={() => handleSetMinimized(false)}
                    className="p-2 sm:p-2.5 rounded-full ios-glass-pill text-gray-200 hover:text-white hover:bg-white/20 active:scale-95 transition-all"
                    title="Expand Player"
                  >
                    <ChevronUp className="w-5 h-5 text-[#34D399]" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
