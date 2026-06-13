import { useProgressStore } from "../../store/useProgressStore";

export default function ProgressPanel() {
  const { daysCurrent, totalDays, recommendedTrack, completedChallenges } =
    useProgressStore();

  const percent = Math.round((daysCurrent / totalDays) * 100);

  return (
    <div className="rounded-[20px] border border-slate-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Active Track
          </p>
          <h3 className="mt-1 text-xl font-bold tracking-[-0.03em] text-slate-900">
            {recommendedTrack}
          </h3>
        </div>
        <div className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          Day {daysCurrent} / {totalDays}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>{percent}% complete</span>
        <span>{totalDays - daysCurrent} days remaining</span>
      </div>

      {/* Completed challenges */}
      <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-100 bg-[#F8F9FA] px-4 py-3">
        <div className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{completedChallenges}</span>{" "}
          challenges completed
        </span>
      </div>
    </div>
  );
}