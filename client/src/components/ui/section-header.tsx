import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <motion.div 
      className="text-center mb-16 md:mb-20 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
    >
      <motion.div 
        className="flex items-center justify-center mb-5"
        initial={{ width: 0 }}
        whileInView={{ width: "auto" }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="h-px w-6 bg-primary/30 hidden md:block"></div>
        <div className="w-12 h-1 bg-primary rounded-full mx-4"></div>
        <div className="h-px w-6 bg-primary/30 hidden md:block"></div>
      </motion.div>

      <motion.h2 
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 text-foreground transition-colors duration-300 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p 
          className="text-center text-muted-foreground text-lg max-w-xl mx-auto transition-colors duration-300 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute -left-8 -top-8 w-16 h-16 border border-primary/20 rounded-full opacity-50 hidden md:block"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
      
      <motion.div 
        className="absolute -right-10 -bottom-10 w-20 h-20 border border-primary/20 rounded-full opacity-50 hidden md:block"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      />
    </motion.div>
  );
};

export default SectionHeader;
