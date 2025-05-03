import { Link } from "wouter";
import { motion } from "framer-motion";

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    description: string;
    icon: string;
    slug: string;
    image_url?: string;
  };
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <motion.div 
      className="h-full bg-card rounded-xl shadow-lg dark:shadow-xl group border border-border/40 overflow-hidden flex flex-col transition-all duration-500"
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
      
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
        
        <motion.img 
          src={service.image_url || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"} 
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          initial={{ scale: 1.05, filter: "brightness(0.9)" }}
          animate={{ scale: 1, filter: "brightness(1)" }}
          transition={{ duration: 1.2 }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80";
          }}
        />
        
        <motion.div 
          className="absolute top-4 left-4 bg-secondary/80 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center z-20 shadow-xl"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.i 
            className={`${service.icon} text-xl text-primary group-hover:text-primary-foreground transition-colors duration-500`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </motion.div>
        
        <div className="absolute bottom-4 left-0 right-0 px-6 z-20">
          <h3 className="font-semibold text-lg md:text-xl text-white drop-shadow-md">
            {service.title}
          </h3>
        </div>
      </div>
      
      <div className="p-6 md:p-7 flex-grow flex flex-col bg-gradient-to-b from-card/90 to-card">
        <p className="text-muted-foreground mb-6 leading-relaxed transition-colors duration-300 line-clamp-3">
          {service.description}
        </p>
        
        <div className="mt-auto pt-2 flex justify-between items-center">
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
          
          <Link href={`/layanan/${service.slug}`}>
            <motion.div 
              className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.2, backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
              transition={{ duration: 0.3 }}
            >
              <i className="fas fa-arrow-right text-sm text-primary"></i>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
