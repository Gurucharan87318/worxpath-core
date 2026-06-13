import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { fetchRePathStatus } from "../api";

export function useRePathStatus() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  return useQuery({
    queryKey: ["repath-status", user?.id],
    queryFn: fetchRePathStatus,
    enabled: isLoaded && isSignedIn && !!user?.id,
    retry: false,
  });
}