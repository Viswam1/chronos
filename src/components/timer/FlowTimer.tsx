"use client";

import { useEffect, useRef, useState } from "react";
import GlassCard from "@/components/shared/GlassCard";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function FlowTimer() {
  const [intent, setIntent] = useState("Write the first draft");
  const [minutes, setMinutes] = useState(90);
  const [remaining, setRemaining] = useState(90 * 60);
  const [running, setRunning] = useState(false);
  const endRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      setRemaining(minutes * 60);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes]);

  useEffect(() => {
    if (!running) {
      endRef.current = null;
      return;
    }
    if (endRef.current === null) {
      endRef.current = Date.now() + remaining * 1000;
    }
    const id = setInterval(() => {
      const r = Math.max(
        0,
        Math.round((endRef.current! - Date.now()) / 1000),
      );
      setRemaining(r);
      if (r <= 0) setRunning(false);
    }, 250);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const total = minutes * 60;
  const pct = Math.min(100, Math.max(0, ((total - remaining) / total) * 100));
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <GlassCard className="mx-auto max-w-xl">
      <p className="text-sm uppercase tracking-widest opacity-60">
        Water clock · Flowing
      </p>
      <p className="mt-2 text-6xl font-bold tabular-nums">
        {mm}:{ss}
      </p>

      <div className="mt-5 flex h-40 items-end justify-center">
        <div className="relative h-40 w-24 overflow-hidden rounded-b-3xl rounded-t-lg border border-white/30">
          <div
            className="absolute bottom-0 left-0 right-0 transition-all duration-1000"
            style={{
              height: `${pct}%`,
              background: "linear-gradient(180deg,#1e6fbf,#7cc4ff)",
            }}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          Intent
          <input
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            className="mt-1 w-full rounded-lg bg-black/5 px-3 py-2 outline-none dark:bg-white/10"
          />
        </label>
        <label className="text-sm">
          Minutes
          <input
            type="number"
            min={5}
            value={minutes}
            onChange={(e) => setMinutes(+e.target.value || 5)}
            className="mt-1 w-full rounded-lg bg-black/5 px-3 py-2 outline-none dark:bg-white/10"
          />
        </label>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          className="flex items-center gap-2 rounded-xl bg-[#1e6fbf] px-5 py-2.5 font-medium text-white transition hover:brightness-110"
        >
          {running ? <Pause size={18} /> : <Play size={18} />}
          {running ? "Pause" : "Begin flow"}
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setRemaining(minutes * 60);
            endRef.current = null;
          }}
          className="flex items-center gap-2 rounded-xl bg-black/5 px-5 py-2.5 font-medium transition hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
        >
          <RotateCcw size={18} /> Reset
        </button>
      </div>
    </GlassCard>
  );
}
