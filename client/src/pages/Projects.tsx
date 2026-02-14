import { useProjects } from "@/hooks/use-projects";
import { RetroCard } from "@/components/RetroCard";
import { motion } from "framer-motion";
import { ExternalLink, Github, Loader2, Tag } from "lucide-react";

export default function Projects() {
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 text-primary">
        <Loader2 className="w-12 h-12 animate-spin" />
        <p className="font-display text-xl animate-pulse">LOADING ASSETS...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-destructive">
        <RetroCard title="ERROR" className="p-8">
          <h2 className="text-2xl font-display mb-2">SYSTEM FAILURE</h2>
          <p className="font-mono">Could not retrieve mission data.</p>
        </RetroCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-primary font-display glitch-text" data-text="MISSION_LOG">
          MISSION_LOG
        </h1>
        <p className="text-muted-foreground font-mono max-w-2xl mx-auto">
          Select a mission to view details. Completed objectives and side quests displayed below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects?.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
          >
            <div className="h-full bg-black/40 border-2 border-border hover:border-accent transition-colors group flex flex-col relative overflow-hidden">
              {project.isFeatured && (
                <div className="absolute top-0 right-0 z-20 bg-accent text-black font-bold font-display text-[10px] px-2 py-1 uppercase">
                  Featured
                </div>
              )}
              
              {/* Image Container */}
              <div className="aspect-video relative overflow-hidden border-b-2 border-border bg-gray-900">
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-all duration-300"></div>
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                
                {/* Overlay Links */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20 backdrop-blur-sm">
                  {project.projectUrl && (
                    <a 
                      href={project.projectUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-primary text-black hover:bg-white hover:scale-110 transition-all rounded-none"
                      title="View Demo"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a 
                      href={project.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-secondary text-black hover:bg-white hover:scale-110 transition-all rounded-none"
                      title="View Code"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl text-white mb-3 group-hover:text-primary transition-colors font-display leading-tight">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground font-mono text-sm mb-6 flex-grow line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags?.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[10px] uppercase px-2 py-1 bg-white/5 border border-white/10 text-secondary font-mono flex items-center gap-1"
                    >
                      <Tag className="w-3 h-3" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {projects?.length === 0 && (
        <div className="text-center py-24 border-2 border-dashed border-border text-muted-foreground font-mono">
          NO MISSIONS FOUND IN DATABASE
        </div>
      )}
    </div>
  );
}
