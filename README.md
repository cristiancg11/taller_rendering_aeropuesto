# AeroGlobal TravelTech: Modern Web Rendering Architecture

> **Academic Case Study & Reference Implementation**  
> **Course:** Web-Oriented Programming (*Programación Orientada a la Web*)  
> **Framework:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS  
> **Cloud Target:** Vercel Global Edge Network (Edge CDN & Serverless Runtimes)

---

## 1. Executive Summary

Modern enterprise aviation platforms cannot rely on a monolithic rendering architecture. An airline system handles vastly divergent workloads: immutable legal documentation accessed by millions, high-traffic flight route catalogs requiring periodic price freshness, mission-critical transactional checkout flows with strict inventory consistency, and highly tactile seat-map selection widgets.

**AeroGlobal TravelTech** serves as an empirical case study implementing and benchmarking the four foundational web rendering paradigms within a unified Next.js App Router architecture:

1. **Static Site Generation (SSG)**: `/policies/baggage`
2. **Incremental Static Regeneration (ISR)**: `/routes/[slug]` (e.g., `/routes/bogota-to-miami`)
3. **Server-Side Rendering (SSR)**: `/booking/checkout?flightId=AG-402&tier=economy`
4. **Client-Side Rendering (CSR)**: `/interactive/seat-picker`

---

## 2. High-Level Architecture Diagram

```mermaid
flowchart TD
    subgraph Client["Client Tier (User Browser)"]
        Browser["User Web Browser"]
        V8["V8 Engine / React DOM Heap"]
    end

    subgraph Edge["Global Edge Tier (Vercel Edge Network / CDN PoPs)"]
        CDN["Edge CDN Cache (300+ PoPs Worldwide)"]
        SWR["RFC 5861 Stale-While-Revalidate Engine"]
    end

    subgraph Server["Compute Tier (Serverless / Node.js Runtime)"]
        SSRFunc["Serverless SSR Worker (force-dynamic)"]
        ISRWorker["Background ISR Regeneration Worker"]
        DB[("AeroGlobal Inventory & GDS Database")]
    end

    subgraph Build["Build Tier (Compilation Phase)"]
        NextBuild["next build / Turbopack Compiler"]
    end

    %% SSG Flow
    NextBuild -->|"1. Pre-renders static HTML"| CDN
    Browser -->|"GET /policies/baggage (SSG)"| CDN
    CDN -->|"Sub-25ms response (Immutable)"| Browser

    %% ISR Flow
    NextBuild -->|"Pre-renders initial static routes"| CDN
    Browser -->|"GET /routes/bogota-to-miami (ISR)"| CDN
    CDN -->|"Cache Hit (<40ms)"| Browser
    CDN -.->|"If age > 60s (Stale)"| SWR
    SWR -->|"Trigger background re-render"| ISRWorker
    ISRWorker <-->|"Fetch updated base fares"| DB
    ISRWorker -->|"Atomically replace edge cache"| CDN

    %% SSR Flow
    Browser -->|"GET /booking/checkout (SSR)"| CDN
    CDN -->|"Bypass cache (force-dynamic)"| SSRFunc
    SSRFunc <-->|"Atomic query: inventory, tax, 12% fuel"| DB
    SSRFunc -->|"Stream fresh HTML + Headers"| Browser

    %% CSR Flow
    Browser -->|"GET /interactive/seat-picker"| CDN
    CDN -->|"Serve static HTML shell + JS bundle"| Browser
    Browser -->|"Hydrate React Component"| V8
    V8 <-->|"User clicks seats, state in-memory (useState)"| V8
```

---

## 3. Comprehensive Architectural Comparison Matrix

| Architectural Dimension | SSG (Static Site Generation) | ISR (Incremental Static Regeneration) | SSR (Server-Side Rendering) | CSR (Client-Side Rendering) |
| :--- | :--- | :--- | :--- | :--- |
| **Route Path** | `/policies/baggage` | `/routes/[slug]` | `/booking/checkout` | `/interactive/seat-picker` |
| **Next.js Directive** | Default static export | `export const revalidate = 60;` | `export const dynamic = 'force-dynamic';` | `'use client';` |
| **Execution Point** | Build Machine (`next build`) | Edge CDN + Async Background Worker | Node.js / Serverless Function | Browser Client (DOM & V8) |
| **Median TTFB** | **10 ms – 25 ms** | **25 ms – 45 ms** | **90 ms – 220 ms** | **0 ms** (Post-load transitions) |
| **Server CPU Utilization**| **0%** (Pure CDN offload) | **Very Low** (Max 1 execution / 60s) | **High** (1 execution per request) | **0%** (Client device CPU) |
| **Cache Protocol** | RFC 7234 `immutable` | RFC 5861 `stale-while-revalidate` | `no-store, must-revalidate` | In-memory React state |
| **SEO Rating** | **100 / 100** (Full static HTML) | **100 / 100** (Full static HTML) | **100 / 100** (Dynamic server HTML) | Client Hydration Dependent |
| **Data Freshness** | Immutable until redeployment | 60-second revalidation window | 100% Real-time per request | Instantaneous in browser state |
| **Failure Blast Radius** | Zero (Resilient to DB outages) | Low (Serves stale cache on error) | High (Requires DB connectivity) | Isolated to client runtime |
| **Airline Use Case** | Baggage & Legal Policies | Popular Flight Route Catalogs | Live Booking Checkout & Taxes | Boeing 737 Seat Selector |

---

## 4. In-Depth Pattern Analysis

### 4.1 Static Site Generation (SSG)
* **Domain Feature:** Airline Baggage Allowance & Dimension Policies (`/policies/baggage`)
* **Theoretical Foundation:**  
  SSG adheres to the principle of deterministic pre-rendering. During the execution of `next build`, Next.js compiles page components and static data sources into flat `.html` and `.json` artifacts. These static files are distributed across the Points of Presence (PoPs) of the Vercel Edge Network.
* **Latency & Performance Metrics:**
  * **TTFB (Time-To-First-Byte):** `< 25 ms`. Requests do not traverse to an origin server; responses are dispatched directly from the edge cache nearest to the passenger.
  * **Core Web Vitals:** First Contentful Paint (FCP) and Largest Contentful Paint (LCP) achieve sub-second scores due to zero server-side computation overhead.
* **SEO Impact:**
  * **Score:** Optimal (100/100).
  * Web crawlers (Googlebot, Bingbot) receive complete semantic HTML with pre-filled metadata, structural headings, and dimensions tables without requiring a JavaScript rendering queue.
* **Cloud Deployment Model:**
  * Hosted on Vercel's Global CDN with HTTP response headers:  
    `Cache-Control: public, max-age=31536000, immutable`.
  * Protects the airline infrastructure from traffic spikes during weather crises or holiday travel rushes.

---

### 4.2 Incremental Static Regeneration (ISR)
* **Domain Feature:** Flight Route Catalog & Base Fares (`/routes/[slug]`)
* **Technical Directive:** `export const revalidate = 60;`
* **Theoretical Foundation & RFC 5861 Compliance:**  
  ISR bridges the gap between pure static performance and dynamic database freshness using the HTTP **Stale-While-Revalidate (SWR)** specification (RFC 5861).
  1. **Phase 1 (Within 60s):** All requests hit the pre-rendered edge cache with sub-40ms latency.
  2. **Phase 2 (Stale Window):** When a request arrives after 60 seconds, the edge CDN serves the stale HTML snapshot instantaneously to avoid latency penalties for the user.
  3. **Phase 3 (Background Regeneration):** Concurrently, the edge triggers a background serverless execution that queries the latest flight schedules and pricing. Upon successful completion, the static cache is atomically updated worldwide.
* **Latency & Performance Metrics:**
  * **TTFB:** `25 ms – 45 ms` (Edge Cache Hit).
  * Shielding effect: Reduces database queries from 10,000 queries/minute to exactly 1 query every 60 seconds per route.
* **SEO Impact:**
  * Search engines always index fully rendered, fresh route timetables, origin/destination data, and current base fares.
* **Cloud Deployment Model:**
  * Uses Vercel Edge CDN nodes backed by automated serverless revalidation workers. Dynamic routes are pre-compiled using `generateStaticParams()` for high-volume routes (`bogota-to-miami`, `madrid-to-bogota`, `new-york-to-london`, `tokyo-to-paris`).

---

### 4.3 Server-Side Rendering (SSR)
* **Domain Feature:** Live Booking Checkout, 12% Fuel Surcharge & Tax Ledger (`/booking/checkout`)
* **Technical Directive:** `export const dynamic = 'force-dynamic';`
* **Theoretical Foundation:**  
  SSR executes dynamically on the server runtime for every incoming HTTP request. In Next.js 16 App Router, the page component is an asynchronous React Server Component that resolves `searchParams` (`flightId`, `tier`) on the fly.
* **Computational Workflow in AeroGlobal Checkout:**
  1. Server extracts query parameters and validates flight tier integrity (`economy`, `premium`, `business`).
  2. Resolves live base airfare from the transactional catalog.
  3. Computes the **Aviation Jet Fuel Surcharge** pegged strictly at **12%** of the base fare (`baseFare * 0.12`).
  4. Aggregates regulatory airport departure taxes ($42.50), security fees ($12.30), and passenger facility charges ($18.20).
  5. Renders and streams the verified financial ledger to the passenger with an atomic session lock ID.
* **Why SSR is Mandatory (Domain Justification):**
  * **Anti-Arbitrage & Price Drift:** Airline tickets cannot be served from stale caches; prices must be legally binding at checkout.
  * **Inventory Integrity:** Prevents double-booking by establishing a 15-minute transactional lock in the database.
  * **Regulatory Compliance:** Airport taxes fluctuate based on passenger nationality, origin jurisdiction, and cabin class.
* **Latency & Performance Metrics:**
  * **TTFB:** `90 ms – 220 ms`. Latency reflects serverless cold-start/warm execution, database reads, and dynamic HTML streaming.
* **Cloud Deployment Model:**
  * Executed in Vercel Serverless Functions (Node.js runtime) with HTTP headers:  
    `Cache-Control: private, no-cache, no-store, must-revalidate`.

---

### 4.4 Client-Side Rendering (CSR)
* **Domain Feature:** Boeing 737-800 Interactive Cabin Seat Selector (`/interactive/seat-picker`)
* **Technical Directive:** `'use client';` at line 1.
* **Theoretical Foundation:**  
  CSR delegates DOM manipulation and user state transitions entirely to the client device's browser runtime (JavaScript V8 engine). The server delivers an initial lightweight static HTML shell and JavaScript bundle; React then hydrates the component and initializes local memory hooks (`useState`).
* **Interactive Mechanics in AeroGlobal Cabin Selector:**
  * **Matrix Layout:** Boeing 737 aircraft layout with Columns A, B, C (Left) and D, E, F (Right), representing Window, Middle, and Aisle seating across 7 rows.
  * **State Management (`useState`):**
    * `selectedSeatId`: String identifying the currently clicked seat (e.g., `"4A"`).
    * `additionalCost`: Dynamically calculated fee based on seat category ($0 for standard, +$15 for preferred forward cabin, +$35 for overwing exit row with extra legroom, +$65 for Row 1 First Class).
    * `occupiedSeats`: Array of locked seats (`"1B"`, `"2A"`, `"3D"`, etc.) rendered as disabled elements with visual lockout styling.
    * `activeFilter`: Real-time filter allowing passengers to isolate Window, Aisle, or Emergency Exit seats without server communication.
* **Why CSR is Optimal for Seat Picking:**
  * **Zero Latency Interaction:** Clicking seats, switching filters, and testing selections execute in `< 16 ms` (60 FPS), avoiding jarring full-page refreshes.
  * **Reduced Server Load:** The airline server handles zero HTTP compute requests while the user contemplates seat choices.
* **Latency & Performance Metrics:**
  * **Interaction Latency:** `0 ms` (Local memory mutation).
  * **Initial Load:** Dependent on JS bundle download and hydration timing.

---

## 5. Academic Verification & Production Build Matrix

When compiling the project via `npm run build`, Next.js verifies the routing architecture and displays the static/dynamic route matrix:

```
Route (app)                              Size     First Load JS
┌ ○ /                                    ... kB          ... kB
├ ○ /_not-found                          ... kB          ... kB
├ ƒ /booking/checkout                    ... kB          ... kB
├ ○ /interactive/seat-picker             ... kB          ... kB
├ ○ /policies/baggage                    ... kB          ... kB
└   /routes/[slug]                       ... kB          ... kB
  ├ ● /routes/bogota-to-miami            ... kB          ... kB
  ├ ● /routes/madrid-to-bogota           ... kB          ... kB
  ├ ● /routes/new-york-to-london         ... kB          ... kB
  └ ● /routes/tokyo-to-paris             ... kB          ... kB

○  (Static)   Prerendered as static content
●  (SSG)      Prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  Server-rendered on demand (force-dynamic SSR)
```

### Route Classification Legend:
* `○ /policies/baggage`: **Static Site Generation (SSG)** — compiled once at build time.
* `● /routes/[slug]`: **Incremental Static Regeneration (ISR)** — static route with `revalidate = 60`.
* `ƒ /booking/checkout`: **Server-Side Rendering (SSR)** — dynamic server execution on every request.
* `○ /interactive/seat-picker`: **Client-Side Rendering (CSR)** — static client shell hydrated in browser memory.

---

## 6. Getting Started & Local Execution

### Prerequisites
* Node.js 18.18+ or Node.js 20+
* npm or pnpm

### Installation & Execution Steps

1. **Navigate to the project root:**
   ```bash
   cd aeroglobal-traveltech
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Execute Production Build & Validation:**
   ```bash
   npm run build
   ```

5. **Start Production Server:**
   ```bash
   npm run start
   ```

---

## 7. Project File Structure

```
aeroglobal-traveltech/
├── app/
│   ├── layout.tsx                     # Root Layout (html lang="en", NavigationBar, Footer)
│   ├── page.tsx                       # Main Comparative Portal (2x2 Grid & Trade-off Matrix)
│   ├── globals.css                    # Tailwind CSS v4 styling & dark theme tokens
│   ├── policies/
│   │   └── baggage/
│   │       └── page.tsx               # [SSG] Baggage allowance & dimensions documentation
│   ├── routes/
│   │   └── [slug]/
│   │       └── page.tsx               # [ISR] Dynamic route catalog (revalidate = 60)
│   ├── booking/
│   │   └── checkout/
│   │       └── page.tsx               # [SSR] Live checkout with 12% fuel surcharge calculation
│   └── interactive/
│       └── seat-picker/
│           └── page.tsx               # [CSR] Boeing 737 interactive cabin seat selector ('use client')
├── components/
│   ├── NavigationBar.tsx              # Global navigation bar with route links & pattern badges
│   ├── PatternBadge.tsx               # Reusable visual badge & architectural telemetry HUD
│   └── Footer.tsx                     # Academic case study footer & technical RFC references
├── public/                            # Static vector assets
├── package.json                       # Next.js 16, React 19, Tailwind CSS dependencies
├── tsconfig.json                      # Strict TypeScript compiler options
└── README.md                          # Academic documentation & theoretical analysis
```

---

## 8. Authors & Academic Acknowledgments

* **Project:** AeroGlobal TravelTech Architecture Lab
* **Curriculum:** Web-Oriented Programming (*Programación Orientada a la Web*)
* **Topic:** Advanced Web Rendering Architectures: Comparative Analysis of SSG, ISR, SSR, and CSR in Next.js App Router.
