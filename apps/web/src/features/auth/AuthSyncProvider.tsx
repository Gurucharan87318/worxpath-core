import { useAuth } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import { api } from "../../lib/api";

type Props = {
  children: React.ReactNode;
};

export function AuthSyncProvider({ children }: Props) {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const syncedRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || syncedRef.current) return;

    const sync = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        (window as any).__worxpath_clerk_token = token;

        await api.post(
          "/auth/sync",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        syncedRef.current = true;
      } catch (error) {
        console.error("Auth sync failed", error);
      }
    };

    sync();
  }, [getToken, isLoaded, isSignedIn]);

  return <>{children}</>;
}