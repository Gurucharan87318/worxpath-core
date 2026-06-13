import { Check, Layers3, ShieldCheck, X } from "lucide-react";
import { useMemo } from "react";
import { useWorkspaceStore } from "../../store/useWorkspaceStore";
import type { WorkspaceSyncSequenceItem } from "../../types/workspace";

function getSequenceWindow(
  sequence: WorkspaceSyncSequenceItem[],
  currentDay: number,
  count = 12,
) {
  const currentIndex = sequence.findIndex((item: WorkspaceSyncSequenceItem) => item.day === currentDay);
  const start = currentIndex >= 0 ? Math.max(0, currentIndex - 5) : 0;
  return sequence.slice(start, start + count);
}

function MiniPathCell({ item }: { item: WorkspaceSyncSequenceItem }) {
  const className =
    item.state === "completed"
      ? "border-emerald-600 bg-emerald-500"
      : item.state === "current" || item.state === "repath"
        ? "border-slate-900 bg-slate-900"
        : "border-slate-300 bg-white";

  return (
    <div
      title={`Day ${item.day}`}
      className={`h-3.5 w-3.5 rounded-sm border ${className}`}
    />
  );
}

function MatrixCell({ item }: { item: WorkspaceSyncSequenceItem }) {
  const stateClass =
    item.state === "completed"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : item.state === "current" || item.state === "repath"
        ? "border-slate-900 bg-slate-900 text-white"
        : item.state === "available"
          ? "border-slate-200 bg-white text-slate-500"
          : "border-slate-200 bg-slate-100 text-slate-300";

  return (
    <div
      title={`Day ${item.day}`}
      className={`flex aspect-square items-center justify-center rounded-lg border text-[10px] font-medium ${stateClass}`}
    >
      {item.state === "completed" ? (
        <Check className="h-2.5 w-2.5" strokeWidth={3} />
      ) : (
        item.day
      )}
    </div>
  );
}

export default function WorkspaceTopbar() {
  const { currentDayData, isSequenceOpen, setSequenceOpen } = useWorkspaceStore();

  const metrics = useMemo(() => {
    if (!currentDayData || !currentDayData.sequence) return null;
    
    const sequence = currentDayData.sequence;
    const completedCount = sequence.filter((item: WorkspaceSyncSequenceItem) => item.state === "completed").length;
    const totalDays = currentDayData.totalDays || sequence.length || 12;
    const completionRate = (completedCount / totalDays) * 100;

    return {
      completedCount,
      completionRate,
      topSequence: getSequenceWindow(sequence, currentDayData.currentDay, 12)
    };
  }, [currentDayData]);

  if (!currentDayData || !metrics) {
    return (
      <section className="px-5 py-5 lg:px-6">
        <div className="h-4 w-24 animate-pulse rounded bg-slate-100" />
        <div className="mt-2 h-6 w-48 animate-pulse rounded bg-slate-100" />
      </section>
    );
  }

  const { title, currentDay, totalDays, trackName, repathActive, sequence } = currentDayData;
  const { completedCount, completionRate, topSequence } = metrics;

  return (
    <>
      <section className="border-b border-slate-200 bg-white px-5 py-5 lg:px-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
              <span>Workspace</span>
              <span>/</span>
              <span className="text-slate-700">{trackName}</span>

              {repathActive ? (
                <>
                  <span>/</span>
                  <span className="inline-flex items-center gap-1 text-amber-700">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Recovery
                  </span>
                </>
              ) : null}
            </div>

            <div className="mt-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Day {currentDay} of {totalDays}
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                {title}
              </h1>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 xl:items-end">
            <div className="w-full min-w-70 max-w-90 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                <span>Path progress</span>
                <span>
                  {completedCount}/{totalDays} complete
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-slate-900 transition-all duration-300"
                  style={{ width: `${completionRate}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>{completionRate.toFixed(0)}% finished</span>
                <span>Current day {currentDay}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSequenceOpen(true)}
              className="inline-flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-1.5">
                {/* 💚 Fixed implicit 'any' inside top list mapping */}
                {topSequence.map((item: WorkspaceSyncSequenceItem) => (
                  <MiniPathCell key={item.day} item={item} />
                ))}
              </div>
              <span>View path</span>
              <Layers3 className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </div>
      </section>

      {isSequenceOpen ? (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-slate-900/20"
            onClick={() => setSequenceOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-80 flex-col border-l border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                  Path
                </p>
                <h2 className="text-base font-semibold text-slate-900">
                  Learning sequence
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSequenceOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                      Current position
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-800">
                      Day {currentDay} of {totalDays}
                    </p>
                  </div>

                  <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-slate-600">
                    {repathActive ? "Recovery" : "Main path"}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-8 gap-2">
                  {/* 💚 Fixed implicit 'any' inside drawer matrix mapping */}
                  {sequence.map((item: WorkspaceSyncSequenceItem) => (
                    <MatrixCell key={item.day} item={item} />
                  ))}
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                  Legend
                </p>

                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm border border-slate-300 bg-white" />
                  <span>Available</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm border border-slate-900 bg-slate-900" />
                  <span>Current</span>
                </div>

                <div className="h-px bg-slate-200" />

                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm border border-emerald-600 bg-emerald-500" />
                  <span>Completed</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm border border-slate-200 bg-slate-100" />
                  <span>Locked / Archived</span>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-200 px-5 py-4">
              <button
                type="button"
                onClick={() => setSequenceOpen(false)}
                className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}