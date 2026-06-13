export type RePathPlanDay = {
  day: number;
  title: string;
  tasks: string[];
  xpTarget: number;
};

export type RePathSession = {
  id: string;
  userId: string;
  triggeredAt: string;
  resolvedAt: string | null;
  status: "ACTIVE" | "IN_PROGRESS" | "RESOLVED";
  recoveryPlan: {
    message: string;
    days: RePathPlanDay[];
    resolutionNote?: string | null;
  } | null;
};

export type RePathStatusResponse = {
  active: boolean;
  session: RePathSession | null;
};