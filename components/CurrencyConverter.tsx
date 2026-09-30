"use client";

import { useState } from "react";

interface CurrencyConverterProps {
  baseTotalUSD: number;
}

const rates: Record<string, { symbol: string; rate: number; name: string }> = {
  USD: { symbol: "$", rate: 1.0, name: "US Dollar" },
  EUR: { symbol: "€", rate: 0.92, name: "Euro" },
  GBP: { symbol: "£", rate: 0.79, name: "British Pound" },
  COP: { symbol: "COP $", rate: 4180.0, name: "Colombian Peso" },
};

export default function CurrencyConverter({ baseTotalUSD }: CurrencyConverterProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");

  const curr = rates[selectedCurrency] || rates.USD;
  const convertedAmount = (baseTotalUSD * curr.rate).toLocaleString(undefined, {
    minimumFractionDigits: selectedCurrency === "COP" ? 0 : 2,
    maximumFractionDigits: selectedCurrency === "COP" ? 0 : 2,
  });

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-950 to-blue-950/60 border border-cyan-500/30 space-y-3 shadow-lg shadow-cyan-950/40">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
        <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
          Live Multi-Currency Conversion
        </span>
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-cyan-500/20 text-xs font-mono">
          {Object.keys(rates).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setSelectedCurrency(code)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                selectedCurrency === code
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40 scale-105"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-xs text-slate-300 font-sans">
          Total in {curr.name}:
        </span>
        <div className="text-xl sm:text-2xl font-black text-cyan-300 font-mono">
          {curr.symbol} {convertedAmount}
        </div>
      </div>
    </div>
  );
}
