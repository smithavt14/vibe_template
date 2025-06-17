import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vibe",
  description: "A modern web application built with Next.js, Supabase, and DaisyUI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="lofi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-base-100`}
        style={{ fontFamily: 'var(--font-geist-sans)', fontFeatureSettings: '"cv11", "ss01"' }}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
