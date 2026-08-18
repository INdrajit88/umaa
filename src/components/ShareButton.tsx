"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareButtonProps {
  shareText: string;
  shareUrl?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  shareText,
  shareUrl = "https://umaa.tech",
}) => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleShare = async () => {
    const targetUrl = shareUrl || "https://umaa.tech";
    const fullShareContent = `${shareText}\n${targetUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "umaa (উমা) | Durga Puja Music Experience",
          text: shareText,
          url: targetUrl,
        });
        return;
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.warn("Error sharing:", err);
        }
      }
    }

    // Fallback: Copy clean umaa.tech link to clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullShareContent);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = fullShareContent;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      {/* Self-contained In-Pill Button */}
      <button
        onClick={handleShare}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-300 shadow-md ${
          copied
            ? "bg-[#34D399] text-[#064E3B] font-bold border border-[#34D399]"
            : "ios-glass-pill text-xs text-white font-medium hover:bg-white/20"
        }`}
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
        ) : (
          <Share2 className="w-3.5 h-3.5 text-[#34D399] group-hover:scale-110 transition-transform" />
        )}
        <span className="font-bengaliSans text-xs font-semibold">
          {copied ? "কপি হয়েছে!" : "Share"}
        </span>
      </button>

      {/* Global Unclipped Portal Toast at Top Center of Viewport */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: -25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  top: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 99999,
                }}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full ios-ultra-glass border border-[#34D399]/40 shadow-2xl text-white select-none pointer-events-none"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#34D399] animate-ping" />
                <span className="text-xs font-bold text-[#34D399] font-bengali">
                  ✨ লিংক কপি করা হয়েছে!
                </span>
                <span className="text-[11px] text-gray-300 font-mono">umaa.tech</span>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
