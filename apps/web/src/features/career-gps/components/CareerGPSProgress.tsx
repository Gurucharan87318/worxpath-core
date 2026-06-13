import { gpsSteps } from "../config/questions";

type Props = {
  currentStep: number;
};

export default function CareerGPSProgress({ currentStep }: Props) {
  return (

    
    <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        Career GPS
      </div>
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-slate-900">
        Assessment flow
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        A short assessment that maps intent, strengths, and transition readiness into a cleaner entry path.
      </p>

      <div className="mt-8 space-y-4">
        {gpsSteps.map((step) => {
          const active = step.id === currentStep;
          const done = step.id < currentStep;

          return (
            <div
              key={step.id}
              className={`rounded-2xl border px-4 py-4 transition ${
                active
                  ? "border-blue-200 bg-blue-50"
                  : done
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`grid h-8 w-8 place-items-center rounded-full text-sm font-semibold ${
                    active
                      ? "bg-blue-600 text-white"
                      : done
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-slate-700"
                  }`}
                >
                  {step.id}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{step.title}</div>
                  <div className="text-xs text-slate-500">{step.description}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}