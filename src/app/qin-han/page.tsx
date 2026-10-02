import WorkdayEditor from "@/components/timer/WorkdayEditor";

export default function Page() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Qin/Han Workday</h1>
        <p className="opacity-70">
          China, 221 BCE – 220 CE · A structured 5AM–5PM imperial workday.
        </p>
      </header>
      <WorkdayEditor />
    </section>
  );
}
