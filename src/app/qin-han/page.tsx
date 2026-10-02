import GlassCard from "@/components/shared/GlassCard";

const SEGMENTS = [
  ["05:00", "Morning review & planning"],
  ["07:00", "Primary deep work block"],
  ["11:00", "Midday meal & rest"],
  ["13:00", "Secondary work block"],
  ["16:00", "Correspondence & reporting"],
  ["17:00", "Day closes — reflect and rest"],
];

export default function Page() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Qin/Han Workday</h1>
        <p className="opacity-70">
          China, 221 BCE – 220 CE · A structured 5AM–5PM imperial workday.
        </p>
      </header>
      <GlassCard>
        <ul className="divide-y divide-black/5 dark:divide-white/10">
          {SEGMENTS.map(([time, act]) => (
            <li key={time} className="flex items-center gap-4 py-3">
              <span className="w-20 font-mono text-sm opacity-70">{time}</span>
              <span>{act}</span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </section>
  );
}
