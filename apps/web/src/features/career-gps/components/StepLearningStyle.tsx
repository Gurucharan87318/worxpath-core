import type { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import type { CareerGPSFormValues } from "../types";

type Props = {
  register: UseFormRegister<CareerGPSFormValues>;
  errors: FieldErrors<CareerGPSFormValues>;
  watch: UseFormWatch<CareerGPSFormValues>;
};

export default function StepLearningStyle({ register, errors, watch }: Props) {
  const toolPreference = watch("toolPreference");
  const learningMode = watch("learningMode");
  const pacePreference = watch("pacePreference");

  const optionClass = (selected: boolean) =>
    `rounded-2xl border p-4 text-left transition ${
      selected ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50"
    }`;

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Step 3
        </div>
        <h1 className="mt-2 text-4xl font-bold tracking-[-0.04em] text-slate-900">
          How do you learn best when the work becomes real?
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
          The point is to match you with an operating rhythm that increases follow-through, not just interest.
        </p>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-900">Preferred tool environment</label>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          <label className={optionClass(toolPreference === "spreadsheets")}>
            <input type="radio" value="spreadsheets" className="sr-only" {...register("toolPreference")} />
            <div className="text-sm font-semibold text-slate-900">Spreadsheets</div>
            <div className="mt-1 text-sm text-slate-600">Excel-like analysis and structured tables.</div>
          </label>
          <label className={optionClass(toolPreference === "dashboards")}>
            <input type="radio" value="dashboards" className="sr-only" {...register("toolPreference")} />
            <div className="text-sm font-semibold text-slate-900">Dashboards</div>
            <div className="mt-1 text-sm text-slate-600">Visual reporting, BI tools, insight communication.</div>
          </label>
          <label className={optionClass(toolPreference === "code")}>
            <input type="radio" value="code" className="sr-only" {...register("toolPreference")} />
            <div className="text-sm font-semibold text-slate-900">Code</div>
            <div className="mt-1 text-sm text-slate-600">Programming, debugging, application builds.</div>
          </label>
        </div>
        {errors.toolPreference && (
          <p className="mt-2 text-sm text-red-600">{errors.toolPreference.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-900">Best learning mode</label>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          <label className={optionClass(learningMode === "reading")}>
            <input type="radio" value="reading" className="sr-only" {...register("learningMode")} />
            <div className="text-sm font-semibold text-slate-900">Reading-first</div>
            <div className="mt-1 text-sm text-slate-600">Clear concepts and structured explanation first.</div>
          </label>
          <label className={optionClass(learningMode === "practice")}>
            <input type="radio" value="practice" className="sr-only" {...register("learningMode")} />
            <div className="text-sm font-semibold text-slate-900">Practice-first</div>
            <div className="mt-1 text-sm text-slate-600">Small tasks, direct execution, repeated feedback.</div>
          </label>
          <label className={optionClass(learningMode === "mentorship")}>
            <input type="radio" value="mentorship" className="sr-only" {...register("learningMode")} />
            <div className="text-sm font-semibold text-slate-900">Guidance-first</div>
            <div className="mt-1 text-sm text-slate-600">Context, discussion, and direction from mentors.</div>
          </label>
        </div>
        {errors.learningMode && (
          <p className="mt-2 text-sm text-red-600">{errors.learningMode.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-900">Preferred pace</label>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <label className={optionClass(pacePreference === "steady")}>
            <input type="radio" value="steady" className="sr-only" {...register("pacePreference")} />
            <div className="text-sm font-semibold text-slate-900">Steady progression</div>
            <div className="mt-1 text-sm text-slate-600">Reliable weekly movement over intense bursts.</div>
          </label>
          <label className={optionClass(pacePreference === "intense")}>
            <input type="radio" value="intense" className="sr-only" {...register("pacePreference")} />
            <div className="text-sm font-semibold text-slate-900">Intense sprinting</div>
            <div className="mt-1 text-sm text-slate-600">High-energy short cycles with fast output.</div>
          </label>
        </div>
        {errors.pacePreference && (
          <p className="mt-2 text-sm text-red-600">{errors.pacePreference.message}</p>
        )}
      </div>
    </div>
  );
}