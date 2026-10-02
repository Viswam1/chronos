"use client";

import { useState } from "react";
import GlassCard from "@/components/shared/GlassCard";

const BLOCKS = [
  { name: "Dawn — Lectio", minutes: 30, detail: "Read something difficult. No screens." },
  { name: "Morning — Disputatio", minutes: 120, detail: "Argue with the problem." },
  { name: "Midday — Gymnasium", minutes: 45, detail: "Walk, exercise, let the mind idle." },
  { name: "Afternoon — Compositio", minutes: 120, detail: "Turn thinking into artefacts." },
  { name: "Evening — Examinatio", minutes: 20, detail: "Review in writing." },
];

export default function RoutineBuilder() {
  const [goal, setGoal] = useState("Finish the Chronos design system");
  const [done, setDone] = useState<Record<number, boolean>>({});

  return (
    <GlassCard className="mx-auto max-w-3xl">
      <p className="text-sm uppercase tracking-widest opacity-60">
        Greco-Roman routine
      </p>

      <label className="mt-4 block text-sm">
        Today&apos;s goal
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="mt-1 w-full rounded-lg bg-black/5 px-3 py-2 outline-none dark:bg-white/10"
        />
      </label>

      <ul className="mt-6 space-y-3">
        {BLOCKS.map((b, i) => (
          <li
            key={b.name}
            className="flex cursor-pointer items-start gap-3 rounded-xl bg-black/5 p-3 transition hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10"
            onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
          >
            <input type="checkbox" checked={!!done[i]} readOnly className="mt-1" />
            <div>
              <p className={`font-medium ${done[i] ? "line-through opacity-60" : ""}`}>
                {b.name} · {b.minutes} min
              </p>
              <p className="text-sm opacity-70">
                {b.detail}
                {b.name.includes("Disputatio") && (
                  <span className="italic"> — {goal}</span>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
