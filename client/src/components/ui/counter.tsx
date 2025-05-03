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
    <motion.div
      ref={counterRef}
      className="relative p-6 rounded-xl bg-card border border-border/20 shadow-sm dark:shadow-xl overflow-hidden h-full"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(0, 0, 0, 0.08)" }}
    >
      {/* Decorative element */}
      <motion.div 
        className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/5 -mr-8 -mt-8"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      />
      
      <div className="relative z-10">
        <motion.div
          className="flex flex-col items-center md:items-start"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-5xl font-bold text-primary mb-3 transition-all duration-500 ease-out">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {count}
            </motion.span>
            {value > 100 && <span className="text-primary">+</span>}
          </p>
          
          <p className="text-base md:text-lg font-medium text-muted-foreground transition-colors duration-300">
            {label}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Counter;
