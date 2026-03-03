/**
 * ============================================
 * USE-PROJECTS.TS - FETCH PROJECTS DATA
 * ============================================
 * 
 * Custom hooks for fetching project data from the server.
 * 
 * HOOKS PROVIDED:
 * - useProjects() - Fetches all projects
 * - useProject(id) - Fetches a single project by ID
 * 
 * CONCEPTS DEMONSTRATED:
 * - Custom hooks
 * - React Query (useQuery)
 * - Data fetching
 * - Error handling
 */

// REACT QUERY: Library for data fetching
import { useQuery } from "@tanstack/react-query";

// API ROUTES: Shared route definitions
import { api, buildUrl } from "@shared/routes";

// TYPESCRIPT TYPES: Project data structure
import type { Project } from "@shared/schema";

/**
 * useProjects Hook
 * Fetches all projects from the server
 * 
 * RETURNS:
 * {
 *   data: Project[] | undefined,   // Array of projects
 *   isLoading: boolean,            // True while fetching
 *   isError: boolean,              // True if request failed
 *   error: Error | null,           // Error object if failed
 * }
 * 
 * USAGE:
 * const { data: projects, isLoading, error } = useProjects();
 */
export function useProjects() {
  return useQuery<Project[]>({
    // QUERY KEY: Unique identifier for this query
    queryKey: [api.projects.list.path],
    
    // QUERY FUNCTION: How to fetch the data
    queryFn: async () => {
      // Make GET request to /api/projects
      const res = await fetch(api.projects.list.path, { 
        credentials: "include" 
      });
      
      // Check if request was successful
      if (!res.ok) {
        throw new Error("Failed to load projects");
      }
      
      // Parse and return JSON response
      return await res.json();
    },
  });
}

/**
 * useProject Hook
 * Fetches a single project by ID
 * 
 * PARAMETERS:
 * - id: number - The project ID to fetch
 * 
 * RETURNS:
 * Same as useProjects but for a single project
 * 
 * USAGE:
 * const { data: project } = useProject(1);
 */
export function useProject(id: number) {
  return useQuery<Project>({
    // QUERY KEY: Include ID so each project has unique cache
    queryKey: [api.projects.get.path, id],
    
    // QUERY FUNCTION: Fetch specific project
    queryFn: async () => {
      // Build URL with ID: /api/projects/:id → /api/projects/1
      const url = buildUrl(api.projects.get.path, { id });
      
      // Make GET request
      const res = await fetch(url, { credentials: "include" });
      
      // Check if successful
      if (!res.ok) {
        throw new Error("Failed to load project");
      }
      
      // Parse and return JSON
      return await res.json();
    },
    
    // ENABLED: Only run query if ID is provided
    // Prevents fetching when id is 0, null, or undefined
    enabled: !!id,
  });
}

/**
 * HOW THIS WORKS:
 * 
 * 1. Component calls useProjects()
 * 2. React Query checks cache
 * 3. If not cached, runs queryFn
 * 4. queryFn fetches from /api/projects
 * 5. Server returns array of projects
 * 6. React Query caches the result
 * 7. Component re-renders with data
 * 
 * ERROR HANDLING:
 * - If fetch fails, isError becomes true
 * - Error message available in error property
 * - Component can show error UI
 * 
 * LOADING STATES:
 * - isLoading: true while fetching
 * - data: undefined while loading
 * - After success: isLoading false, data populated
 * 
 * TRY THIS:
 * - Add console.log("Fetching projects...") in queryFn
 * - Check Network tab in browser DevTools
 * - See the /api/projects request
 */