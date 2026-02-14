import { motion } from "framer-motion";
import { Link } from "wouter";
import { RetroCard } from "@/components/RetroCard";
import { StatsBar } from "@/components/StatsBar";
import { Typewriter } from "@/components/Typewriter";
import { useProfile } from "@/hooks/use-profile";
import { useActivities } from "@/hooks/use-activities";
import { Github, Instagram, Linkedin, Twitter, Code, Trophy, Loader2 } from "lucide-react";

export default function Home() {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { data: activities, isLoading: activitiesLoading } = useActivities();

  if (profileLoading || activitiesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-6xl mx-auto flex flex-col gap-12">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Hero Section */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-secondary text-lg md:text-xl mb-2 font-mono">SYSTEM.INIT(USER)</h2>
              <h1 className="text-4xl md:text-6xl lg:text-7xl mb-4 glitch-text uppercase" data-text={profile?.name || "PORTFOLIO"}>
                {profile?.name || "PORTFOLIO"}
              </h1>
              <p className="text-muted-foreground font-mono text-lg max-w-xl leading-relaxed">
                <Typewriter text={profile?.bio || "Building immersive digital experiences one pixel at a time."} speed={30} />
              </p>
            </motion.div>

            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              {profile?.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noreferrer" className="p-2 border-2 border-primary text-primary hover:bg-primary hover:text-black transition-all">
                  <Github size={20} />
                </a>
              )}
              {profile?.instagramUrl && (
                <a href={profile.instagramUrl} target="_blank" rel="noreferrer" className="p-2 border-2 border-accent text-accent hover:bg-accent hover:text-black transition-all">
                  <Instagram size={20} />
                </a>
              )}
              {profile?.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" className="p-2 border-2 border-secondary text-secondary hover:bg-secondary hover:text-black transition-all">
                  <Linkedin size={20} />
                </a>
              )}
              {profile?.twitterUrl && (
                <a href={profile.twitterUrl} target="_blank" rel="noreferrer" className="p-2 border-2 border-white text-white hover:bg-white hover:text-black transition-all">
                  <Twitter size={20} />
                </a>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Link href="/projects">
                <button className="pixel-btn">
                  VIEW QUESTS
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-6 py-3 border-2 border-secondary text-secondary font-bold font-display text-sm hover:bg-secondary hover:text-black transition-colors uppercase tracking-widest">
                  CONTACT
                </button>
              </Link>
            </div>
          </div>

          {/* Current Status Box */}
          <RetroCard title="CURRENT_STATUS" className="max-w-md bg-black/80" delay={0.4}>
            <div className="font-mono text-sm space-y-2 text-green-400">
              <p>LOCATION: <span className="text-white">CYBERSPACE</span></p>
              <p>AVAILABILITY: <span className="animate-pulse text-primary">OPEN FOR WORK</span></p>
              <p>CURRENT_OBJECTIVE: <span className="text-white">BUILD AWESOME APPS</span></p>
            </div>
          </RetroCard>
        </div>

        {/* Avatar / Stats Section */}
        <motion.div 
          className="w-full md:w-1/3 space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="pixel-border bg-black/60 relative overflow-hidden group">
            <div className="aspect-square bg-gray-900 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&h=600&fit=crop" 
                alt="Avatar" 
                className="w-full h-full object-cover filter contrast-125 sepia-[.5] hue-rotate-[320deg] group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10"></div>
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <span className="bg-black text-primary px-2 font-display text-xs border border-primary">LVL. 99 ENGINEER</span>
            </div>
          </div>

          <RetroCard title="SKILL_TREE" delay={0.6}>
            <div className="space-y-4">
              <StatsBar label="REACT / NEXT.JS" value={95} color="#FF00FF" />
              <StatsBar label="TYPESCRIPT" value={90} color="#00FFFF" />
              <StatsBar label="NODE / BACKEND" value={85} color="#FFFF00" />
              <StatsBar label="UI DESIGN" value={80} color="#00FF00" />
            </div>
          </RetroCard>
        </motion.div>
      </div>

      {/* Activities Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <RetroCard title="ACTIVITY_LOG">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
            {activities?.map((activity) => (
              <div key={activity.id} className="flex gap-4 items-start border-l-2 border-primary/30 pl-4 py-2 hover:bg-white/5 transition-colors">
                <div className="mt-1 text-primary">
                  {activity.icon === "Code" ? <Code size={20} /> : <Trophy size={20} />}
                </div>
                <div>
                  <h4 className="font-display text-sm text-white uppercase">{activity.title}</h4>
                  <p className="text-xs font-mono text-muted-foreground mb-1">{activity.date}</p>
                  <p className="text-xs font-mono text-gray-400">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </RetroCard>
      </motion.div>
    </div>
  );
}
