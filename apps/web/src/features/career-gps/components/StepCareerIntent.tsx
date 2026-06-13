import type { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import type { CareerGPSFormValues } from "../types";

type Props = {
  register: UseFormRegister<CareerGPSFormValues>;
  errors: FieldErrors<CareerGPSFormValues>;
  watch: UseFormWatch<CareerGPSFormValues>;
};

export default function StepCareerIntent({ register, errors, watch }: Props) {
  const domain = watch("domainInterest");
  const workStyle = watch("workStyle");

  const optionClass = (selected: boolean) =>
    `rounded-2xl border p-4 text-left transition ${
      selected ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50"
    }`;

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Step 1
        </div>
        <h1 className="mt-2 text-4xl font-bold tracking-[-0.04em] text-slate-900">
          What kind of career transition are you aiming for?
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
          Start with direction. This helps the system map you toward the right entry lane before recommending a roadmap.
        </p>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-900">Primary domain interest</label>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          <label className={optionClass(domain === "data")}>
            <input type="radio" value="data" className="sr-only" {...register("domainInterest")} />
            <div className="text-sm font-semibold text-slate-900">Data & analytics</div>
            <div className="mt-1 text-sm text-slate-600">
              Dashboards, insight generation, business data work.
            </div>
          </label>

          <label className={optionClass(domain === "business")}>
            <input type="radio" value="business" className="sr-only" {...register("domainInterest")} />
            <div className="text-sm font-semibold text-slate-900">Business & operations</div>
            <div className="mt-1 text-sm text-slate-600">
              Process clarity, requirements, stakeholder coordination.
            </div>
          </label>

          <label className={optionClass(domain === "software")}>
            <input type="radio" value="software" className="sr-only" {...register("domainInterest")} />
            <div className="text-sm font-semibold text-slate-900">Software & product builds</div>
            <div className="mt-1 text-sm text-slate-600">
              Coding, interfaces, systems, feature execution.
            </div>
          </label>
        </div>
        {errors.domainInterest && (
          <p className="mt-2 text-sm text-red-600">{errors.domainInterest.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-900">Preferred work style</label>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          <label className={optionClass(workStyle === "structured")}>
            <input type="radio" value="structured" className="sr-only" {...register("workStyle")} />
            <div className="text-sm font-semibold text-slate-900">Structured</div>
            <div className="mt-1 text-sm text-slate-600">
              Clear process, defined workflow, stable execution.
            </div>
          </label>

          <label className={optionClass(workStyle === "execution")}>
            <input type="radio" value="execution" className="sr-only" {...register("workStyle")} />
            <div className="text-sm font-semibold text-slate-900">Execution-first</div>
            <div className="mt-1 text-sm text-slate-600">
              Learn by doing, fast iteration, visible output.
            </div>
          </label>

          <label className={optionClass(workStyle === "creative")}>
            <input type="radio" value="creative" className="sr-only" {...register("workStyle")} />
            <div className="text-sm font-semibold text-slate-900">Creative problem solving</div>
            <div className="mt-1 text-sm text-slate-600">
              Building, experimenting, shaping solutions.
            </div>
          </label>
        </div>
        {errors.workStyle && (
          <p className="mt-2 text-sm text-red-600">{errors.workStyle.message}</p>
        )}
      </div>
    </div>
  );
}