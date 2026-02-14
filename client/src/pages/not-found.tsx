import { Link } from "wouter";
import { RetroCard } from "@/components/RetroCard";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <RetroCard className="max-w-md w-full text-center p-8 border-destructive">
        <h1 className="text-6xl font-display text-destructive mb-4 animate-pulse">404</h1>
        <h2 className="text-xl font-mono text-white mb-6">SECTOR NOT FOUND</h2>
        <p className="text-muted-foreground font-mono mb-8">
          The requested data sector has been corrupted or does not exist in this reality.
        </p>

        <Link href="/">
          <button className="pixel-btn bg-destructive hover:bg-destructive/80 text-white w-full">
            RETURN TO BASE
          </button>
        </Link>
      </RetroCard>
    </div>
  );
}
