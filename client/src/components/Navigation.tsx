import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

export function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "START" },
    { href: "/projects", label: "QUESTS" },
    { href: "/contact", label: "COMM-LINK" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b-4 border-primary p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl text-primary hover:text-secondary transition-colors" style={{ fontFamily: "var(--font-display)" }}>
          <span className="animate-pulse">►</span> DEV_PORTFOLIO
        </Link>

        <div className="flex gap-4 md:gap-8">
          {links.map((link) => {
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href} className="relative group">
                <span 
                  className={`text-sm md:text-base font-bold tracking-widest transition-colors ${
                    isActive ? "text-accent" : "text-gray-400 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-accent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
