import { ROUTES } from "./navigation";

export const ROUTE_LABELS: Record<string, string> = {
  [ROUTES.home]: "Home",
  [ROUTES.welcome]: "Welcome",
  [ROUTES.gps]: "Career GPS",
  [ROUTES.signIn]: "Sign In",
  [ROUTES.signUp]: "Sign Up",
  [ROUTES.dashboard]: "Dashboard",
  [ROUTES.workspace]: "Workspace",
  [ROUTES.wora]: "Wora AI Coach",
  [ROUTES.repath]: "RePath",
  [ROUTES.evidence]: "Evidence Graph",
  [ROUTES.resume]: "Resume Builder",
  [ROUTES.portfolio]: "Portfolio Builder",
};

export function getRouteLabel(path: string) {
  return ROUTE_LABELS[path] ?? "Page";
}