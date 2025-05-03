import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import SectionHeader from "../ui/section-header";
import ServiceCard from "../services/ServiceCard";

const ServicesSection = () => {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ['/api/services'],
    refetchOnWindowFocus: false,
  });

  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="container mx-auto">
        <SectionHeader 
          title="Layanan Kami" 
          subtitle="Kami menawarkan berbagai layanan desain interior untuk memenuhi kebutuhan Anda"
        />
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md h-80 bg-gray-100 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service: any) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
        
        <div className="text-center">
          <Link href="/kontak" className="inline-block bg-primary text-white font-medium py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors">
            Konsultasikan Proyek Anda
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
