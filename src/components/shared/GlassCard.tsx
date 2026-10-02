import { cn } from "@/lib/utils";

export default function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "glass animate-fade-in rounded-2xl p-6 shadow-xl shadow-black/5",
        className,
      )}
    >
      {children}
    </div>
  );
}
