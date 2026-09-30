import React from "react";

export type RenderingPattern = "SSG" | "ISR" | "SSR" | "CSR";

interface PatternBadgeProps {
  pattern: RenderingPattern;
  badgeText?: string;
  showDetails?: boolean;
}

const patternConfig: Record<
  RenderingPattern,
  {
    title: string;
    badgeLabel: string;
    color: string;
    border: string;
    bg: string;
    glow: string;
    dot: string;
    ttfb: string;
    renderLocation: string;
    seoScore: string;
    cachingStrategy: string;
    description: string;
    accentPill: string;
  }
> = {
  SSG: {
    title: "Static Site Generation",
    badgeLabel: "Rendering Pattern: SSG (Static Site Generation)",
    color: "text-emerald-300",
    border: "border-emerald-400/60",
    bg: "bg-gradient-to-r from-emerald-950/80 via-teal-950/70 to-emerald-950/80",
    glow: "shadow-lg shadow-emerald-500/25",
    dot: "bg-emerald-400",
    ttfb: "< 25ms (Edge CDN)",
    renderLocation: "Build Time (Node.js Build Machine)",
    seoScore: "100 / 100 (Optimal pre-rendered HTML)",
    cachingStrategy: "Immutable Edge Cache (RFC 7234)",
    description:
      "Pre-rendered strictly during compilation. Served globally from edge caches without server computation.",
    accentPill: "bg-emerald-500/20 text-emerald-300 border-emerald-400/50",
  },
  ISR: {
    title: "Incremental Static Regeneration",
    badgeLabel: "Rendering Pattern: ISR (Incremental Static Regeneration - 60s window)",
    color: "text-amber-300",
    border: "border-amber-400/60",
    bg: "bg-gradient-to-r from-amber-950/80 via-yellow-950/70 to-amber-950/80",
    glow: "shadow-lg shadow-amber-500/25",
    dot: "bg-amber-400",
    ttfb: "< 40ms (Edge SWR Cache)",
    renderLocation: "Hybrid (Edge CDN + Background Worker)",
    seoScore: "100 / 100 (Full HTML indexability with periodic freshness)",
    cachingStrategy: "Stale-While-Revalidate (RFC 5861)",
    description:
      "Static pages revalidated in the background after 60s. Users receive instant cached responses while edge re-generates.",
    accentPill: "bg-amber-500/20 text-amber-300 border-amber-400/50",
  },
  SSR: {
    title: "Server-Side Rendering",
    badgeLabel: "Rendering Pattern: SSR (Server-Side Rendering - Live Execution)",
    color: "text-cyan-300",
    border: "border-cyan-400/60",
    bg: "bg-gradient-to-r from-cyan-950/80 via-blue-950/70 to-indigo-950/80",
    glow: "shadow-lg shadow-cyan-500/25",
    dot: "bg-cyan-400",
    ttfb: "80ms - 220ms (Dynamic Compute)",
    renderLocation: "On-Demand Serverless / Node.js Runtime",
    seoScore: "100 / 100 (Dynamic server-rendered HTML for search crawlers)",
    cachingStrategy: "No-Store / Private (Per HTTP Request)",
    description:
      "Executed fresh on every HTTP request. Evaluates live query parameters, dynamic pricing, and inventory locks.",
    accentPill: "bg-cyan-500/20 text-cyan-300 border-cyan-400/50",
  },
  CSR: {
    title: "Client-Side Rendering",
    badgeLabel: "Rendering Pattern: CSR (Client-Side Rendering)",
    color: "text-fuchsia-300",
    border: "border-fuchsia-400/60",
    bg: "bg-gradient-to-r from-fuchsia-950/80 via-purple-950/70 to-pink-950/80",
    glow: "shadow-lg shadow-fuchsia-500/25",
    dot: "bg-fuchsia-400",
    ttfb: "Instant UI State (0ms round-trip)",
    renderLocation: "Client Browser (DOM & React V8 Engine)",
    seoScore: "Moderate (Depends on search crawler JavaScript execution)",
    cachingStrategy: "Client-Side Memory (React useState/useReducer)",
    description:
      "Dynamic in-browser execution with real-time UI interactivity, immediate feedback, and optimistic state updates.",
    accentPill: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/50",
  },
};

export default function PatternBadge({
  pattern,
  badgeText,
  showDetails = true,
}: PatternBadgeProps) {
  const config = patternConfig[pattern];
  const label = badgeText || config.badgeLabel;

  return (
    <div className="w-full space-y-3">
      {/* Primary Luminous Visual Badge */}
      <div
        className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] ${config.bg} ${config.border} ${config.glow}`}
      >
        <span className="relative flex h-3.5 w-3.5">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-80 ${config.dot}`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-3.5 w-3.5 ${config.dot} shadow-sm`}
          ></span>
        </span>
        <span className={`text-sm sm:text-base font-black tracking-wide ${config.color}`}>
          {label}
        </span>
      </div>

      {/* Architectural Telemetry HUD */}
      {showDetails && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700/80 text-xs shadow-xl shadow-slate-950/60">
          <div className="space-y-1">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
              EXECUTION TARGET
            </span>
            <span className="text-white font-semibold truncate block">
              {config.renderLocation}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
              TTFB LATENCY
            </span>
            <span className="text-emerald-400 font-mono font-black text-sm block">
              {config.ttfb}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
              SEO READINESS
            </span>
            <span className="text-cyan-300 font-medium truncate block">
              {config.seoScore}
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] block">
              CACHE PROTOCOL
            </span>
            <span className="text-amber-300 font-mono truncate block">
              {config.cachingStrategy}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
