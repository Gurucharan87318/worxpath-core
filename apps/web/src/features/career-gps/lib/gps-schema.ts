import { z } from "zod";

export const careerGPSSchema = z.object({
  domainInterest: z.enum(["data", "business", "software"], {
    error: "Choose a domain interest.",
  }),
  workStyle: z.enum(["structured", "execution", "creative"], {
    error: "Choose your preferred work style.",
  }),
  numbersComfort: z.number().min(1).max(5),
  communicationComfort: z.number().min(1).max(5),
  logicComfort: z.number().min(1).max(5),
  toolPreference: z.enum(["spreadsheets", "dashboards", "code"], {
    error: "Choose a preferred tool style.",
  }),
  learningMode: z.enum(["reading", "practice", "mentorship"], {
    error: "Choose a learning mode.",
  }),
  pacePreference: z.enum(["steady", "intense"], {
    error: "Choose a pace preference.",
  }),
  weeklyCommitment: z.enum(["lt10", "10to20", "20plus"], {
    error: "Choose weekly commitment.",
  }),
  transitionUrgency: z.enum(["exploring", "active", "urgent"], {
    error: "Choose transition urgency.",
  }),
});

export type CareerGPSSchema = z.infer<typeof careerGPSSchema>;