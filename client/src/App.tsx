import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow z-10">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      {/* Footer */}
      <footer className="py-6 bg-black border-t-4 border-primary mt-auto z-10 relative">
        <div className="max-w-6xl mx-auto px-4 text-center font-mono text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} DEV_PORTFOLIO. ALL RIGHTS RESERVED.</p>
          <p className="mt-2 text-[10px] uppercase">
            Built with React <span className="text-primary mx-1">+</span> Tailwind <span className="text-secondary mx-1">+</span> Replit
          </p>
        </div>
      </footer>

      {/* Retro background effects */}
      <div className="scanlines"></div>
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
