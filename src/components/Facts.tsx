"use client";

import { useEffect, useState } from "react";
import { useInViewOnce, usePrefersReducedMotion } from "@/lib/hooks";

function CountUp({ to, run }: { to: number; run: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (reduced) {
      setValue(to);
      return;
    }
    const start = performance.now();
    const duration = 1100;
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [run, to, reduced]);
  return <>{value}</>;
}

export function Facts({ facts }: { facts: { value: number; suffix: string; label: string }[] }) {
  const { ref, inView } = useInViewOnce<HTMLDListElement>();
  return (
    <dl ref={ref} className="facts">
      {facts.map((f) => (
        <div key={f.label} className="facts__item">
          <dt className="facts__value">
            <CountUp to={f.value} run={inView} />
            {f.suffix}
          </dt>
          <dd className="facts__label">{f.label}</dd>
        </div>
      ))}
    </dl>
  );
}
