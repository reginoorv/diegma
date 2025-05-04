import { Link } from "wouter";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    slug: string;
    category: string;
    imageUrl: string;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div 
      className="group relative h-full flex flex-col bg-card rounded-xl overflow-hidden shadow-md dark:shadow-xl border border-border/40 transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="relative overflow-hidden h-72 sm:h-64 md:h-72 lg:h-64 xl:h-72">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
        
        {/* Category badge */}
        <motion.div 
          className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-1.5 rounded-full text-xs font-medium z-20 shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {project.category}
        </motion.div>
        
        {/* Project image */}
        <motion.img 
          src={project.imageUrl || "/images/projects/default-project.jpg"} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/images/projects/default-project.jpg";
          }}
        />
      </div>
      
      <div className="p-5 sm:p-6 flex-grow flex flex-col">
        <h3 className="font-semibold text-xl mb-3 text-foreground tracking-tight transition-colors duration-300">
          {project.title}
        </h3>
        
        <div className="mt-auto pt-2">
          <Link 
            href={`/proyek/${project.slug}`} 
            className="inline-flex items-center gap-2 text-primary hover:text-primary font-medium transition-all group-hover:gap-3"
          >
            <span className="text-sm">Lihat Detail</span>
            <motion.i 
              className="fas fa-arrow-right text-xs" 
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
          </Link>
        </div>
      </div>
      
      {/* Accent line at bottom */}
      <motion.div 
        className="h-1 bg-primary w-0 group-hover:w-full transition-all duration-300 ease-out"
        layoutId={`accent-${project.id}`}
      />
    </motion.div>
  );
};

export default ProjectCard;
