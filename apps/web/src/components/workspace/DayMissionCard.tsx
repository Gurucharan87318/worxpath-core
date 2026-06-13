import {
  BookOpen,
  BrainCircuit,
  Clock3,
  Gem,
  ShieldCheck,
  WalletCards,
  Zap,
} from "lucide-react";
import { useMemo } from "react";
import { useWorkspaceStore } from "../../store/useWorkspaceStore";

export default function DayMissionCard() {
  const { currentDayData } = useWorkspaceStore();

  const totalXP = useMemo(() => {
    if (!currentDayData) return 0;
    return currentDayData.tasks.reduce((sum, task) => sum + task.xp, 0);
  }, [currentDayData]);

  if (!currentDayData) {
    return (
      <section className="px-5 py-5 lg:px-6">
        <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
        <div className="mt-2 h-5 w-48 animate-pulse rounded bg-slate-100" />
      </section>
    );
  }

  const {
    currentDay,
    title,
    summary,
    readingMinutes,
    objective,
    moduleType,
    recoveryMode,
    repathActive,
    tasks,
  } = currentDayData;

  const modeMeta =
    moduleType === "TECHNICAL"
      ? {
          icon: <BookOpen className="h-3.5 w-3.5" />,
          label: "Technical",
        }
      : moduleType === "RESILIENCE"
        ? {
            icon: <BrainCircuit className="h-3.5 w-3.5" />,
            label: "Scenario",
          }
        : {
            icon: <WalletCards className="h-3.5 w-3.5" />,
            label: "Wealth",
          };

  return (
    <section className="px-5 py-5 lg:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600">
              Day {currentDay}
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600">
              {modeMeta.icon}
              <span>{modeMeta.label}</span>
            </div>

            {repathActive || recoveryMode ? (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-700">
                <ShieldCheck className="h-3 w-3" />
                <span>Recovery active</span>
              </div>
            ) : null}
          </div>

          <h2 className="mt-3 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {title}
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
            {summary}
          </p>
        </div>

        <div className="min-w-[96px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left sm:text-right">
          <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
            Total XP
          </span>
          <div className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            {totalXP}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
            Objective
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            {objective}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Clock3 className="h-4 w-4 text-slate-400" />
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Reading
              </div>
              <div className="mt-1 text-sm font-medium text-slate-800">
                {readingMinutes} min
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Zap className="h-4 w-4 text-slate-400" />
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Tasks
              </div>
              <div className="mt-1 text-sm font-medium text-slate-800">
                {tasks.length} today
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Gem className="h-4 w-4 text-slate-400" />
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Reward
              </div>
              <div className="mt-1 text-sm font-medium text-slate-800">
                +{totalXP} XP
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}