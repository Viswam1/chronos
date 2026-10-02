import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import AnimatedBackground from "@/components/shared/AnimatedBackground";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Chronos — Time mastery through the ages",
  description:
    "A modern time-management app blending five historical techniques into one interface.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={geist.variable}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AnimatedBackground />
          <Navbar />
          <main className="relative z-10 mx-auto max-w-6xl px-6 pt-24 pb-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
