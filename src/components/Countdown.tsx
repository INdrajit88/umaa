"use client";

import React from "react";
import { useCountdown } from "../hooks/useCountdown";

interface CountdownProps {
  targetDate: string;
  title: string;
  subtitle?: string;
}

export const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  title,
  subtitle,
}) => {
  const countdown = useCountdown(targetDate);

  // Clean title without ellipses
  const cleanTitle = title.replace(/\.+$/, "").trim();

  const timeUnits = [
    { value: countdown.bengaliDays, label: "দিন", enLabel: "DAYS" },
    { value: countdown.bengaliHours, label: "ঘণ্টা", enLabel: "HOURS" },
    { value: countdown.bengaliMinutes, label: "মিনিট", enLabel: "MINS" },
    { value: countdown.bengaliSeconds, label: "সেকেন্ড", enLabel: "SECS" },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center text-center select-none z-20 px-2 sm:px-4">
      {/* 1. Bengali Header: মা আসছেন (Responsive font sizing) */}
      <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-bengali drop-shadow-lg leading-tight">
        <span className="text-[#FFD166]">{cleanTitle}</span>
      </h1>

      {/* 2. Subtitle */}
      {subtitle && (
        <p className="text-[11px] sm:text-xs md:text-sm text-gray-200 font-medium tracking-wide mt-0.5 sm:mt-1 font-bengaliSans drop-shadow">
          {subtitle.replace(/\.+$/, "")}
        </p>
      )}

      {/* 3. Responsive iOS Frosted Glass Countdown Tiles */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-3 mt-2.5 sm:mt-3.5 max-w-full">
        {timeUnits.map((unit, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center w-[58px] xs:w-[64px] sm:w-[74px] py-1.5 sm:py-2.5 rounded-xl sm:rounded-2xl ios-glass-tile transition-transform active:scale-95 sm:hover:scale-105"
          >
            <span className="text-lg xs:text-xl sm:text-2xl font-black text-[#FFD166] font-mono leading-none tracking-tight drop-shadow">
              {unit.value}
            </span>
            <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-bold text-gray-200 font-bengaliSans mt-0.5 sm:mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
