import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import LandingPage from "../pages/LandingPage";
import WelcomePage from "../pages/WelcomePage";
import CareerGPSPage from "../pages/CareerGPSPage";
import DashboardPage from "../pages/DashboardPage";
import WorkspacePage from "../pages/WorkspacePage";
import WoraPage from "../pages/WoraPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import EvidenceGraphPage from "../pages/EvidenceGraphPage";
import ResumeBuilderPage from "../pages/ResumeBuilderPage";
import RePathPage from "../pages/RePathPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-slate-500">
        Loading…
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/gps" element={<CareerGPSPage />} />
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workspace"
        element={
          <ProtectedRoute>
            <WorkspacePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wora"
        element={
          <ProtectedRoute>
            <WoraPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/repath"
        element={
          <ProtectedRoute>
            <RePathPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/evidence"
        element={
          <ProtectedRoute>
            <EvidenceGraphPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resume"
        element={
          <ProtectedRoute>
            <ResumeBuilderPage />
          </ProtectedRoute>
        }
      />

      <Route
  path="/repath"
  element={
    <ProtectedRoute>
      <RePathPage />
    </ProtectedRoute>
  }
/>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}