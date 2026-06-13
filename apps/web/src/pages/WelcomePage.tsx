import { Link } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  ChevronRight,
  FileText,
  Radar,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  TrendingUp,
} from "lucide-react";
import { useEffect } from "react";
import { ROUTES } from "../lib/navigation";
import PageHeader from "../components/navigation/PageHeader";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">{children}</div>;
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

function SectionTitle({
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
      <h2 className="text-3xl font-bold leading-tight tracking-[-0.04em] text-slate-900 md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}

type TimelineItem = {
  id: string;
  shortLabel: string;
  title: string;
  description: string;
  route: string;
  icon: React.ComponentType<{ className?: string }>;
  side: "left" | "right";
};

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: "gps",
    shortLabel: "GPS",
    title: "Career GPS™",
    description:
      "Start with role-fit clarity, skill-gap direction, and the right path into the system.",
    route: ROUTES.gps,
    icon: Radar,
    side: "left",
  },
  {
    id: "workspace",
    shortLabel: "WORK",
    title: "Learning Workspace",
    description:
      "Move into daily execution with guided tasks, progress tracking, and practical output.",
    route: ROUTES.workspace,
    icon: SquareTerminal,
    side: "right",
  },
  {
    id: "wora",
    shortLabel: "WORA",
    title: "Wora™ AI Coach",
    description:
      "Get daily guidance, progress analysis, and next-step recommendations inside the workflow.",
    route: ROUTES.wora,
    icon: Bot,
    side: "left",
  },
  {
    id: "repath",
    shortLabel: "RE",
    title: "RePath™ Recovery",
    description:
      "If momentum breaks, restart with a simplified recovery sprint without guilt.",
    route: ROUTES.repath,
    icon: ShieldCheck,
    side: "right",
  },
  {
    id: "evidence",
    shortLabel: "PROOF",
    title: "Career Evidence Graph™",
    description:
      "Convert work into a visible capability trail built from challenges, outputs, and proof.",
    route: ROUTES.evidence,
    icon: FileText,
    side: "left",
  },
  {
    id: "resume",
    shortLabel: "CV",
    title: "Resume Builder",
    description:
      "Translate execution into recruiter-facing assets for applications and interview readiness.",
    route: ROUTES.resume,
    icon: BriefcaseBusiness,
    side: "right",
  },
];

function TimelineBranch({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  const Icon = item.icon;
  const isLeft = item.side === "left";

  return (
    <div
      className="timeline-reveal relative grid items-center gap-4 py-3 lg:grid-cols-[1fr_88px_1fr] lg:py-1"
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className={`${isLeft ? "lg:order-1 lg:flex lg:justify-end" : "hidden lg:block lg:order-1"}`}>
        {isLeft && (
          <div className="timeline-copy max-w-sm">
            <h3 className="text-lg font-semibold tracking-[-0.03em] text-slate-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {item.description}
            </p>
            <Link
              to={item.route}
              className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700 transition hover:text-blue-800"
            >
              Explore
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      <div className="relative z-10 order-2 flex justify-center">
        <div className="relative flex min-h-[96px] items-center justify-center">
          <span className="timeline-node relative z-10 h-4 w-4 rounded-full border-4 border-white bg-blue-600 shadow-[0_0_0_6px_rgba(59,130,246,0.08)]" />

          <Link
            to={item.route}
            className={`timeline-pill group relative z-20 inline-flex min-h-[68px] w-[148px] items-center justify-center rounded-[24px] bg-gradient-to-r px-5 py-4 text-white shadow-sm transition duration-300 hover:shadow-lg ${
              isLeft
                ? "from-blue-700 to-sky-700 lg:-translate-x-[74px] lg:hover:-translate-x-[88px]"
                : "from-sky-500 to-blue-600 lg:translate-x-[74px] lg:hover:translate-x-[88px]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span className="text-base font-bold tracking-[-0.03em]">
                {item.shortLabel}
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className={`${!isLeft ? "lg:order-3" : "hidden lg:block lg:order-3"}`}>
        {!isLeft && (
          <div className="timeline-copy max-w-sm">
            <h3 className="text-lg font-semibold tracking-[-0.03em] text-slate-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {item.description}
            </p>
            <Link
              to={item.route}
              className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700 transition hover:text-blue-800"
            >
              Explore
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      <div className="order-3 lg:hidden">
        <div className="rounded-2xl border border-slate-100 bg-white/90 px-4 py-4 shadow-sm">
          <h3 className="text-base font-semibold tracking-[-0.03em] text-slate-900">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            {item.description}
          </p>
          <Link
            to={item.route}
            className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700 transition hover:text-blue-800"
          >
            Explore
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function FeatureExploreCard({
  icon: Icon,
  title,
  description,
  route,
  badge,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  route: string;
  badge: string;
}) {
  return (
    <article className="timeline-reveal group rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="w-fit rounded-xl bg-blue-50 p-2 text-blue-700 shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          {badge}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-900">
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-7 text-slate-600">
        {description}
      </p>

      <Link
        to={route}
        className="mt-6 inline-flex items-center text-sm font-semibold text-blue-700 transition hover:text-blue-800"
      >
        Explore
        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </article>
  );
}

export default function WelcomePage() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".timeline-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
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

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <style>
        {`
          .timeline-reveal {
            opacity: 0;
            transform: translateY(24px);
            transition:
              opacity 700ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
          }

          .timeline-reveal.is-visible {
            opacity: 1;
            transform: translateY(0);
          }

          .timeline-axis {
            animation: axisPulse 3.6s ease-in-out infinite;
          }

          .timeline-node {
            animation: nodePulse 2.8s ease-in-out infinite;
          }

          .timeline-pill {
            overflow: hidden;
          }

          .timeline-pill::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
              120deg,
              rgba(255,255,255,0) 20%,
              rgba(255,255,255,0.18) 50%,
              rgba(255,255,255,0) 80%
            );
            transform: translateX(-120%);
            transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
          }

          .timeline-pill:hover::after {
            transform: translateX(120%);
          }

          .timeline-copy {
            transition:
              transform 280ms cubic-bezier(0.16, 1, 0.3, 1),
              opacity 280ms cubic-bezier(0.16, 1, 0.3, 1);
          }

          @keyframes axisPulse {
            0%, 100% { opacity: 0.55; }
            50% { opacity: 1; }
          }

          @keyframes nodePulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 0 0 6px rgba(59,130,246,0.08);
            }
            50% {
              transform: scale(1.08);
              box-shadow: 0 0 0 12px rgba(59,130,246,0.04);
            }
          }

          @media (hover: hover) and (pointer: fine) {
            .timeline-pill:hover + .timeline-copy,
            .timeline-copy:hover {
              transform: translateY(-2px);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .timeline-reveal,
            .timeline-node,
            .timeline-axis,
            .timeline-pill::after,
            .timeline-copy {
              animation: none !important;
              transition: none !important;
              transform: none !important;
              opacity: 1 !important;
            }
          }
        `}
      </style>

      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 backdrop-blur-md">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            <Link to={ROUTES.home} className="flex items-center gap-3">
              <BrandMark />
              <div className="text-[15px] font-bold tracking-[-0.03em] text-slate-900">
                WORXPATH<span className="align-top text-[10px]">™</span>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              <a
                href="#flow"
                className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
              >
                Product Flow
              </a>
              <a
                href="#features"
                className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
              >
                Features
              </a>
              <a
                href="#next-step"
                className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
              >
                Next Step
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <SignedOut>
                <Link
                  to={ROUTES.signIn}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Sign in
                </Link>
              </SignedOut>

              <SignedIn>
                <Link
                  to={ROUTES.dashboard}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Dashboard
                </Link>
              </SignedIn>

              <Link
                to={ROUTES.gps}
                className="inline-flex h-10 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Start Career GPS
              </Link>
            </div>
          </div>
        </Container>
      </header>

      <main>
        <section className="bg-white py-20 lg:py-24">
          <Container>
            <PageHeader fallbackTo={ROUTES.home} title="" />

            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="max-w-2xl">
                <div className="mb-5 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Welcome to the Program
                </div>

                <h1 className="text-5xl font-bold leading-[0.96] tracking-[-0.06em] text-slate-900 md:text-6xl">
                  A cleaner roadmap from uncertainty to employability.
                </h1>

                <p className="mt-6 max-w-xl text-[16px] leading-8 text-slate-600">
                  WORXPATH<span className="align-top text-[10px]">™</span> is
                  not a passive course library. It is a structured operating
                  system for career transitioners who need direction, execution
                  rhythm, and visible proof of capability.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={ROUTES.gps}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    Start Career GPS
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>

                  <SignedOut>
                    <Link
                      to={ROUTES.signUp}
                      className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      Create account
                    </Link>
                  </SignedOut>

                  <SignedIn>
                    <Link
                      to={ROUTES.dashboard}
                      className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      Go to dashboard
                    </Link>
                  </SignedIn>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-100 bg-[#F8F9FA] p-6 shadow-sm">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Program Structure
                </div>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                  The four-layer employability system
                </h3>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-slate-100 bg-white px-4 py-4">
                    <div className="text-sm font-semibold text-slate-900">
                      Layer 1 — Technical Workspace
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                      Bite-sized execution, sandbox tasks, and guided practice.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-white px-4 py-4">
                    <div className="text-sm font-semibold text-slate-900">
                      Layer 2 — Resilience System
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                      Consistency, recovery, and behavior support during the transition.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-white px-4 py-4">
                    <div className="text-sm font-semibold text-slate-900">
                      Layer 3 — Wealth System
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                      Financial runway awareness to reduce drop-off and panic.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-white px-4 py-4">
                    <div className="text-sm font-semibold text-slate-900">
                      Layer 4 — Career Execution
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                      Resume, portfolio, proof-of-work, and recruiter-facing clarity.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section
          id="flow"
          className="relative overflow-hidden bg-[linear-gradient(to_bottom,#ffffff_0%,#f8fafc_10%,#f8fafc_90%,#ffffff_100%)] py-20 lg:py-24"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_42%)]" />

          <Container>
            <SectionTitle
              eyebrow="Product Flow"
              title="The product is organized as a zigzag operating flow."
              description="This is not a date timeline. It is a structural map of how WORXPATH surfaces connect. Each branch links to a dedicated page, and hovering a branch expands it for easier scanning."
            />

            <div className="relative mt-14">
              <div className="timeline-axis absolute left-1/2 top-0 hidden h-full w-[4px] -translate-x-1/2 rounded-full bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 lg:block" />

              <div className="space-y-1">
                {TIMELINE_ITEMS.map((item, index) => (
                  <TimelineBranch key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section id="features" className="bg-white py-20 lg:py-24">
          <Container>
            <SectionTitle
              eyebrow="Feature Overview"
              title="Each feature has a specific role inside the system."
              description="The timeline gives users the product map. The section below explains what each page does and provides a direct explore action."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <FeatureExploreCard
                icon={Radar}
                title="Career GPS™"
                description="The entry layer that helps users understand where to begin and which path is the right fit."
                route={ROUTES.gps}
                badge="Entry"
              />

              <FeatureExploreCard
                icon={SquareTerminal}
                title="Learning Workspace"
                description="The execution layer where structured day modules, tasks, and output-building happen."
                route={ROUTES.workspace}
                badge="Execution"
              />

              <FeatureExploreCard
                icon={Bot}
                title="Wora™ AI Coach"
                description="The adaptive guidance layer that helps users stay clear on what to do next."
                route={ROUTES.wora}
                badge="Guidance"
              />

              <FeatureExploreCard
                icon={ShieldCheck}
                title="RePath™ Recovery"
                description="The recovery layer that helps users restart after inactivity with less friction and less guilt."
                route={ROUTES.repath}
                badge="Recovery"
              />

              <FeatureExploreCard
                icon={FileText}
                title="Career Evidence Graph™"
                description="The proof layer that turns task execution into a visible capability record."
                route={ROUTES.evidence}
                badge="Proof"
              />

              <FeatureExploreCard
                icon={BriefcaseBusiness}
                title="Resume Builder"
                description="The conversion layer that turns accumulated evidence into a recruiter-facing asset."
                route={ROUTES.resume}
                badge="Conversion"
              />
            </div>
          </Container>
        </section>

        <section className="bg-[#F8F9FA] py-20 lg:py-24">
          <Container>
            <SectionTitle
              eyebrow="How it works"
              title="The value comes from the connected flow, not isolated tools."
              description="WORXPATH works best when the user moves from direction to execution, from execution to proof, and from proof to career conversion."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              <div className="timeline-reveal rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
                <div className="w-fit rounded-xl bg-blue-50 p-2 text-blue-700 shadow-sm">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                  1. Start with clarity
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-slate-600">
                  Career GPS reduces confusion before the user commits to a track.
                </p>
              </div>

              <div className="timeline-reveal rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
                <div className="w-fit rounded-xl bg-blue-50 p-2 text-blue-700 shadow-sm">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                  2. Build execution rhythm
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-slate-600">
                  Workspace, coaching, and recovery help the user maintain consistent progress.
                </p>
              </div>

              <div className="timeline-reveal rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
                <div className="w-fit rounded-xl bg-blue-50 p-2 text-blue-700 shadow-sm">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-900">
                  3. Convert work into employability
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-slate-600">
                  Evidence and resume layers turn effort into recruiter-facing career output.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section id="next-step" className="bg-white py-20 lg:py-24">
          <Container>
            <div className="rounded-[32px] border border-slate-100 bg-[#F8F9FA] px-8 py-10 shadow-sm md:px-12 md:py-12">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Next Step
                </div>
                <h2 className="text-3xl font-bold leading-tight tracking-[-0.04em] text-slate-900 md:text-4xl">
                  Start with Career GPS and then move through the system with context.
                </h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
                  The first decision layer is still the right place to begin. Once that is complete, the rest of the product flow becomes easier to understand and navigate.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to={ROUTES.gps}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                  >
                    Start Career GPS
                  </Link>

                  <Link
                    to={ROUTES.home}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                  >
                    Back to landing page
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}