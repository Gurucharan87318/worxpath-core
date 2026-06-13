import type { CareerGPSFormValues, CareerGPSResult, CareerTrack } from "../types";

const TRACKS: CareerTrack[] = ["data-analyst", "business-analyst", "full-stack"];

export function calculateCareerGPSResult(
  values: CareerGPSFormValues
): CareerGPSResult {
  const scores: Record<CareerTrack, number> = {
    "data-analyst": 0,
    "business-analyst": 0,
    "full-stack": 0,
  };

  if (values.domainInterest === "data") scores["data-analyst"] += 25;
  if (values.domainInterest === "business") scores["business-analyst"] += 25;
  if (values.domainInterest === "software") scores["full-stack"] += 25;

  if (values.workStyle === "structured") {
    scores["data-analyst"] += 10;
    scores["business-analyst"] += 12;
  }
  if (values.workStyle === "execution") {
    scores["data-analyst"] += 12;
    scores["full-stack"] += 10;
  }
  if (values.workStyle === "creative") {
    scores["full-stack"] += 12;
    scores["business-analyst"] += 8;
  }

  scores["data-analyst"] += values.numbersComfort * 6;
  scores["business-analyst"] += values.communicationComfort * 5;
  scores["full-stack"] += values.logicComfort * 6;

  if (values.toolPreference === "spreadsheets") {
    scores["data-analyst"] += 10;
    scores["business-analyst"] += 6;
  }
  if (values.toolPreference === "dashboards") {
    scores["data-analyst"] += 8;
    scores["business-analyst"] += 10;
  }
  if (values.toolPreference === "code") {
    scores["full-stack"] += 14;
    scores["data-analyst"] += 4;
  }

  if (values.learningMode === "reading") {
    scores["business-analyst"] += 6;
  }
  if (values.learningMode === "practice") {
    scores["data-analyst"] += 7;
    scores["full-stack"] += 7;
  }
  if (values.learningMode === "mentorship") {
    scores["business-analyst"] += 7;
  }

  if (values.pacePreference === "steady") {
    scores["data-analyst"] += 5;
    scores["business-analyst"] += 5;
  } else {
    scores["full-stack"] += 6;
  }

  if (values.weeklyCommitment === "lt10") {
    scores["business-analyst"] += 4;
  }
  if (values.weeklyCommitment === "10to20") {
    scores["data-analyst"] += 6;
    scores["business-analyst"] += 6;
    scores["full-stack"] += 4;
  }
  if (values.weeklyCommitment === "20plus") {
    scores["full-stack"] += 8;
    scores["data-analyst"] += 6;
  }

  if (values.transitionUrgency === "exploring") {
    scores["business-analyst"] += 4;
  }
  if (values.transitionUrgency === "active") {
    scores["data-analyst"] += 6;
    scores["business-analyst"] += 5;
  }
  if (values.transitionUrgency === "urgent") {
    scores["data-analyst"] += 7;
    scores["full-stack"] += 5;
  }

  const recommendedTrack = TRACKS.reduce((best, current) =>
    scores[current] > scores[best] ? current : best
  );

  const fitScore = Math.min(95, Math.max(62, scores[recommendedTrack]));

  const strengths: string[] = [];
  const skillGaps: string[] = [];

  if (values.numbersComfort >= 4) strengths.push("Comfort with analytical work");
  if (values.logicComfort >= 4) strengths.push("Strong logic orientation");
  if (values.communicationComfort >= 4) strengths.push("Communication readiness");
  if (values.learningMode === "practice") strengths.push("Execution-first learning style");
  if (values.weeklyCommitment !== "lt10") strengths.push("Enough weekly capacity to build momentum");

  if (recommendedTrack === "data-analyst") {
    if (values.toolPreference !== "spreadsheets" && values.toolPreference !== "dashboards") {
      skillGaps.push("Data tooling familiarity");
    }
    if (values.numbersComfort < 4) skillGaps.push("Quantitative confidence");
    skillGaps.push("SQL and dashboard storytelling");
  }

  if (recommendedTrack === "business-analyst") {
    if (values.communicationComfort < 4) skillGaps.push("Stakeholder communication");
    if (values.workStyle !== "structured") skillGaps.push("Requirements structuring discipline");
    skillGaps.push("Problem framing and business case writing");
  }

  if (recommendedTrack === "full-stack") {
    if (values.logicComfort < 4) skillGaps.push("Programming logic depth");
    if (values.weeklyCommitment === "lt10") skillGaps.push("Time allocation for build practice");
    skillGaps.push("Project shipping consistency");
  }

  const summaryMap: Record<CareerTrack, string> = {
    "data-analyst":
      "You look best aligned with a structured, execution-first path where analytical work, dashboards, and measurable output matter.",
    "business-analyst":
      "You look best aligned with a role that combines structured thinking, communication, and operational clarity across teams.",
    "full-stack":
      "You look best aligned with a build-oriented path where logic, coding comfort, and project execution drive progress.",
  };

  return {
    recommendedTrack,
    scores,
    fitScore,
    strengths: strengths.slice(0, 4),
    skillGaps: skillGaps.slice(0, 4),
    summary: summaryMap[recommendedTrack],
  };
}