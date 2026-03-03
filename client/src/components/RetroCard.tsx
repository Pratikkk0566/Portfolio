/**
 * ============================================
 * RETROCARD.TSX - REUSABLE CARD COMPONENT
 * ============================================
 * 
 * A styled card container with retro/cyberpunk aesthetic.
 * 
 * FEATURES:
 * - Fade-in animation on mount
 * - Optional title label
 * - Corner decorations
 * - Customizable styling
 * - Accepts any content as children
 * 
 * CONCEPTS DEMONSTRATED:
 * - Props (receiving data from parent)
 * - TypeScript interfaces (type safety)
 * - Default prop values
 * - Children prop (content composition)
 * - Conditional rendering
 * - Framer Motion animations
 */

// ANIMATION: Framer Motion for entrance animations
import { motion } from "framer-motion";

/**
 * TYPESCRIPT INTERFACE
 * Defines what props this component accepts
 * Think of it like a contract: "If you use RetroCard, you must provide these props"
 */
interface RetroCardProps {
  // children: Any valid React content (text, elements, components)
  children: React.ReactNode;
  
  // title?: Optional string for card title (? means optional)
  title?: string;
  
  // className?: Optional additional CSS classes
  className?: string;
  
  // delay?: Optional animation delay in seconds
  delay?: number;
}

/**
 * RetroCard Component
 * A reusable card with retro styling and animations
 * 
 * USAGE EXAMPLE:
 * <RetroCard title="PROFILE" className="max-w-md" delay={0.2}>
 *   <p>Card content goes here</p>
 * </RetroCard>
 */
export function RetroCard({ 
  children,           // Content inside the card
  title,              // Optional title
  className = "",     // Default to empty string if not provided
  delay = 0           // Default to 0 seconds delay if not provided
}: RetroCardProps) {
  
  return (
    // MOTION.DIV: Animated div from Framer Motion
    <motion.div
      // INITIAL STATE: How the card looks before animation
      initial={{ opacity: 0, y: 20 }}  // Invisible, 20px down
      
      // ANIMATE TO: Final state after animation
      animate={{ opacity: 1, y: 0 }}   // Fully visible, normal position
      
      // TRANSITION: How the animation behaves
      transition={{ 
        duration: 0.5,  // Animation takes 0.5 seconds
        delay           // Wait 'delay' seconds before starting
      }}
      
      // CLASSES: Combine base styles with custom className
      // Template literal allows inserting the className prop
      className={`relative bg-black/60 border-2 border-border p-1 ${className}`}
    >
      
      {/* CORNER DECORATIONS: Four small squares at corners */}
      {/* absolute positioning places them outside the card */}
      <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary" />

      {/* TITLE LABEL: Only renders if title prop is provided */}
      {/* This is CONDITIONAL RENDERING: {condition && <element>} */}
      {title && (
        <div className="absolute -top-3 left-4 bg-background px-2 border border-border">
          <span className="text-xs text-primary font-bold tracking-widest uppercase font-mono">
            {/* Display title in brackets: [TITLE] */}
            [{title}]
          </span>
        </div>
      )}

      {/* CONTENT AREA: Where children are rendered */}
      <div className="p-4 h-full relative z-10">
        {/* CHILDREN: Whatever content was passed between <RetroCard>...</RetroCard> */}
        {children}
      </div>
    </motion.div>
  );
}

/**
 * KEY CONCEPTS:
 * 
 * 1. PROPS
 *    - Data passed from parent to child component
 *    - Like function parameters
 *    - RetroCard receives: children, title, className, delay
 * 
 * 2. TYPESCRIPT INTERFACE
 *    interface RetroCardProps { ... }
 *    - Defines the shape of props
 *    - Provides type safety and autocomplete
 *    - Catches errors before runtime
 * 
 * 3. DEFAULT VALUES
 *    className = "", delay = 0
 *    - If parent doesn't provide these props, use defaults
 *    - Makes props optional while ensuring they always have a value
 * 
 * 4. CHILDREN PROP
 *    {children}
 *    - Special prop that contains content between opening/closing tags
 *    - Allows component composition
 *    - Makes components flexible and reusable
 * 
 * 5. CONDITIONAL RENDERING
 *    {title && <div>...</div>}
 *    - Only renders the div if title exists
 *    - && operator: if left is truthy, render right
 *    - Prevents rendering empty title labels
 * 
 * 6. TEMPLATE LITERALS
 *    className={`base-classes ${className}`}
 *    - Backticks allow string interpolation
 *    - Combines base styles with custom styles
 *    - ${} inserts JavaScript expressions
 * 
 * 7. FRAMER MOTION
 *    <motion.div initial={...} animate={...}>
 *    - Creates smooth animations
 *    - initial: starting state
 *    - animate: ending state
 *    - transition: how to get from initial to animate
 * 
 * HOW IT'S USED IN YOUR APP:
 * 
 * // In Home.tsx
 * <RetroCard title="CURRENT_STATUS" className="max-w-md" delay={0.4}>
 *   <div className="font-mono text-sm">
 *     <p>LOCATION: CYBERSPACE</p>
 *     <p>AVAILABILITY: OPEN FOR WORK</p>
 *   </div>
 * </RetroCard>
 * 
 * WHAT HAPPENS:
 * 1. RetroCard receives props:
 *    - title = "CURRENT_STATUS"
 *    - className = "max-w-md"
 *    - delay = 0.4
 *    - children = the <div> with paragraphs
 * 
 * 2. Component renders:
 *    - Waits 0.4 seconds (delay)
 *    - Fades in from invisible to visible
 *    - Slides up from 20px below
 *    - Shows title "[CURRENT_STATUS]" at top
 *    - Displays the children content inside
 * 
 * TRY THIS:
 * - Change delay to 2 to see slower animation
 * - Remove the title prop to hide the title label
 * - Add more corner decorations
 * - Change initial={{ opacity: 0, y: 20 }} to y: -20 (slide from above)
 */
