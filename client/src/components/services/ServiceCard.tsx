import { Link } from "wouter";
import { motion } from "framer-motion";

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    description: string;
    icon: string;
    slug: string;
  };
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <motion.div 
      className="h-full bg-card rounded-xl shadow-md dark:shadow-xl group border border-border/40 overflow-hidden flex flex-col transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
    >
      {/* Accent line at top */}
      <motion.div 
        className="h-1 bg-primary w-0 group-hover:w-full transition-all duration-300 ease-out"
        layoutId={`service-accent-${service.id}`}
      />
      
      <div className="p-7 md:p-8 flex-grow flex flex-col">
        <div className="flex items-center mb-6">
          <motion.div 
            className="bg-secondary/80 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center relative overflow-hidden group-hover:bg-primary group-hover:scale-110 shadow-md transition-all duration-500 ease-out"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <motion.i 
              className={`${service.icon} text-2xl text-primary group-hover:text-primary-foreground transition-colors duration-500`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <motion.div 
              className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              whileHover={{ opacity: 0.2 }}
            />
          </motion.div>
          
          <div className="h-px bg-border/60 flex-grow ml-4 mr-2"></div>
        </div>
        
        <h3 className="font-semibold text-xl md:text-2xl mb-3 text-foreground tracking-tight transition-colors duration-300">{service.title}</h3>
        
        <p className="text-muted-foreground mb-6 leading-relaxed transition-colors duration-300">{service.description}</p>
        
        <div className="mt-auto pt-2">
          <Link 
            href={`/layanan/${service.slug}`} 
            className="inline-flex items-center gap-2 text-primary font-medium transition-all duration-300 group-hover:gap-3"
          >
            <span className="text-sm">Pelajari Lebih Lanjut</span>
            <motion.i 
              className="fas fa-arrow-right text-xs" 
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut", 
                times: [0, 0.5, 1],
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
