import type { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import type { CareerGPSFormValues } from "../types";

type Props = {
  register: UseFormRegister<CareerGPSFormValues>;
  errors: FieldErrors<CareerGPSFormValues>;
  watch: UseFormWatch<CareerGPSFormValues>;
};

export default function StepCommitment({ register, errors, watch }: Props) {
  const weeklyCommitment = watch("weeklyCommitment");
  const transitionUrgency = watch("transitionUrgency");

  const optionClass = (selected: boolean) =>
    `rounded-2xl border p-4 text-left transition ${
      selected ? "border-blue-300 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50"
    }`;

  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Step 4
        </div>
        <h1 className="mt-2 text-4xl font-bold tracking-[-0.04em] text-slate-900">
          What is your current transition capacity?
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
          The strongest path is not only about fit. It also depends on time, urgency, and your ability to maintain weekly momentum.
        </p>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-900">Available weekly commitment</label>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          <label className={optionClass(weeklyCommitment === "lt10")}>
            <input type="radio" value="lt10" className="sr-only" {...register("weeklyCommitment")} />
            <div className="text-sm font-semibold text-slate-900">Under 10 hours</div>
            <div className="mt-1 text-sm text-slate-600">Slow but consistent progression.</div>
          </label>
          <label className={optionClass(weeklyCommitment === "10to20")}>
            <input type="radio" value="10to20" className="sr-only" {...register("weeklyCommitment")} />
            <div className="text-sm font-semibold text-slate-900">10–20 hours</div>
            <div className="mt-1 text-sm text-slate-600">Healthy weekly capacity for skill transition.</div>
          </label>
          <label className={optionClass(weeklyCommitment === "20plus")}>
            <input type="radio" value="20plus" className="sr-only" {...register("weeklyCommitment")} />
            <div className="text-sm font-semibold text-slate-900">20+ hours</div>
            <div className="mt-1 text-sm text-slate-600">Aggressive pace with room for project output.</div>
          </label>
        </div>
        {errors.weeklyCommitment && (
          <p className="mt-2 text-sm text-red-600">{errors.weeklyCommitment.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-900">Transition urgency</label>
        <div className="mt-3 grid gap-4 md:grid-cols-3">
          <label className={optionClass(transitionUrgency === "exploring")}>
            <input type="radio" value="exploring" className="sr-only" {...register("transitionUrgency")} />
            <div className="text-sm font-semibold text-slate-900">Exploring</div>
            <div className="mt-1 text-sm text-slate-600">Still understanding possible paths.</div>
          </label>
          <label className={optionClass(transitionUrgency === "active")}>
            <input type="radio" value="active" className="sr-only" {...register("transitionUrgency")} />
            <div className="text-sm font-semibold text-slate-900">Actively planning</div>
            <div className="mt-1 text-sm text-slate-600">Preparing to move within the next few months.</div>
          </label>
          <label className={optionClass(transitionUrgency === "urgent")}>
            <input type="radio" value="urgent" className="sr-only" {...register("transitionUrgency")} />
            <div className="text-sm font-semibold text-slate-900">Urgent transition</div>
            <div className="mt-1 text-sm text-slate-600">Need a focused entry path and faster execution.</div>
          </label>
        </div>
        {errors.transitionUrgency && (
          <p className="mt-2 text-sm text-red-600">{errors.transitionUrgency.message}</p>
        )}
      </div>
    </div>
  );
}