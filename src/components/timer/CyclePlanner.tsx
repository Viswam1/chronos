"use client";

import { useMemo, useState } from "react";
import GlassCard from "@/components/shared/GlassCard";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function CyclePlanner() {
  const [start, setStart] = useState(todayISO());
  const [goal, setGoal] = useState("Ship the Chronos MVP");

  const info = useMemo(() => {
    const s = new Date(start);
    const now = new Date();
    const day = Math.floor((+now - +s) / 86400000) + 1;
    const dayOf42 = ((((day - 1) % 42) + 42) % 42) + 1;
    const week = Math.floor((dayOf42 - 1) / 7) + 1;
    return { day, dayOf42, week };
  }, [start]);

  const cells = Array.from({ length: 42 }, (_, i) => i + 1);

  return (
    <GlassCard className="mx-auto max-w-3xl">
      <p className="text-sm uppercase tracking-widest opacity-60">
        Asante Adaduanan · 42-day cycle
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          Cycle start
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="mt-1 w-full rounded-lg bg-black/5 px-3 py-2 outline-none dark:bg-white/10"
          />
        </label>
        <label className="text-sm">
          Cycle goal
          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="mt-1 w-full rounded-lg bg-black/5 px-3 py-2 outline-none dark:bg-white/10"
          />
        </label>
      </div>

      <p className="mt-6 text-sm opacity-80">
        Day <span className="font-semibold">{info.day}</span> of the cycle ·
        Week <span className="font-semibold">{info.week}</span> of 6 · Goal:{" "}
        <span className="font-medium">{goal}</span>
      </p>

      <div className="mt-4 grid grid-cols-7 gap-2">
        {cells.map((d) => {
          const isToday = d === info.dayOf42;
          const isPast = d < info.dayOf42;
          return (
            <div
              key={d}
              className={[
                "flex h-10 items-center justify-center rounded-lg text-xs font-medium transition",
                isToday
                  ? "bg-[#2a9d8f] text-white"
                  : isPast
                  ? "bg-black/5 opacity-60 dark:bg-white/10"
                  : "bg-black/5 dark:bg-white/10",
              ].join(" ")}
            >
              {d}
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
