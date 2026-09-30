"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  badge: string;
  badgeColor: string;
  badgeBorder: string;
  badgeBg: string;
  badgeGlow: string;
  description: string;
}

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    badge: "HUB",
    badgeColor: "text-cyan-300",
    badgeBorder: "border-cyan-500/40",
    badgeBg: "bg-cyan-950/60",
    badgeGlow: "shadow-cyan-500/20",
    description: "Architecture Overview",
  },
  {
    label: "Baggage Policies",
    href: "/policies/baggage",
    badge: "SSG",
    badgeColor: "text-emerald-300",
    badgeBorder: "border-emerald-500/50",
    badgeBg: "bg-emerald-950/70",
    badgeGlow: "shadow-emerald-500/30",
    description: "Static Site Generation",
  },
  {
    label: "Popular Routes",
    href: "/routes/bogota-to-miami",
    badge: "ISR",
    badgeColor: "text-amber-300",
    badgeBorder: "border-amber-500/50",
    badgeBg: "bg-amber-950/70",
    badgeGlow: "shadow-amber-500/30",
    description: "Incremental Static Regeneration",
  },
  {
    label: "Live Booking",
    href: "/booking/checkout?flightId=AG-402&tier=economy",
    badge: "SSR",
    badgeColor: "text-sky-300",
    badgeBorder: "border-sky-500/50",
    badgeBg: "bg-sky-950/70",
    badgeGlow: "shadow-sky-500/30",
    description: "Server-Side Rendering",
  },
  {
    label: "Seat Picker",
    href: "/interactive/seat-picker",
    badge: "CSR",
    badgeColor: "text-fuchsia-300",
    badgeBorder: "border-fuchsia-500/50",
    badgeBg: "bg-fuchsia-950/70",
    badgeGlow: "shadow-fuchsia-500/30",
    description: "Client-Side Rendering",
  },
];

export default function NavigationBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    const basePath = href.split("?")[0];
    if (basePath === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(basePath);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900/85 backdrop-blur-xl border-b border-sky-500/20 shadow-xl shadow-slate-950/50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 via-sky-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-400/50 transition-shadow">
              <div className="flex items-center justify-center w-full h-full bg-slate-950 rounded-[14px]">
                {/* Supersonic Plane Icon */}
                <svg
                  className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors transform -rotate-45"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  AeroGlobal
                </span>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-sm shadow-cyan-500/30 tracking-wider uppercase font-mono">
                  TravelTech
                </span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-mono hidden sm:inline-block">
                Web Rendering Architecture Suite
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-gradient-to-r from-sky-500/25 via-indigo-500/20 to-cyan-500/25 text-white border border-cyan-400/60 shadow-lg shadow-cyan-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/80 hover:border-slate-700/80 border border-transparent hover:scale-105 active:scale-95"
                  }`}
                  title={item.description}
                >
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-black uppercase border shadow-sm ${item.badgeBg} ${item.badgeColor} ${item.badgeBorder} ${item.badgeGlow}`}
                  >
                    {item.badge}
                  </span>
                  <span>{item.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Edge Pill */}
          <div className="flex items-center gap-3">
            <Link
              href="/interactive/seat-picker"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <svg
                className="w-4 h-4 text-cyan-200"
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
              <span>Seat Selector</span>
            </Link>

            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-emerald-500/40 text-slate-300 text-xs font-mono shadow-sm shadow-emerald-500/10">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <span className="text-[11px] text-slate-400">Edge:</span>
              <span className="text-[11px] font-bold text-emerald-400">
                ONLINE
              </span>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-slate-700 transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-sky-500/20 bg-slate-900/98 backdrop-blur-2xl px-4 pt-3 pb-5 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider px-2 pb-1 border-b border-slate-800">
            Navigation Routes &amp; Rendering Patterns
          </div>
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-gradient-to-r from-sky-500/25 to-indigo-500/25 text-white border border-cyan-400/60 font-bold"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-mono font-black uppercase border ${item.badgeBg} ${item.badgeColor} ${item.badgeBorder}`}
                  >
                    {item.badge}
                  </span>
                  <span>{item.label}</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {item.description}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
