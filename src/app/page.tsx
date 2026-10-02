import Link from "next/link";
import GlassCard from "@/components/shared/GlassCard";
import { TECHNIQUES } from "@/lib/techniques";

export default function Home() {
  return (
    <section className="space-y-10">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Time mastery through the ages.
        </h1>
        <p className="mx-auto max-w-2xl opacity-70">
          Chronos blends five historical time-management techniques into one
          modern, quietly beautiful interface. Pick a method and begin.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TECHNIQUES.map((t) => (
          <Link key={t.slug} href={t.href} className="group">
            <GlassCard className="h-full transition group-hover:-translate-y-1">
              <div
                className="mb-3 inline-block h-3 w-3 rounded-full"
                style={{ background: t.accent }}
              />
              <h2 className="text-lg font-semibold">{t.name}</h2>
              <p className="text-xs uppercase tracking-wide opacity-60">
                {t.origin}
              </p>
              <p className="mt-3 text-sm opacity-80">{t.summary}</p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
