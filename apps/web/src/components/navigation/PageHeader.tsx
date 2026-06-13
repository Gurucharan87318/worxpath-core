import type { ReactNode } from "react";
import BackButton from "./BackButton";
import PageBreadcrumbs from "./PageBreadcrumbs";
import { ROUTES } from "../../lib/navigation";

type PageHeaderProps = {
  title: string;
  description?: string;
  fallbackTo?: string;
  actions?: ReactNode;
  showBackButton?: boolean;
};

export default function PageHeader({
  title,
  description,
  fallbackTo = ROUTES.home,
  actions,
  showBackButton = true,
}: PageHeaderProps) {
  return (
    <div className="mb-10">
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {showBackButton ? <BackButton fallbackTo={fallbackTo} /> : null}
            <PageBreadcrumbs />
          </div>

          {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-900 md:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}