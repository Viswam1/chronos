"use client";

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "rgb(var(--bg))" }}
    >
      <div className="animate-drift absolute -top-40 -left-40 h-[42rem] w-[42rem] rounded-full bg-red-500/20 blur-3xl" />
      <div className="animate-drift absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-teal-500/20 blur-3xl [animation-delay:-6s]" />
      <div className="animate-drift absolute bottom-0 left-1/4 h-[32rem] w-[32rem] rounded-full bg-indigo-500/20 blur-3xl [animation-delay:-12s]" />
    </div>
  );
}
