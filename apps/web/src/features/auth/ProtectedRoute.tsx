import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { ROUTES } from "../../lib/navigation";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 text-sm text-slate-500">
        Loading session...
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <Navigate
        to={ROUTES.signIn}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <>{children}</>;
}