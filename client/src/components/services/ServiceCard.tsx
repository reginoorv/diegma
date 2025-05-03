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
      className="bg-card rounded-lg overflow-hidden shadow-lg group border border-border hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="p-7">
        <motion.div 
          className="bg-secondary rounded-full w-14 h-14 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-500"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
        >
          <i className={`${service.icon} text-xl text-primary group-hover:text-primary-foreground transition-colors duration-500`}></i>
        </motion.div>
        <h3 className="font-semibold text-xl mb-3 text-foreground transition-colors duration-300">{service.title}</h3>
        <p className="text-muted-foreground mb-5 transition-colors duration-300">{service.description}</p>
        <Link 
          href={`/layanan/${service.slug}`} 
          className="text-primary hover:text-primary/80 text-sm inline-flex items-center font-medium transition-colors duration-300"
        >
          Pelajari Lebih Lanjut
          <i className="fas fa-arrow-right ml-2 text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
