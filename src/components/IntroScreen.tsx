"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

interface IntroScreenProps {
  isVisible: boolean;
  onEnter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  isVisible,
  onEnter,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 text-white select-none px-4 cursor-pointer"
          onClick={onEnter}
        >
          {/* Bengali Header: মা আসছেন (Clean, No Eye Logo, No Ellipses) */}
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl font-black font-bengali text-[#FFD166] tracking-tight">
              মা আসছেন
            </h1>
            
            <p className="mt-2 text-sm sm:text-base text-gray-300 font-bengaliSans">
              ঢাকের তালে, কাশফুলের হাওয়ায়
            </p>
          </div>

          {/* Solid M3 Enter Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEnter();
            }}
            className="mt-8 flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#FFD166] hover:bg-[#FFE082] text-[#1C1B1F] font-bold text-sm shadow-xl active:scale-95 transition-all font-bengali"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>শুনতে প্রবেশ করুন</span>
          </button>

          <span className="mt-4 text-xs text-gray-400 font-bengaliSans">
            ক্লিক করে গান শুনুন
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
