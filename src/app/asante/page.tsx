import CyclePlanner from "@/components/timer/CyclePlanner";

export default function Page() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Asante Adaduanan</h1>
        <p className="opacity-70">
          West Africa, Asante Empire · A 42-day cyclical planning rhythm.
        </p>
      </header>
      <CyclePlanner />
    </section>
  );
}
