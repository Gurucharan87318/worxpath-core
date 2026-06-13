import {
  ArrowRight,
  BriefcaseBusiness,
  ChevronRight,
  FileText,
  Flame,
  Home,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Link, Navigate } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import StatCard from "../components/dashboard/StatCard";
import ProgressPanel from "../components/dashboard/ProgressPanel";
import NextActionCard from "../components/dashboard/NextActionCard";
import WeeklyMomentumCard from "../components/dashboard/WeeklyMomentumCard";
import QuickLinkCard from "../components/dashboard/QuickLinkCard";
import { ROUTES } from "../lib/navigation";
import { useProgressStore } from "../store/useProgressStore";
import { useRePathStatus } from "../features/repath/hooks/useRePathStatus";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">{children}</div>
  );
}

function Surface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-[24px] border border-slate-200/70 bg-white shadow-sm ${className}`}>
      {children}
    </section>
  );
}

function Breadcrumbs() {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
      <Link
        to={ROUTES.home}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium transition hover:bg-slate-50 hover:text-slate-700"
      >
        <Home className="h-4 w-4" />
        Home
      </Link>

      <ChevronRight className="h-4 w-4 text-slate-300" />

      <Link
        to={ROUTES.welcome}
        className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium transition hover:bg-slate-50 hover:text-slate-700"
      >
        Welcome
      </Link>

      <ChevronRight className="h-4 w-4 text-slate-300" />

      <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1.5 font-semibold text-white">
        Dashboard
      </span>
    </div>
  );
}

function HeaderAction({
  to,
  label,
  icon: Icon,
  primary = false,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  primary?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-semibold shadow-sm transition ${
        primary
          ? "bg-slate-900 text-white hover:bg-slate-800"
          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Link>
  );
}

function SectionHeader({
  eyebrow,
  title,
  hint,
  action,
}: {
  eyebrow: string;
  title: string;
  hint?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-xl font-bold tracking-[-0.03em] text-slate-900">
          {title}
        </h2>
        {hint ? <p className="mt-2 text-sm text-slate-500">{hint}</p> : null}
      </div>
      {action}
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useUser();
  const { data: repathStatus, isLoading: isRePathLoading } = useRePathStatus();
  const { xpTotal, currentStreak, completedChallenges, daysCurrent } =
    useProgressStore();

  const firstName = user?.firstName ?? "there";

  if (isRePathLoading) {
    return (
      <AppShell>
        <Container>
          <div className="grid min-h-[60vh] place-items-center text-sm text-slate-500">
            Loading dashboard...
          </div>
        </Container>
      </AppShell>
    );
  }

  if (repathStatus?.active) {
    return <Navigate to={ROUTES.repath} replace />;
  }

  return (
    <AppShell>
      <Container>
        <Breadcrumbs />

        <div className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              Control Center
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-900 md:text-4xl">
              Welcome back, {firstName}.
            </h1>

            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
              Track momentum, continue focused work, and move your transition forward through a
              cleaner execution workflow.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <HeaderAction
              to={ROUTES.workspace}
              label="Open Workspace"
              icon={SquareTerminal}
              primary
            />
            <HeaderAction to={ROUTES.wora} label="Ask Wora™" icon={Sparkles} />
            <HeaderAction to={ROUTES.repath} label="View RePath™" icon={ShieldCheck} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total XP"
            value={xpTotal.toLocaleString()}
            sublabel="Points earned"
            icon={Zap}
            accent="blue"
          />
          <StatCard
            label="Current Streak"
            value={`${currentStreak}d`}
            sublabel="Days in a row"
            icon={Flame}
            accent="gold"
          />
          <StatCard
            label="Challenges Done"
            value={completedChallenges}
            sublabel="Total completions"
            icon={SquareTerminal}
            accent="green"
          />
          <StatCard
            label="Day Progress"
            value={`${daysCurrent}/100`}
            sublabel="100-day track"
            icon={TrendingUp}
            accent="slate"
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <Surface className="p-6">
            <SectionHeader
              eyebrow="Execution"
              title="Progress and next work"
              hint="A tighter view of where you stand and what should happen next."
            />

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
              <ProgressPanel />
              <NextActionCard />
            </div>
          </Surface>

          <div className="space-y-6">
            <Surface className="p-6">
              <SectionHeader
                eyebrow="Weekly"
                title="Momentum"
                hint="Consistency, movement, and short-term learning rhythm."
              />
              <div className="mt-5">
                <WeeklyMomentumCard />
              </div>
            </Surface>

            <Surface className="p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Recovery
              </p>

              <div className="mt-3 flex items-start gap-3">
                <div className="rounded-xl bg-amber-50 p-2 text-amber-700">
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    RePath™ system status
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Recovery mode activates after inactivity and creates a structured 3-day return path.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {currentStreak === 0 ? "Recovery is available" : "Normal track active"}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {currentStreak === 0
                        ? "You can enter a lighter restart flow and regain traction without backlog pressure."
                        : "You are currently progressing on the main path with no active recovery trigger."}
                    </p>
                  </div>

                  <Link
                    to={ROUTES.repath}
                    className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-100"
                  >
                    Open
                  </Link>
                </div>
              </div>
            </Surface>
          </div>
        </div>

        <Surface className="mt-8 p-6">
          <SectionHeader
            eyebrow="Modules"
            title="Product areas"
            hint="Move between focused surfaces without breaking the workflow."
            action={
              <Link
                to={ROUTES.workspace}
                className="inline-flex items-center text-sm font-semibold text-slate-700 transition hover:text-slate-900"
              >
                Go to active work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            }
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <QuickLinkCard
              title="Learning Workspace"
              description="Continue your day module, complete tasks, and earn XP."
              to={ROUTES.workspace}
              icon={SquareTerminal}
              badge="Active"
            />
            <QuickLinkCard
              title="Wora™ AI Coach"
              description="Get daily guidance, summaries, and next-step recommendations."
              to={ROUTES.wora}
              icon={TrendingUp}
            />
            <QuickLinkCard
              title="Evidence Graph"
              description="View your auditable proof-of-work and project output trail."
              to={ROUTES.evidence}
              icon={FileText}
              muted
            />
            <QuickLinkCard
              title="Resume Builder"
              description="Convert your evidence into a recruiter-ready ATS resume."
              to={ROUTES.resume}
              icon={BriefcaseBusiness}
              muted
            />
          </div>
        </Surface>
      </Container>
    </AppShell>
  );
}