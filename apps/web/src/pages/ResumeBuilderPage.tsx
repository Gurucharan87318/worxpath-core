import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  FileText,
  LayoutTemplate,
  PenSquare,
  Sparkles,
  SquareTerminal,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import AppShell from "../components/layout/AppShell";
import { ROUTES } from "../lib/navigation";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">{children}</div>;
}

type ResumeSectionKey =
  | "headline"
  | "summary"
  | "projects"
  | "skills"
  | "evidence";

const initialSections: Record<ResumeSectionKey, boolean> = {
  headline: true,
  summary: true,
  projects: true,
  skills: true,
  evidence: false,
};

function BuilderSection({
  title,
  description,
  active,
  onToggle,
}: {
  title: string;
  description: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full rounded-[22px] border p-5 text-left shadow-sm transition ${
        active
          ? "border-blue-100 bg-blue-50"
          : "border-slate-100 bg-white hover:bg-slate-50"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold tracking-[-0.03em] text-slate-900">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </div>

        <div
          className={`mt-1 inline-flex h-6 min-w-[44px] items-center rounded-full p-1 transition ${
            active ? "bg-blue-600 justify-end" : "bg-slate-200 justify-start"
          }`}
        >
          <span className="block h-4 w-4 rounded-full bg-white shadow-sm" />
        </div>
      </div>
    </button>
  );
}

export default function ResumeBuilderPage() {
  const [sections, setSections] = useState(initialSections);

  const toggle = (key: ResumeSectionKey) =>
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <AppShell>
      <Container>
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Resume Builder
            </div>
            <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-900 md:text-4xl">
              Convert execution into a recruiter-facing resume.
            </h1>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              This layer translates evidence, projects, and practical progress into a
              cleaner narrative for applications and interviews.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to={ROUTES.evidence}
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <FileText className="mr-2 h-4 w-4" />
              View Evidence
            </Link>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <BadgeCheck className="mr-2 h-4 w-4" />
              Export Resume
            </button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <section className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Builder Controls
              </p>

              <div className="mt-5 space-y-3">
                <BuilderSection
                  title="Headline"
                  description="Role target and positioning statement."
                  active={sections.headline}
                  onToggle={() => toggle("headline")}
                />
                <BuilderSection
                  title="Professional Summary"
                  description="Short narrative derived from execution and goals."
                  active={sections.summary}
                  onToggle={() => toggle("summary")}
                />
                <BuilderSection
                  title="Projects"
                  description="Visible work outputs and relevant project proof."
                  active={sections.projects}
                  onToggle={() => toggle("projects")}
                />
                <BuilderSection
                  title="Skills"
                  description="Tooling and practical capability areas."
                  active={sections.skills}
                  onToggle={() => toggle("skills")}
                />
                <BuilderSection
                  title="Evidence Highlights"
                  description="Direct proof callouts from the evidence graph."
                  active={sections.evidence}
                  onToggle={() => toggle("evidence")}
                />
              </div>
            </section>

            <section className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Quick Routes
              </p>

              <div className="mt-5 grid gap-3">
                <Link
                  to={ROUTES.workspace}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <SquareTerminal className="mr-2 h-4 w-4" />
                  Go to Workspace
                </Link>
                <Link
                  to={ROUTES.wora}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Ask Wora™
                </Link>
                <Link
                  to={ROUTES.dashboard}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Back to Dashboard
                </Link>
              </div>
            </section>
          </aside>

          <section className="rounded-[28px] border border-slate-100 bg-white p-7 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Resume Preview
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-[-0.04em] text-slate-900">
                  Data Analyst Resume
                </h2>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <BadgeCheck className="h-4 w-4" />
                ATS ready draft
              </div>
            </div>

            <div className="mt-8 rounded-[24px] border border-slate-100 bg-[#F8F9FA] p-7">
              {sections.headline && (
                <div className="border-b border-slate-200 pb-6">
                  <div className="flex items-center gap-2 text-slate-900">
                    <UserRound className="h-4 w-4" />
                    <span className="text-xl font-bold tracking-[-0.03em]">
                      Gurucharan — Data Analyst Candidate
                    </span>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                    Transitioning into data analytics through structured skill-building,
                    practical case execution, and visible evidence of consistent learning output.
                  </p>
                </div>
              )}

              {sections.summary && (
                <div className="border-b border-slate-200 py-6">
                  <div className="flex items-center gap-2">
                    <PenSquare className="h-4 w-4 text-blue-700" />
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">
                      Professional Summary
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Built practical momentum through guided SQL, Python, and analytics workflows.
                    Strong focus on execution consistency, structured problem solving, and translating
                    completed work into recruiter-readable proof.
                  </p>
                </div>
              )}

              {sections.projects && (
                <div className="border-b border-slate-200 py-6">
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="h-4 w-4 text-blue-700" />
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">
                      Projects
                    </h3>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Sales Summary Analysis
                      </p>
                      <p className="mt-1 text-sm leading-7 text-slate-600">
                        Completed a mini business analysis case using grouped SQL logic and generated
                        structured findings from raw practice output.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Workspace Execution Artifacts
                      </p>
                      <p className="mt-1 text-sm leading-7 text-slate-600">
                        Built visible day-level task outputs that later feed evidence and portfolio layers.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {sections.skills && (
                <div className="border-b border-slate-200 py-6">
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4 text-blue-700" />
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">
                      Skills
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    SQL, Python, data cleaning, dashboard thinking, analytical reasoning,
                    structured problem solving, and evidence-backed workflow execution.
                  </p>
                </div>
              )}

              {sections.evidence && (
                <div className="pt-6">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-700" />
                    <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-900">
                      Evidence Highlights
                    </h3>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <p className="text-sm font-semibold text-slate-900">SQL Aggregation Challenge — Score 84</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Demonstrated correct filter and grouping logic under structured task constraints.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                      <p className="text-sm font-semibold text-slate-900">Momentum Milestone — Week 2</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Maintained visible consistency across tasks and early practical outputs.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Download PDF
              </button>

              <Link
                to={ROUTES.evidence}
                className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Refine from Evidence
              </Link>

              <Link
                to={ROUTES.workspace}
                className="inline-flex h-11 items-center justify-center text-sm font-semibold text-blue-700 transition hover:text-blue-800"
              >
                Add more proof first
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </AppShell>
  );
}