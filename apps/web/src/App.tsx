import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import AppRouter from "./routes/AppRouter";
import { setApiAuthGetter } from "./lib/api";

export default function App() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user?.id) {
      setApiAuthGetter(null);
      return;
    }

    setApiAuthGetter(async () => {
      const token = await getToken();

      return {
        token: token ?? null,
        clerkUserId: user.id ?? null,
        email: user.primaryEmailAddress?.emailAddress ?? null,
        name: user.fullName ?? user.firstName ?? null,
        avatarUrl: user.imageUrl ?? null,
      };
    });

    return () => setApiAuthGetter(null);
  }, [
    getToken,
    isLoaded,
    isSignedIn,
    user?.id,
    user?.fullName,
    user?.firstName,
    user?.imageUrl,
    user?.primaryEmailAddress?.emailAddress,
  ]);

  return <AppRouter />;
}