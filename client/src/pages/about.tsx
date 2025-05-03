import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import SectionHeader from "@/components/ui/section-header";
import Counter from "@/components/ui/counter";

const About = () => {
  useEffect(() => {
    document.title = "Studio Kami | DIEGMA";
  }, []);

  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
    refetchOnWindowFocus: false,
  });

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <SectionHeader title="Tentang DIEGMA Studio" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Filosofi Kami</h3>
            <p className="text-gray-500 mb-6">
              Di DIEGMA, kami percaya bahwa desain interior bukan hanya tentang menciptakan ruang yang indah, tetapi juga fungsional dan mencerminkan kepribadian penghuninya. Sejak didirikan pada tahun 2016, kami telah berkomitmen untuk memberikan solusi desain yang inovatif, personal, dan berkelanjutan.
            </p>
            <p className="text-gray-500">
              Setiap proyek yang kami tangani diperlakukan secara unik, dengan memperhatikan kebutuhan spesifik klien, karakteristik ruang, dan aspek fungsional. Kami menggabungkan prinsip desain modern dengan sentuhan lokal untuk menciptakan ruang yang timeless dan berarti.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80" 
              alt="DIEGMA Studio Team" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        <div className="bg-gray-100 p-8 rounded-lg mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Counter 
              value={stats?.completedProjects || 250} 
              label="Proyek Selesai" 
            />
            
            <Counter 
              value={stats?.turnkeyProjects || 57} 
              label="Proyek Turnkey" 
            />
            
            <Counter 
              value={stats?.yearsOfExperience || 9} 
              label="Tahun Pengalaman" 
            />
            
            <Counter 
              value={stats?.residentialDesigns || 115} 
              label="Desain Residensial" 
            />
          </div>
        </div>
        
        <div className="mb-16">
          <SectionHeader title="Tim Kami" subtitle="Bertemu dengan para profesional di balik setiap proyek" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md text-center">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80" 
                alt="Direktur Kreatif" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-xl mb-1">Budi Santoso</h3>
                <p className="text-gray-500 mb-3">Direktur Kreatif</p>
                <p className="text-sm text-gray-500">
                  Berpengalaman lebih dari 15 tahun dalam industri desain interior, Budi memimpin tim kreatif kami dengan visi yang jelas tentang desain yang fungsional.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md text-center">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80" 
                alt="Kepala Arsitek" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-xl mb-1">Dewi Purnama</h3>
                <p className="text-gray-500 mb-3">Kepala Arsitek</p>
                <p className="text-sm text-gray-500">
                  Dewi adalah lulusan terbaik dari Institut Teknologi Bandung dengan spesialisasi dalam desain ruang dan pencahayaan. Karya-karyanya telah diakui secara internasional.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md text-center">
              <img 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80" 
                alt="Manajer Proyek" 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-xl mb-1">Rahmat Hidayat</h3>
                <p className="text-gray-500 mb-3">Manajer Proyek</p>
                <p className="text-sm text-gray-500">
                  Rahmat memastikan bahwa setiap proyek berjalan sesuai rencana, anggaran, dan tenggat waktu. Ketelitianya pada detail menjadi kunci keberhasilan setiap proyek.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
