"use client";

import { useEffect, useState } from "react";

/**
 * Returns the current Date, updating every `intervalMs` milliseconds.
 * Returns `null` during SSR/prerender so pages don't crash on the server.
 */
export function useNow(intervalMs = 60_000): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}
