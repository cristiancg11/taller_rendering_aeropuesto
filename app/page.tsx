import Link from "next/link";

interface PatternCard {
  id: string;
  badge: string;
  badgeColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeGlow: string;
  cardBorder: string;
  cardBorderHover: string;
  accentGradient: string;
  buttonGradient: string;
  buttonTextColor: string;
  buttonShadow: string;
  patternName: string;
  headline: string;
  routeHref: string;
  routeLabel: string;
  technicalDescription: string;
  travelUseCase: string;
  metrics: {
    ttfb: string;
    serverLoad: string;
    freshness: string;
    seo: string;
  };
}

const patterns: PatternCard[] = [
  {
    id: "ssg",
    badge: "SSG · Static Site Generation",
    badgeColor: "text-emerald-300",
    badgeBg: "bg-emerald-950/80",
    badgeBorder: "border-emerald-400/60",
    badgeGlow: "shadow-emerald-500/30",
    cardBorder: "border-emerald-500/30",
    cardBorderHover: "hover:border-emerald-400/80 hover:shadow-emerald-500/20",
    accentGradient: "from-emerald-500/15 via-teal-500/10 to-transparent",
    buttonGradient:
      "bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-500 hover:from-emerald-300 hover:to-teal-400",
    buttonTextColor: "text-slate-950",
    buttonShadow: "shadow-lg shadow-emerald-500/30",
    patternName: "Static Site Generation",
    headline: "Pre-rendered HTML at Build Time",
    routeHref: "/policies/baggage",
    routeLabel: "Launch SSG Baggage Policies →",
    technicalDescription:
      "Pages are compiled strictly during `next build` into pure HTML and JSON artifacts. Deployed to edge CDN PoPs with immutable caching headers (`s-maxage=31536000`), yielding sub-25ms TTFB worldwide with zero server execution cost.",
    travelUseCase:
      "Ideal for static airline policies such as cabin and checked baggage dimensions, conditions of carriage, terminal guides, and passenger rights that change infrequently.",
    metrics: {
      ttfb: "< 25ms (Edge Hit)",
      serverLoad: "0% Compute",
      freshness: "Static (Build-time)",
      seo: "100 / 100 Optimal",
    },
  },
  {
    id: "isr",
    badge: "ISR · Incremental Static Regeneration",
    badgeColor: "text-amber-300",
    badgeBg: "bg-amber-950/80",
    badgeBorder: "border-amber-400/60",
    badgeGlow: "shadow-amber-500/30",
    cardBorder: "border-amber-500/30",
    cardBorderHover: "hover:border-amber-400/80 hover:shadow-amber-500/20",
    accentGradient: "from-amber-500/15 via-yellow-500/10 to-transparent",
    buttonGradient:
      "bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400",
    buttonTextColor: "text-slate-950",
    buttonShadow: "shadow-lg shadow-amber-500/30",
    patternName: "Incremental Static Regeneration",
    headline: "Edge-Cached with Stale-While-Revalidate",
    routeHref: "/routes/bogota-to-miami",
    routeLabel: "Launch ISR Flight Route →",
    technicalDescription:
      "Employs `export const revalidate = 60;`. When a visitor requests after 60s, the CDN instantly serves the stale cached page while triggering an asynchronous background revalidation without user-facing delay.",
    travelUseCase:
      "Perfect for high-volume flight route catalogs (e.g. Bogotá to Miami, Madrid to London), promotional base fares, and seasonal timetable landing pages that update periodically.",
    metrics: {
      ttfb: "< 40ms (Edge Cache)",
      serverLoad: "Very Low (1/60s)",
      freshness: "60-Second Window",
      seo: "100 / 100 Optimal",
    },
  },
  {
    id: "ssr",
    badge: "SSR · Server-Side Rendering",
    badgeColor: "text-cyan-300",
    badgeBg: "bg-cyan-950/80",
    badgeBorder: "border-cyan-400/60",
    badgeGlow: "shadow-cyan-500/30",
    cardBorder: "border-cyan-500/30",
    cardBorderHover: "hover:border-cyan-400/80 hover:shadow-cyan-500/20",
    accentGradient: "from-cyan-500/15 via-sky-500/10 to-transparent",
    buttonGradient:
      "bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-300 hover:to-sky-400",
    buttonTextColor: "text-slate-950 font-black",
    buttonShadow: "shadow-lg shadow-cyan-500/30",
    patternName: "Server-Side Rendering",
    headline: "On-Demand Dynamic Server Execution",
    routeHref: "/booking/checkout?flightId=AG-402&tier=economy",
    routeLabel: "Launch SSR Live Checkout →",
    technicalDescription:
      "Using `export const dynamic = 'force-dynamic';`, the server executes on every incoming HTTP request. Reads URL search parameters, calculates fuel surcharges (12%) and taxes, and locks inventory before streaming HTML.",
    travelUseCase:
      "Mission-critical for live booking checkouts, payment processing, real-time seat inventory reservation, dynamic fuel surcharges, and anti-arbitrage ticket issuance.",
    metrics: {
      ttfb: "90ms – 220ms (Dynamic)",
      serverLoad: "High (1:1 per req)",
      freshness: "100% Real-Time",
      seo: "100 / 100 Dynamic",
    },
  },
  {
    id: "csr",
    badge: "CSR · Client-Side Rendering",
    badgeColor: "text-fuchsia-300",
    badgeBg: "bg-fuchsia-950/80",
    badgeBorder: "border-fuchsia-400/60",
    badgeGlow: "shadow-fuchsia-500/30",
    cardBorder: "border-fuchsia-500/30",
    cardBorderHover: "hover:border-fuchsia-400/80 hover:shadow-fuchsia-500/20",
    accentGradient: "from-fuchsia-500/15 via-purple-500/10 to-transparent",
    buttonGradient:
      "bg-gradient-to-r from-fuchsia-500 via-purple-600 to-pink-500 hover:from-fuchsia-400 hover:to-purple-500",
    buttonTextColor: "text-white font-black",
    buttonShadow: "shadow-lg shadow-fuchsia-500/30",
    patternName: "Client-Side Rendering",
    headline: "Client Browser Execution & React State",
    routeHref: "/interactive/seat-picker",
    routeLabel: "Launch CSR Seat Selector →",
    technicalDescription:
      "Marked with `'use client';`. The browser downloads JavaScript and executes React within client memory (`useState`). DOM mutations and seat selections happen instantaneously without initiating server round-trips.",
    travelUseCase:
      "Essential for highly interactive, state-driven widgets such as Boeing 737 aircraft cabin seat pickers, baggage weight sliders, interactive meal selectors, and instant filters.",
    metrics: {
      ttfb: "0ms UI transitions",
      serverLoad: "0% post-load",
      freshness: "Client-controlled",
      seo: "Client Hydrated",
    },
  },
];

export default function HomePage() {
  return (
    <div className="w-full min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Radiant Hero Welcome Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950 border border-sky-500/30 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-slate-950/80">
        {/* Luminous Ambient Glow Orbs */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/90 via-sky-950/90 to-indigo-950/90 border border-cyan-400/50 text-cyan-300 text-xs font-mono font-bold shadow-lg shadow-cyan-500/20">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span>ENTERPRISE AIRLINE CASE STUDY · NEXT.JS APP ROUTER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            AeroGlobal{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              TravelTech
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-normal">
            Welcome to the AeroGlobal TravelTech architectural observatory. In
            high-throughput airline platforms, no single rendering strategy fits
            all functional requirements. This application implements, benchmarks,
            and validates the four cardinal web rendering paradigms:{" "}
            <strong className="text-emerald-400 font-bold">SSG</strong>,{" "}
            <strong className="text-amber-400 font-bold">ISR</strong>,{" "}
            <strong className="text-cyan-400 font-bold">SSR</strong>, and{" "}
            <strong className="text-fuchsia-400 font-bold">CSR</strong>.
          </p>

          {/* Interactive Hero Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#patterns-grid"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span>Explore 4 Rendering Patterns</span>
              <svg
                className="w-4 h-4 text-cyan-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>

            <Link
              href="/interactive/seat-picker"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-fuchsia-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <svg
                className="w-4 h-4 text-fuchsia-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"
                />
              </svg>
              <span>Interactive Seat Picker (CSR)</span>
            </Link>

            <a
              href="#comparison-matrix"
              className="px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 hover:border-cyan-500/50 font-semibold text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              View Comparison Matrix
            </a>
          </div>

          {/* Quick Architectural Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800 text-xs">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 block font-mono text-[10px]">
                FRAMEWORK
              </span>
              <span className="text-white font-bold text-sm">
                Next.js 16 (App Router)
              </span>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 block font-mono text-[10px]">
                CORE RUNTIME
              </span>
              <span className="text-cyan-300 font-bold text-sm">
                React Server Components
              </span>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 block font-mono text-[10px]">
                EDGE NETWORK
              </span>
              <span className="text-emerald-400 font-bold text-sm">
                Vercel Edge / CDN
              </span>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
              <span className="text-slate-400 block font-mono text-[10px]">
                DOMAIN CONTEXT
              </span>
              <span className="text-amber-300 font-bold text-sm">
                Commercial Aviation Tech
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2x2 Comparative Grid Section */}
      <section id="patterns-grid" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Interactive Lab
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Four Core Web Rendering Patterns
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md">
            Each card demonstrates a specialized airline capability optimized
            for latency, computational cost, search indexing, and real-time state.
          </p>
        </div>

        {/* The 2x2 Grid with Radiant Colors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {patterns.map((item) => (
            <div
              key={item.id}
              className={`relative flex flex-col justify-between rounded-3xl bg-slate-900/90 border ${item.cardBorder} p-6 sm:p-8 transition-all duration-300 ${item.cardBorderHover} shadow-xl hover:shadow-2xl hover:scale-[1.02] group overflow-hidden`}
            >
              {/* Vibrant card background glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.accentGradient} opacity-70 pointer-events-none`}
              />

              <div className="relative z-10 space-y-5">
                {/* Header: Badge & Route */}
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-black tracking-wide border shadow-md ${item.badgeBg} ${item.badgeColor} ${item.badgeBorder} ${item.badgeGlow}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-700">
                    Route: {item.routeHref.split("?")[0]}
                  </span>
                </div>

                {/* Title & Headline */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {item.patternName}
                  </h3>
                  <p className="text-xs font-mono text-slate-300 font-semibold mt-1">
                    {item.headline}
                  </p>
                </div>

                {/* Technical Description */}
                <div className="space-y-1.5">
                  <h4 className="text-xs uppercase font-mono font-bold text-slate-200 tracking-wider">
                    Technical Mechanics
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.technicalDescription}
                  </p>
                </div>

                {/* TravelTech Domain Use Case */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5 shadow-inner">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>TravelTech Industry Application</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {item.travelUseCase}
                  </p>
                </div>

                {/* Performance Metrics Pill Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                  <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] font-bold">
                      ESTIMATED TTFB
                    </span>
                    <span className="text-emerald-400 font-black text-sm">
                      {item.metrics.ttfb}
                    </span>
                  </div>
                  <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] font-bold">
                      SERVER COST
                    </span>
                    <span className="text-cyan-300 font-black text-sm">
                      {item.metrics.serverLoad}
                    </span>
                  </div>
                  <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] font-bold">
                      DATA FRESHNESS
                    </span>
                    <span className="text-amber-300 font-black text-sm">
                      {item.metrics.freshness}
                    </span>
                  </div>
                  <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px] font-bold">
                      SEARCH INDEXING
                    </span>
                    <span className="text-fuchsia-300 font-black text-sm">
                      {item.metrics.seo}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button - High Energy Interactive Button */}
              <div className="relative z-10 pt-6 mt-4 border-t border-slate-800">
                <Link
                  href={item.routeHref}
                  className={`flex items-center justify-between w-full px-5 py-4 rounded-2xl ${item.buttonGradient} ${item.buttonTextColor} ${item.buttonShadow} text-sm font-black transition-all transform hover:scale-105 active:scale-95 cursor-pointer group/btn`}
                >
                  <span>{item.routeLabel}</span>
                  <svg
                    className="w-5 h-5 transform group-hover/btn:translate-x-1.5 transition-transform"
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
          ))}
        </div>
      </section>

      {/* Academic Architecture Comparison Matrix */}
      <section
        id="comparison-matrix"
        className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 space-y-6 shadow-2xl"
      >
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            Theoretical Analysis
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Architectural Trade-Off Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Comparative technical evaluation of web rendering strategies based on
            system throughput, TTFB latency, compute costs, and consistency
            guarantees.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 font-mono text-xs bg-slate-950/60">
                <th className="py-3.5 px-4 font-bold">Pattern</th>
                <th className="py-3.5 px-4 font-bold">Execution Point</th>
                <th className="py-3.5 px-4 font-bold">Median TTFB</th>
                <th className="py-3.5 px-4 font-bold">Server CPU Cost</th>
                <th className="py-3.5 px-4 font-bold">Data Freshness</th>
                <th className="py-3.5 px-4 font-bold">SEO Capability</th>
                <th className="py-3.5 px-4 font-bold">Airline Domain Feature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-xs">
              <tr className="hover:bg-emerald-950/20 transition-colors">
                <td className="py-4 px-4 font-black text-emerald-400 font-sans text-sm">
                  SSG (Static Site Generation)
                </td>
                <td className="py-4 px-4 text-slate-300">
                  Build Machine (`next build`)
                </td>
                <td className="py-4 px-4 text-emerald-400 font-bold">10 - 25 ms</td>
                <td className="py-4 px-4 text-emerald-400 font-semibold">0% (Pure CDN)</td>
                <td className="py-4 px-4 text-slate-300">Static until redeploy</td>
                <td className="py-4 px-4 text-emerald-400 font-semibold">100% Pre-rendered</td>
                <td className="py-4 px-4 text-slate-100 font-sans font-medium">
                  Baggage Policies &amp; Legal FAQs
                </td>
              </tr>
              <tr className="hover:bg-amber-950/20 transition-colors">
                <td className="py-4 px-4 font-black text-amber-400 font-sans text-sm">
                  ISR (Incremental Static Reg.)
                </td>
                <td className="py-4 px-4 text-slate-300">
                  Edge CDN + Async Background Worker
                </td>
                <td className="py-4 px-4 text-amber-400 font-bold">25 - 45 ms</td>
                <td className="py-4 px-4 text-amber-300 font-semibold">Very Low (Cached 60s)</td>
                <td className="py-4 px-4 text-amber-300 font-semibold">60-second window</td>
                <td className="py-4 px-4 text-emerald-400 font-semibold">100% Pre-rendered</td>
                <td className="py-4 px-4 text-slate-100 font-sans font-medium">
                  Flight Route Catalogs &amp; Base Fares
                </td>
              </tr>
              <tr className="hover:bg-cyan-950/20 transition-colors">
                <td className="py-4 px-4 font-black text-cyan-400 font-sans text-sm">
                  SSR (Server-Side Rendering)
                </td>
                <td className="py-4 px-4 text-slate-300">
                  Node.js / Edge Function per Request
                </td>
                <td className="py-4 px-4 text-cyan-400 font-bold">90 - 220 ms</td>
                <td className="py-4 px-4 text-rose-400 font-semibold">High (1 execution/req)</td>
                <td className="py-4 px-4 text-cyan-300 font-semibold">100% Real-Time Live</td>
                <td className="py-4 px-4 text-emerald-400 font-semibold">100% Server Streamed</td>
                <td className="py-4 px-4 text-slate-100 font-sans font-medium">
                  Checkout, Fuel Taxes &amp; Inventory Lock
                </td>
              </tr>
              <tr className="hover:bg-fuchsia-950/20 transition-colors">
                <td className="py-4 px-4 font-black text-fuchsia-400 font-sans text-sm">
                  CSR (Client-Side Rendering)
                </td>
                <td className="py-4 px-4 text-slate-300">
                  Client Browser DOM (V8 Engine)
                </td>
                <td className="py-4 px-4 text-fuchsia-400 font-bold">
                  0 ms (Local State)
                </td>
                <td className="py-4 px-4 text-emerald-400 font-semibold">0% Server CPU</td>
                <td className="py-4 px-4 text-fuchsia-300 font-semibold">In-Memory Browser State</td>
                <td className="py-4 px-4 text-amber-400 font-semibold">Client Hydration Dependent</td>
                <td className="py-4 px-4 text-slate-100 font-sans font-medium">
                  Interactive Cabin Seat Map Picker
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
