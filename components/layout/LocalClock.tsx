"use client";

import { useEffect, useState } from "react";

const TZ = "Asia/Karachi";

function format(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(d);
}

/**
 * Ticking clock in Pakistan time. Renders a placeholder on the server so
 * the markup matches on hydration, then ticks once a second.
 */
export function LocalClock({ className }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    setNow(format(new Date()));
    const id = window.setInterval(() => setNow(format(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      PKT {now ?? "--:--:--"}
    </span>
  );
}
