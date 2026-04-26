import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio Palm Tree — 90s Ethiopia Series",
  description: "A cinematic journey through 1990s Ethiopia. Stream the groundbreaking series about love, legacy, and resilience.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
