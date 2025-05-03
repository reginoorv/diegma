import { useState, useEffect, useRef } from "react";

interface CounterProps {
  value: number;
  label: string;
  duration?: number;
}

const Counter = ({ value, label, duration = 2000 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !startedRef.current) {
          startAnimation();
          startedRef.current = true;
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [value]);

  const startAnimation = () => {
    let start = 0;
    const step = value / 20;
    const increment = () => {
      start += step;
      if (start < value) {
        setCount(Math.floor(start));
        requestAnimationFrame(increment);
      } else {
        setCount(value);
      }
    };
    increment();
  };

  return (
    <div ref={counterRef} className="text-center md:text-left">
      <p className="text-4xl font-bold text-primary transition-all duration-500 ease-out">
        {count}{value > 100 ? "+" : ""}
      </p>
      <p className="text-gray-500">{label}</p>
    </div>
  );
};

export default Counter;
