"use client";

import React, { useRef } from "react";
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
  const volumeTrackRef = useRef<HTMLDivElement>(null);
  const isDraggingVolumeRef = useRef(false);

  // Touch-optimized Volume Drag Handlers
  const handleVolumePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = volumeTrackRef.current;
    if (!track) return;
    track.setPointerCapture(e.pointerId);
    isDraggingVolumeRef.current = true;
    updateVolumeFromEvent(e.clientX);
  };

  const handleVolumePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingVolumeRef.current) return;
    updateVolumeFromEvent(e.clientX);
  };

  const handleVolumePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingVolumeRef.current) return;
    isDraggingVolumeRef.current = false;
    const track = volumeTrackRef.current;
    if (track) {
      track.releasePointerCapture(e.pointerId);
    }
  };

  const updateVolumeFromEvent = (clientX: number) => {
    const track = volumeTrackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    onVolumeChange(Math.round(ratio * 100));
  };

  const currentVol = playerState.isMuted ? 0 : playerState.volume;

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

      {/* Touch-Optimized Mobile & Desktop Volume Bar */}
      <div className="flex items-center gap-2.5 mt-1.5 sm:mt-2 px-3.5 py-1.5 rounded-full ios-glass-pill select-none touch-none">
        <button
          onClick={onToggleMute}
          title={playerState.isMuted ? "Unmute" : "Mute"}
          className="text-gray-200 hover:text-[#34D399] active:scale-90 transition-transform p-0.5"
        >
          {playerState.isMuted || playerState.volume === 0 ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-gray-200" />
          )}
        </button>

        {/* Interactive Custom Touch-Drag Volume Track */}
        <div
          ref={volumeTrackRef}
          onPointerDown={handleVolumePointerDown}
          onPointerMove={handleVolumePointerMove}
          onPointerUp={handleVolumePointerUp}
          className="w-20 sm:w-24 h-5 flex items-center cursor-pointer relative touch-none py-1"
        >
          {/* Background Track */}
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden relative">
            {/* Active Volume Fill */}
            <div
              className="h-full bg-[#34D399] rounded-full transition-all duration-75"
              style={{ width: `${currentVol}%` }}
            />
          </div>
          {/* Thumb indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#34D399] border border-[#064E3B] rounded-full shadow-md pointer-events-none transition-all duration-75"
            style={{ left: `calc(${currentVol}% - 6px)` }}
          />
        </div>
      </div>
    </div>
  );
};
