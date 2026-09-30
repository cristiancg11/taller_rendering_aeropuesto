"use client";

import PatternBadge from "@/components/PatternBadge";
import Link from "next/link";
import { useState } from "react";

interface Seat {
  id: string;
  row: number;
  col: "A" | "B" | "C" | "D" | "E" | "F";
  type: "window" | "middle" | "aisle";
  category: "first" | "exit" | "standard";
  extraCost: number;
  features: string[];
}

// Initial occupied seats locked by other passengers
const initialOccupiedSeats: string[] = [
  "1B",
  "1E",
  "2A",
  "2C",
  "3B",
  "3D",
  "4E",
  "5A",
  "5F",
  "6C",
  "7B",
  "7D",
];

// Generate Boeing 737 Cabin Layout (Rows 1 to 7, Columns A-B-C [Aisle] D-E-F)
const generateCabinSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const rows = [1, 2, 3, 4, 5, 6, 7];
  const columns: ("A" | "B" | "C" | "D" | "E" | "F")[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  rows.forEach((row) => {
    columns.forEach((col) => {
      let type: "window" | "middle" | "aisle" = "middle";
      if (col === "A" || col === "F") type = "window";
      if (col === "C" || col === "D") type = "aisle";

      let category: "first" | "exit" | "standard" = "standard";
      let extraCost = 0;
      const features: string[] = [];

      if (row === 1) {
        category = "first";
        extraCost = 65;
        features.push("Priority Row 1", "Extra Recline", "Dedicated Overhead Bin");
      } else if (row === 5) {
        category = "exit";
        extraCost = 35;
        features.push("Overwing Emergency Exit", "+5\" Extra Legroom", "Rapid Deplaning");
      } else if (row <= 3) {
        extraCost = 15;
        features.push("Preferred Forward Cabin", "USB-C Fast Charging");
      } else {
        features.push("Standard Main Cabin", "Universal AC Power");
      }

      if (type === "window") features.push("Scenic Window View");
      if (type === "aisle") features.push("Direct Aisle Access");

      seats.push({
        id: `${row}${col}`,
        row,
        col,
        type,
        category,
        extraCost,
        features,
      });
    });
  });

  return seats;
};

const cabinSeats = generateCabinSeats();

export default function InteractiveSeatPickerPage() {
  // Client-Side In-Memory State managed via React useState
  const [selectedSeatId, setSelectedSeatId] = useState<string | null>("4A");
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>(initialOccupiedSeats);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "window" | "aisle" | "exit">("all");

  const selectedSeat = cabinSeats.find((s) => s.id === selectedSeatId) || null;
  const additionalCost = selectedSeat ? selectedSeat.extraCost : 0;

  const handleSeatClick = (seat: Seat) => {
    if (occupiedSeats.includes(seat.id)) return;
    if (selectedSeatId === seat.id) {
      setSelectedSeatId(null);
    } else {
      setSelectedSeatId(seat.id);
      setBookingConfirmed(false);
    }
  };

  const handleConfirmSeat = () => {
    if (!selectedSeat) return;
    setBookingConfirmed(true);
  };

  const handleReset = () => {
    setSelectedSeatId(null);
    setBookingConfirmed(false);
  };

  const handleSimulateFlightLock = () => {
    const available = cabinSeats
      .map((s) => s.id)
      .filter((id) => !occupiedSeats.includes(id) && id !== selectedSeatId);
    if (available.length > 0) {
      const randomSeat =
        available[Math.floor(Math.random() * available.length)];
      setOccupiedSeats((prev) => [...prev, randomSeat]);
    }
  };

  return (
    <div className="w-full py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Pattern Visual Identification Badge */}
      <div className="space-y-4">
        <PatternBadge
          pattern="CSR"
          badgeText="Rendering Pattern: CSR (Client-Side Rendering)"
        />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-fuchsia-400 font-bold">
              AeroGlobal Interactive Cabin Configuration Engine
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Boeing 737 Cabin Seat Selector
            </h1>
          </div>

          {/* Client-Side Memory Indicator */}
          <div className="bg-slate-900/90 border-2 border-fuchsia-500/40 rounded-2xl p-4 font-mono text-xs shadow-lg shadow-fuchsia-950/40">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">
              CLIENT RUNTIME STATE (V8 BROWSER MEMORY)
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 animate-ping"></span>
              <span className="text-fuchsia-300 font-extrabold text-sm">
                React useState Active ({occupiedSeats.length} Occupied Seats)
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">
              Zero server round-trips during user clicks &amp; state mutations.
            </span>
          </div>
        </div>
      </div>

      {/* Main Seat Picker Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Interactive Cabin Seat Map (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900/95 border-2 border-slate-700/80 p-6 sm:p-8 space-y-6 shadow-2xl shadow-slate-950/70">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-bold">
                AIRCRAFT CABIN MAP
              </span>
              <h2 className="text-xl font-black text-white">
                Boeing 737-800 (3×3 Configuration)
              </h2>
            </div>

            {/* Interactive Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-mono">
              {(
                [
                  { id: "all", label: "All Seats" },
                  { id: "window", label: "Window" },
                  { id: "aisle", label: "Aisle" },
                  { id: "exit", label: "Exit Row" },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    activeFilter === f.id
                      ? "bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-md shadow-fuchsia-500/40 scale-105"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cabin Legend with Distinct Colors */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-slate-300 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-md bg-cyan-950 border border-cyan-400"></span>
              <span className="text-cyan-300 font-bold">Window (A/F)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-md bg-emerald-950 border border-emerald-400"></span>
              <span className="text-emerald-300 font-bold">Aisle (C/D)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-md bg-amber-950 border border-amber-400"></span>
              <span className="text-amber-300 font-bold">Exit Row (+35$)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-md bg-gradient-to-tr from-fuchsia-500 to-pink-500 shadow-sm shadow-fuchsia-500/50"></span>
              <span className="text-fuchsia-300 font-bold">Selected</span>
            </div>
          </div>

          {/* Aircraft Cockpit Nose Indicator */}
          <div className="flex flex-col items-center justify-center pt-1">
            <div className="w-32 h-7 rounded-t-full bg-slate-800/80 border-t border-x border-slate-600 flex items-center justify-center shadow-inner">
              <span className="text-[10px] font-mono text-cyan-300 font-black tracking-widest uppercase">
                ▲ COCKPIT NOSE
              </span>
            </div>
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
          </div>

          {/* 3x3 Cabin Rows Layout */}
          <div className="space-y-3 max-w-lg mx-auto py-2">
            {/* Column Header Markers */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono font-black text-slate-400 pb-2">
              <div className="text-cyan-400">A (Win)</div>
              <div className="text-sky-400">B (Mid)</div>
              <div className="text-emerald-400">C (Aisle)</div>
              <div className="text-slate-500 font-normal">AISLE</div>
              <div className="text-emerald-400">D (Aisle)</div>
              <div className="text-sky-400">E (Mid)</div>
              <div className="text-cyan-400">F (Win)</div>
            </div>

            {/* Row-by-Row rendering */}
            {[1, 2, 3, 4, 5, 6, 7].map((rowNumber) => {
              const rowSeats = cabinSeats.filter((s) => s.row === rowNumber);
              const leftSeats = rowSeats.filter((s) =>
                ["A", "B", "C"].includes(s.col)
              );
              const rightSeats = rowSeats.filter((s) =>
                ["D", "E", "F"].includes(s.col)
              );

              const isExitRow = rowNumber === 5;
              const isFirstRow = rowNumber === 1;

              return (
                <div
                  key={rowNumber}
                  className={`relative p-2.5 rounded-2xl border-2 transition-all ${
                    isExitRow
                      ? "bg-amber-950/20 border-amber-500/50"
                      : isFirstRow
                      ? "bg-purple-950/20 border-purple-500/50"
                      : "bg-slate-950/60 border-slate-800"
                  }`}
                >
                  {isExitRow && (
                    <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-mono text-[9px] font-black uppercase tracking-wider shadow-sm">
                      Overwing Exit Row (+5&quot; Legroom)
                    </span>
                  )}

                  {isFirstRow && (
                    <span className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-fuchsia-500 text-white font-mono text-[9px] font-black uppercase tracking-wider shadow-sm">
                      First Class Row 1 (+65$)
                    </span>
                  )}

                  <div className="grid grid-cols-7 gap-2 items-center">
                    {/* Left 3 seats (A, B, C) */}
                    {leftSeats.map((seat) => {
                      const isOccupied = occupiedSeats.includes(seat.id);
                      const isSelected = selectedSeatId === seat.id;
                      const matchesFilter =
                        activeFilter === "all" ||
                        (activeFilter === "window" && seat.type === "window") ||
                        (activeFilter === "aisle" && seat.type === "aisle") ||
                        (activeFilter === "exit" && seat.category === "exit");

                      let baseColorStyle = "bg-slate-800 border-slate-700 text-slate-200";
                      if (seat.type === "window") {
                        baseColorStyle = "bg-cyan-950/60 border-cyan-500/50 text-cyan-200 hover:border-cyan-400";
                      } else if (seat.type === "aisle") {
                        baseColorStyle = "bg-emerald-950/60 border-emerald-500/50 text-emerald-200 hover:border-emerald-400";
                      } else if (seat.category === "exit") {
                        baseColorStyle = "bg-amber-950/60 border-amber-500/60 text-amber-200 hover:border-amber-400";
                      } else if (seat.category === "first") {
                        baseColorStyle = "bg-purple-950/60 border-purple-500/60 text-purple-200 hover:border-purple-400";
                      }

                      return (
                        <button
                          key={seat.id}
                          type="button"
                          disabled={isOccupied}
                          onClick={() => handleSeatClick(seat)}
                          className={`relative flex flex-col items-center justify-center h-13 rounded-2xl border-2 text-xs font-mono font-black transition-all transform cursor-pointer ${
                            isOccupied
                              ? "bg-slate-900 border-slate-800 text-slate-600 opacity-30 cursor-not-allowed"
                              : isSelected
                              ? "bg-gradient-to-tr from-fuchsia-500 to-pink-500 border-white text-white shadow-xl shadow-fuchsia-500/50 scale-110 z-10"
                              : matchesFilter
                              ? `${baseColorStyle} hover:scale-110 active:scale-95 shadow-md`
                              : "bg-slate-900/40 border-slate-800 text-slate-600 opacity-20"
                          }`}
                          title={`${seat.id} (${seat.type}) - ${
                            isOccupied
                              ? "Occupied"
                              : seat.extraCost > 0
                              ? `+$${seat.extraCost}`
                              : "Included"
                          }`}
                        >
                          <span className="text-sm">{seat.id}</span>
                          <span className="text-[9px] font-bold opacity-90">
                            {isOccupied
                              ? "✕"
                              : seat.extraCost > 0
                              ? `+$${seat.extraCost}`
                              : "STD"}
                          </span>
                        </button>
                      );
                    })}

                    {/* Central Aisle Separator */}
                    <div className="flex flex-col items-center justify-center text-slate-400 text-[10px] font-mono font-bold">
                      <span>R{rowNumber}</span>
                    </div>

                    {/* Right 3 seats (D, E, F) */}
                    {rightSeats.map((seat) => {
                      const isOccupied = occupiedSeats.includes(seat.id);
                      const isSelected = selectedSeatId === seat.id;
                      const matchesFilter =
                        activeFilter === "all" ||
                        (activeFilter === "window" && seat.type === "window") ||
                        (activeFilter === "aisle" && seat.type === "aisle") ||
                        (activeFilter === "exit" && seat.category === "exit");

                      let baseColorStyle = "bg-slate-800 border-slate-700 text-slate-200";
                      if (seat.type === "window") {
                        baseColorStyle = "bg-cyan-950/60 border-cyan-500/50 text-cyan-200 hover:border-cyan-400";
                      } else if (seat.type === "aisle") {
                        baseColorStyle = "bg-emerald-950/60 border-emerald-500/50 text-emerald-200 hover:border-emerald-400";
                      } else if (seat.category === "exit") {
                        baseColorStyle = "bg-amber-950/60 border-amber-500/60 text-amber-200 hover:border-amber-400";
                      } else if (seat.category === "first") {
                        baseColorStyle = "bg-purple-950/60 border-purple-500/60 text-purple-200 hover:border-purple-400";
                      }

                      return (
                        <button
                          key={seat.id}
                          type="button"
                          disabled={isOccupied}
                          onClick={() => handleSeatClick(seat)}
                          className={`relative flex flex-col items-center justify-center h-13 rounded-2xl border-2 text-xs font-mono font-black transition-all transform cursor-pointer ${
                            isOccupied
                              ? "bg-slate-900 border-slate-800 text-slate-600 opacity-30 cursor-not-allowed"
                              : isSelected
                              ? "bg-gradient-to-tr from-fuchsia-500 to-pink-500 border-white text-white shadow-xl shadow-fuchsia-500/50 scale-110 z-10"
                              : matchesFilter
                              ? `${baseColorStyle} hover:scale-110 active:scale-95 shadow-md`
                              : "bg-slate-900/40 border-slate-800 text-slate-600 opacity-20"
                          }`}
                          title={`${seat.id} (${seat.type}) - ${
                            isOccupied
                              ? "Occupied"
                              : seat.extraCost > 0
                              ? `+$${seat.extraCost}`
                              : "Included"
                          }`}
                        >
                          <span className="text-sm">{seat.id}</span>
                          <span className="text-[9px] font-bold opacity-90">
                            {isOccupied
                              ? "✕"
                              : seat.extraCost > 0
                              ? `+$${seat.extraCost}`
                              : "STD"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Simulation Controls */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <button
              type="button"
              onClick={handleSimulateFlightLock}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-all font-bold hover:scale-105 active:scale-95 cursor-pointer"
            >
              Simulate Passenger Lock (+1 Occupied Seat)
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all font-bold hover:scale-105 active:scale-95 cursor-pointer"
            >
              Reset Selection
            </button>
          </div>
        </div>

        {/* Right Side: Seat Inspector & Dynamic Client State HUD (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Selected Seat Inspector Card with Vibrant Gradient Border */}
          <div className="rounded-3xl bg-slate-900/95 border-2 border-fuchsia-500/40 p-6 sm:p-8 space-y-6 shadow-2xl shadow-fuchsia-950/60">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-fuchsia-400 font-bold">
                  REAL-TIME SEAT SPECIFICATIONS
                </span>
                <h3 className="text-2xl font-black text-white">
                  {selectedSeat ? `Seat ${selectedSeat.id}` : "No Seat Selected"}
                </h3>
              </div>
              {selectedSeat && (
                <span className="px-3.5 py-1 rounded-full bg-fuchsia-500/20 border border-fuchsia-400/50 text-fuchsia-300 text-xs font-mono font-black uppercase">
                  {selectedSeat.type} Seat
                </span>
              )}
            </div>

            {selectedSeat ? (
              <div className="space-y-5">
                {/* Visual Spec Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] font-bold">
                      ROW NUMBER
                    </span>
                    <span className="text-white font-black text-base">
                      Row {selectedSeat.row}
                    </span>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] font-bold">
                      SEAT TYPE
                    </span>
                    <span className="text-fuchsia-300 font-black text-base capitalize">
                      {selectedSeat.type}
                    </span>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] font-bold">
                      ADDITIONAL FEE
                    </span>
                    <span className="text-emerald-400 font-black text-base">
                      {additionalCost > 0 ? `+$${additionalCost}.00 USD` : "$0.00 (Included)"}
                    </span>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] font-bold">
                      AVAILABILITY
                    </span>
                    <span className="text-cyan-300 font-black text-base">
                      Confirmed Open
                    </span>
                  </div>
                </div>

                {/* Seat Amenities List */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider block">
                    Seat Amenities &amp; Privileges:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-200">
                    {selectedSeat.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-fuchsia-400 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Confirmation High-Energy Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleConfirmSeat}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-pink-500 hover:from-fuchsia-400 hover:to-purple-500 text-white font-black text-sm shadow-xl shadow-fuchsia-500/30 hover:scale-105 active:scale-95 transition-all text-center cursor-pointer"
                  >
                    Confirm Seat {selectedSeat.id} (+$
                    {additionalCost} USD)
                  </button>
                </div>

                {/* Animated Boarding Pass Ticket on Confirmation */}
                {bookingConfirmed && (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400 text-emerald-200 text-xs space-y-3 animate-in fade-in duration-300 shadow-xl shadow-emerald-950/60">
                    <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
                      <div className="font-black text-sm flex items-center gap-2 text-white">
                        <span>🎫</span>
                        <span>OFFICIAL BOARDING PASS ISSUED</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-mono font-bold text-[10px]">
                        LOCKED
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                      <div>
                        <span className="text-slate-400 text-[10px] block">SEAT</span>
                        <span className="text-white font-black text-base">{selectedSeat.id}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">ZONE</span>
                        <span className="text-emerald-300 font-bold">Group 2</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">FEE</span>
                        <span className="text-white font-bold">+${additionalCost}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-300 font-sans border-t border-emerald-500/20 pt-2">
                      Optimistic client reservation verified in local V8 memory. Zero server round-trip latency incurred.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-10 text-center text-slate-400 space-y-3">
                <svg
                  className="w-14 h-14 mx-auto text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
                <p className="text-sm text-slate-300">
                  Click any available cyan (window), green (aisle), or amber (exit) seat on the cabin map to inspect its amenities.
                </p>
              </div>
            )}
          </div>

          {/* Live In-Memory State Inspector (Academic Debugger) */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-5 space-y-3 font-mono text-xs shadow-lg">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-bold text-slate-200">
                BROWSER HEAP INSPECTION
              </span>
              <span className="text-[10px] text-fuchsia-400 font-bold">
                `window.__REACT_DEVTOOLS__`
              </span>
            </div>
            <pre className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] text-slate-300 overflow-x-auto">
              {JSON.stringify(
                {
                  renderingPattern: "CSR",
                  clientDirective: "'use client'",
                  stateManager: "React.useState",
                  selectedSeatId,
                  additionalCost,
                  occupiedCount: occupiedSeats.length,
                  filterMode: activeFilter,
                  bookingConfirmed,
                },
                null,
                2
              )}
            </pre>
            <p className="text-[10px] text-slate-400">
              State updates directly trigger React fiber tree reconciliations
              without HTTP transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-bold pt-4 border-t border-slate-800">
        <Link
          href="/booking/checkout?flightId=AG-402&tier=economy"
          className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          ← Previous: Examine SSR Live Booking Checkout
        </Link>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-slate-950 font-black shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <span>Return to Architecture Overview Hub</span>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
