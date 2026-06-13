import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CareerGPSLayout from "../features/career-gps/components/CareerGPSLayout";
import CareerGPSProgress from "../features/career-gps/components/CareerGPSProgress";
import StepCareerIntent from "../features/career-gps/components/StepCareerIntent";
import StepAptitude from "../features/career-gps/components/StepAptitude";
import StepLearningStyle from "../features/career-gps/components/StepLearningStyle";
import StepCommitment from "../features/career-gps/components/StepCommitment";
import CareerGPSResults from "../features/career-gps/components/CareerGPSResults";
import { careerGPSSchema } from "../features/career-gps/lib/gps-schema";
import { calculateCareerGPSResult } from "../features/career-gps/lib/gps-scoring";
import type { CareerGPSFormValues } from "../features/career-gps/types";
import { ROUTES } from "../lib/navigation";
import PageHeader from "../components/navigation/PageHeader";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 lg:px-8">{children}</div>
  );
}
const defaultValues: CareerGPSFormValues = {
  domainInterest: "data",
  workStyle: "execution",
  numbersComfort: 3,
  communicationComfort: 3,
  logicComfort: 3,
  toolPreference: "dashboards",
  learningMode: "practice",
  pacePreference: "steady",
  weeklyCommitment: "10to20",
  transitionUrgency: "active",
};

export default function CareerGPSPage() {
  const [step, setStep] = useState(1);
  const [submittedValues, setSubmittedValues] = useState<CareerGPSFormValues | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<CareerGPSFormValues>({
    resolver: zodResolver(careerGPSSchema),
    defaultValues,
    mode: "onChange",
  });

  const result = useMemo(() => {
    if (!submittedValues) return null;
    return calculateCareerGPSResult(submittedValues);
  }, [submittedValues]);

  const nextStep = async () => {
    const fieldsByStep: Record<number, (keyof CareerGPSFormValues)[]> = {
      1: ["domainInterest", "workStyle"],
      2: ["numbersComfort", "communicationComfort", "logicComfort"],
      3: ["toolPreference", "learningMode", "pacePreference"],
      4: ["weeklyCommitment", "transitionUrgency"],
    };

    const valid = await trigger(fieldsByStep[step]);
    if (!valid) return;

    if (step < 4) {
      setStep((s) => s + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const onSubmit = (values: CareerGPSFormValues) => {
    setSubmittedValues(values);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepCareerIntent register={register} errors={errors} watch={watch} />;
      case 2:
        return <StepAptitude register={register} errors={errors} />;
      case 3:
        return <StepLearningStyle register={register} errors={errors} watch={watch} />;
      case 4:
        return <StepCommitment register={register} errors={errors} watch={watch} />;
      default:
        return null;
    }
  };

  if (result) {
    return (
      <CareerGPSLayout
        sidebar={<CareerGPSProgress currentStep={4} />}
      >
        <CareerGPSResults result={result} />
      </CareerGPSLayout>
    );
  }


  
  return (
    <CareerGPSLayout
      sidebar={<CareerGPSProgress currentStep={step} />}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        {renderStep()}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
          <div className="text-sm text-slate-500">
            Step {step} of 4
          </div>


          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={previousStep}
              disabled={step === 1}
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                See my result
              </button>
            )}
          </div>
        </div>
      </form>
    </CareerGPSLayout>
  );
}