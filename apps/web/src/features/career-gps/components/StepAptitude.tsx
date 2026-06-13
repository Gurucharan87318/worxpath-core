import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CareerGPSFormValues } from "../types";

type Props = {
  register: UseFormRegister<CareerGPSFormValues>;
  errors: FieldErrors<CareerGPSFormValues>;
};

function RangeField({
  label,
  name,
  register,
}: {
  label: string;
  name: "numbersComfort" | "communicationComfort" | "logicComfort";
  register: UseFormRegister<CareerGPSFormValues>;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-semibold text-slate-900">{label}</label>
        <span className="text-xs text-slate-500">1 = low, 5 = high</span>
      </div>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        className="mt-4 w-full accent-blue-600"
        {...register(name, { valueAsNumber: true })}
      />
      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>
    </div>
  );
}

export default function StepAptitude({ register }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Step 2
        </div>
        <h1 className="mt-2 text-4xl font-bold tracking-[-0.04em] text-slate-900">
          Rate your current comfort across core capability areas.
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
          This is not a test score. It is a self-estimate used to shape track fit and identify likely skill gaps.
        </p>
      </div>

      <div className="grid gap-4">
        <RangeField
          label="Comfort with numbers and analytical tasks"
          name="numbersComfort"
          register={register}
        />
        <RangeField
          label="Comfort with communication and presenting ideas"
          name="communicationComfort"
          register={register}
        />
        <RangeField
          label="Comfort with logic, systems, and problem decomposition"
          name="logicComfort"
          register={register}
        />
      </div>
    </div>
  );
}