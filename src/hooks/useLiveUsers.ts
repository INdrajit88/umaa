"use client";

import { useState, useEffect } from "react";
import { toBengaliNumber } from "./useCountdown";

export function useLiveUsers(initialCount: number = 84) {
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    // Realistic fluctuation between 80 and 96
    const interval = setInterval(() => {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
        const next = prev + delta;
        return Math.max(80, Math.min(108, next));
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return {
    count,
    bengaliCount: toBengaliNumber(count),
  };
}
