import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SectionHeader from "@/components/ui/section-header";
import ProjectCard from "@/components/projects/ProjectCard";

const Projects = () => {
  useEffect(() => {
    document.title = "Proyek | DIEGMA";
  }, []);

  const [activeCategory, setActiveCategory] = useState("semua");

  const { data: categories = [] } = useQuery({
    queryKey: ['/api/project-categories'],
    refetchOnWindowFocus: false,
  });

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['/api/projects', activeCategory],
    refetchOnWindowFocus: false,
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Portofolio Proyek" 
          subtitle="Lihat karya-karya terbaik kami dalam desain interior dan eksterior"
        />
        
        <div className="flex flex-wrap justify-center mb-8">
          <button 
            className={`m-2 px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === "semua" 
                ? "bg-primary text-white" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => handleCategoryChange("semua")}
          >
            Semua
          </button>
          
          {categories.map((category: any) => (
            <button 
              key={category.slug}
              className={`m-2 px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === category.slug 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => handleCategoryChange(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md h-80 bg-gray-100 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
