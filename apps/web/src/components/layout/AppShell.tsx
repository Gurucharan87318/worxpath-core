import { Link, useLocation, useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import {
  BarChart3,
  BriefcaseBusiness,
  FileText,
  LogOut,
  Menu,
  Radar,
  ShieldCheck,
  SquareTerminal,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";
import { ROUTES } from "../../lib/navigation";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", icon: BarChart3, to: ROUTES.dashboard },
  { label: "Workspace", icon: SquareTerminal, to: ROUTES.workspace },
  { label: "Wora™ Coach", icon: TrendingUp, to: ROUTES.wora },
  { label: "Evidence Graph", icon: FileText, to: ROUTES.evidence },
  { label: "Resume Builder", icon: BriefcaseBusiness, to: ROUTES.resume },
  { label: "RePath™", icon: ShieldCheck, to: ROUTES.repath },
  { label: "Career GPS", icon: Radar, to: ROUTES.gps },
];

function BrandMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-6 w-6"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2.5" y="2.5" width="27" height="27" rx="8"
        stroke="currentColor" strokeWidth="2"
      />
      <path
        d="M8 21L12 13.5L16 17L20 10.5L24 21"
        stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function NavItem({
  item,
  onClick,
}: {
  item: (typeof NAV_ITEMS)[number];
  onClick?: () => void;
}) {
  const location = useLocation();
  const isActive = location.pathname === item.to;

  return (
    <Link
      to={item.to}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-blue-50 text-blue-700"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      <item.icon className="h-4 w-4 shrink-0" />
      {item.label}
    </Link>
  );
}

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { signOut } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate(ROUTES.home);
  };

  const Sidebar = ({ onClose }: { onClose?: () => void }) => (
    <aside className="flex h-full w-64 flex-col border-r border-slate-100 bg-white">
      {/* Brand */}
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-100 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm">
          <BrandMark />
        </div>
        <span className="text-[15px] font-bold tracking-[-0.03em] text-slate-900">
          WORXPATH<sup className="text-[9px]">™</sup>
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto rounded-lg p-1 text-slate-400 hover:text-slate-900"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.to} item={item} onClick={onClose} />
          ))}
        </div>
      </nav>

      {/* User + sign out */}
      <div className="shrink-0 border-t border-slate-100 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
            {user?.firstName?.[0] ?? user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ?? "W"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              {user?.firstName ?? "User"}
            </p>
            <p className="truncate text-xs text-slate-500">
              {user?.emailAddresses?.[0]?.emailAddress ?? ""}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA]">
      {/* Desktop sidebar */}
      <div className="hidden lg:block lg:shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 shadow-xl">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile top bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-[15px] font-bold tracking-[-0.03em] text-slate-900">
            WORXPATH<sup className="text-[9px]">™</sup>
          </span>
          <div className="h-8 w-8 rounded-full bg-blue-100 text-center text-xs font-bold leading-8 text-blue-700">
            {user?.firstName?.[0] ?? "W"}
          </div>
        </header>

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}