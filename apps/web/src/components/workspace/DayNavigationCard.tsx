import {
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Code2,
  Play,
  TerminalSquare,
  WalletCards,
} from "lucide-react";
import { useMemo } from "react";
import { useWorkspaceStore } from "../../store/useWorkspaceStore";
import { useWorkspaceActions } from "../../hooks/useWorkspaceActions";

function getModeIcon(mode: "TECHNICAL" | "RESILIENCE" | "WEALTH") {
  if (mode === "RESILIENCE") {
    return <TerminalSquare className="h-3.5 w-3.5 text-slate-600" />;
  }

  if (mode === "WEALTH") {
    return <WalletCards className="h-3.5 w-3.5 text-slate-600" />;
  }

  return <Code2 className="h-3.5 w-3.5 text-slate-600" />;
}

export default function DayNavigationCard() {
  const currentDayData = useWorkspaceStore((state) => state.currentDayData);
  const isSubmitting = useWorkspaceStore((state) => state.isSubmitting);
  const { runCode, submitDay } = useWorkspaceActions();

  const completedCount = useMemo(() => {
    if (!currentDayData) return 0;
    return currentDayData.tasks.filter((task) => task.completed).length;
  }, [currentDayData]);

  if (!currentDayData) {
    return (
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="h-14 animate-pulse rounded bg-slate-50" />
      </section>
    );
  }

  const allTasksDone =
    currentDayData.tasks.length > 0 &&
    currentDayData.tasks.every((task) => task.completed);

  return (
    <section className="p-5 bg-white rounded-xl">
      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        
        {/* Verification Checkpoint Matrix Progress Panel */}
        <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 flex flex-col justify-between shadow-inner">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">
              // Path Validation Counters
            </p>

            <div className="mt-3 flex items-start gap-3">
              <div className="rounded bg-white p-1.5 text-slate-500 border border-slate-200 shadow-xs mt-0.5">
                <CheckCheck className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 font-sans">
                  {completedCount} / {currentDayData.tasks.length} Checkpoints Logged
                </p>
                <p className="text-xs text-slate-500 font-sans font-normal leading-relaxed mt-0.5">
                  All sub-task validations must return structural passage parameters before registering day completion markers.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 inline-flex items-center self-start gap-1.5 rounded border border-slate-200 bg-white px-2 py-0.5 font-mono text-[8px] uppercase font-bold text-slate-500 shadow-xs">
            {getModeIcon(currentDayData.moduleType)}
            <span>Domain Type // {currentDayData.moduleType}</span>
          </div>
        </div>

        {/* Runtime Triggers Control Action Interface Block */}
        <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 flex flex-col justify-between shadow-inner space-y-4">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-400">
              // Execution Triggers
            </p>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={runCode}
                className="inline-flex h-8 items-center justify-center rounded-md bg-slate-900 px-4 font-mono text-xs font-bold text-white hover:bg-slate-800 uppercase tracking-wider transition-colors shadow-sm"
              >
                <Play className="mr-1.5 h-2.5 w-2.5 fill-current" />
                Compile Run
              </button>

              <button
                type="button"
                disabled={!allTasksDone || isSubmitting}
                onClick={submitDay}
                className="inline-flex h-8 items-center justify-center rounded-md border border-slate-200 bg-white px-4 font-mono text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30 uppercase tracking-wider transition-all shadow-xs"
              >
                <TerminalSquare className="mr-1.5 h-3.5 w-3.5" />
                {isSubmitting ? "Logging State..." : "Submit Day Node"}
              </button>
            </div>
          </div>

          {/* Navigational Step Indexes */}
          <div className="flex flex-wrap gap-2 border-t border-slate-200/60 pt-3">
            <button
              type="button"
              className="inline-flex h-7 items-center justify-center rounded-md border border-slate-200 bg-white px-3 font-mono text-[10px] font-bold text-slate-600 transition hover:bg-slate-50 shadow-xs"
            >
              <ChevronLeft className="mr-1 h-3 w-3" />
              Previous Index
            </button>

            <button
              type="button"
              className="inline-flex h-7 items-center justify-center rounded-md border border-slate-200 bg-white px-3 font-mono text-[10px] font-bold text-slate-600 transition hover:bg-slate-50 shadow-xs"
            >
              Next Horizon
              <ChevronRight className="ml-1 h-3 w-3" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}