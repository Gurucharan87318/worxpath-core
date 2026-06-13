import { useProgressStore } from "../../store/useProgressStore";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function getMockActivity(streak: number): boolean[] {
  return DAYS.map((_, i) => i < streak);
}

export default function WeeklyMomentumCard() {
  const { currentStreak, longestStreak } = useProgressStore();
  const activity = getMockActivity(currentStreak);

  return (
    <div className="rounded-[20px] border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">Weekly Momentum</p>
        <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600">
          🔥 {currentStreak}-day streak
        </span>
      </div>

      {/* Day dots */}
      <div className="mt-5 flex items-center justify-between">
        {DAYS.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div
              className={`h-8 w-8 rounded-full transition-colors ${
                activity[i]
                  ? "bg-blue-600 shadow-sm"
                  : "border border-slate-200 bg-[#F8F9FA]"
              }`}
            />
            <span className="text-[11px] font-medium text-slate-400">{day}</span>
          </div>
        ))}
      </div>

      {/* Longest streak */}
      <div className="mt-5 flex items-center gap-2 rounded-xl border border-slate-100 bg-[#F8F9FA] px-4 py-3">
        <div className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="text-sm text-slate-600">
          Longest streak:{" "}
          <span className="font-semibold text-slate-900">{longestStreak} days</span>
        </span>
      </div>
    </div>
  );
}