/**
 * ============================================
 * SERVER/STORAGE.TS - DATA ACCESS LAYER
 * ============================================
 * 
 * This file provides a unified interface for data storage.
 * It supports TWO modes:
 * 
 * 1. DATABASE MODE (when DATABASE_URL is set)
 *    - Uses PostgreSQL with Drizzle ORM
 *    - Data persists across server restarts
 *    - Production-ready
 * 
 * 2. MOCK MODE (when DATABASE_URL is not set)
 *    - Uses in-memory storage (JavaScript arrays)
 *    - Data resets on server restart
 *    - Perfect for development/demo
 * 
 * BENEFITS:
 * - App works without database setup
 * - Easy to switch between modes
 * - Same interface for both modes
 * - Great for learning and testing
 */

// Import database connection
import { db } from "./db";

// Import database table definitions
import { projects, messages, activities, profile } from "@shared/schema";

// Import Drizzle ORM query builder
import { eq } from "drizzle-orm";

// Import TypeScript types
import type { InsertMessage, Message, Project, InsertProject, Activity, InsertActivity, Profile, InsertProfile } from "@shared/schema";

/**
 * STORAGE INTERFACE
 * Defines all methods that storage must implement
 * Both MockStorage and DatabaseStorage follow this interface
 */
export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Messages (contact form)
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Activities (achievements)
  getActivities(): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Profile (user info)
  getProfile(): Promise<Profile | undefined>;
  updateProfile(profileData: InsertProfile): Promise<Profile>;
}

/**
 * ============================================
 * MOCK STORAGE CLASS
 * ============================================
 * 
 * In-memory storage using JavaScript arrays
 * Used when DATABASE_URL environment variable is not set
 * 
 * FEATURES:
 * - No database required
 * - Fast (everything in memory)
 * - Auto-incrementing IDs
 * - Data resets on server restart
 * 
 * PERFECT FOR:
 * - Development
 * - Testing
 * - Demo deployments
 * - Learning React without database setup
 */
class MockStorage implements IStorage {
  // In-memory data arrays
  private projectsData: Project[] = [];
  private messagesData: Message[] = [];
  private activitiesData: Activity[] = [];
  private profileData: Profile | null = null;
  
  // Auto-increment counters for IDs
  private nextProjectId = 1;
  private nextMessageId = 1;
  private nextActivityId = 1;

  /**
   * GET ALL PROJECTS
   * Returns array of all projects
   */
  async getProjects(): Promise<Project[]> {
    return this.projectsData;
  }

  /**
   * GET SINGLE PROJECT
   * Finds project by ID
   * @param id - Project ID to find
   * @returns Project or undefined if not found
   */
  async getProject(id: number): Promise<Project | undefined> {
    return this.projectsData.find(p => p.id === id);
  }

  /**
   * CREATE PROJECT
   * Adds new project to array with auto-generated ID
   * @param insertProject - Project data without ID
   * @returns Created project with ID
   */
  async createProject(insertProject: InsertProject): Promise<Project> {
    const project: Project = { 
      ...insertProject, 
      id: this.nextProjectId++, // Auto-increment ID
      isFeatured: insertProject.isFeatured ?? false // Default to false
    };
    this.projectsData.push(project);
    return project;
  }

  /**
   * CREATE MESSAGE
   * Saves contact form submission
   * @param insertMessage - Message data without ID
   * @returns Created message with ID and timestamp
   */
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const message: Message = { 
      ...insertMessage, 
      id: this.nextMessageId++, 
      createdAt: new Date() // Add timestamp
    };
    this.messagesData.push(message);
    return message;
  }

  /**
   * GET ALL ACTIVITIES
   * Returns array of all activities/achievements
   */
  async getActivities(): Promise<Activity[]> {
    return this.activitiesData;
  }

  /**
   * CREATE ACTIVITY
   * Adds new activity/achievement
   * @param insertActivity - Activity data without ID
   * @returns Created activity with ID
   */
  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const activity: Activity = { 
      ...insertActivity, 
      id: this.nextActivityId++, 
      icon: insertActivity.icon ?? null // Default to null
    };
    this.activitiesData.push(activity);
    return activity;
  }

  /**
   * GET PROFILE
   * Returns user profile (only one profile exists)
   */
  async getProfile(): Promise<Profile | undefined> {
    return this.profileData ?? undefined;
  }

  /**
   * UPDATE PROFILE
   * Creates or updates user profile
   * @param profileData - Profile data
   * @returns Updated profile
   */
  async updateProfile(profileData: InsertProfile): Promise<Profile> {
    if (this.profileData) {
      // Update existing profile
      this.profileData = { ...this.profileData, ...profileData };
      return this.profileData;
    }
    // Create new profile
    this.profileData = { 
      ...profileData, 
      id: 1, // Profile always has ID 1
      instagramUrl: profileData.instagramUrl ?? null,
      githubUrl: profileData.githubUrl ?? null,
      linkedinUrl: profileData.linkedinUrl ?? null,
      twitterUrl: profileData.twitterUrl ?? null
    };
    return this.profileData;
  }
}

/**
 * ============================================
 * DATABASE STORAGE CLASS
 * ============================================
 * 
 * PostgreSQL storage using Drizzle ORM
 * Used when DATABASE_URL environment variable is set
 * 
 * FEATURES:
 * - Persistent data (survives server restarts)
 * - Production-ready
 * - ACID transactions
 * - Scalable
 * 
 * PERFECT FOR:
 * - Production deployments
 * - When you need data persistence
 * - Multiple users/sessions
 */
export class DatabaseStorage implements IStorage {
  /**
   * GET ALL PROJECTS
   * Queries database for all projects
   */
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  /**
   * GET SINGLE PROJECT
   * Queries database for project by ID
   * @param id - Project ID
   * @returns Project or undefined
   */
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  /**
   * CREATE PROJECT
   * Inserts new project into database
   * @param insertProject - Project data
   * @returns Created project with auto-generated ID
   */
  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  /**
   * CREATE MESSAGE
   * Inserts contact form message into database
   * @param insertMessage - Message data
   * @returns Created message with ID and timestamp
   */
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  /**
   * GET ALL ACTIVITIES
   * Queries database for all activities
   */
  async getActivities(): Promise<Activity[]> {
    return await db.select().from(activities);
  }

  /**
   * CREATE ACTIVITY
   * Inserts new activity into database
   * @param insertActivity - Activity data
   * @returns Created activity with ID
   */
  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const [activity] = await db.insert(activities).values(insertActivity).returning();
    return activity;
  }

  /**
   * GET PROFILE
   * Queries database for user profile
   * Only one profile exists (limit 1)
   */
  async getProfile(): Promise<Profile | undefined> {
    const [p] = await db.select().from(profile).limit(1);
    return p;
  }

  /**
   * UPDATE PROFILE
   * Updates existing profile or creates new one
   * @param profileData - Profile data
   * @returns Updated/created profile
   */
  async updateProfile(profileData: InsertProfile): Promise<Profile> {
    const existing = await this.getProfile();
    if (existing) {
      // Update existing profile
      const [p] = await db.update(profile).set(profileData).where(eq(profile.id, existing.id)).returning();
      return p;
    }
    // Create new profile
    const [p] = await db.insert(profile).values(profileData).returning();
    return p;
  }
}

/**
 * ============================================
 * STORAGE INSTANCE EXPORT
 * ============================================
 * 
 * Automatically chooses storage mode based on environment:
 * 
 * - If DATABASE_URL is set → Use DatabaseStorage (PostgreSQL)
 * - If DATABASE_URL is not set → Use MockStorage (in-memory)
 * 
 * This allows the app to work without any database setup!
 * Perfect for development, testing, and demo deployments.
 */
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MockStorage();

/**
 * ============================================
 * USAGE EXAMPLES
 * ============================================
 * 
 * // Get all projects
 * const projects = await storage.getProjects();
 * 
 * // Get single project
 * const project = await storage.getProject(1);
 * 
 * // Create project
 * const newProject = await storage.createProject({
 *   title: "My Project",
 *   description: "Description",
 *   imageUrl: "https://...",
 *   tags: ["React", "TypeScript"]
 * });
 * 
 * // Get profile
 * const profile = await storage.getProfile();
 * 
 * // Update profile
 * await storage.updateProfile({
 *   name: "Your Name",
 *   bio: "Your bio"
 * });
 * 
 * ============================================
 * SWITCHING BETWEEN MODES
 * ============================================
 * 
 * Development (no database):
 * - Don't set DATABASE_URL
 * - App uses MockStorage
 * - Data resets on restart
 * 
 * Production (with database):
 * - Set DATABASE_URL environment variable
 * - App uses DatabaseStorage
 * - Data persists
 * 
 * Example DATABASE_URL:
 * postgresql://user:password@host:5432/database
 */
