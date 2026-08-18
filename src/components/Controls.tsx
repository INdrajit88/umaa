"use client";

import React from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Loader2,
} from "lucide-react";
import { PlayerState } from "../types/player";
import { AndroidWavyScrubber } from "./AndroidWavyScrubber";

interface ControlsProps {
  playerState: PlayerState;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  playerState,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleShuffle,
  onToggleRepeat,
}) => {
  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Pixel Media Notification Squiggly Green Wave Scrubber */}
      <AndroidWavyScrubber
        currentTime={playerState.currentTime}
        duration={playerState.duration}
        isPlaying={playerState.isPlaying}
        onSeek={onSeek}
      />

      {/* Media Transport Controls (Thumb-friendly touch targets) */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 mt-1 sm:mt-1.5">
        {/* Shuffle */}
        <button
          onClick={onToggleShuffle}
          title="Shuffle"
          className={`min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full transition-colors ${
            playerState.shuffle
              ? "text-[#34D399] bg-[#34D399]/20"
              : "text-white/60 hover:text-white active:bg-white/10"
          }`}
        >
          <Shuffle className="w-4 h-4" />
        </button>

        {/* Previous */}
        <button
          onClick={onPrev}
          title="Previous Track"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-white hover:text-[#34D399] active:scale-95 transition-all"
        >
          <SkipBack className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
        </button>

        {/* Primary Play/Pause Button in Pixel Green Accent */}
        <button
          onClick={onTogglePlay}
          title={playerState.isPlaying ? "Pause" : "Play"}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#34D399] text-[#064E3B] hover:bg-[#6EE7B7] active:scale-95 transition-all shadow-xl flex items-center justify-center"
        >
          {playerState.isBuffering ? (
            <Loader2 className="w-6 h-6 animate-spin text-[#064E3B]" />
          ) : playerState.isPlaying ? (
            <Pause className="w-6 h-6 fill-current stroke-[2.5]" />
          ) : (
            <Play className="w-6 h-6 fill-current ml-0.5 stroke-[2.5]" />
          )}
        </button>

        {/* Next */}
        <button
          onClick={onNext}
          title="Next Track"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-white hover:text-[#34D399] active:scale-95 transition-all"
        >
          <SkipForward className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
        </button>

        {/* Repeat */}
        <button
          onClick={onToggleRepeat}
          title="Repeat"
          className={`min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full transition-colors ${
            playerState.repeat
              ? "text-[#34D399] bg-[#34D399]/20"
              : "text-white/60 hover:text-white active:bg-white/10"
          }`}
        >
          <Repeat className="w-4 h-4" />
        </button>
      </div>

      {/* Volume Slider */}
      <div className="flex items-center gap-2 mt-1.5 sm:mt-2 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full ios-glass-pill">
        <button
          onClick={onToggleMute}
          title={playerState.isMuted ? "Unmute" : "Mute"}
          className="text-gray-200 hover:text-[#34D399] transition-colors p-0.5"
        >
          {playerState.isMuted || playerState.volume === 0 ? (
            <VolumeX className="w-3.5 h-3.5 text-red-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={playerState.isMuted ? 0 : playerState.volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-16 sm:w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#34D399]"
        />
      </div>
    </div>
  );
};
