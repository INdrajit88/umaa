"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Track } from "../types/player";
import { X, Play, ListMusic } from "lucide-react";

interface PlaylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
}

export const PlaylistDrawer: React.FC<PlaylistDrawerProps> = ({
  isOpen,
  onClose,
  tracks,
  currentTrackIndex,
  isPlaying,
  onSelectTrack,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end items-end sm:items-stretch">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Responsive Sheet (Bottom Sheet on Mobile, Side Drawer on Desktop) */}
          <motion.div
            initial={{ y: "100%", x: 0 }}
            animate={{ y: 0, x: 0 }}
            exit={{ y: "100%", x: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="relative w-full sm:max-w-md h-[80vh] sm:h-full rounded-t-[28px] sm:rounded-none ios-ultra-glass border-t sm:border-t-0 sm:border-l border-white/20 shadow-2xl flex flex-col z-50 text-white select-none overflow-hidden pb-safe"
          >
            {/* Mobile Sheet Handle */}
            <div className="sm:hidden w-full flex justify-center pt-2.5 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/30" />
            </div>

            {/* Sheet Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#34D399]/20 text-[#34D399]">
                  <ListMusic className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold tracking-wider font-cinzel text-white">
                    PUJA PLAYLIST
                  </h2>
                  <p className="text-xs text-gray-300 font-bengaliSans">
                    {tracks.length} Songs • শারদোৎসব সংকলন
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Track List */}
            <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-2 sm:py-3 space-y-1.5 sm:space-y-2">
              {tracks.map((track, index) => {
                const isActive = index === currentTrackIndex;
                const formattedIndex = String(index + 1).padStart(2, "0");

                return (
                  <div
                    key={track.id || index}
                    onClick={() => {
                      onSelectTrack(index);
                      onClose();
                    }}
                    className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border min-h-[54px] active:scale-[0.98] ${
                      isActive
                        ? "bg-[#34D399]/20 border-[#34D399]/50 text-[#34D399] shadow-md"
                        : "bg-white/5 hover:bg-white/10 border-transparent text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <span className="text-xs font-mono font-bold w-6 text-center text-gray-300">
                        {isActive && isPlaying ? (
                          <span className="flex items-center justify-center gap-0.5">
                            <span className="w-1 h-3.5 bg-[#34D399] animate-pulse rounded-full" />
                            <span className="w-1 h-2 bg-[#34D399] animate-pulse delay-75 rounded-full" />
                            <span className="w-1 h-4 bg-[#34D399] animate-pulse delay-150 rounded-full" />
                          </span>
                        ) : (
                          formattedIndex
                        )}
                      </span>

                      <div className="flex flex-col min-w-0">
                        <span
                          className={`text-sm font-semibold truncate font-bengali ${
                            isActive ? "text-[#34D399]" : "text-white"
                          }`}
                        >
                          {track.title}
                        </span>
                        <span className="text-xs text-gray-400 truncate font-bengaliSans">
                          {track.artist}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {track.duration && (
                        <span className="text-[11px] font-mono text-gray-400">
                          {track.duration}
                        </span>
                      )}
                      <div
                        className={`p-2 rounded-full ${
                          isActive
                            ? "bg-[#34D399] text-[#064E3B]"
                            : "text-gray-400 group-hover:text-white"
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
