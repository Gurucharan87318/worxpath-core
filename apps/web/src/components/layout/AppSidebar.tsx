import { NavLink } from "react-router-dom";
import {
  Compass,
  LayoutDashboard,
  BookOpen,
  Sparkles,
  RefreshCcw,
  Network,
  FileText,
  Briefcase,
} from "lucide-react";
import { ROUTES } from "../../lib/navigation";

const navItems = [
  { label: "Dashboard", to: ROUTES.dashboard, icon: LayoutDashboard },
  { label: "Career GPS", to: ROUTES.gps, icon: Compass },
  { label: "Workspace", to: ROUTES.workspace, icon: BookOpen },
  { label: "Wora", to: ROUTES.wora, icon: Sparkles },
  { label: "RePath", to: ROUTES.repath, icon: RefreshCcw },
  { label: "Evidence", to: ROUTES.evidence, icon: Network },
  { label: "Resume", to: ROUTES.resume, icon: FileText },
  { label: "Portfolio", to: ROUTES.portfolio, icon: Briefcase },
];

export default function AppSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="border-b border-slate-200 px-6 py-5">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">
          Worxpath
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
          Employability OS
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Frontend shell for the 100-day transition system.
        </p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              ].join(" ")
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Current build phase
          </div>
          <div className="mt-2 text-sm font-semibold text-slate-900">
            Frontend-first implementation
          </div>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Backend sync, scoring, progress persistence, and AI completion are deferred.
          </p>
        </div>
      </div>
    </aside>
  );
}