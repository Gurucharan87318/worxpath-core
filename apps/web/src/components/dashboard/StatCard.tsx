import { cn } from "../../lib/utils";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string | number;
  sublabel?: string;
  icon: LucideIcon;
  accent?: "blue" | "gold" | "green" | "slate";
};

const ACCENT_MAP = {
  blue: {
    icon: "bg-blue-50 text-blue-700",
    value: "text-blue-700",
  },
  gold: {
    icon: "bg-amber-50 text-amber-600",
    value: "text-amber-600",
  },
  green: {
    icon: "bg-emerald-50 text-emerald-700",
    value: "text-emerald-700",
  },
  slate: {
    icon: "bg-slate-100 text-slate-700",
    value: "text-slate-900",
  },
};

export default function StatCard({
  label,
  value,
  sublabel,
  icon: Icon,
  accent = "slate",
}: StatCardProps) {
  const colors = ACCENT_MAP[accent];

  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <div className={cn("rounded-xl p-2 shadow-sm", colors.icon)}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div>
        <div className={cn("text-3xl font-bold tracking-[-0.04em]", colors.value)}>
          {value}
        </div>
        {sublabel && (
          <p className="mt-1 text-xs text-slate-500">{sublabel}</p>
        )}
      </div>
    </div>
  );
}