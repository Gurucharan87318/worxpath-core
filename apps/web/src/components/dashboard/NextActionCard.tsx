import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../lib/navigation";
import { useProgressStore } from "../../store/useProgressStore";

export default function NextActionCard() {
  const { daysCurrent, recommendedTrack } = useProgressStore();

  return (
    <div className="rounded-[20px] border border-blue-100 bg-blue-600 p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
        Next Action
      </p>
      <h3 className="mt-2 text-xl font-bold leading-snug tracking-[-0.03em] text-white">
        Continue Day {daysCurrent + 1}
      </h3>
      <p className="mt-2 text-sm leading-6 text-blue-100">
        {recommendedTrack} track — keep your streak alive and earn XP today.
      </p>
      <Link
        to={ROUTES.workspace}
        className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
      >
        Open Workspace
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}