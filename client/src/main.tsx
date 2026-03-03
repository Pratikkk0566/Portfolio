/**
 * ============================================
 * MAIN.TSX - THE ENTRY POINT OF YOUR REACT APP
 * ============================================
 * 
 * This is where your React application starts!
 * Think of this as the "ignition" that starts your car.
 * 
 * WHAT HAPPENS HERE:
 * 1. Import React's createRoot function
 * 2. Import your main App component
 * 3. Import global CSS styles
 * 4. Find the HTML element with id="root"
 * 5. Create a React root inside that element
 * 6. Render (display) your App component
 * 
 * EXECUTION ORDER:
 * index.html loads → main.tsx runs → App.tsx renders
 */

// Import the createRoot function from React DOM
// This function creates a "root" where React will render your app
import { createRoot } from "react-dom/client";

// Import your main App component (defined in App.tsx)
// This is the top-level component that contains everything
import App from "./App";

// Import global CSS styles that apply to the entire app
import "./index.css";

// STEP 1: Find the HTML element with id="root"
// The "!" tells TypeScript "I'm sure this element exists"
const rootElement = document.getElementById("root")!;

// STEP 2: Create a React root in that element
// This is where React will "plant" your component tree
const root = createRoot(rootElement);

// STEP 3: Render your App component inside the root
// <App /> is JSX syntax - it creates an instance of your App component
root.render(<App />);

/**
 * WHAT HAPPENS NEXT?
 * React will:
 * 1. Execute the App component function
 * 2. Convert the JSX to real HTML elements
 * 3. Insert those elements into the <div id="root"> in index.html
 * 4. Your app is now visible in the browser!
 * 
 * TRY THIS:
 * - Add console.log("App starting!") above createRoot
 * - Open browser console to see when this file runs
 * - Change <App /> to <div>Hello World</div> to see direct rendering
 */
