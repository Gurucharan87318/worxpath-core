import { SignIn, useAuth } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

export default function SignInPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const location = useLocation();

  const from =
    (location.state as { from?: string } | null)?.from || "/dashboard";

  if (!isLoaded) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-slate-500">
        Loading…
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[#F8F9FA] px-6">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        fallbackRedirectUrl={from}
      />
    </div>
  );
}