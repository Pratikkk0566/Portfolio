/**
 * ============================================
 * SERVER/ROUTES.TS - API ROUTE HANDLERS
 * ============================================
 * 
 * This file defines all API endpoints for the portfolio:
 * - GET /api/profile - Get user profile
 * - GET /api/activities - Get activity log
 * - GET /api/projects - Get all projects
 * - GET /api/projects/:id - Get single project
 * - POST /api/messages - Submit contact form
 * 
 * ALSO handles initial data seeding (profile, activities, projects)
 * 
 * DATA FLOW:
 * Client → API Route → Storage Layer → Database/Mock Storage → Response
 */

// Import Express types
import type { Express } from "express";
import { type Server } from "http";

// Import storage layer (handles database operations)
import { storage } from "./storage";

// Import Zod schema for validating message data
import { insertMessageSchema } from "@shared/schema";

/**
 * REGISTER ROUTES FUNCTION
 * Sets up all API endpoints and seeds initial data
 * 
 * @param httpServer - HTTP server instance (for WebSockets if needed)
 * @param app - Express application instance
 * @returns HTTP server instance
 */
export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  
  /**
   * ============================================
   * DATA SEEDING - PROFILE
   * ============================================
   * 
   * Check if profile exists, if not create default profile
   * This runs once when server starts
   */
  const existingProfile = await storage.getProfile();
  if (!existingProfile) {
    await storage.updateProfile({
      name: "Pranay Vilas Gourkar",
      bio: "Frontend Developer specializing in React and React Native. Building modern web and mobile experiences with HTML, CSS, JavaScript, and Bootstrap. Leveraging AI tools like Kiro, Claude, and GitHub Copilot to enhance development workflow.",
      githubUrl: "https://github.com/Pratikkk0566",
      instagramUrl: "https://www.instagram.com/not_pratikkk/",
      linkedinUrl: "https://www.linkedin.com/in/pranay-gourkar-2a878434a/",
      twitterUrl: null, // No Twitter account
    });
  }

  /**
   * ============================================
   * DATA SEEDING - ACTIVITIES
   * ============================================
   * 
   * Create initial activities if none exist
   * Activities show up in the "Activity Log" section on home page
   */
  const existingActivities = await storage.getActivities();
  if (existingActivities.length === 0) {
    // Activity 1: Robowars Championship
    await storage.createActivity({
      title: "National Level Robowars Champion",
      description: "1st place winner in 15kg category at National Level Robowars competition in Nanded.",
      date: "Mar 2026",
      icon: "Trophy", // Shows trophy icon
    });
    
    // Activity 2: Smart India Hackathon
    await storage.createActivity({
      title: "Smart India Hackathon",
      description: "Institute rank holder and team member at Smart India Hackathon.",
      date: "2026",
      icon: "Code", // Shows code icon
    });
    
    // Activity 3: Texcelerator Role
    await storage.createActivity({
      title: "Texcelerator Roboclub",
      description: "Core member and website designer of Texcelerator, a national level robotics team.",
      date: "Ongoing",
      icon: "Code", // Shows code icon
    });
  }

  /**
   * ============================================
   * DATA SEEDING - PROJECTS
   * ============================================
   * 
   * Create initial projects if none exist
   * Projects show up on the /projects page
   */
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    // Project 1: Texcelerators Website
    await storage.createProject({
      title: "Texcelerators",
      description: "Official website for Texcelerator Roboclub - a national level robotics team. Designed and developed as core team member using vanilla web technologies.",
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80",
      projectUrl: "https://github.com/Pratikkk0566/Texcelerators",
      repoUrl: "https://github.com/Pratikkk0566/Texcelerators",
      tags: ["HTML", "CSS", "JavaScript", "Web Design"],
      isFeatured: true // Shows as featured project
    });
    
    // Project 2: This Portfolio Website
    await storage.createProject({
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing projects and achievements. Built with React, TypeScript, and modern web technologies. Developed with AI assistance from Kiro AI, Replit AI, and GitHub Copilot.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
      projectUrl: "https://github.com/Pratikkk0566/Portfolio",
      repoUrl: "https://github.com/Pratikkk0566/Portfolio",
      tags: ["React", "TypeScript", "Tailwind CSS", "AI-Assisted"],
      isFeatured: true
    });

    // Project 3: Hardhat Detection Module
    await storage.createProject({
      title: "Hardhat Detection Module",
      description: "AI-powered safety system for detecting hardhat compliance in construction sites using computer vision and machine learning.",
      imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80",
      projectUrl: "https://github.com/Pratikkk0566/Hardhat_Detection_Module",
      repoUrl: "https://github.com/Pratikkk0566/Hardhat_Detection_Module",
      tags: ["Python", "Computer Vision", "AI/ML"],
      isFeatured: true
    });
  }

  /**
   * ============================================
   * API ROUTE: GET /api/profile
   * ============================================
   * 
   * Returns user profile information
   * Used by: Home page to display name, bio, social links
   * 
   * Response: { name, bio, githubUrl, instagramUrl, linkedinUrl, twitterUrl }
   */
  app.get("/api/profile", async (_req, res) => {
    const p = await storage.getProfile();
    
    // If no profile found, return 404
    if (!p) return res.status(404).json({ message: "Profile not found" });
    
    // Return profile data
    res.json(p);
  });

  /**
   * ============================================
   * API ROUTE: GET /api/activities
   * ============================================
   * 
   * Returns all activities/achievements
   * Used by: Home page "Activity Log" section
   * 
   * Response: [{ id, title, description, date, icon }, ...]
   */
  app.get("/api/activities", async (_req, res) => {
    const a = await storage.getActivities();
    res.json(a);
  });

  /**
   * ============================================
   * API ROUTE: GET /api/projects
   * ============================================
   * 
   * Returns all projects
   * Used by: Projects page to display project grid
   * 
   * Response: [{ id, title, description, imageUrl, projectUrl, repoUrl, tags, isFeatured }, ...]
   */
  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  /**
   * ============================================
   * API ROUTE: GET /api/projects/:id
   * ============================================
   * 
   * Returns a single project by ID
   * Used by: Project detail page (if implemented)
   * 
   * URL Parameter: id (number) - Project ID
   * Response: { id, title, description, ... }
   */
  app.get("/api/projects/:id", async (req, res) => {
    // Convert string ID to number
    const project = await storage.getProject(Number(req.params.id));
    
    // If project not found, return 404
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    
    // Return project data
    res.json(project);
  });

  /**
   * ============================================
   * API ROUTE: POST /api/messages
   * ============================================
   * 
   * Handles contact form submissions
   * Used by: Contact page form
   * 
   * Request Body: { name, email, message }
   * Response: { id, name, email, message, createdAt }
   * 
   * VALIDATION:
   * - Uses Zod schema to validate input
   * - Returns 400 if validation fails
   */
  app.post("/api/messages", async (req, res) => {
    try {
      // Validate request body against schema
      const messageData = insertMessageSchema.parse(req.body);
      
      // Save message to storage
      const message = await storage.createMessage(messageData);
      
      // Return created message with 201 status
      res.status(201).json(message);
    } catch (error) {
      // Validation failed or database error
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  // Return HTTP server instance
  return httpServer;
}

/**
 * ============================================
 * API ENDPOINTS SUMMARY
 * ============================================
 * 
 * GET    /api/profile       - Get user profile
 * GET    /api/activities    - Get all activities
 * GET    /api/projects      - Get all projects
 * GET    /api/projects/:id  - Get single project
 * POST   /api/messages      - Submit contact form
 * 
 * ============================================
 * DATA FLOW EXAMPLE
 * ============================================
 * 
 * 1. User visits home page
 * 2. React component calls useProfile() hook
 * 3. Hook makes GET request to /api/profile
 * 4. This route handler runs
 * 5. storage.getProfile() fetches from database/mock
 * 6. Profile data returned as JSON
 * 7. React component displays the data
 * 
 * ============================================
 * STORAGE LAYER
 * ============================================
 * 
 * The storage object handles all database operations:
 * - If DATABASE_URL is set: Uses PostgreSQL
 * - If not set: Uses in-memory mock storage
 * 
 * This allows the app to work without a database!
 */
