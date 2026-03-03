/**
 * ============================================
 * USE-PROFILE.TS - CUSTOM HOOK FOR PROFILE DATA
 * ============================================
 * 
 * This is a CUSTOM HOOK that fetches profile data from the server.
 * 
 * WHAT IS A CUSTOM HOOK?
 * - A function that uses other hooks
 * - Starts with "use" (naming convention)
 * - Reusable logic that any component can use
 * - Encapsulates data fetching logic
 * 
 * WHY USE CUSTOM HOOKS?
 * - Don't repeat yourself (DRY principle)
 * - Multiple components can fetch the same data
 * - Centralized data fetching logic
 * - Easy to update in one place
 * 
 * CONCEPTS DEMONSTRATED:
 * - Custom hooks
 * - React Query (useQuery)
 * - TypeScript generics
 * - API integration
 */

// REACT QUERY: Library for data fetching, caching, and state management
import { useQuery } from "@tanstack/react-query";

// API ROUTES: Shared route definitions
import { api } from "@shared/routes";

// TYPESCRIPT TYPE: Profile data structure
import type { Profile } from "@shared/schema";

/**
 * useProfile Hook
 * Fetches user profile data from the server
 * 
 * RETURNS:
 * {
 *   data: Profile | undefined,     // The profile data (undefined while loading)
 *   isLoading: boolean,            // True while fetching
 *   isError: boolean,              // True if request failed
 *   error: Error | null,           // Error object if failed
 *   refetch: () => void,           // Function to manually refetch
 * }
 * 
 * USAGE EXAMPLE:
 * const { data: profile, isLoading } = useProfile();
 * 
 * if (isLoading) return <Spinner />;
 * return <h1>{profile?.name}</h1>;
 */
export function useProfile() {
  // USE QUERY: React Query hook for data fetching
  return useQuery<Profile>({
    // QUERY KEY: Unique identifier for this query
    // React Query uses this to cache and track the request
    // If the key changes, it refetches the data
    queryKey: [api.profile.get.path],
    
    // NOTE: queryFn is not specified here!
    // React Query automatically fetches from the queryKey URL
    // This works because of the QueryClient configuration in queryClient.ts
    // The default queryFn does: fetch(queryKey[0])
  });
}

/**
 * HOW THIS WORKS:
 * 
 * 1. Component calls useProfile()
 *    const { data: profile, isLoading } = useProfile();
 * 
 * 2. useQuery checks cache
 *    - If data exists and is fresh, return cached data
 *    - If data is stale or doesn't exist, fetch from server
 * 
 * 3. Fetch request
 *    - GET request to /api/profile
 *    - Server responds with profile data
 * 
 * 4. React Query updates
 *    - Stores data in cache
 *    - Updates isLoading to false
 *    - Component re-renders with new data
 * 
 * 5. Subsequent calls
 *    - Other components calling useProfile() get cached data
 *    - No duplicate requests!
 * 
 * BENEFITS OF REACT QUERY:
 * - Automatic caching (no duplicate requests)
 * - Loading states (isLoading, isError)
 * - Automatic refetching (when window regains focus)
 * - Error handling
 * - Optimistic updates
 * - Pagination support
 * 
 * TYPESCRIPT GENERIC:
 * useQuery<Profile>
 * - <Profile> tells TypeScript what type of data to expect
 * - Provides autocomplete and type checking
 * - data will be typed as Profile | undefined
 * 
 * WHERE IT'S USED:
 * - Home.tsx: Display profile info
 * - Any component that needs user profile data
 * 
 * TRY THIS:
 * - Add console.log("Fetching profile...") before return
 * - Use the hook in multiple components and see it only fetches once
 * - Check Network tab in browser DevTools to see the request
 */
