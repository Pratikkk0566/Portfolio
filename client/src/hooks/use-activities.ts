import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { Activity } from "@shared/schema";

export function useActivities() {
  return useQuery<Activity[]>({
    queryKey: [api.activities.list.path],
  });
}
