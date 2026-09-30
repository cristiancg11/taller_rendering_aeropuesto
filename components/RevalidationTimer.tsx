"use client";

import { useState, useEffect } from "react";

interface RevalidationTimerProps {
  initialTimestamp: string;
  revalidateSeconds?: number;
}

export default function RevalidationTimer({
  initialTimestamp,
  revalidateSeconds = 60,
}: RevalidationTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(revalidateSeconds);
  const [revalidationCount, setRevalidationCount] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setRevalidationCount((c) => c + 1);
          return revalidateSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [revalidateSeconds]);

  const handleSimulateRevalidation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setTimeLeft(revalidateSeconds);
      setRevalidationCount((c) => c + 1);
      setIsSimulating(false);
    }, 600);
  };

  const progressPercent = ((revalidateSeconds - timeLeft) / revalidateSeconds) * 100;

  return (
    <div className="rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-orange-950/80 border-2 border-amber-500/40 p-5 space-y-4 shadow-xl shadow-amber-950/40">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
          </span>
          <span className="text-xs font-mono font-black uppercase text-amber-300">
            Live ISR 60s Cache Window Visualizer
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-300">
            Revalidation Cycle: <strong className="text-amber-400">#{revalidationCount}</strong>
          </span>
          <button
            type="button"
            onClick={handleSimulateRevalidation}
            disabled={isSimulating}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs font-mono shadow-md shadow-amber-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {isSimulating ? "Revalidating..." : "Trigger Background Revalidate ↻"}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-slate-400">Edge Cache Freshness TTL:</span>
          <span className="text-amber-300 font-bold">{timeLeft} seconds remaining</span>
        </div>
        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-amber-500/30">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-400 rounded-full transition-all duration-1000 ease-linear shadow-sm shadow-amber-500/50"
            style={{ width: `${100 - progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
        <span>Initial Cache Stamp: {initialTimestamp.slice(11, 19)} UTC</span>
        <span className="text-amber-400/90">
          {timeLeft > 0 ? "Status: Cache HIT (Serving cached snapshot)" : "Status: Stale (Revalidating on Edge)"}
        </span>
      </div>
    </div>
  );
}
