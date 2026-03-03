/**
 * ============================================
 * APP.TSX - THE ROOT COMPONENT
 * ============================================
 * 
 * This is the main component of your application.
 * It sets up:
 * - Routing (different pages)
 * - Data fetching (React Query)
 * - Global providers (tooltips, toasts)
 * - Layout (navigation, footer)
 * 
 * COMPONENT HIERARCHY:
 * App
 * ├── QueryClientProvider (enables data fetching)
 * │   └── TooltipProvider (enables tooltips)
 * │       ├── Router (handles navigation)
 * │       │   ├── Navigation (top bar)
 * │       │   ├── Switch (shows one page at a time)
 * │       │   │   ├── Home (/)
 * │       │   │   ├── Projects (/projects)
 * │       │   │   ├── Contact (/contact)
 * │       │   │   └── NotFound (404)
 * │       │   └── Footer
 * │       └── Toaster (shows notifications)
 */

// ROUTING: Navigate between pages without page reload
import { Switch, Route } from "wouter";

// DATA FETCHING: React Query for server data
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

// UI COMPONENTS: Pre-built components from shadcn/ui
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// CUSTOM COMPONENTS: Your own components
import { Navigation } from "@/components/Navigation";

// PAGE COMPONENTS: Each page of your site
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

/**
 * Router Component
 * Handles the layout and routing logic
 */
function Router() {
  return (
    // Main container: full height, flexbox column layout
    <div className="relative min-h-screen flex flex-col">
      
      {/* NAVIGATION BAR - Always visible at top */}
      <Navigation />
      
      {/* MAIN CONTENT AREA - Grows to fill available space */}
      <main className="flex-grow z-10">
        
        {/* SWITCH: Shows only ONE route at a time based on URL */}
        <Switch>
          {/* When URL is "/", show Home component */}
          <Route path="/" component={Home} />
          
          {/* When URL is "/projects", show Projects component */}
          <Route path="/projects" component={Projects} />
          
          {/* When URL is "/contact", show Contact component */}
          <Route path="/contact" component={Contact} />
          
          {/* If no route matches, show NotFound (404 page) */}
          <Route component={NotFound} />
        </Switch>
      </main>
      
      {/* FOOTER - Always visible at bottom */}
      <footer className="py-6 bg-black border-t-4 border-primary mt-auto z-10 relative">
        <div className="max-w-6xl mx-auto px-4 text-center font-mono text-xs text-muted-foreground">
          {/* Dynamic year using JavaScript */}
          <p>© {new Date().getFullYear()} PRANAY VILAS GOURKAR. ALL RIGHTS RESERVED.</p>
          <p className="mt-2 text-[10px] uppercase">
            Built with React <span className="text-primary mx-1">+</span> TypeScript <span className="text-secondary mx-1">+</span> Tailwind CSS
          </p>
          <p className="mt-1 text-[9px] text-muted-foreground/60">
            Developed with AI assistance: Kiro AI • Replit AI • GitHub Copilot
          </p>
        </div>
      </footer>

      {/* VISUAL EFFECTS - Retro/cyberpunk styling */}
      <div className="scanlines"></div>
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>
    </div>
  );
}

/**
 * App Component - The Root
 * Wraps everything in providers that give special powers to child components
 */
function App() {
  return (
    // PROVIDER 1: QueryClientProvider
    // Enables all child components to fetch data from the server
    // Uses React Query for caching, loading states, error handling
    <QueryClientProvider client={queryClient}>
      
      {/* PROVIDER 2: TooltipProvider */}
      {/* Enables tooltip functionality throughout the app */}
      <TooltipProvider>
        
        {/* The main Router component with all pages */}
        <Router />
        
        {/* Toaster: Shows popup notifications (success, error, etc.) */}
        <Toaster />
        
      </TooltipProvider>
    </QueryClientProvider>
  );
}

// Export App so main.tsx can import and render it
export default App;

/**
 * KEY CONCEPTS DEMONSTRATED:
 * 
 * 1. COMPONENT COMPOSITION
 *    - Small components combined to build complex UI
 *    - Router contains Navigation, Switch, Footer
 * 
 * 2. PROVIDERS (Context Pattern)
 *    - Wrap components to give them special abilities
 *    - QueryClientProvider → enables data fetching
 *    - TooltipProvider → enables tooltips
 * 
 * 3. ROUTING
 *    - Switch shows one route at a time
 *    - Route components map URLs to components
 *    - No page reload when navigating!
 * 
 * 4. LAYOUT
 *    - Navigation always at top
 *    - Main content in middle (grows to fill space)
 *    - Footer always at bottom
 * 
 * TRY THIS:
 * - Add a new route: <Route path="/about" component={About} />
 * - Change the footer text
 * - Add console.log("App rendered!") to see when it runs
 */
