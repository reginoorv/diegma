import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import SectionHeader from "../ui/section-header";
import ProjectCard from "../projects/ProjectCard";

const ProjectsSection = () => {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['/api/projects?limit=4'],
    refetchOnWindowFocus: false,
  });

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <SectionHeader 
          title="Proyek Kami" 
          subtitle="Lihat beberapa proyek terbaik kami yang menggabungkan estetika dan fungsionalitas"
        />
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md h-80 bg-gray-100 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {projects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
        
        <div className="text-center">
          <Link href="/proyek" className="inline-block border border-gray-900 text-gray-900 font-medium py-3 px-6 rounded hover:bg-gray-900 hover:text-white transition-colors">
            Lihat Semua Proyek
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
