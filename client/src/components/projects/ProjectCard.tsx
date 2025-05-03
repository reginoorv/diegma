import { Link } from "wouter";

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
    <div className="rounded-lg overflow-hidden shadow-md group animate-hover">
      <div className="relative">
        <div className="absolute top-4 left-4 bg-white text-gray-900 px-3 py-1 rounded-full text-sm">
          {project.category}
        </div>
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
        <Link href={`/proyek/${project.slug}`} className="text-primary text-sm inline-flex items-center">
          Lihat Detail
          <i className="fas fa-arrow-right ml-1 text-xs"></i>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
