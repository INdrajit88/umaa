"use client";

import React from "react";
import { motion } from "framer-motion";

interface AudioVisualizerProps {
  isPlaying: boolean;
  barCount?: number;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying,
  barCount = 18,
}) => {
  return (
    <div className="flex items-center justify-center gap-[3px] h-6 px-2">
      {Array.from({ length: barCount }).map((_, index) => {
        const delays = [0, 0.2, 0.4, 0.1, 0.3, 0.5, 0.25, 0.15, 0.35];
        const delay = delays[index % delays.length];

        return (
          <motion.span
            key={index}
            animate={{
              height: isPlaying
                ? [
                    "20%",
                    `${Math.floor(Math.sin(index + 1) * 35 + 55)}%`,
                    "15%",
                    `${Math.floor(Math.cos(index + 2) * 30 + 65)}%`,
                    "30%",
                  ]
                : "15%",
            }}
            transition={{
              duration: 1.1 + (index % 5) * 0.1,
              repeat: isPlaying ? Infinity : 0,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: delay,
            }}
            className="w-[2.5px] rounded-full bg-gradient-to-t from-amber-500/40 via-amber-400 to-amber-200"
          />
        );
      })}
    </div>
  );
};
