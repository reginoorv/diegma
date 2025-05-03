import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import SectionHeader from "../ui/section-header";
import ServiceCard from "../services/ServiceCard";

const ServicesSection = () => {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['/api/services'],
    refetchOnWindowFocus: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="py-24 px-4 bg-secondary/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <SectionHeader 
          title="Layanan Kami" 
          subtitle="Kami menyediakan solusi desain interior dan eksterior premium untuk mengubah ruang Anda menjadi tempat yang tak terlupakan"
        />
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md h-96 bg-card/50 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service: any) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </motion.div>
        )}
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="inline-block p-0.5 rounded-full bg-gradient-to-r from-primary/80 via-primary to-primary/80 shadow-lg">
            <Link 
              href="/kontak" 
              className="inline-flex items-center gap-2 bg-card hover:bg-card/80 text-foreground font-medium py-3 px-8 rounded-full transition-all duration-300 group border border-border/20"
            >
              <span>Konsultasikan Proyek Anda</span>
              <motion.i 
                className="fas fa-arrow-right text-primary text-sm" 
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
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
