import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import type { CareerGPSResult } from "../types";
import { ROUTES } from "../../../lib/navigation";

const trackLabels = {
  "data-analyst": "Data Analyst",
  "business-analyst": "Business Analyst",
  "full-stack": "Full-Stack Developer",
};

export default function CareerGPSResults({ result }: { result: CareerGPSResult }) {
  const nav = useNavigate();

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
      <div className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
        Career GPS Result
      </div>

      <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-slate-900">
        Best-fit path: {trackLabels[result.recommendedTrack]}
      </h1>

      <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-600">
        {result.summary}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
        <div className="rounded-3xl border border-slate-200 bg-[#F8F9FA] p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Fit score
          </div>
          <div className="mt-3 text-5xl font-bold tracking-[-0.05em] text-slate-900">
            {result.fitScore}%
          </div>
          <div className="mt-3 text-sm text-slate-600">
            A directional score based on self-reported fit, work style, and readiness.
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="text-sm font-semibold text-slate-900">Strengths to build on</div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {result.strengths.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="text-sm font-semibold text-slate-900">Likely skill gaps</div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {result.skillGaps.map((item) => (
                <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {Object.entries(result.scores).map(([track, score]) => (
          <div key={track} className="rounded-2xl border border-slate-200 bg-[#F8F9FA] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {trackLabels[track as keyof typeof trackLabels]}
            </div>
            <div className="mt-2 text-2xl font-bold tracking-[-0.04em] text-slate-900">
              {score}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <SignedOut>
          <button
            type="button"
            onClick={() => nav(ROUTES.signUp, { state: { from: ROUTES.gps } })}
            className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Continue to onboarding
          </button>
        </SignedOut>

        <SignedIn>
          <button
            type="button"
            onClick={() => nav(ROUTES.dashboard)}
            className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Go to dashboard
          </button>
        </SignedIn>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Retake assessment
        </button>
      </div>
    </div>
  );
}