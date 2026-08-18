"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Track } from "../types/player";
import { Music } from "lucide-react";

interface ArtworkProps {
  track: Track;
  isPlaying: boolean;
}

export const Artwork: React.FC<ArtworkProps> = ({ track, isPlaying }) => {
  return (
    <div className="relative flex items-center justify-center my-2 sm:my-3">
      {/* Responsive Squircle Artwork Container */}
      <div className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-44 sm:h-44 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#1E1E1E] border border-white/20 shadow-xl flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={track.id || track.youtubeId}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {track.artworkUrl ? (
              <img
                src={track.artworkUrl}
                alt={track.title}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-[#2B2930] text-[#34D399]">
                <Music className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Specular Diagonal Glass Highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none" />
      </div>
    </div>
  );
};
