import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

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
    const step = value / 22;
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
    <motion.div
      ref={counterRef}
      className="text-center md:text-left"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-4xl font-bold text-primary transition-all duration-500 ease-out mb-1">
          {count}{value > 100 ? "+" : ""}
        </p>
        <p className="text-muted-foreground transition-colors duration-300">{label}</p>
      </motion.div>
    </motion.div>
  );
};

export default Counter;
