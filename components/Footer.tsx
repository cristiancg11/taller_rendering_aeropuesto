import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900/90 border-t border-slate-800 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Academic Meta */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-tight">
                AeroGlobal TravelTech
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-sky-400">
                Case Study
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              Comprehensive reference implementation and empirical benchmarking
              platform comparing Web Rendering Architectures: Static Site
              Generation (SSG), Incremental Static Regeneration (ISR), Server-Side
              Rendering (SSR), and Client-Side Rendering (CSR) in Next.js App
              Router and React Server Components.
            </p>
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 text-[11px] font-mono text-slate-300">
              <span className="text-sky-400 font-semibold">Course: </span>
              Web-Oriented Programming (Programación Orientada a la Web) |
              Academic Workshop on Next-Gen Web Rendering Architectures
            </div>
          </div>

          {/* Architectural Patterns */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Rendering Patterns
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/policies/baggage"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>SSG: Baggage Policies</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/routes/bogota-to-miami"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>ISR: Popular Routes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/booking/checkout?flightId=AG-402&tier=economy"
                  className="hover:text-sky-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  <span>SSR: Live Checkout</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/interactive/seat-picker"
                  className="hover:text-purple-400 transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  <span>CSR: Interactive Cabin</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic References */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Technical Standards
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <span className="text-slate-500 font-mono">RFC 5861:</span>
                <span>HTTP Stale-While-Revalidate</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-slate-500 font-mono">RFC 7234:</span>
                <span>Hypertext Transfer Caching</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-slate-500 font-mono">RSC:</span>
                <span>React Server Components Spec</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-slate-500 font-mono">V8 Engine:</span>
                <span>Client-Side Hydration Loop</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400">
            © {new Date().getFullYear()} AeroGlobal TravelTech Systems Inc. Academic
            laboratory demonstration. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Next.js 16 (App Router)
            </span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>TypeScript Strict Mode</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
