import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
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

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Portofolio Proyek" 
          subtitle="Lihat karya-karya terbaik kami dalam desain interior dan eksterior"
        />
        
        {/* Enhanced Filter Section */}
        <div className="mb-12 relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border/60"></div>
          
          <div className="flex justify-center overflow-x-auto pb-2 no-scrollbar">
            <div className="flex space-x-1 bg-card/80 backdrop-blur-sm p-1.5 rounded-full shadow-lg border border-border/30 relative z-10">
              <motion.button 
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === "semua" 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "bg-background hover:bg-secondary/70 text-foreground"
                }`}
                onClick={() => handleCategoryChange("semua")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Semua
              </motion.button>
              
              {categories.map((category: any) => (
                <motion.button 
                  key={category.slug}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category.slug 
                      ? "bg-primary text-primary-foreground shadow-md" 
                      : "bg-background hover:bg-secondary/70 text-foreground"
                  }`}
                  onClick={() => handleCategoryChange(category.slug)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md h-96 bg-card/50 animate-pulse">
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.length > 0 ? (
              projects.map((project: any) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard project={project} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 py-20 text-center">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-medium mb-2">Belum ada proyek dalam kategori ini</h3>
                <p className="text-muted-foreground">Silakan pilih kategori lain atau lihat semua proyek kami</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
