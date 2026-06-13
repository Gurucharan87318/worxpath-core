// src/features/auth/useClerkToken.ts
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

// Keeps the global API client token fresh whenever auth state changes
export function useClerkToken() {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      (window as any).__worxpath_clerk_token = null;
      return;
    }

    // Set immediately
    getToken().then((t) => {
      (window as any).__worxpath_clerk_token = t;
    });

    // Refresh every 50 seconds (Clerk tokens expire in 60s)
    const interval = setInterval(() => {
      getToken().then((t) => {
        (window as any).__worxpath_clerk_token = t;
      });
    }, 50_000);

    return () => clearInterval(interval);
  }, [isSignedIn, getToken]);
}