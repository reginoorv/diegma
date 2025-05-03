import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import SectionHeader from "@/components/ui/section-header";
import ServiceCard from "@/components/services/ServiceCard";

const Services = () => {
  useEffect(() => {
    document.title = "Layanan | DIEGMA";
  }, []);

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['/api/services'],
    refetchOnWindowFocus: false,
  });

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Layanan Kami" 
          subtitle="Kami menawarkan berbagai layanan desain interior untuk memenuhi kebutuhan Anda"
        />
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md h-80 bg-gray-100 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service: any) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
        
        <div className="bg-gray-100 rounded-lg p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Proses Kerja Kami</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Konsultasi Awal</h4>
                    <p className="text-gray-500">Pertemuan pertama untuk memahami kebutuhan dan visi Anda untuk proyek</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Pengembangan Konsep</h4>
                    <p className="text-gray-500">Pembuatan konsep desain berdasarkan kebutuhan dan preferensi Anda</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Desain Detail</h4>
                    <p className="text-gray-500">Pengembangan rencana detail, pemilihan material, dan finalisasi desain</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Implementasi</h4>
                    <p className="text-gray-500">Pelaksanaan proyek dengan pengawasan ketat untuk memastikan kualitas hasil</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80" 
                alt="Proses Desain" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6">Siap untuk Memulai Proyek Anda?</h3>
          <Link href="/kontak" className="inline-block bg-primary text-white font-medium py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors">
            Konsultasikan Proyek Anda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
