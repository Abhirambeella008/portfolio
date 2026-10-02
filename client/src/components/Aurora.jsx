// Animated sky-blue glow behind every page. Only visible in dark mode.
export default function Aurora() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden dark:block">
      <div className="absolute -left-32 -top-32 size-[34rem] animate-blob rounded-full bg-sky-400/20 blur-3xl" />
      <div className="absolute right-[-8rem] top-1/4 size-[32rem] animate-blob rounded-full bg-cyan-300/15 blur-3xl [animation-delay:-6s]" />
      <div className="absolute bottom-[-10rem] left-1/3 size-[36rem] animate-blob rounded-full bg-blue-500/20 blur-3xl [animation-delay:-11s]" />
      <div className="aurora-sweep absolute inset-0" />
    </div>
  );
}
