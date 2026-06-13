import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { fetchCurrentWorkspaceDay } from "../lib/workspace-api";
import { useWorkspaceStore } from "../store/useWorkspaceStore";

export function useWorkspaceDay() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const setWorkspaceDay = useWorkspaceStore((state) => state.setWorkspaceDay);
  const setLoading = useWorkspaceStore((state) => state.setLoading);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!isLoaded) return;

      if (!isSignedIn) {
        if (!cancelled) {
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);

        const token = await getToken();

        // 💚 Only pull the complete, comprehensive workspace dataset payload
        const dayPayload = await fetchCurrentWorkspaceDay(token);

        if (!cancelled) {
          setWorkspaceDay(dayPayload);
          // 💡 If your store has a separate loading flag, toggle it off here upon success
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to load workspace day", error);

        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [getToken, isLoaded, isSignedIn, setLoading, setWorkspaceDay]);
}