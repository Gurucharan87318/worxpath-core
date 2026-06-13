import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
  LineChart,
  Radar,
  ShieldCheck,
  SquareTerminal,
  TrendingUp,
} from "lucide-react";
import { ROUTES } from "../lib/navigation";


function useReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">{children}</div>;
}

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-reveal
      className={`translate-y-6 opacity-0 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

function BrandMark() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
      <svg
        viewBox="0 0 32 32"
        className="h-5 w-5 text-slate-900"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="2.5"
          y="2.5"
          width="27"
          height="27"
          rx="8"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M8 21L12 13.5L16 17L20 10.5L24 21"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {eyebrow}
      </div>
      <h2 className="max-w-4xl text-3xl font-bold leading-tight tracking-[-0.04em] text-slate-900 md:text-4xl lg:text-[2.8rem]">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600 md:text-base">
        {description}
      </p>
    </div>
  );
}

export default function LandingPage() {
  useReveal();

  const nav = useNavigate();
  const { isSignedIn } = useAuth();

  const goToDashboard = () => nav(ROUTES.dashboard);
  const goToSignIn = () => nav(ROUTES.signIn);
  const goToSignUp = () => nav(ROUTES.signUp);
  const goToGPS = () => nav(ROUTES.gps);

  const handleStartOnboarding = () => {
  nav(ROUTES.welcome);
};

  const handleExploreFlow = () => {
    const el = document.getElementById("career-gps");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    goToGPS();
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-blue-100 selection:text-slate-900">
      <style>{`
        [data-reveal].is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            <a href="#top" className="flex items-center gap-3">
              <BrandMark />
              <div className="text-[15px] font-bold tracking-[-0.03em] text-slate-900">
                WORXPATH<span className="align-top text-[10px]">™</span>
              </div>
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              <a
                href="#career-gps"
                className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
              >
                Career GPS
              </a>
              <a
                href="#evidence-graph"
                className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
              >
                Evidence Graph
              </a>
              <a
                href="#trust-layer"
                className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
              >
                Recruiter Trust
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <SignedOut>
                <button
                  type="button"
                  onClick={goToSignIn}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Sign in
                </button>

                <button
                  type="button"
                  onClick={handleStartOnboarding}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Start Onboarding
                </button>
              </SignedOut>

              <SignedIn>
                <button
                  type="button"
                  onClick={goToDashboard}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Dashboard
                </button>

                <div className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-1 shadow-sm">
                  <UserButton
                    afterSignOutUrl={ROUTES.home}
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "h-8 w-8",
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </Container>
      </header>

      <main id="top">
        <section className="bg-white">
          <Container>
            <div className="grid gap-14 py-20 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:py-28">
              <Reveal>
                <div className="max-w-2xl">
                  <div className="mb-5 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                    Employability Operating System
                  </div>

                  <h1 className="max-w-4xl text-5xl font-bold leading-[0.96] tracking-[-0.06em] text-slate-900 md:text-6xl lg:text-[4.35rem]">
                    The Employability Operating System
                    <span className="align-top text-[0.28em]">™</span>
                    <br />
                    for Career Transitioners.
                  </h1>

                  <p className="mt-6 max-w-xl text-[16px] leading-8 text-slate-600">
                    WORXPATH<span className="align-top text-[10px]">™</span>{" "}
                    helps ambitious learners move from confusion to clear
                    execution through structured onboarding, proof-of-work
                    visibility, and recruiter-facing trust signals.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleStartOnboarding}
                      className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    >
                      Start Onboarding
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleExploreFlow}
                      className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      Explore the Flow
                    </button>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-100 bg-[#F8F9FA] px-4 py-4 shadow-sm">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Structured
                      </div>
                      <div className="mt-2 text-sm font-semibold text-slate-900">
                        Guided transition flow
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-[#F8F9FA] px-4 py-4 shadow-sm">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Visible
                      </div>
                      <div className="mt-2 text-sm font-semibold text-slate-900">
                        Proof over certificates
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-[#F8F9FA] px-4 py-4 shadow-sm">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Trust
                      </div>
                      <div className="mt-2 text-sm font-semibold text-slate-900">
                        Clear recruiter signal
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="rounded-[28px] border border-slate-100 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                  <div className="rounded-[24px] border border-slate-100 bg-[#F8F9FA] p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                          Active Workspace
                        </div>
                        <h3 className="mt-1 text-lg font-semibold tracking-[-0.03em] text-slate-900">
                          Terminal-led learning loop
                        </h3>
                      </div>
                      <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        Live Session
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-950 p-4 text-slate-100 shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      </div>

                      <div className="mt-4 space-y-2 font-mono text-[13px] leading-6">
                        <div>
                          <span className="text-blue-400">DAY_01</span> : Meet
                          an industry expert
                        </div>
                        <div>
                          <span className="text-blue-400">DAY_02</span> :
                          Execute a guided task
                        </div>
                        <div>
                          <span className="text-blue-400">DAY_07</span> : Build
                          a proof-of-work artifact
                        </div>
                        <div>
                          <span className="text-blue-400">WEEKLY</span> :
                          Generate evidence snapshot
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                          Track
                        </div>
                        <div className="mt-2 text-sm font-semibold text-slate-900">
                          Full Stack
                        </div>
                      </div>
                      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                          Stage
                        </div>
                        <div className="mt-2 text-sm font-semibold text-slate-900">
                          Day 17 / 100
                        </div>
                      </div>
                      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                          Focus
                        </div>
                        <div className="mt-2 text-sm font-semibold text-slate-900">
                          Execution cadence
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section id="career-gps" className="bg-[#F8F9FA] py-20 lg:py-24">
          <Container>
            <Reveal>
              <SectionIntro
                eyebrow="Engine 1"
                title="Career GPS™ aligns the learner before the roadmap starts."
                description="Assessment-led role fit and entry path selection from day one. The goal is to reduce confusion early and place the learner inside the right operating lane."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <Reveal>
                <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Assessment Window
                      </div>
                      <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                        Entry path selection
                      </h3>
                    </div>
                    <div className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      Career GPS<span className="align-top text-[8px]">™</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-slate-100 bg-[#F8F9FA] p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-blue-50 p-2 text-blue-700">
                          <Radar className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            Aptitude Mapping
                          </div>
                          <div className="text-sm text-slate-600">
                            Measures analytical comfort, technical orientation,
                            and task affinity.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-[#F8F9FA] p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-blue-50 p-2 text-blue-700">
                          <LineChart className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            Learning Style Analysis
                          </div>
                          <div className="text-sm text-slate-600">
                            Identifies how the learner best absorbs and
                            executes structured work.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-[#F8F9FA] p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-blue-50 p-2 text-blue-700">
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            Path Recommendation
                          </div>
                          <div className="text-sm text-slate-600">
                            Converts responses into a cleaner role entry
                            recommendation and roadmap match.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Role Fit Snapshot
                  </div>
                  <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                    Cleaner onboarding decisions
                  </h3>

                  <div className="mt-6 grid gap-3">
                    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-[#F8F9FA] px-4 py-4">
                      <span className="text-sm font-medium text-slate-700">
                        Domain intent
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        Data / Tech track
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-[#F8F9FA] px-4 py-4">
                      <span className="text-sm font-medium text-slate-700">
                        Best-fit mode
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        Execution-first
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-[#F8F9FA] px-4 py-4">
                      <span className="text-sm font-medium text-slate-700">
                        Roadmap style
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        100-day guided system
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-[#F8F9FA] px-4 py-4">
                      <span className="text-sm font-medium text-slate-700">
                        Day 1 setup
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        Expert kickoff session
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section id="evidence-graph" className="bg-white py-20 lg:py-24">
          <Container>
            <Reveal>
              <SectionIntro
                eyebrow="Engine 2"
                title="Career Evidence Graph™ turns execution into visible proof."
                description="Instead of relying on static certificates, WORXPATH captures ongoing proof-of-work through projects, weekly cases, and execution history."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              <Reveal>
                <article className="h-full rounded-[28px] border border-slate-100 bg-[#EFF6FF] p-6 shadow-sm">
                  <div className="w-fit rounded-xl bg-white p-2 text-blue-700 shadow-sm">
                    <SquareTerminal className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                    Projects
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-slate-600">
                    Structured roadmap builds create a portfolio trail that
                    shows applied capability rather than passive completion.
                  </p>
                </article>
              </Reveal>

              <Reveal>
                <article className="h-full rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="w-fit rounded-xl bg-blue-50 p-2 text-blue-700 shadow-sm">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                    Weekly Cases
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-slate-600">
                    Real-world business cases generate evidence of reasoning,
                    analytical framing, and practical decision output.
                  </p>
                </article>
              </Reveal>

              <Reveal>
                <article className="h-full rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="w-fit rounded-xl bg-blue-50 p-2 text-blue-700 shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                    Execution History
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-slate-600">
                    Progress rhythm, learning consistency, and completed work
                    history combine into a more reliable capability record.
                  </p>
                </article>
              </Reveal>
            </div>

            <Reveal className="mt-8">
              <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-slate-100 bg-[#F8F9FA] p-5">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Input
                    </div>
                    <div className="mt-2 text-base font-semibold text-slate-900">
                      Project work
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-[#F8F9FA] p-5">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Layer
                    </div>
                    <div className="mt-2 text-base font-semibold text-slate-900">
                      Weekly validation
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-[#F8F9FA] p-5">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Outcome
                    </div>
                    <div className="mt-2 text-base font-semibold text-slate-900">
                      Recruiter-readable proof
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <section id="trust-layer" className="bg-[#F8F9FA] py-20 lg:py-24">
          <Container>
            <Reveal>
              <SectionIntro
                eyebrow="Engine 3"
                title="Recruiter-facing trust replaces unverified certificate noise."
                description="A cleaner evidence chain gives hiring teams visible readiness signals, learning velocity patterns, and consistency markers in one place."
              />
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <Reveal>
                <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Recruiter Dashboard
                  </div>
                  <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                    Trust layer preview
                  </h3>

                  <div className="mt-6 space-y-3">
                    <div className="rounded-2xl border border-slate-100 bg-[#F8F9FA] px-4 py-4">
                      <div className="text-sm font-semibold text-slate-900">
                        Visible readiness tracking
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        Understand where a learner stands without guessing from
                        static PDF credentials.
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-[#F8F9FA] px-4 py-4">
                      <div className="text-sm font-semibold text-slate-900">
                        Learning velocity
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        See how consistently the learner converts roadmap input
                        into execution output.
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-[#F8F9FA] px-4 py-4">
                      <div className="text-sm font-semibold text-slate-900">
                        Consistency signals
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        Track rhythm, follow-through, and evidence density over
                        time.
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-100 bg-[#EFF6FF] p-5">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Readiness
                      </div>
                      <div className="mt-2 text-base font-semibold text-slate-900">
                        Portfolio-backed progression
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-[#F8F9FA] p-5">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Velocity
                      </div>
                      <div className="mt-2 text-base font-semibold text-slate-900">
                        Weekly learning momentum
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-[#F8F9FA] p-5">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Signal
                      </div>
                      <div className="mt-2 text-base font-semibold text-slate-900">
                        Higher-trust evidence chain
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-[#F8F9FA] p-5">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Outcome
                      </div>
                      <div className="mt-2 text-base font-semibold text-slate-900">
                        Better shortlist confidence
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-900 p-5 text-white">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-white/10 p-2 text-blue-300">
                        <BriefcaseBusiness className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">
                          Recruiter-facing clarity
                        </div>
                        <div className="text-sm text-slate-300">
                          A more practical signal than unverified course
                          certificates.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section id="start" className="bg-white py-20 lg:py-24">
          <Container>
            <Reveal>
              <div className="rounded-[32px] border border-slate-100 bg-[#F8F9FA] px-8 py-10 shadow-sm md:px-12 md:py-12">
                <div className="max-w-3xl">
                  <div className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Start the Transition
                  </div>
                  <h2 className="text-3xl font-bold leading-tight tracking-[-0.04em] text-slate-900 md:text-4xl">
                    A cleaner path from learning to employability.
                  </h2>
                  <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
                    WORXPATH<span className="align-top text-[10px]">™</span>{" "}
                    brings onboarding, execution, proof-of-work, and recruiter
                    trust into one operational flow built for serious career
                    transitioners.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleStartOnboarding}
                      className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    >
                      Start Onboarding
                    </button>
                    <button
                      type="button"
                      onClick={handleExploreFlow}
                      className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      Review the Engines
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>

      <footer className="bg-[#0B1120] text-slate-300">
        <Container>
          <div className="grid gap-12 py-16 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <svg
                    viewBox="0 0 32 32"
                    className="h-5 w-5 text-white"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="2.5"
                      y="2.5"
                      width="27"
                      height="27"
                      rx="8"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M8 21L12 13.5L16 17L20 10.5L24 21"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="text-lg font-bold tracking-[-0.03em] text-white">
                  WORXPATH<span className="align-top text-[10px]">™</span>
                </div>
              </div>

              <p className="mt-5 text-[15px] leading-8 text-slate-400">
                Structured onboarding, visible execution, and clearer
                employability trust for serious career transitioners.
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold text-white">Product</div>
              <div className="mt-5 grid gap-3 text-[15px] text-slate-400">
                <a href="#career-gps" className="transition hover:text-white">
                  Career GPS<span className="align-top text-[9px]">™</span>
                </a>
                <a
                  href="#evidence-graph"
                  className="transition hover:text-white"
                >
                  Evidence Graph
                </a>
                <a href="#trust-layer" className="transition hover:text-white">
                  Recruiter Trust
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-white">Company</div>
              <div className="mt-5 grid gap-3 text-[15px] text-slate-400">
                <a href="#top" className="transition hover:text-white">
                  About
                </a>
                <a href="#start" className="transition hover:text-white">
                  Start
                </a>
                <a href="#top" className="transition hover:text-white">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-white">
                Get started
              </div>
              <p className="mt-5 text-[15px] leading-8 text-slate-400">
                Begin with a structured onboarding flow and move into a cleaner
                execution system.
              </p>
              <button
                type="button"
                onClick={handleStartOnboarding}
                className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Start Onboarding
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <div>© 2026 WORXPATH. All rights reserved.</div>
            <div>Built for career transitioners moving toward credible employability.</div>
          </div>
        </Container>
      </footer>
    </div>
  );
}