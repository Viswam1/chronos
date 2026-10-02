"use client";

import { useEffect, useRef, useState } from "react";
import GlassCard from "@/components/shared/GlassCard";
import { Play, Pause, RotateCcw } from "lucide-react";

type Phase = "focus" | "break";

export default function PomodoroTimer() {
  const [task, setTask] = useState("Deep work");
  const [focusMin, setFocusMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const [phase, setPhase] = useState<Phase>("focus");
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [rounds, setRounds] = useState(0);
  const endRef = useRef<number | null>(null);

  // Reset displayed time when idle and durations/phase change
  useEffect(() => {
    if (!running) {
      setRemaining((phase === "focus" ? focusMin : breakMin) * 60);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusMin, breakMin, phase]);

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

      if (r <= 0) {
        if (phase === "focus") {
          setRounds((x) => x + 1);
          setPhase("break");
          endRef.current = Date.now() + breakMin * 1000;
          setRemaining(breakMin * 60);
        } else {
          setPhase("focus");
          endRef.current = Date.now() + focusMin * 1000;
          setRemaining(focusMin * 60);
        }
      }
    }, 250);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, phase, focusMin, breakMin]);

  const total = (phase === "focus" ? focusMin : breakMin) * 60;
  const pct = Math.min(100, Math.max(0, ((total - remaining) / total) * 100));
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  function reset() {
    setRunning(false);
    setPhase("focus");
    setRemaining(focusMin * 60);
    endRef.current = null;
  }

  return (
    <GlassCard className="mx-auto max-w-xl">
      <p className="text-sm uppercase tracking-widest opacity-60">
        {phase === "focus" ? "Focus" : "Break"} · Round {rounds + 1}
      </p>
      <p className="mt-2 text-6xl font-bold tabular-nums">
        {mm}:{ss}
      </p>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: "#e63946" }}
        />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <label className="text-sm">
          Task
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="mt-1 w-full rounded-lg bg-black/5 px-3 py-2 outline-none dark:bg-white/10"
          />
        </label>
        <label className="text-sm">
          Focus (min)
          <input
            type="number"
            min={1}
            value={focusMin}
            onChange={(e) => setFocusMin(+e.target.value || 1)}
            className="mt-1 w-full rounded-lg bg-black/5 px-3 py-2 outline-none dark:bg-white/10"
          />
        </label>
        <label className="text-sm">
          Break (min)
          <input
            type="number"
            min={1}
            value={breakMin}
            onChange={(e) => setBreakMin(+e.target.value || 1)}
            className="mt-1 w-full rounded-lg bg-black/5 px-3 py-2 outline-none dark:bg-white/10"
          />
        </label>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          className="flex items-center gap-2 rounded-xl bg-[#e63946] px-5 py-2.5 font-medium text-white transition hover:brightness-110"
        >
          {running ? <Pause size={18} /> : <Play size={18} />}
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-xl bg-black/5 px-5 py-2.5 font-medium transition hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
        >
          <RotateCcw size={18} /> Reset
        </button>
      </div>

      <p className="mt-4 text-center text-xs opacity-60">
        Working on <span className="font-medium">{task}</span> · {rounds}{" "}
        completed round{rounds === 1 ? "" : "s"}
      </p>
    </GlassCard>
  );
}
