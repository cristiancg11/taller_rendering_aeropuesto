"use client";

import { useState } from "react";

export default function BaggageChecker() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [bagType, setBagType] = useState<"personal" | "carryon" | "checked">("carryon");
  const [length, setLength] = useState<number>(50);
  const [width, setWidth] = useState<number>(38);
  const [height, setHeight] = useState<number>(20);
  const [weight, setWeight] = useState<number>(8);

  // Limits based on unit
  const limits = {
    personal: {
      metric: { maxL: 40, maxW: 30, maxH: 15, maxWeight: 5, label: "Under-Seat Personal Item" },
      imperial: { maxL: 16, maxW: 12, maxH: 6, maxWeight: 11, label: "Under-Seat Personal Item" },
    },
    carryon: {
      metric: { maxL: 55, maxW: 40, maxH: 20, maxWeight: 10, label: "Standard Cabin Carry-On" },
      imperial: { maxL: 22, maxW: 16, maxH: 8, maxWeight: 22, label: "Standard Cabin Carry-On" },
    },
    checked: {
      metric: { maxTotal: 158, maxWeight: 23, label: "Checked Cargo Baggage" },
      imperial: { maxTotal: 62, maxWeight: 50, label: "Checked Cargo Baggage" },
    },
  };

  const currentLimit = limits[bagType][unit];
  const totalDim = length + width + height;

  const isFits =
    bagType === "checked"
      ? totalDim <= (currentLimit as { maxTotal: number; maxWeight: number }).maxTotal &&
        weight <= currentLimit.maxWeight
      : length <= (currentLimit as { maxL: number; maxW: number; maxH: number; maxWeight: number }).maxL &&
        width <= (currentLimit as { maxL: number; maxW: number; maxH: number; maxWeight: number }).maxW &&
        height <= (currentLimit as { maxL: number; maxW: number; maxH: number; maxWeight: number }).maxH &&
        weight <= currentLimit.maxWeight;

  return (
    <div className="rounded-3xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-teal-950/70 border-2 border-emerald-500/40 p-6 sm:p-8 space-y-6 shadow-2xl shadow-emerald-950/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
              Interactive Compliance Verifier
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Instant Baggage Sizer Calculator
          </h2>
        </div>

        {/* Unit Toggle Switcher */}
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-emerald-500/30 font-mono text-xs">
          <button
            type="button"
            onClick={() => setUnit("metric")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              unit === "metric"
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Metric (cm / kg)
          </button>
          <button
            type="button"
            onClick={() => setUnit("imperial")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              unit === "imperial"
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Imperial (in / lbs)
          </button>
        </div>
      </div>

      {/* Bag Category Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {(
          [
            { id: "personal", label: "Personal Item", icon: "🎒" },
            { id: "carryon", label: "Carry-On Bag", icon: "🧳" },
            { id: "checked", label: "Checked Cargo", icon: "📦" },
          ] as const
        ).map((t) => {
          const isSelected = bagType === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setBagType(t.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-3 ${
                isSelected
                  ? "bg-gradient-to-r from-emerald-500/25 to-teal-500/25 border-emerald-400 text-white shadow-lg shadow-emerald-500/20 scale-102"
                  : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-emerald-500/40 hover:bg-slate-900"
              }`}
            >
              <span className="text-2xl">{t.icon}</span>
              <div>
                <span className="text-xs font-bold block text-white">{t.label}</span>
                <span className="text-[10px] text-emerald-400/90 font-mono">
                  {limits[t.id][unit].label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-slate-950/80 rounded-2xl border border-emerald-500/20 font-mono text-xs">
        <div>
          <div className="flex justify-between text-slate-300 font-bold mb-1">
            <span>Length:</span>
            <span className="text-emerald-400">{length} {unit === "metric" ? "cm" : "in"}</span>
          </div>
          <input
            type="range"
            min={10}
            max={unit === "metric" ? 100 : 40}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 font-bold mb-1">
            <span>Width:</span>
            <span className="text-emerald-400">{width} {unit === "metric" ? "cm" : "in"}</span>
          </div>
          <input
            type="range"
            min={10}
            max={unit === "metric" ? 80 : 32}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 font-bold mb-1">
            <span>Height:</span>
            <span className="text-emerald-400">{height} {unit === "metric" ? "cm" : "in"}</span>
          </div>
          <input
            type="range"
            min={5}
            max={unit === "metric" ? 60 : 25}
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-300 font-bold mb-1">
            <span>Weight:</span>
            <span className="text-emerald-400">{weight} {unit === "metric" ? "kg" : "lbs"}</span>
          </div>
          <input
            type="range"
            min={1}
            max={unit === "metric" ? 40 : 80}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Compliance Live Banner */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between transition-all duration-300 ${
          isFits
            ? "bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-500/20"
            : "bg-rose-950/80 border-rose-400 text-rose-200 shadow-lg shadow-rose-500/20"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl text-lg ${isFits ? "bg-emerald-500 text-slate-950" : "bg-rose-500 text-white"}`}>
            {isFits ? "✓" : "✕"}
          </div>
          <div>
            <div className="font-black text-sm uppercase tracking-wide">
              {isFits
                ? "Permitted: Complies with Airline Standard"
                : "Exceeds Maximum Dimensions: Repack or Pay Surcharge"}
            </div>
            <div className="text-xs opacity-90 font-mono">
              Current: {length}×{width}×{height} {unit === "metric" ? "cm" : "in"} ({weight} {unit === "metric" ? "kg" : "lbs"})
            </div>
          </div>
        </div>
        <span className="text-xs font-mono font-bold uppercase hidden sm:inline-block">
          {isFits ? "PASS" : "OVERSIZE"}
        </span>
      </div>
    </div>
  );
}
