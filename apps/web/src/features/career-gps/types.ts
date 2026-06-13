export type CareerTrack = "data-analyst" | "business-analyst" | "full-stack";

export type CareerGPSFormValues = {
  domainInterest: "data" | "business" | "software";
  workStyle: "structured" | "execution" | "creative";
  numbersComfort: number;
  communicationComfort: number;
  logicComfort: number;
  toolPreference: "spreadsheets" | "dashboards" | "code";
  learningMode: "reading" | "practice" | "mentorship";
  pacePreference: "steady" | "intense";
  weeklyCommitment: "lt10" | "10to20" | "20plus";
  transitionUrgency: "exploring" | "active" | "urgent";
};

export type CareerGPSResult = {
  recommendedTrack: CareerTrack;
  scores: Record<CareerTrack, number>;
  fitScore: number;
  strengths: string[];
  skillGaps: string[];
  summary: string;
};