import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../lib/navigation";
import { ROUTE_LABELS } from "../../lib/route-meta";

function formatSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function PageBreadcrumbs() {
  const location = useLocation();

  const segments = location.pathname.split("/").filter(Boolean);

  const items = [
    { label: ROUTE_LABELS[ROUTES.home], to: ROUTES.home },
    ...segments.map((segment, index) => {
      const to = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        label: ROUTE_LABELS[to] ?? formatSegment(segment),
        to,
      };
    }),
  ];

  if (items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.to} className="inline-flex items-center gap-1">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}

              {isLast ? (
                <span className="font-medium text-slate-900">{item.label}</span>
              ) : (
                <Link
                  to={item.to}
                  className="transition-colors hover:text-slate-900"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}