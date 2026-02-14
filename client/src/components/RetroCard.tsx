import { motion } from "framer-motion";

interface RetroCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  delay?: number;
}

export function RetroCard({ children, title, className = "", delay = 0 }: RetroCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative bg-black/60 border-2 border-border p-1 ${className}`}
    >
      {/* Corner decorations */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary" />

      {title && (
        <div className="absolute -top-3 left-4 bg-background px-2 border border-border">
          <span className="text-xs text-primary font-bold tracking-widest uppercase font-mono">
            [{title}]
          </span>
        </div>
      )}

      <div className="p-4 h-full relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
