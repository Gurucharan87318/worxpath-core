import { Link } from "react-router-dom";
import {
  ArrowRight,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";
import AppShell from "../components/layout/AppShell";
import { ROUTES } from "../lib/navigation";
import { useRePathStatus } from "../features/repath/hooks/useRePathStatus";
import { useResolveRePath } from "../features/repath/hooks/useResolveRePath";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8">{children}</div>;
}

export default function RePathPage() {
  const { data, isLoading } = useRePathStatus();
  const resolveMutation = useResolveRePath();

  if (isLoading) {
    return (
      <AppShell>
        <Container>
          <div className="grid min-h-[60vh] place-items-center text-sm text-slate-500">
            Loading recovery plan...
          </div>
        </Container>
      </AppShell>
    );
  }

  if (!data?.active || !data.session?.recoveryPlan) {
    return (
      <AppShell>
        <Container>
          <div className="rounded-[28px] border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-slate-100 p-3 text-slate-600 shadow-sm">
                <RefreshCcw className="h-5 w-5" />
              </div>

              <div className="max-w-3xl">
                <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  RePath™ Inactive
                </div>

                <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-900 md:text-4xl">
                  Recovery mode is not active right now.
                </h1>

                <p className="mt-4 text-[15px] leading-7 text-slate-600">
                  RePath™ activates after 72 hours of inactivity. When triggered, it hides backlog pressure,
                  creates a simplified catch-up plan, and guides the user through a 3-day recovery sprint.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={ROUTES.dashboard}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    Back to Dashboard
                  </Link>

                  <Link
                    to={ROUTES.workspace}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    Go to Workspace
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <section className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
              <div className="rounded-xl bg-orange-50 p-2 text-orange-700 w-fit">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h2 className="mt-4 text-base font-semibold text-slate-900">
                Backlog pressure gets hidden
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                RePath™ removes guilt-heavy backlog framing and shows only the next manageable recovery steps.
              </p>
            </section>

            <section className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
              <div className="rounded-xl bg-orange-50 p-2 text-orange-700 w-fit">
                <Target className="h-4 w-4" />
              </div>
              <h2 className="mt-4 text-base font-semibold text-slate-900">
                Catch-up becomes smaller
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The system compresses recovery into a focused 3-day sprint instead of exposing the full missed path.
              </p>
            </section>

            <section className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
              <div className="rounded-xl bg-orange-50 p-2 text-orange-700 w-fit">
                <Sparkles className="h-4 w-4" />
              </div>
              <h2 className="mt-4 text-base font-semibold text-slate-900">
                Momentum gets restored
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The recovery sprint is designed to rebuild confidence first, then reconnect the user to the main track.
              </p>
            </section>
          </div>
        </Container>
      </AppShell>
    );
  }

  const plan = data.session.recoveryPlan;

  return (
    <AppShell>
      <Container>
        <div className="rounded-[28px] border border-orange-100 bg-orange-50 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-white p-3 text-orange-600 shadow-sm">
              <RefreshCcw className="h-5 w-5" />
            </div>
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-orange-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700">
                RePath™ Active
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-900 md:text-4xl">
                Restart without guilt. Re-enter with structure.
              </h1>
              <p className="mt-4 text-[15px] leading-7 text-slate-700">
                {plan.message}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <section className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Recovery Principles
              </p>

              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-orange-50 p-2 text-orange-700">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-6 text-slate-600">
                    Backlog is temporarily hidden so the user sees only the next manageable step.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-orange-50 p-2 text-orange-700">
                    <Target className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-6 text-slate-600">
                    The plan is compressed into three days to restore traction quickly.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-orange-50 p-2 text-orange-700">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-6 text-slate-600">
                    Recovery focuses on momentum first, then confidence, then return to the main track.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
              <button
                type="button"
                onClick={() => resolveMutation.mutate("Recovery sprint completed")}
                disabled={resolveMutation.isPending}
                className="inline-flex h-11 w-full items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {resolveMutation.isPending ? "Resolving..." : "Finish Recovery Sprint"}
              </button>

              <Link
                to={ROUTES.wora}
                className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Ask Wora™ for guidance
              </Link>
            </section>
          </aside>

          <section className="rounded-[28px] border border-slate-100 bg-[#F8F9FA] p-6 shadow-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                3-Day Recovery Sprint
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-slate-900">
                Simplified restart roadmap
              </h2>
            </div>

            <div className="mt-6 grid gap-4">
              {plan.days.map((day) => (
                <article
                  key={day.day}
                  className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="inline-flex rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-700">
                        Day {day.day}
                      </div>
                      <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-slate-900">
                        {day.title}
                      </h3>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-right">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                        XP Target
                      </div>
                      <div className="text-lg font-bold text-slate-900">{day.xpTarget}</div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {day.tasks.map((task: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-[#F8F9FA] px-4 py-4"
                      >
                        <div className="mt-0.5 rounded-full bg-blue-600 px-2 py-0.5 text-[11px] font-semibold text-white">
                          {index + 1}
                        </div>
                        <p className="text-sm leading-6 text-slate-700">{task}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-[24px] border border-slate-100 bg-white px-5 py-4 shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Return to the main track after Day 3
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Recovery ends only after the sprint is resolved.
                </p>
              </div>

              <Link
                to={ROUTES.dashboard}
                className="inline-flex items-center text-sm font-semibold text-blue-700 transition hover:text-blue-800"
              >
                Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </AppShell>
  );
}