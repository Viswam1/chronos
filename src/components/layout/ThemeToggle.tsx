"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = theme === "system" ? resolvedTheme : theme;
  const next = current === "dark" ? "light" : "dark";

  return (
    <button
      onClick={() => setTheme(next)}
      aria-label="Toggle theme"
      className="glass rounded-full p-2 transition hover:scale-105"
    >
      {mounted && current === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
