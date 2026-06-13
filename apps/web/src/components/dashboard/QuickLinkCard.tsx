import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

type QuickLinkCardProps = {
  title: string;
  description: string;
  to: string;
  icon: LucideIcon;
  badge?: string;
  muted?: boolean;
};

export default function QuickLinkCard({
  title,
  description,
  to,
  icon: Icon,
  badge,
  muted = false,
}: QuickLinkCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group flex flex-col gap-4 rounded-[20px] border border-slate-100 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
        muted ? "bg-[#F8F9FA]" : "bg-white"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-xl bg-blue-50 p-2 text-blue-700 shadow-sm">
          <Icon className="h-4 w-4" />
        </div>
        {badge && (
          <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-slate-500">
            {badge}
          </span>
        )}
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
        <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      </div>

      <div className="mt-auto flex items-center gap-1 text-xs font-semibold text-blue-700">
        Open
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}