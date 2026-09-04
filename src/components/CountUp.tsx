import React, { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number; // in seconds
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  start = 0,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  className = '',
  style,
}) => {
  const [value, setValue] = useState<number>(start);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutExpo(progress);
      const currentVal = start + (end - start) * easedProgress;

      setValue(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, start, end, duration]);

  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals);
    const [intPart, decPart] = fixed.split('.');
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return decPart !== undefined ? `${formattedInt}.${decPart}` : formattedInt;
  };

  return (
    <span ref={elementRef} className={className} style={style}>
      {prefix}
      {formatNumber(value)}
      {suffix}
    </span>
  );
};
