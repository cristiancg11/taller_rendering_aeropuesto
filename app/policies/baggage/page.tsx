import PatternBadge from "@/components/PatternBadge";
import BaggageChecker from "@/components/BaggageChecker";
import Link from "next/link";

interface BaggageTier {
  category: string;
  name: string;
  tag: string;
  tagColor: string;
  dimensionsMetric: string;
  dimensionsImperial: string;
  weightLimit: string;
  placement: string;
  includedIn: string;
  notes: string;
  iconSvg: React.ReactNode;
}

const baggageRules: BaggageTier[] = [
  {
    category: "Cabin",
    name: "Personal Item",
    tag: "Complimentary on all fares",
    tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-sm shadow-emerald-500/20",
    dimensionsMetric: "40 x 30 x 15 cm",
    dimensionsImperial: "16 x 12 x 6 inches",
    weightLimit: "Up to 5 kg (11 lbs)",
    placement: "Must fit completely under the seat in front of you",
    includedIn: "Basic Economy, Standard Economy, Premium, Business",
    notes:
      "Includes laptop bags, small backpacks, duty-free purchases, and camera cases.",
    iconSvg: (
      <svg
        className="w-7 h-7 text-emerald-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
  },
  {
    category: "Cabin",
    name: "Standard Carry-On Bag",
    tag: "Overhead Storage",
    tagColor: "bg-teal-500/20 text-teal-300 border-teal-400/50 shadow-sm shadow-teal-500/20",
    dimensionsMetric: "55 x 40 x 20 cm",
    dimensionsImperial: "22 x 16 x 8 inches",
    weightLimit: "Max 10 kg (22 lbs)",
    placement: "Stowed inside overhead aircraft compartments",
    includedIn: "Standard Economy, Premium Economy, Business Class",
    notes:
      "Dimensions include wheels, handles, and side pockets. Subject to size sizer checks at departure gate.",
    iconSvg: (
      <svg
        className="w-7 h-7 text-teal-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
  {
    category: "Cargo Hold",
    name: "Standard Checked Baggage",
    tag: "Checked at Counter",
    tagColor: "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-sm shadow-cyan-500/20",
    dimensionsMetric: "Max 158 linear cm (L + W + H)",
    dimensionsImperial: "Max 62 linear inches",
    weightLimit: "23 kg (50 lbs) Economy / 32 kg (70 lbs) Business",
    placement: "Temperature-controlled aircraft cargo hold",
    includedIn: "1 piece in Standard, 2 pieces in Business & First",
    notes:
      "Baggage tags with automated RFID tracking are attached at airport check-in desks.",
    iconSvg: (
      <svg
        className="w-7 h-7 text-cyan-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
        />
      </svg>
    ),
  },
  {
    category: "Special",
    name: "Sports & Musical Equipment",
    tag: "Special Handling",
    tagColor: "bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-sm shadow-amber-500/20",
    dimensionsMetric: "Up to 220 linear cm",
    dimensionsImperial: "Up to 86 linear inches",
    weightLimit: "Max 32 kg (70 lbs)",
    placement: "Special out-of-gauge airline conveyor and hold",
    includedIn: "Substitute for 1 checked bag or flat $75 fee",
    notes:
      "Requires hard-shell protective cases. Fragile declaration tag signed at check-in counter.",
    iconSvg: (
      <svg
        className="w-7 h-7 text-amber-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
        />
      </svg>
    ),
  },
];

export default function BaggagePoliciesPage() {
  // Static timestamp determined at build-time during compilation (SSG)
  const generatedAt = new Date().toISOString();

  return (
    <div className="w-full py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Pattern Badge & Visual Identification */}
      <div className="space-y-4">
        <PatternBadge
          pattern="SSG"
          badgeText="Rendering Pattern: SSG (Static Site Generation)"
        />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              AeroGlobal Regulatory Compliance &amp; Passenger Rights
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Baggage Allowance &amp; Dimension Policies
            </h1>
          </div>

          {/* Build-time Timestamp Stamp with Luminous Glow */}
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-4 font-mono text-xs shadow-lg shadow-emerald-950/40">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">
              STATIC COMPILATION TIMESTAMP (SSG)
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-emerald-300 font-extrabold text-sm">{generatedAt}</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">
              Generated once at `next build`. Re-rendered 0 times per request.
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Baggage Sizer Tool */}
      <BaggageChecker />

      {/* Allowed Baggage Dimensions Cards */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Allowed Baggage Dimensions &amp; Tier Specifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Review size, weight thresholds, and stowage criteria across all cabin
            and hold baggage categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {baggageRules.map((tier) => (
            <div
              key={tier.name}
              className="rounded-3xl bg-slate-900/90 border border-slate-700/80 p-6 sm:p-8 space-y-5 hover:border-emerald-400/80 hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-slate-950/60 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
                      {tier.iconSvg}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                        Category: {tier.category}
                      </span>
                      <h3 className="text-xl font-black text-white">
                        {tier.name}
                      </h3>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${tier.tagColor}`}
                  >
                    {tier.tag}
                  </span>
                </div>

                {/* Dimensions Metric & Imperial Grid */}
                <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono font-bold">
                      METRIC DIMENSIONS
                    </span>
                    <span className="text-white font-mono font-black text-sm">
                      {tier.dimensionsMetric}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono font-bold">
                      IMPERIAL UNITS
                    </span>
                    <span className="text-teal-300 font-mono font-semibold">
                      {tier.dimensionsImperial}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono font-bold">
                      MAX WEIGHT LIMIT
                    </span>
                    <span className="text-emerald-400 font-mono font-extrabold">
                      {tier.weightLimit}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono font-bold">
                      AIRCRAFT LOCATION
                    </span>
                    <span className="text-slate-200 truncate block font-medium">
                      {tier.placement}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-slate-400 font-bold">Included In: </span>
                  <span className="text-slate-200">{tier.includedIn}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
                  {tier.notes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Static Generation Telemetry Box with Energetic Action Buttons */}
      <section className="rounded-3xl bg-slate-900/80 border border-slate-700/80 p-6 sm:p-8 space-y-6 shadow-2xl">
        <h3 className="text-base font-black text-white flex items-center gap-2 font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          STATIC ARTIFACT INSPECTION (RFC 7234 COMPLIANCE)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] font-bold">
              CACHE-CONTROL DIRECTIVE
            </span>
            <span className="text-emerald-400 font-bold block mt-1 text-sm">
              s-maxage=31536000, immutable
            </span>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Cached permanently on CDN PoPs.
            </span>
          </div>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] font-bold">
              DATABASE QUERIES (PER REQ)
            </span>
            <span className="text-emerald-400 font-bold block mt-1 text-sm">
              0 Queries / 0ms
            </span>
            <span className="text-[10px] text-slate-400 mt-1 block">
              HTML rendered ahead of time into disk.
            </span>
          </div>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] font-bold">
              SEARCH BOT ACCESSIBILITY
            </span>
            <span className="text-cyan-400 font-bold block mt-1 text-sm">
              100% Raw HTML
            </span>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Zero client JS execution required for crawl.
            </span>
          </div>
        </div>

        {/* Dynamic Buttons for Navigation */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-bold border-t border-slate-800">
          <Link
            href="/"
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            ← Back to Architecture Hub
          </Link>
          <Link
            href="/routes/bogota-to-miami"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black shadow-lg shadow-amber-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>Next: Examine ISR Route Pattern</span>
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
      </section>
    </div>
  );
}
