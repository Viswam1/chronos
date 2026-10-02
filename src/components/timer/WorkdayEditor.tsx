"use client";

import { useEffect, useState } from "react";
import GlassCard from "@/components/shared/GlassCard";
import { Plus, Trash2, RotateCcw } from "lucide-react";

type Segment = { time: string; activity: string };

const DEFAULT_SEGMENTS: Segment[] = [
  { time: "05:00", activity: "Morning review & planning" },
  { time: "07:00", activity: "Primary deep work block" },
  { time: "11:00", activity: "Midday meal & rest" },
  { time: "13:00", activity: "Secondary work block" },
  { time: "16:00", activity: "Correspondence & reporting" },
  { time: "17:00", activity: "Day closes — reflect and rest" },
];

const STORAGE_KEY = "chronos.qin-han.segments";

export default function WorkdayEditor() {
  const [segments, setSegments] = useState<Segment[]>(DEFAULT_SEGMENTS);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSegments(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(segments));
    } catch {
      /* ignore */
    }
  }, [segments, loaded]);

  function update(i: number, patch: Partial<Segment>) {
    setSegments((s) =>
      s.map((seg, idx) => (idx === i ? { ...seg, ...patch } : seg)),
    );
  }

  function add() {
    setSegments((s) => [...s, { time: "12:00", activity: "New block" }]);
  }

  function remove(i: number) {
    setSegments((s) => s.filter((_, idx) => idx !== i));
  }

  function reset() {
    setSegments(DEFAULT_SEGMENTS);
  }

  return (
    <GlassCard className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-widest opacity-60">
          Editable schedule
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

      <ul className="mt-4 space-y-2">
        {segments.map((seg, i) => (
          <li
            key={i}
            className="flex items-center gap-3 rounded-xl bg-black/5 p-2 dark:bg-white/5"
          >
            <input
              type="time"
              value={seg.time}
              onChange={(e) => update(i, { time: e.target.value })}
              className="rounded-lg bg-transparent px-2 py-1.5 font-mono text-sm outline-none focus:bg-white/50 dark:focus:bg-white/10"
            />
            <input
              value={seg.activity}
              onChange={(e) => update(i, { activity: e.target.value })}
              placeholder="What happens here?"
              className="flex-1 rounded-lg bg-transparent px-2 py-1.5 text-sm outline-none focus:bg-white/50 dark:focus:bg-white/10"
            />
            <button
              onClick={() => remove(i)}
              aria-label="Remove block"
              className="rounded-lg p-2 opacity-50 transition hover:bg-red-500/10 hover:opacity-100"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>

      {segments.length === 0 && (
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
