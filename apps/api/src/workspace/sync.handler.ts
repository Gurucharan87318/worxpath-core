// src/api/workspace/sync.handler.ts
// Use this in your NestJS controller or Express router — NOT as a Next.js route

import { PrismaClient, ChallengeType } from "@prisma/client";

const prisma = new PrismaClient();

type DayStatus = "LOCKED" | "AVAILABLE" | "CURRENT" | "COMPLETED";

export interface SequenceItem {
  dayNumber: number;
  status: DayStatus;
  progressPercent: number;
  moduleType: ChallengeType;
}

export interface WorkspaceSyncResponse {
  trackName: string;
  currentDay: number;
  totalDays: number;
  availableUntilDay: number;
  completionRate: number;
  repathActive: boolean;
  sequence: SequenceItem[];
}

export type SyncActionBody =
  | { action: "day_complete"; dayNumber: number }
  | { action: "work_more" };

const REPATH_THRESHOLD_MS = 72 * 60 * 60 * 1000;

function inferModuleType(
  challenges: { type: ChallengeType }[],
): ChallengeType {
  const special = challenges.find(
    (c) =>
      c.type === ChallengeType.RESILIENCE || c.type === ChallengeType.WEALTH,
  );
  return special?.type ?? ChallengeType.SQL;
}

function buildSequence(
  days: { dayNumber: number; challenges: { type: ChallengeType }[] }[],
  currentDayNumber: number,
  progressMap: Map<number, boolean>,
): SequenceItem[] {
  return days.map((day) => {
    const completed = progressMap.get(day.dayNumber) ?? false;

    let status: DayStatus = "LOCKED";
    if (completed) {
      status = "COMPLETED";
    } else if (day.dayNumber === currentDayNumber) {
      status = "CURRENT";
    } else if (day.dayNumber < currentDayNumber) {
      status = "AVAILABLE";
    }

    return {
      dayNumber: day.dayNumber,
      status,
      progressPercent: completed ? 100 : 0,
      moduleType: inferModuleType(day.challenges),
    };
  });
}

async function evaluateRePath(userId: string): Promise<void> {
  const profile = await prisma.userProfile.findUnique({
    where: { userId },
  });

  if (!profile?.lastActivityAt) return;

  const inactiveMs = Date.now() - new Date(profile.lastActivityAt).getTime();
  if (inactiveMs < REPATH_THRESHOLD_MS) return;

  await prisma.$transaction(async (tx) => {
    await tx.userProfile.update({
      where: { userId },
      data: { isRePathActive: true },
    });

    const existing = await tx.rePathSession.findUnique({ where: { userId } });

    if (existing) {
      await tx.rePathSession.update({
        where: { userId },
        data: {
          status: "ACTIVE",
          triggeredAt: new Date(),
          recoveryPlan: { mode: "3_DAY_RECOVERY_SPRINT", length: 3 },
          archivedDayNumbers: profile.archivedDayNumbers,
        },
      });
    } else {
      await tx.rePathSession.create({
        data: {
          userId,
          status: "ACTIVE",
          recoveryPlan: { mode: "3_DAY_RECOVERY_SPRINT", length: 3 },
          archivedDayNumbers: profile.archivedDayNumbers,
        },
      });
    }
  });
}

export async function getWorkspaceSyncPayload(
  clerkId: string,
): Promise<WorkspaceSyncResponse> {
  const user = await prisma.user.findFirst({
    where: { clerkId },
    include: {
      profile: {
        include: {
          activeTrack: {
            include: {
              modules: {
                include: {
                  days: {
                    include: { challenges: true },
                    orderBy: { dayNumber: "asc" },
                  },
                },
                orderBy: { order: "asc" },
              },
            },
          },
        },
      },
    },
  });

  if (!user) throw new Error("User not found.");
  if (!user.profile) throw new Error("User profile not found.");
  if (!user.profile.activeTrack) throw new Error("No active track linked.");

  const profile = user.profile;
  const track = user.profile.activeTrack;

  const allDays = track.modules
    .flatMap((m) => m.days)
    .sort((a, b) => a.dayNumber - b.dayNumber);

  const progressRows = await prisma.learningProgress.findMany({
    where: {
      userId: user.id,
      dayId: { in: allDays.map((d) => d.id) },
    },
    select: { dayId: true, completed: true },
  });

  const dayIdToNumber = new Map(allDays.map((d) => [d.id, d.dayNumber]));
  const progressMap = new Map<number, boolean>(
    progressRows.map((row) => [
      dayIdToNumber.get(row.dayId) ?? 0,
      row.completed,
    ]),
  );

  const completedCount = progressRows.filter((r) => r.completed).length;
  const completionRate = Number(
    ((completedCount / track.totalDays) * 100).toFixed(2),
  );

  return {
    trackName: track.title,
    currentDay: profile.currentDayNumber,
    totalDays: track.totalDays,
    availableUntilDay: profile.currentDayNumber,
    completionRate,
    repathActive: profile.isRePathActive,
    sequence: buildSequence(allDays, profile.currentDayNumber, progressMap),
  };
}

export async function processWorkspaceSyncAction(
  clerkId: string,
  body: SyncActionBody,
): Promise<WorkspaceSyncResponse> {
  const user = await prisma.user.findFirst({
    where: { clerkId },
    include: {
      profile: {
        include: {
          activeTrack: {
            include: {
              modules: {
                include: {
                  days: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) throw new Error("User not found.");
  if (!user.profile) throw new Error("User profile not found.");
  if (!user.profile.activeTrack) throw new Error("No active track linked.");

  const profile = user.profile;
  const track = user.profile.activeTrack;
  const allDays = track.modules.flatMap((m) => m.days);

  if (body.action === "work_more") {
    await prisma.userProfile.update({
      where: { userId: user.id },
      data: {
        currentDayNumber: Math.min(
          profile.currentDayNumber + 1,
          track.totalDays,
        ),
        lastActivityAt: new Date(),
      },
    });
  }

  if (body.action === "day_complete") {
    const day = allDays.find((d) => d.dayNumber === body.dayNumber);
    if (!day) throw new Error(`Day ${body.dayNumber} not found in track.`);

    await prisma.$transaction(async (tx) => {
      await tx.learningProgress.upsert({
        where: { userId_dayId: { userId: user.id, dayId: day.id } },
        update: {
          completed: true,
          xpEarned: 75,
          completedAt: new Date(),
        },
        create: {
          userId: user.id,
          dayId: day.id,
          completed: true,
          xpEarned: 75,
          completedAt: new Date(),
        },
      });

      await tx.userProfile.update({
        where: { userId: user.id },
        data: {
          currentDayNumber: Math.min(
            Math.max(profile.currentDayNumber, body.dayNumber + 1),
            track.totalDays,
          ),
          lastActivityAt: new Date(),
        },
      });

      await tx.evidenceItem.create({
        data: {
          userId: user.id,
          type: "MODULE_COMPLETION",
          title: `Day ${body.dayNumber} completed`,
          description: day.title,
          metadata: {
            dayNumber: body.dayNumber,
            trackName: track.title,
          },
        },
      });
    });
  }

  await evaluateRePath(user.id);
  return getWorkspaceSyncPayload(clerkId);
}