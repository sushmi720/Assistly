export default function Loading() {
  return (
    <div className="flex h-full min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-10">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-t-violet-500 animate-spin" />
        </div>
        <p className="text-xs text-zinc-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
