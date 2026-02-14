import { motion } from "framer-motion";

interface StatsBarProps {
  label: string;
  value: number; // 0-100
  color?: string;
}

export function StatsBar({ label, value, color = "var(--primary)" }: StatsBarProps) {
  return (
    <div className="mb-3 font-mono">
      <div className="flex justify-between text-xs mb-1 uppercase tracking-wider text-muted-foreground">
        <span>{label}</span>
        <span>{value}/100</span>
      </div>
      <div className="h-4 w-full bg-black border border-white/20 p-[2px] relative overflow-hidden">
        {/* Grid background for empty part */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: "linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.1) 50%)",
            backgroundSize: "4px 4px" 
          }} 
        />
        
        <motion.div 
          className="h-full relative"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ backgroundColor: color }}
        >
          {/* Animated shine effect */}
          <motion.div 
            className="absolute top-0 bottom-0 w-[20px] bg-white/30 skew-x-[-20deg]"
            animate={{ left: ["-20%", "120%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
