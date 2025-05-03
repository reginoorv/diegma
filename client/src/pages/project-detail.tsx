import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: string;
  categoryId: number;
  location: string;
  imageUrl: string;
  galleryImages: string[];
  isFeatured: boolean;
  createdAt: string;
}

interface RelatedProject {
  id: number;
  title: string;
  slug: string;
  category: string;
  location: string;
  imageUrl: string;
}

const ProjectDetail = () => {
  const params = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [activeImage, setActiveImage] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: [`/api/projects/${params.slug}`],
    enabled: !!params.slug,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | DIEGMA`;
      setActiveImage(project.imageUrl);
    } else if (error) {
      toast({
        title: "Error",
        description: "Proyek tidak ditemukan",
        variant: "destructive",
      });
      navigate("/proyek");
    }
  }, [project, error, navigate, toast]);

  const handleImageClick = (image: string) => {
    setActiveImage(image);
  };

  const handleLightboxToggle = () => {
    setLightboxOpen(!lightboxOpen);
  };

  // Get related projects
  const { data: relatedProjects = [] } = useQuery<RelatedProject[]>({
    queryKey: ['/api/projects', project?.categoryId],
    enabled: !!project?.categoryId,
    select: (data: any) => 
      data.filter((p: any) => p.id !== project?.id).slice(0, 3),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto pt-24 pb-16 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-card/60 rounded w-2/3 mb-4"></div>
          <div className="h-4 bg-card/60 rounded w-1/2 mb-8"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="h-96 bg-card/60 rounded-xl"></div>
            <div className="space-y-4">
              <div className="h-6 bg-card/60 rounded w-1/3"></div>
              <div className="h-4 bg-card/60 rounded w-full"></div>
              <div className="h-4 bg-card/60 rounded w-full"></div>
              <div className="h-4 bg-card/60 rounded w-3/4"></div>
              <div className="h-6 bg-card/60 rounded w-1/4 mt-6"></div>
              <div className="h-4 bg-card/60 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return null; // Will redirect in useEffect
  }

  const galleryImages = Array.isArray(project.galleryImages) 
    ? project.galleryImages 
    : [];

  const allImages = [project.imageUrl, ...galleryImages];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex flex-wrap items-center mb-4 text-xs sm:text-sm font-medium text-muted-foreground">
            <Link href="/proyek" className="hover:text-primary transition-colors">
              Proyek
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/proyek?category=${project.categoryId}`} className="hover:text-primary transition-colors">
              {project.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground line-clamp-1">{project.title}</span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
            {project.title}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">{project.location}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <div className="space-y-6">
            <motion.div 
              className="rounded-xl overflow-hidden relative cursor-pointer h-80 md:h-96"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={handleLightboxToggle}
            >
              <img 
                src={activeImage} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-background/80 backdrop-blur-sm text-foreground p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>
                </div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((image, index) => (
                <motion.div 
                  key={index}
                  className={`rounded-lg overflow-hidden cursor-pointer h-20 border-2 ${
                    activeImage === image 
                      ? 'border-primary' 
                      : 'border-transparent'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleImageClick(image)}
                >
                  <img 
                    src={image} 
                    alt={`Gallery image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Tentang Proyek</h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Kategori</h3>
                <p className="font-medium">{project.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Lokasi</h3>
                <p className="font-medium">{project.location}</p>
              </div>
            </div>
            
            <motion.div 
              className="bg-secondary/30 border border-border/40 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-semibold mb-3">Tertarik dengan proyek ini?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Konsultasikan kebutuhan desain Anda dengan tim profesional kami
              </p>
              <Link 
                href="/kontak" 
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 px-5 rounded-full transition-colors"
              >
                <span>Hubungi Kami</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">Proyek Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject: any) => (
                <Link key={relatedProject.id} href={`/proyek/${relatedProject.slug}`}>
                  <motion.div 
                    className="group relative rounded-xl overflow-hidden shadow-md h-64"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                    <img 
                      src={relatedProject.imageUrl} 
                      alt={relatedProject.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <span className="text-xs font-medium text-primary-foreground bg-primary/90 px-3 py-1 rounded-full">
                        {relatedProject.category}
                      </span>
                      <h3 className="text-lg font-medium text-white mt-2">{relatedProject.title}</h3>
                      <p className="text-sm text-white/80">{relatedProject.location}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Fullscreen Image Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleLightboxToggle}
          >
            <button 
              className="absolute top-6 right-6 text-white bg-black/20 p-2 rounded-full"
              onClick={handleLightboxToggle}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
            <motion.img 
              src={activeImage} 
              alt={project.title} 
              className="max-w-full max-h-[90vh] object-contain"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://source.unsplash.com/random/800x600?interior,design,architecture`;
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetail;