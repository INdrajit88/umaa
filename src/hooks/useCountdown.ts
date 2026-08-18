"use client";

import { useState, useEffect } from "react";

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isExpired: boolean;
  bengaliDays: string;
  bengaliHours: string;
  bengaliMinutes: string;
  bengaliSeconds: string;
  bengaliFullText: string;
  bengaliShortText: string;
}

const BENGALI_DIGITS: { [key: string]: string } = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};

export function toBengaliNumber(num: number | string): string {
  return String(num)
    .split("")
    .map((char) => BENGALI_DIGITS[char] || char)
    .join("");
}

export function useCountdown(targetDateIso: string): CountdownResult {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
    isExpired: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateIso).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          totalSeconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const totalSeconds = Math.floor(diff / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        totalSeconds,
        isExpired: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateIso]);

  const pad = (n: number) => String(n).padStart(2, "0");

  const bengaliDays = toBengaliNumber(timeLeft.days);
  const bengaliHours = toBengaliNumber(pad(timeLeft.hours));
  const bengaliMinutes = toBengaliNumber(pad(timeLeft.minutes));
  const bengaliSeconds = toBengaliNumber(pad(timeLeft.seconds));

  const bengaliFullText = `${bengaliDays} দিন ${bengaliHours} ঘণ্টা ${bengaliMinutes} মিনিট ${bengaliSeconds} সেকেন্ড`;
  const bengaliShortText = `আর মাত্র ${bengaliDays} দিন`;

  return {
    ...timeLeft,
    bengaliDays,
    bengaliHours,
    bengaliMinutes,
    bengaliSeconds,
    bengaliFullText,
    bengaliShortText,
  };
}
