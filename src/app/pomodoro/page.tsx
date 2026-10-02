import PomodoroTimer from "@/components/timer/PomodoroTimer";

export default function Page() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Pomodoro</h1>
        <p className="opacity-70">
          Italy, 1980s · Francesco Cirillo · 25-minute focus blocks with 5-minute breaks.
        </p>
      </header>
      <PomodoroTimer />
    </section>
  );
}
