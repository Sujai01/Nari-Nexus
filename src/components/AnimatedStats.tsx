"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

type Metric = {
  value: string;
  label: string;
  desc: string;
  icon: ReactNode;
};

type AnimatedStatsProps = {
  metrics: Metric[];
};

function parseMetricValue(value: string) {
  const trimmed = value.trim();
  const numericMatch = trimmed.match(/^([\d,]+)(\+?)$/);

  if (!numericMatch) {
    return { isNumeric: false, target: 0, suffix: "", staticValue: trimmed };
  }

  return {
    isNumeric: true,
    target: Number.parseInt(numericMatch[1].replace(/,/g, ""), 10),
    suffix: numericMatch[2] || "",
    staticValue: trimmed,
  };
}

function useInView<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible, threshold]);

  return { ref, isVisible };
}

function AnimatedNumber({ value, active }: { value: string; active: boolean }) {
  const parsed = parseMetricValue(value);
  const [displayValue, setDisplayValue] = useState(parsed.isNumeric ? "0" : parsed.staticValue);

  useEffect(() => {
    if (!active) {
      if (!parsed.isNumeric) {
        setDisplayValue(parsed.staticValue);
      }
      return;
    }

    if (!parsed.isNumeric) {
      setDisplayValue(parsed.staticValue);
      return;
    }

    let animationFrame = 0;
    const start = performance.now();
    const duration = 1400;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(parsed.target * eased);
      setDisplayValue(`${current.toLocaleString()}${parsed.suffix}`);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(tick);
      }
    };

    animationFrame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [active, parsed.isNumeric, parsed.staticValue, parsed.suffix, parsed.target]);

  return <span>{displayValue}</span>;
}

export default function AnimatedStats({ metrics }: AnimatedStatsProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>(0.25);

  return (
    <section ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className={`glass-panel p-6 rounded-2xl bg-white/75 border border-slate-200/80 shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-700 flex flex-col justify-between text-left ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: `${index * 110}ms` }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display tabular-nums">
              <AnimatedNumber value={metric.value} active={isVisible} />
            </span>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">{metric.icon}</div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 font-display">{metric.label}</p>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{metric.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
