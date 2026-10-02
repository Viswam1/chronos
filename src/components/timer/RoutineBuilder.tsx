"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/shared/GlassCard";
import { Plus, Trash2, RotateCcw } from "lucide-react";

type Block = { name: string; minutes: number; detail: string };

const DEFAULT_BLOCKS: Block[] = [
  { name: "Dawn — Lectio", minutes: 30, detail: "Read something difficult. No screens." },
  { name: "Morning — Disputatio", minutes: 120, detail: "Argue with the problem." },
  { name: "Midday — Gymnasium", minutes: 45, detail: "Walk, exercise, let the mind idle." },
  { name: "Afternoon — Compositio", minutes: 120, detail: "Turn thinking into artefacts." },
  { name: "Evening — Examinatio", minutes: 20, detail: "Review in writing." },
];

const STORAGE_KEY = "chronos.greco-roman.blocks";
const GOAL_KEY = "chronos.greco-roman.goal";
const DEFAULT_GOAL = "Finish the Chronos design system";

export default function RoutineBuilder() {
  const [goal, setGoal] = useState(DEFAULT_GOAL);
  const [blocks, setBlocks] = useState<Block[]>(DEFAULT_BLOCKS);
  const [done, setDone] = useState<Record<number, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const g = localStorage.getItem(GOAL_KEY);
      if (g) setGoal(g);
      const b = localStorage.getItem(STORAGE_KEY);
      if (b) setBlocks(JSON.parse(b));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(GOAL_KEY, goal);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
    } catch {
      /* ignore */
    }
  }, [goal, blocks, loaded]);

  function update(i: number, patch: Partial<Block>) {
    setBlocks((b) =>
      b.map((blk, idx) => (idx === i ? { ...blk, ...patch } : blk)),
    );
  }

  function add() {
    setBlocks((b) => [
      ...b,
      { name: "New block", minutes: 30, detail: "What happens here?" },
    ]);
  }

  function remove(i: number) {
    setBlocks((b) => b.filter((_, idx) => idx !== i));
    setDone((d) => {
      const next: Record<number, boolean> = {};
      Object.entries(d).forEach(([k, v]) => {
        const n = Number(k);
        if (n < i) next[n] = v;
        else if (n > i) next[n - 1] = v;
      });
      return next;
    });
  }

  function reset() {
    setBlocks(DEFAULT_BLOCKS);
    setGoal(DEFAULT_GOAL);
    setDone({});
  }

  return (
    <GlassCard className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-widest opacity-60">
          Greco-Roman routine
        </p>
        <div className="flex gap-2">
          <button
            onClick={add}
            className="flex items-center gap-1 rounded-lg bg-black/5 px-3 py-1.5 text-xs font-medium transition hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
          >
            <Plus size={14} /> Add block
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1 rounded-lg bg-black/5 px-3 py-1.5 text-xs font-medium transition hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>

      <label className="mt-4 block text-sm">
        Today&apos;s goal
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="mt-1 w-full rounded-lg bg-black/5 px-3 py-2 outline-none focus:bg-white/50 dark:bg-white/10 dark:focus:bg-white/20"
        />
      </label>

      <ul className="mt-6 space-y-3">
        {blocks.map((b, i) => (
          <li
            key={i}
            className="rounded-xl bg-black/5 p-3 transition dark:bg-white/5"
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={!!done[i]}
                onChange={() =>
                  setDone((d) => ({ ...d, [i]: !d[i] }))
                }
                className="mt-1.5"
              />
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    value={b.name}
                    onChange={(e) => update(i, { name: e.target.value })}
                    className={`flex-1 rounded-lg bg-transparent px-2 py-1 font-medium outline-none focus:bg-white/50 dark:focus:bg-white/10 ${
                      done[i] ? "line-through opacity-60" : ""
                    }`}
                  />
                  <input
                    type="number"
                    min={1}
                    value={b.minutes}
                    onChange={(e) =>
                      update(i, { minutes: +e.target.value || 1 })
                    }
                    className="w-20 rounded-lg bg-transparent px-2 py-1 text-sm outline-none focus:bg-white/50 dark:focus:bg-white/10"
                  />
                  <span className="text-xs opacity-60">min</span>
                  <button
                    onClick={() => remove(i)}
                    aria-label="Remove block"
                    className="rounded-lg p-1.5 opacity-50 transition hover:bg-red-500/10 hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <input
                  value={b.detail}
                  onChange={(e) => update(i, { detail: e.target.value })}
                  placeholder="Detail…"
                  className={`w-full rounded-lg bg-transparent px-2 py-1 text-sm outline-none focus:bg-white/50 dark:focus:bg-white/10 ${
                    done[i] ? "opacity-60" : "opacity-80"
                  }`}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {blocks.length === 0 && (
        <p className="mt-4 text-center text-sm opacity-60">
          No blocks yet — add one above.
        </p>
      )}

      <p className="mt-4 text-xs opacity-50">
        Changes are saved locally in your browser.
      </p>
    </GlassCard>
  );
}
