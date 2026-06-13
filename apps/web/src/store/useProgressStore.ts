import { create } from "zustand";

export type ProgressStore = {
  xpTotal: number;
  currentStreak: number;
  longestStreak: number;
  daysCurrent: number;
  totalDays: number;
  lastActivityAt: string | null;
  completedChallenges: number;
  recommendedTrack: string;
};

export const useProgressStore = create<ProgressStore>(() => ({
  xpTotal: 320,
  currentStreak: 4,
  longestStreak: 7,
  daysCurrent: 8,
  totalDays: 100,
  lastActivityAt: new Date().toISOString(),
  completedChallenges: 14,
  recommendedTrack: "Data Analyst",
}));