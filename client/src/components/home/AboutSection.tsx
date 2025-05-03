import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../ui/section-header";
import Counter from "../ui/counter";

const AboutSection = () => {
  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
    refetchOnWindowFocus: false,
  });

  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="container mx-auto">
        <SectionHeader 
          title="Desain interior bukan hanya estetika, tapi menciptakan ruang fungsional untuk hidup" 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-500 mb-10">
              Studio kami fokus pada perpaduan keindahan dan kepraktisan. Setiap ruang yang kami desain mempertimbangkan alur aktivitas, pencahayaan, dan keseimbangan yang tepat antara gaya dan fungsi.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
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
          
          <div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80" 
                alt="Interior design" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
