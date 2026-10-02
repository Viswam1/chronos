import RoutineBuilder from "@/components/timer/RoutineBuilder";

export default function Page() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Greco-Roman Routine</h1>
        <p className="opacity-70">
          Greece & Rome · A day of lectio, disputatio, gymnasium and examinatio.
        </p>
      </header>
      <RoutineBuilder />
    </section>
  );
}
