import PatternBadge from "@/components/PatternBadge";
import RevalidationTimer from "@/components/RevalidationTimer";
import Link from "next/link";
import { notFound } from "next/navigation";

// Next.js ISR Directive: Revalidate every 60 seconds
export const revalidate = 60;

// Dynamic route definition structure
interface FlightRouteData {
  slug: string;
  originCity: string;
  originCode: string;
  originAirport: string;
  destinationCity: string;
  destinationCode: string;
  destinationAirport: string;
  baseFareUSD: number;
  flightDuration: string;
  distanceKm: number;
  aircraft: string;
  dailyFrequencies: number;
  cabinClasses: string[];
  routeFlightId: string;
}

const routesDatabase: Record<string, FlightRouteData> = {
  "bogota-to-miami": {
    slug: "bogota-to-miami",
    originCity: "Bogotá",
    originCode: "BOG",
    originAirport: "El Dorado International Airport",
    destinationCity: "Miami",
    destinationCode: "MIA",
    destinationAirport: "Miami International Airport",
    baseFareUSD: 340,
    flightDuration: "3h 55m",
    distanceKm: 2430,
    aircraft: "Boeing 787-8 Dreamliner",
    dailyFrequencies: 4,
    cabinClasses: ["Economy", "Premium Economy", "Business Class"],
    routeFlightId: "AG-402",
  },
  "madrid-to-bogota": {
    slug: "madrid-to-bogota",
    originCity: "Madrid",
    originCode: "MAD",
    originAirport: "Adolfo Suárez Madrid-Barajas",
    destinationCity: "Bogotá",
    destinationCode: "BOG",
    destinationAirport: "El Dorado International Airport",
    baseFareUSD: 690,
    flightDuration: "10h 20m",
    distanceKm: 8025,
    aircraft: "Airbus A350-900 XWB",
    dailyFrequencies: 2,
    cabinClasses: ["Economy", "Business Class", "First Class"],
    routeFlightId: "AG-810",
  },
  "new-york-to-london": {
    slug: "new-york-to-london",
    originCity: "New York",
    originCode: "JFK",
    originAirport: "John F. Kennedy International",
    destinationCity: "London",
    destinationCode: "LHR",
    destinationAirport: "Heathrow Airport",
    baseFareUSD: 520,
    flightDuration: "6h 50m",
    distanceKm: 5560,
    aircraft: "Boeing 777-300ER",
    dailyFrequencies: 6,
    cabinClasses: ["Economy", "Premium", "Business", "First"],
    routeFlightId: "AG-101",
  },
  "tokyo-to-paris": {
    slug: "tokyo-to-paris",
    originCity: "Tokyo",
    originCode: "HND",
    originAirport: "Tokyo Haneda Airport",
    destinationCity: "Paris",
    destinationCode: "CDG",
    destinationAirport: "Charles de Gaulle Airport",
    baseFareUSD: 980,
    flightDuration: "13h 40m",
    distanceKm: 9710,
    aircraft: "Airbus A350-1000",
    dailyFrequencies: 2,
    cabinClasses: ["Economy", "Premium Economy", "Business"],
    routeFlightId: "AG-550",
  },
};

// Pre-render top routes at build time while letting others be generated on demand
export async function generateStaticParams() {
  return Object.keys(routesDatabase).map((slug) => ({
    slug,
  }));
}

export default async function FlightRoutePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Retrieve route from database or dynamically generate for arbitrary valid slugs
  let route = routesDatabase[slug];

  if (!route) {
    const parts = slug.split("-to-");
    if (parts.length === 2 && parts[0] && parts[1]) {
      const formatCity = (name: string) =>
        name
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

      route = {
        slug,
        originCity: formatCity(parts[0]),
        originCode: parts[0].slice(0, 3).toUpperCase(),
        originAirport: `${formatCity(parts[0])} Regional Airport`,
        destinationCity: formatCity(parts[1]),
        destinationCode: parts[1].slice(0, 3).toUpperCase(),
        destinationAirport: `${formatCity(parts[1])} International Airport`,
        baseFareUSD: 450,
        flightDuration: "5h 15m",
        distanceKm: 3200,
        aircraft: "Boeing 737 MAX 9",
        dailyFrequencies: 2,
        cabinClasses: ["Economy", "Business Class"],
        routeFlightId: "AG-990",
      };
    } else {
      notFound();
    }
  }

  // Exact timestamp captured during static generation / background revalidation
  const cacheTimestamp = new Date().toISOString();

  return (
    <div className="w-full py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Pattern Visual Badge */}
      <div className="space-y-4">
        <PatternBadge
          pattern="ISR"
          badgeText="Rendering Pattern: ISR (Incremental Static Regeneration - 60s window)"
        />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              AeroGlobal Dynamic Route Engine &amp; Global Inventory
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Route Details: {route.originCity} ({route.originCode}) →{" "}
              {route.destinationCity} ({route.destinationCode})
            </h1>
          </div>

          {/* ISR Cache Revalidation Timestamp Banner */}
          <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-4 font-mono text-xs shadow-lg shadow-amber-950/40">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">
              ISR CACHE REVALIDATION TIMESTAMP
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              <span className="text-amber-300 font-extrabold text-sm">
                {cacheTimestamp}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">
              Revalidation Window: 60 seconds (`export const revalidate = 60`)
            </span>
          </div>
        </div>
      </div>

      {/* Interactive 60-second Countdown & Revalidation Trigger Island */}
      <RevalidationTimer initialTimestamp={cacheTimestamp} revalidateSeconds={60} />

      {/* Flight Route Showcase Hero with Vibrant Gradients */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900/95 via-amber-950/20 to-slate-950 border-2 border-amber-500/40 p-8 sm:p-12 shadow-2xl shadow-slate-950/80">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Origin & Destination Flight Vector */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between gap-4 max-w-2xl">
              {/* Origin */}
              <div className="space-y-1">
                <span className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                  {route.originCode}
                </span>
                <span className="text-base font-bold text-slate-100 block">
                  {route.originCity}
                </span>
                <span className="text-xs text-slate-400 block font-mono truncate max-w-[180px]">
                  {route.originAirport}
                </span>
              </div>

              {/* Connecting Vector Flight Line */}
              <div className="flex-1 flex flex-col items-center px-4">
                <span className="text-xs font-mono font-bold text-amber-300 mb-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  {route.flightDuration} · Nonstop
                </span>
                <div className="w-full flex items-center gap-2">
                  <div className="h-1 flex-1 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300 rounded-full"></div>
                  <div className="p-2 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/40">
                    <svg
                      className="w-4 h-4 transform rotate-90"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                  <div className="h-1 flex-1 bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 rounded-full"></div>
                </div>
                <span className="text-[11px] font-mono text-slate-400 mt-1">
                  Aircraft: {route.aircraft}
                </span>
              </div>

              {/* Destination */}
              <div className="space-y-1 text-right">
                <span className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                  {route.destinationCode}
                </span>
                <span className="text-base font-bold text-slate-100 block">
                  {route.destinationCity}
                </span>
                <span className="text-xs text-slate-400 block font-mono truncate max-w-[180px]">
                  {route.destinationAirport}
                </span>
              </div>
            </div>

            {/* Flight Route Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-bold">
                  DISTANCE
                </span>
                <span className="text-white font-extrabold text-sm">
                  {route.distanceKm.toLocaleString()} km
                </span>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-bold">
                  DAILY FLIGHTS
                </span>
                <span className="text-white font-extrabold text-sm">
                  {route.dailyFrequencies} Daily
                </span>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-bold">
                  FLIGHT CODE
                </span>
                <span className="text-amber-400 font-extrabold text-sm">
                  {route.routeFlightId}
                </span>
              </div>
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] font-bold">
                  ON-TIME INDEX
                </span>
                <span className="text-emerald-400 font-extrabold text-sm">96.4%</span>
              </div>
            </div>
          </div>

          {/* Pricing & Real-Time Checkout Card with High-Impact CTA */}
          <div className="bg-slate-950/90 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xl shadow-amber-950/60">
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider block">
                Cached Base Fare (USD)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-6xl font-black text-white">
                  ${route.baseFareUSD}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  USD / one-way
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Excludes taxes &amp; live fuel surcharge. Calculated dynamically in
                SSR checkout.
              </p>
            </div>

            {/* Direct High-Energy Button to SSR Checkout */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <Link
                href={`/booking/checkout?flightId=${route.routeFlightId}&tier=economy`}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Book Now in Live SSR Checkout</span>
                <svg
                  className="w-5 h-5"
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
              <span className="text-[10px] text-slate-400 text-center block font-mono">
                Transitions from Cached ISR Catalog to On-Demand Live SSR
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Switcher to evaluate different ISR dynamic routes with lively cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white font-mono">
            EVALUATE OTHER PRE-RENDERED ISR ROUTES
          </h2>
          <span className="text-xs text-amber-300 font-mono font-bold">
            `generateStaticParams()` Target Slugs
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(routesDatabase).map((r) => {
            const isCurrent = r.slug === slug;
            return (
              <Link
                key={r.slug}
                href={`/routes/${r.slug}`}
                className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? "bg-gradient-to-r from-amber-950/60 to-orange-950/60 border-amber-400 shadow-xl shadow-amber-900/30 scale-102"
                    : "bg-slate-900/80 border-slate-800 hover:border-amber-500/60 hover:bg-slate-900 hover:scale-105 active:scale-95"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-amber-400 font-extrabold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                    {r.routeFlightId}
                  </span>
                  <span className="text-white font-black text-sm">${r.baseFareUSD} USD</span>
                </div>
                <div className="font-bold text-white text-base">
                  {r.originCity} → {r.destinationCity}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  {r.flightDuration} · {r.aircraft}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Navigation Footer with Spring Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-bold pt-4 border-t border-slate-800">
        <Link
          href="/policies/baggage"
          className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          ← Previous: Examine SSG Baggage Policies
        </Link>
        <Link
          href="/booking/checkout?flightId=AG-402&tier=economy"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-black shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <span>Next: Examine SSR Live Booking Checkout</span>
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
