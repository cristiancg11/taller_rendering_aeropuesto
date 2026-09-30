import PatternBadge from "@/components/PatternBadge";
import CurrencyConverter from "@/components/CurrencyConverter";
import Link from "next/link";

// Next.js App Router Directive: Force live execution on every HTTP request
export const dynamic = "force-dynamic";

interface TierConfig {
  name: string;
  code: string;
  baseFare: number;
  cabin: string;
  features: string[];
}

const tierPricing: Record<string, TierConfig> = {
  economy: {
    name: "Main Cabin Economy",
    code: "economy",
    baseFare: 340,
    cabin: "Standard Seating, 1 Personal Item included",
    features: [
      "Standard pitch (31 inches)",
      "Complimentary beverage service",
      "Standard boarding group (Group 4)",
      "Seat selection available during CSR check-in",
    ],
  },
  premium: {
    name: "Premium Economy Comfort+",
    code: "premium",
    baseFare: 580,
    cabin: "Extra legroom, Priority boarding, Checked bag included",
    features: [
      "Expanded legroom (35 inches)",
      "Dedicated overhead bin reserve",
      "Priority check-in & Group 2 boarding",
      "Complimentary hot meal & alcoholic beverages",
      "1 Complimentary checked bag up to 23 kg",
    ],
  },
  business: {
    name: "AeroGlobal Flagship Business",
    code: "business",
    baseFare: 1150,
    cabin: "Lie-flat suite, Lounge access, Gourmet dining",
    features: [
      "180° Fully Lie-flat sleeper suite",
      "Direct aisle access for all passengers",
      "AeroGlobal VIP Lounge access globally",
      "2 Complimentary checked bags up to 32 kg each",
      "Priority Group 1 boarding & express baggage release",
    ],
  },
};

const flightCatalog: Record<
  string,
  {
    flightNumber: string;
    route: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    aircraft: string;
  }
> = {
  "AG-402": {
    flightNumber: "AG-402",
    route: "Bogotá (BOG) → Miami (MIA)",
    origin: "BOG - El Dorado Terminal 1",
    destination: "MIA - North Terminal D",
    departureTime: "08:30 AM COT",
    arrivalTime: "01:25 PM EST",
    aircraft: "Boeing 787-8 Dreamliner",
  },
  "AG-810": {
    flightNumber: "AG-810",
    route: "Madrid (MAD) → Bogotá (BOG)",
    origin: "MAD - Barajas Terminal 4S",
    destination: "BOG - El Dorado Terminal 1",
    departureTime: "12:15 PM CET",
    arrivalTime: "04:35 PM COT",
    aircraft: "Airbus A350-900 XWB",
  },
  "AG-101": {
    flightNumber: "AG-101",
    route: "New York (JFK) → London (LHR)",
    origin: "JFK - Terminal 7",
    destination: "LHR - Terminal 3",
    departureTime: "07:45 PM EST",
    arrivalTime: "07:35 AM GMT (+1)",
    aircraft: "Boeing 777-300ER",
  },
};

export default async function LiveCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await searchParams in accordance with Next.js 15/16 async signature
  const resolvedParams = await searchParams;

  const rawFlightId = resolvedParams.flightId;
  const rawTier = resolvedParams.tier;

  const flightId =
    typeof rawFlightId === "string" ? rawFlightId.toUpperCase() : "AG-402";
  const tierKey =
    typeof rawTier === "string" ? rawTier.toLowerCase() : "economy";

  const selectedTier = tierPricing[tierKey] || tierPricing.economy;
  const selectedFlight = flightCatalog[flightId] || flightCatalog["AG-402"];

  // Exact server execution timestamp generated on this specific HTTP request (SSR)
  const serverTimestamp = new Date().toISOString();
  const serverSessionId = `TXN-${flightId}-${tierKey.toUpperCase()}-VERIFIED`;

  // Real-Time Server-Side Fare Calculations:
  // 1. Base fare from chosen tier
  const baseFare = selectedTier.baseFare;

  // 2. Fuel surcharge calculated strictly at 12% of the base fare
  const fuelSurchargePercentage = 0.12;
  const fuelSurcharge = parseFloat(
    (baseFare * fuelSurchargePercentage).toFixed(2)
  );

  // 3. Airport departure, safety, and international regulatory taxes
  const internationalDepartureTax = 42.5;
  const aviationSecurityFee = 12.3;
  const airportFacilityCharge = 18.2;
  const totalAirportTaxes = parseFloat(
    (
      internationalDepartureTax +
      aviationSecurityFee +
      airportFacilityCharge
    ).toFixed(2)
  );

  // 4. Final total calculated server-side
  const grandTotal = parseFloat(
    (baseFare + fuelSurcharge + totalAirportTaxes).toFixed(2)
  );

  return (
    <div className="w-full py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Pattern Visual Identification Badge */}
      <div className="space-y-4">
        <PatternBadge
          pattern="SSR"
          badgeText="Rendering Pattern: SSR (Server-Side Rendering - Live Execution)"
        />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              AeroGlobal Transaction Engine &amp; Fare Calculation Service
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Live Booking Checkout &amp; Fare Computation
            </h1>
          </div>

          {/* Exact Server-Side Timestamp Stamp */}
          <div className="bg-slate-900/90 border-2 border-cyan-500/40 rounded-2xl p-4 font-mono text-xs shadow-lg shadow-cyan-950/40">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">
              LIVE SERVER EXECUTION TIMESTAMP (SSR)
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-cyan-300 font-extrabold text-sm">
                {serverTimestamp}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-1">
              Evaluated on-demand via `export const dynamic = &apos;force-dynamic&apos;`
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Tier Switcher (Dispatches fresh SSR HTTP request with updated query params) */}
      <section className="bg-slate-900/90 border-2 border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl shadow-slate-950/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                DYNAMIC SERVER QUERY PARAMETERS
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Select a tier below to dispatch a fresh HTTP request and observe
              the server recalculating the live 12% fuel surcharge and totals.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-300 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-cyan-500/30">
            Active Query:{" "}
            <span className="text-cyan-300 font-extrabold">
              ?flightId={flightId}&amp;tier={selectedTier.code}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.values(tierPricing).map((t) => {
            const isSelected = t.code === selectedTier.code;
            return (
              <Link
                key={t.code}
                href={`/booking/checkout?flightId=${flightId}&tier=${t.code}`}
                className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-950/70 via-blue-950/60 to-indigo-950/70 border-cyan-400 shadow-xl shadow-cyan-500/20 scale-102 text-white"
                    : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-900 hover:scale-105 active:scale-95"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-black text-cyan-300">
                    {t.name}
                  </span>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black uppercase">
                      ACTIVE
                    </span>
                  )}
                </div>
                <div className="text-2xl font-black text-white mt-2">
                  ${t.baseFare} USD
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">
                  Base fare before 12% surcharge &amp; fees
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Main Checkout Grid: Flight Summary & Server Calculation Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Flight Itinerary Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-3xl bg-slate-900/90 border border-slate-700/80 p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                  FLIGHT RESERVATION
                </span>
                <span className="text-xl font-black text-white font-mono">
                  {selectedFlight.flightNumber}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 text-xs font-mono font-black">
                CONFIRMED
              </span>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-slate-400 text-[10px] font-bold">ROUTE</span>
                <div className="text-slate-100 font-extrabold text-sm">
                  {selectedFlight.route}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="text-slate-400 text-[10px] font-bold">DEPARTURE</span>
                  <div className="text-white font-bold">
                    {selectedFlight.departureTime}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {selectedFlight.origin}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] font-bold">ARRIVAL</span>
                  <div className="text-white font-bold">
                    {selectedFlight.arrivalTime}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {selectedFlight.destination}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 text-[10px] font-bold">AIRCRAFT</span>
                <div className="text-slate-200 font-semibold">{selectedFlight.aircraft}</div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 text-[10px] font-bold">SELECTED TIER</span>
                <div className="text-cyan-300 font-black text-sm">
                  {selectedTier.name}
                </div>
                <div className="text-[11px] text-slate-300 mt-1 font-sans">
                  {selectedTier.cabin}
                </div>
              </div>
            </div>

            {/* Tier Inclusions Checklist */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-mono text-slate-300 font-bold uppercase tracking-wider block">
                Tier Inclusions:
              </span>
              <ul className="space-y-2 text-xs text-slate-200">
                {selectedTier.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0"
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
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Currency Converter Island */}
          <CurrencyConverter baseTotalUSD={grandTotal} />

          {/* Proceed to CSR Seat Picker Callout with Vibrant Violet Button */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-fuchsia-950/60 via-purple-950/50 to-slate-900 border-2 border-fuchsia-500/40 space-y-3 shadow-xl shadow-fuchsia-950/40">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 animate-ping"></span>
              <span className="text-xs font-mono font-black text-fuchsia-300 uppercase">
                Step 2: Interactive Cabin Seat Picker
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Need to pick your Boeing 737 seat layout? Transition to our
              Client-Side Rendered (CSR) seat map.
            </p>
            <Link
              href="/interactive/seat-picker"
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-pink-500 hover:from-fuchsia-400 text-white font-black text-xs shadow-lg shadow-fuchsia-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Launch CSR Cabin Seat Selector →</span>
            </Link>
          </div>
        </div>

        {/* Real-Time Server Fare Breakdown Ledger */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-slate-900/90 border-2 border-slate-700/80 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  REAL-TIME SERVER EXECUTION LEDGER
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Itemized Fare Calculation
                </h3>
              </div>
              <div className="text-right font-mono text-xs">
                <span className="text-slate-400 block text-[10px] font-bold">
                  SESSION ID
                </span>
                <span className="text-cyan-300 font-extrabold">{serverSessionId}</span>
              </div>
            </div>

            {/* Calculations Breakdown Table */}
            <div className="space-y-4 font-mono text-xs sm:text-sm">
              {/* Row 1: Base Fare */}
              <div className="flex items-center justify-between py-2 border-b border-slate-800">
                <div>
                  <span className="text-white font-bold block text-sm">
                    Base Flight Fare ({selectedTier.name})
                  </span>
                  <span className="text-slate-400 text-xs font-sans">
                    Core airfare for {selectedFlight.flightNumber} based on active inventory bucket
                  </span>
                </div>
                <div className="text-white font-black text-right text-base sm:text-lg">
                  ${baseFare.toFixed(2)}
                </div>
              </div>

              {/* Row 2: Fuel Surcharge (12%) with Luminous Highlight */}
              <div className="flex items-center justify-between py-3 border-2 border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 to-blue-950/30 px-4 rounded-2xl shadow-inner">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-300 font-black block">
                      Aviation Jet Fuel Surcharge (12.0%)
                    </span>
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/40 font-bold">
                      Exact 12% Calculation
                    </span>
                  </div>
                  <span className="text-slate-300 text-xs font-sans mt-0.5 block">
                    Formula: ${baseFare.toFixed(2)} × 0.12 (Jet-A1 Gulf Coast index peg)
                  </span>
                </div>
                <div className="text-cyan-300 font-black text-right text-base sm:text-lg">
                  +${fuelSurcharge.toFixed(2)}
                </div>
              </div>

              {/* Row 3: Airport Taxes and Regulatory Fees */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                  <span>• International Departure Tax (AENA/Civil Aviation)</span>
                  <span>+${internationalDepartureTax.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                  <span>• Aviation Security &amp; Screening Fee (TSA/ICAO)</span>
                  <span>+${aviationSecurityFee.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
                  <span>• Airport Passenger Facility Charge (PFC)</span>
                  <span>+${airportFacilityCharge.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 font-bold text-slate-200">
                  <span>Subtotal Airport Taxes &amp; Fees</span>
                  <span className="text-amber-400">
                    +${totalAirportTaxes.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Grand Total with High-Impact Display */}
              <div className="pt-6 border-t-2 border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-mono text-slate-400 tracking-wider block font-bold">
                    TOTAL PAYABLE AMOUNT (USD)
                  </span>
                  <span className="text-xs text-emerald-400 font-sans font-medium">
                    Includes all government taxes, live 12% fuel surcharge, and tier airfare.
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-3xl sm:text-5xl font-black text-white">
                    ${grandTotal.toFixed(2)}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Locked for 15 minutes
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 hover:from-cyan-300 hover:to-indigo-500 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all text-center cursor-pointer"
              >
                Confirm Ticket &amp; Issue Boarding Pass
              </button>
              <Link
                href="/interactive/seat-picker"
                className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-fuchsia-300 border-2 border-fuchsia-500/40 text-sm font-bold transition-all hover:scale-105 active:scale-95 text-center cursor-pointer"
              >
                Pick Aircraft Seat (CSR) →
              </Link>
            </div>
          </div>

          {/* Academic Justification Card */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 space-y-3 shadow-lg">
            <h4 className="text-sm font-black text-white font-mono flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              THEORETICAL JUSTIFICATION: WHY CHECKOUT MANDATES SSR
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Serving checkout pages with static caching (SSG or ISR) creates
              severe vulnerabilities in airline systems: stale inventory holds
              can allow double-booking of the same physical seat, and cached
              currency conversions or fuel surcharges cause pricing drift. Server-Side
              Rendering guarantees that every single request queries the
              authoritative transaction database, binds user session tokens, and
              enforces real-time consistency.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-bold pt-4 border-t border-slate-800">
        <Link
          href="/routes/bogota-to-miami"
          className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          ← Previous: Examine ISR Flight Route
        </Link>
        <Link
          href="/interactive/seat-picker"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-600 to-pink-500 hover:from-fuchsia-400 hover:to-purple-500 text-white font-black shadow-lg shadow-fuchsia-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <span>Next: Examine CSR Seat Picker</span>
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
