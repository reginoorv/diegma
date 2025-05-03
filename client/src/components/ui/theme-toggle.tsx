import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ui/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.button
      className="relative w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 text-foreground transition-all duration-300 hover:bg-secondary focus:outline-none"
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : 180,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        <Moon size={18} />
      </motion.div>
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          rotate: theme === "light" ? 0 : -180,
          opacity: theme === "light" ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        <Sun size={18} />
      </motion.div>
    </motion.button>
  );
}