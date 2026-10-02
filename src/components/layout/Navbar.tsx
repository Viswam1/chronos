"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hourglass } from "lucide-react";
import { TECHNIQUES } from "@/lib/techniques";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Hourglass size={20} />
          <span>Chronos</span>
        </Link>
        <nav className="hidden gap-1 md:flex">
          {TECHNIQUES.map((t) => (
            <Link
              key={t.slug}
              href={t.href}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm transition",
                pathname === t.href
                  ? "bg-black/5 dark:bg-white/10"
                  : "opacity-70 hover:opacity-100",
              )}
            >
              {t.name}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
