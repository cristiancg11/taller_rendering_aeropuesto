import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AeroGlobal | Modern Web Rendering Architecture",
  description:
    "AeroGlobal TravelTech architectural case study analyzing SSG, ISR, SSR, and CSR web rendering patterns in Next.js App Router.",
  keywords: [
    "Next.js",
    "App Router",
    "SSG",
    "ISR",
    "SSR",
    "CSR",
    "Web Rendering Patterns",
    "TravelTech",
    "AeroGlobal",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-sky-500 selection:text-white`}
      >
        <NavigationBar />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
