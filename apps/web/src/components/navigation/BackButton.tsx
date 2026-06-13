import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../lib/navigation";

type BackButtonProps = {
  fallbackTo?: string;
  label?: string;
  className?: string;
};

export default function BackButton({
  fallbackTo = ROUTES.home,
  label = "Back",
  className = "",
}: BackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const hasHistory =
      window.history.length > 1 && !!location.key && location.key !== "default";

    if (hasHistory) {
      navigate(-1);
      return;
    }

    navigate(fallbackTo, { replace: true });
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 ${className}`}
      aria-label={label}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}