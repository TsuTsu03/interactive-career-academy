"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Counts a number up instead of snapping to it.
 * Tabular figures keep the digits from jittering mid-count.
 */
export function CountUp({
  value,
  className = "",
  duration = 700,
}: {
  value: number;
  className?: string;
  duration?: number;
}) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || from.current === value) {
      from.current = value;
      setShown(value);
      return;
    }

    const start = performance.now();
    const a = from.current;
    const b = value;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(a + (b - a) * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else from.current = b;
    };

    raf.current = requestAnimationFrame(tick);

    // A backgrounded or non-compositing tab never fires rAF. Without this the
    // counter would sit at a stale number, showing the learner the wrong XP
    // rather than merely skipping the animation. Correctness first, juice second.
    const guard = setTimeout(() => {
      if (raf.current) cancelAnimationFrame(raf.current);
      from.current = b;
      setShown(b);
    }, duration + 120);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      clearTimeout(guard);
    };
  }, [value, duration]);

  return <span className={`tnum ${className}`}>{shown.toLocaleString()}</span>;
}

const PARTICLE_COLOURS = [
  "var(--color-voltage)",
  "var(--color-acid)",
  "var(--color-gold)",
];

/**
 * A reward burst. Plain absolutely-positioned divs animating transform and
 * opacity only, capped at 24, so it costs nothing on a weak GPU.
 *
 * Mount-to-play: the parent remounts this with a changing `key` to fire it.
 * The CSS animation uses `forwards`, so the particles finish invisible and
 * need no teardown, which keeps the component free of state and effects.
 * Hidden entirely under prefers-reduced-motion.
 */
/**
 * Deterministic jitter in [0, 1). Rendering must stay pure, so the scatter is
 * derived from the particle index rather than Math.random. It looks identical
 * and has the side benefit of being reproducible.
 */
function jitter(i: number, salt: number): number {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function ParticleBurst({ count = 14, spread = 70 }: { count?: number; spread?: number }) {
  const seeds = useMemo(() => {
    const n = Math.min(count, 24);
    return Array.from({ length: n }, (_, i) => {
      const angle = (Math.PI * 2 * i) / n + jitter(i, 1) * 0.5;
      const dist = spread * (0.55 + jitter(i, 2) * 0.65);
      return {
        id: i,
        px: Math.cos(angle) * dist,
        py: Math.sin(angle) * dist - 12,
        size: 3 + jitter(i, 3) * 4,
        colour: PARTICLE_COLOURS[i % PARTICLE_COLOURS.length],
        delay: jitter(i, 4) * 90,
      };
    });
  }, [count, spread]);

  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-20" aria-hidden="true">
      {seeds.map((s) => (
        <span
          key={s.id}
          className="particle"
          style={
            {
              width: s.size,
              height: s.size,
              background: s.colour,
              "--px": `${s.px}px`,
              "--py": `${s.py}px`,
              "--pdelay": `${s.delay}ms`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/**
 * The floating "+120 XP" that rises off the XP bar. Mount-to-play, same as
 * ParticleBurst: the animation ends at opacity 0 with `forwards`.
 */
export function FloatingGain({ amount }: { amount: number }) {
  return (
    <span
      className="animate-rise pointer-events-none absolute -top-1 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap font-mono text-sm font-bold text-acid"
      aria-hidden="true"
    >
      +{amount} XP
    </span>
  );
}
