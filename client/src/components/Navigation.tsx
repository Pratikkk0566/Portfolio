/**
 * ============================================
 * NAVIGATION.TSX - TOP NAVIGATION BAR
 * ============================================
 * 
 * This component creates the navigation bar at the top of your site.
 * 
 * FEATURES:
 * - Fixed position (stays at top when scrolling)
 * - Active link highlighting
 * - Smooth animated underline
 * - Responsive design (mobile & desktop)
 * 
 * CONCEPTS DEMONSTRATED:
 * - useLocation hook (get current URL)
 * - Array mapping (render multiple links)
 * - Conditional styling (active vs inactive)
 * - Framer Motion animations
 */

// ROUTING: Link for navigation, useLocation to get current URL
import { Link, useLocation } from "wouter";

// ANIMATION: Framer Motion for smooth animations
import { motion } from "framer-motion";

/**
 * Navigation Component
 * Displays the top navigation bar with links
 */
export function Navigation() {
  // HOOK: Get current URL location
  // location will be "/", "/projects", or "/contact"
  const [location] = useLocation();
  
  // DATA: Array of navigation links
  // Each link has a URL (href) and display text (label)
  const links = [
    { href: "/", label: "START" },
    { href: "/projects", label: "QUESTS" },
    { href: "/contact", label: "COMM-LINK" },
  ];

  return (
    // CONTAINER: Fixed at top, spans full width
    // z-40 = high z-index to stay above other content
    // bg-black/80 = black background with 80% opacity
    // backdrop-blur-sm = blur effect behind the nav
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b-4 border-primary p-4">
      
      {/* INNER CONTAINER: Max width, centered, space between items */}
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* LOGO/BRAND: Links to home page */}
        <Link 
          href="/" 
          className="text-xl md:text-2xl text-primary hover:text-secondary transition-colors" 
          style={{ fontFamily: "var(--font-display)" }}
        >
          {/* Animated arrow symbol */}
          <span className="animate-pulse">►</span> PRANAY GOURKAR
        </Link>

        {/* NAVIGATION LINKS CONTAINER */}
        <div className="flex gap-4 md:gap-8">
          
          {/* MAP OVER LINKS ARRAY: Create a Link for each item */}
          {links.map((link) => {
            // CHECK: Is this link the current page?
            const isActive = location === link.href;
            
            return (
              // LINK WRAPPER: key is required for arrays in React
              <Link key={link.href} href={link.href} className="relative group">
                
                {/* LINK TEXT */}
                <span 
                  className={`text-sm md:text-base font-bold tracking-widest transition-colors ${
                    // CONDITIONAL STYLING: Different colors for active vs inactive
                    isActive ? "text-accent" : "text-gray-400 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {link.label}
                </span>
                
                {/* ANIMATED UNDERLINE: Only shows on active link */}
                {isActive && (
                  <motion.div
                    // layoutId: Framer Motion uses this to animate between links
                    layoutId="underline"
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-accent"
                    initial={false}
                    // Spring animation: bouncy, smooth movement
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

/**
 * KEY CONCEPTS:
 * 
 * 1. HOOKS
 *    const [location] = useLocation();
 *    - Gets current URL path
 *    - Updates when user navigates
 * 
 * 2. ARRAY MAPPING
 *    links.map((link) => <Link>...</Link>)
 *    - Transforms array into JSX elements
 *    - Each item needs unique "key" prop
 * 
 * 3. CONDITIONAL RENDERING
 *    {isActive && <motion.div>...</motion.div>}
 *    - Only renders underline if link is active
 *    - && means "if left side is true, render right side"
 * 
 * 4. CONDITIONAL STYLING
 *    className={isActive ? "text-accent" : "text-gray-400"}
 *    - Ternary operator: condition ? ifTrue : ifFalse
 *    - Changes color based on active state
 * 
 * 5. TEMPLATE LITERALS
 *    className={`base-class ${isActive ? "active" : "inactive"}`}
 *    - Backticks allow string interpolation
 *    - ${} inserts JavaScript expressions
 * 
 * TRY THIS:
 * - Add a new link to the links array
 * - Change "START" to "HOME"
 * - Remove the animated underline (delete the motion.div)
 * - Add console.log(location) to see current URL
 */
