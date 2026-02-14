import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { Profile } from "@shared/schema";

export function useProfile() {
  return useQuery<Profile>({
    queryKey: [api.profile.get.path],
  });
}
