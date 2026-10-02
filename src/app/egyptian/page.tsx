import FlowTimer from "@/components/timer/FlowTimer";

export default function Page() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Egyptian Water Clock</h1>
        <p className="opacity-70">
          Ancient Egypt · Deep, uninterrupted flow timed like water emptying from a vessel.
        </p>
      </header>
      <FlowTimer />
    </section>
  );
}
