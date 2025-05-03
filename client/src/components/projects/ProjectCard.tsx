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
      className="rounded-lg overflow-hidden shadow-lg group bg-card border border-border transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <div className="relative overflow-hidden">
        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium z-10">
          {project.category}
        </div>
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 text-foreground transition-colors duration-300">{project.title}</h3>
        <Link 
          href={`/proyek/${project.slug}`} 
          className="text-primary hover:text-primary/80 text-sm inline-flex items-center font-medium transition-colors duration-300"
        >
          Lihat Detail
          <i className="fas fa-arrow-right ml-2 text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
