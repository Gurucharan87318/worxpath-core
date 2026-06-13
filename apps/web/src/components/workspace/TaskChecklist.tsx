import {
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Circle,
  WalletCards,
} from "lucide-react";
import { useWorkspaceStore } from "../../store/useWorkspaceStore";

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 py-5 lg:px-6">
      <div>
        <div className="border-b border-slate-200 pb-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            {title}
          </p>
          {subtitle ? (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          ) : null}
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </section>
  );
}

export default function TaskChecklist() {
  const {
    currentDayData,
    markTaskComplete,
    selectedChoiceId,
    setSelectedChoiceId,
    financialValues,
    setFinancialValue,
  } = useWorkspaceStore();

  if (!currentDayData) {
    return (
      <SectionCard title="Tasks" subtitle="Loading day content...">
        <div className="space-y-2">
          <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
          <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
        </div>
      </SectionCard>
    );
  }

  if (currentDayData.moduleType === "TECHNICAL") {
    return (
      <SectionCard
        title="Tasks"
        subtitle="Complete each block and mark it done."
      >
        <div className="space-y-3">
          {currentDayData.tasks.map((task) => (
            <div
              key={task.id}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full">
                      {task.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <Circle className="h-4 w-4 text-slate-300" />
                      )}
                    </div>

                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                      Block {task.order}
                    </span>

                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                      {task.xp} XP
                    </span>
                  </div>

                  <h3 className="mt-3 text-sm font-semibold text-slate-900">
                    {task.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {task.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => markTaskComplete(task.id)}
                  disabled={task.completed}
                  className="h-10 shrink-0 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {task.completed ? "Completed" : "Mark done"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    );
  }

  if (currentDayData.moduleType === "RESILIENCE") {
    return (
      <SectionCard
        title="Scenario"
        subtitle="Read the situation and choose one response."
      >
        <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600">
              <BrainCircuit className="h-3.5 w-3.5" />
              Scenario
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 p-4">
              <p className="text-sm leading-7 text-slate-700">
                {currentDayData.summary}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {(currentDayData.choices ?? []).map((choice) => {
              const active = selectedChoiceId === choice.id;

              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => setSelectedChoiceId(choice.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-slate-900 bg-slate-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm leading-6 ${active ? "font-semibold text-slate-900" : "text-slate-700"}`}>
                        {choice.label}
                      </p>
                    </div>
                    <ChevronRight className={`mt-0.5 h-4 w-4 shrink-0 ${active ? "text-slate-900" : "text-slate-400"}`} />
                  </div>

                  {active && choice.outcome ? (
                    <div className="mt-3 rounded-xl bg-white p-3 text-sm leading-6 text-slate-500">
                      {choice.outcome}
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Simulation"
      subtitle="Adjust the inputs and review the guidance."
    >
      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600">
            <WalletCards className="h-3.5 w-3.5" />
            Inputs
          </div>

          <div className="mt-4 space-y-3">
            {(currentDayData.financialInputs ?? []).map((input) => (
              <div
                key={input.key}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{input.label}</p>
                  </div>

                  <div className="rounded-lg bg-white px-2.5 py-1 text-sm font-medium text-slate-700">
                    {input.prefix ?? ""}
                    {financialValues[input.key] ?? input.value}
                    {input.suffix ?? ""}
                  </div>
                </div>

                <input
                  type="range"
                  min={input.min ?? 0}
                  max={input.max ?? 100}
                  step={input.step ?? 1}
                  value={financialValues[input.key] ?? input.value}
                  onChange={(event) =>
                    setFinancialValue(input.key, Number(event.target.value))
                  }
                  className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-slate-900"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600">
            <AlertTriangle className="h-3.5 w-3.5" />
            Guidance
          </div>

          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <p className="text-sm leading-7 text-slate-600">
              Adjust the inputs to understand how spending and income changes affect your runway and short-term stability.
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}