import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  Layers3,
  Sparkles,
  SquareTerminal,
  TrendingUp,
} from "lucide-react";
import AppShell from "../components/layout/AppShell";
import { ROUTES } from "../lib/navigation";

type EvidenceNode = {
  id: string;
  title: string;
  type: "challenge" | "project" | "case" | "milestone";
  score: number;
  day: string;
  summary: string;
};

const EVIDENCE_NODES: EvidenceNode[] = [
  {
    id: "ev-1",
    title: "SQL Aggregation Challenge",
    type: "challenge",
    score: 84,
    day: "Day 8",
    summary: "Completed grouped query analysis with correct filters and aggregation logic.",
  },
  {
    id: "ev-2",
    title: "Sales Summary Mini Case",
    type: "case",
    score: 79,
    day: "Day 8",
    summary: "Converted raw task output into a business-facing summary with observations.",
  },
  {
    id: "ev-3",
    title: "Progress Momentum Milestone",
    type: "milestone",
    score: 91,
    day: "Week 2",
    summary: "Maintained execution streak and crossed the first visible consistency threshold.",
  },
  {
    id: "ev-4",
    title: "Workspace Practice Artifact",
    type: "project",
    score: 87,
    day: "Day 9",
    summary: "Saved practical execution output that can later support portfolio storytelling.",
  },
];

const typeStyles: Record<EvidenceNode["type"], string> = {
  challenge: "bg-blue-50 text-blue-700 border-blue-100",
  project: "bg-violet-50 text-violet-700 border-violet-100",
  case: "bg-emerald-50 text-emerald-700 border-emerald-100",
  milestone: "bg-amber-50 text-amber-700 border-amber-100",
};

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">{children}</div>;
}

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-[20px] border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          {label}
        </p>
        <div className="rounded-xl bg-blue-50 p-2 text-blue-700 shadow-sm">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-4 text-3xl font-bold tracking-[-0.04em] text-slate-900">
        {value}
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{hint}</p>
    </div>
  );
}

function EvidenceCard({ item }: { item: EvidenceNode }) {
  return (
    <article className="group rounded-[24px] border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${typeStyles[item.type]}`}
            >
              {item.type}
            </span>
            <span className="text-xs font-medium text-slate-500">{item.day}</span>
          </div>

          <h3 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-slate-900">
            {item.title}
          </h3>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 text-right">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Score
          </div>
          <div className="text-lg font-bold text-slate-900">{item.score}</div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600">{item.summary}</p>

      <div className="mt-5 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
          <BadgeCheck className="h-4 w-4 text-emerald-600" />
          Added to evidence graph
        </div>

        <button
          type="button"
          className="inline-flex items-center text-sm font-semibold text-blue-700 transition hover:text-blue-800"
        >
          View node
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  );
}

export default function EvidenceGraphPage() {
  return (
    <AppShell>
      <Container>
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Career Evidence Graph™
            </div>
            <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-900 md:text-4xl">
              A visible proof layer built from what the user actually does.
            </h1>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              This page turns tasks, cases, challenges, and milestones into a recruiter-readable
              capability trail. The goal is not certificates. The goal is proof.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={ROUTES.workspace}
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <SquareTerminal className="mr-2 h-4 w-4" />
              Back to Workspace
            </Link>
            <Link
              to={ROUTES.resume}
              className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <BriefcaseBusiness className="mr-2 h-4 w-4" />
              Open Resume Builder
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Evidence Nodes"
            value="24"
            hint="Tracked artifacts across tasks, cases, and milestones."
            icon={Layers3}
          />
          <StatCard
            label="Verified Outputs"
            value="11"
            hint="Execution items already suitable for recruiter-facing storytelling."
            icon={FolderKanban}
          />
          <StatCard
            label="Capability Score"
            value="84"
            hint="Current composite score from execution quality and consistency."
            icon={BarChart3}
          />
          <StatCard
            label="Growth Signal"
            value="+18%"
            hint="Visible improvement compared with the previous weekly checkpoint."
            icon={TrendingUp}
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <section className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Graph Logic
              </p>

              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-blue-50 p-2 text-blue-700">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Execution becomes nodes</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Every finished task or case can be stored as a visible proof point.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-blue-50 p-2 text-blue-700">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Quality gets surfaced</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Scores and summaries make raw completion more legible to recruiters.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-blue-50 p-2 text-blue-700">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Proof feeds conversion</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Strong nodes later flow into the resume and portfolio layer.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Quick Routes
              </p>

              <div className="mt-5 grid gap-3">
                <Link
                  to={ROUTES.wora}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Open Wora™ Coach
                </Link>
                <Link
                  to={ROUTES.dashboard}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Back to Dashboard
                </Link>
                <Link
                  to={ROUTES.resume}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Convert to Resume
                </Link>
              </div>
            </section>
          </aside>

          <section className="rounded-[28px] border border-slate-100 bg-[#F8F9FA] p-6 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Evidence Feed
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-slate-900">
                  Recent proof nodes
                </h2>
              </div>

              <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                Last updated 2 hours ago
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {EVIDENCE_NODES.map((item) => (
                <EvidenceCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        </div>
      </Container>
    </AppShell>
  );
}