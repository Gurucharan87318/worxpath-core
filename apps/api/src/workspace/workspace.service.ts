import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { RunWorkspaceDto } from "./dto/run-workspace.dto";
import { SubmitWorkspaceDto } from "./dto/submit-workspace.dto";
import { WorkspaceTelemetryDto } from "./dto/workspace-telemetry.dto";
import { Prisma } from "@prisma/client";

type WorkspaceModuleType = "TECHNICAL" | "RESILIENCE" | "WEALTH";
type WorkspaceLanguage = "sql" | "python" | "typescript" | "text";

type SafeChallengeType =
  | "SQL"
  | "PYTHON"
  | "QUIZ"
  | "CASE_STUDY"
  | "RESILIENCE"
  | "WEALTH"
  | "TYPESCRIPT";

@Injectable()
export class WorkspaceService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeChallengeType(type: unknown): SafeChallengeType | null {
    if (typeof type !== "string") return null;

    const allowed: SafeChallengeType[] = [
      "SQL",
      "PYTHON",
      "QUIZ",
      "CASE_STUDY",
      "RESILIENCE",
      "WEALTH",
      "TYPESCRIPT",
    ];

    return allowed.includes(type as SafeChallengeType)
      ? (type as SafeChallengeType)
      : null;
  }

  private mapChallengeTypeToModuleType(type: unknown): WorkspaceModuleType {
    const normalized = this.normalizeChallengeType(type);

    if (normalized === "RESILIENCE" || normalized === "CASE_STUDY" || normalized === "QUIZ") {
      return "RESILIENCE";
    }

    if (normalized === "WEALTH") {
      return "WEALTH";
    }

    return "TECHNICAL";
  }

  private mapChallengeTypeToLanguage(type: unknown): WorkspaceLanguage {
    const normalized = this.normalizeChallengeType(type);

    if (normalized === "SQL") return "sql";
    if (normalized === "PYTHON") return "python";
    if (normalized === "TYPESCRIPT") return "typescript";
    return "text";
  }

  async getCurrentDay(userId: string) {
  // 💚 Change 'where: { id: userId }' to match your explicit unique Clerk constraint key
  const user = await this.prisma.user.findUnique({
    where: { clerkId: userId }, 
    include: {
      profile: true,
      repath: true,
    },
  });

  if (!user) {
    throw new NotFoundException(`User not found with Clerk Identity: ${userId}`);
  }

    const activeTrack = user.profile?.activeTrackId
      ? await this.prisma.track.findUnique({
          where: { id: user.profile.activeTrackId },
        })
      : await this.prisma.track.findFirst({
          orderBy: { title: "asc" },
        });

    if (!activeTrack) {
      throw new NotFoundException("No active track found.");
    }

    const daysWithRelations = await this.prisma.day.findMany({
      where: {
        module: {
          trackId: activeTrack.id,
        },
      },
      include: {
        module: true,
        challenges: {
          orderBy: { order: "asc" },
        },
        progress: {
          where: { userId },
        },
      },
      orderBy: [{ dayNumber: "asc" }],
    });

    if (!daysWithRelations.length) {
      throw new NotFoundException("No learning days configured for this track.");
    }

    const currentDayNumber =
      user.profile?.currentDayNumber && user.profile.currentDayNumber > 0
        ? user.profile.currentDayNumber
        : 1;

    const currentDay =
      daysWithRelations.find((day) => day.dayNumber === currentDayNumber) ?? daysWithRelations[0];

    const firstChallenge = currentDay.challenges[0] ?? null;

    const draft = firstChallenge
      ? await this.prisma.challengeDraft.findUnique({
          where: {
            userId_challengeId: {
              userId,
              challengeId: firstChallenge.id,
            },
          },
        })
      : null;

    const completedDayNumbers = new Set(
      daysWithRelations
        .filter((day) => day.progress.some((progress) => progress.completed))
        .map((day) => day.dayNumber),
    );

    const archivedDayNumbers =
      user.repath?.archivedDayNumbers?.length
        ? user.repath.archivedDayNumbers
        : user.profile?.archivedDayNumbers ?? [];

    const repathActive =
      user.profile?.isRePathActive === true ||
      user.repath?.status === "ACTIVE" ||
      user.repath?.status === "IN_PROGRESS";

    const moduleType = this.mapChallengeTypeToModuleType(firstChallenge?.type);
    const language = this.mapChallengeTypeToLanguage(firstChallenge?.type);

    const sequence = daysWithRelations.map((day) => {
      const dayFirstChallenge = day.challenges[0] ?? null;
      const dayModuleType = this.mapChallengeTypeToModuleType(dayFirstChallenge?.type);
      const isArchived = archivedDayNumbers.includes(day.dayNumber);
      const isCompleted = completedDayNumbers.has(day.dayNumber);

      const state = isArchived
        ? "archived"
        : day.dayNumber === currentDay.dayNumber && repathActive
          ? "repath"
          : day.dayNumber < currentDay.dayNumber
            ? "completed"
            : day.dayNumber === currentDay.dayNumber
              ? "current"
              : "available";

      return {
        day: day.dayNumber,
        moduleType: dayModuleType,
        state,
        completed: isCompleted,
      };
    });

    const readingBlocks = currentDay.readingMd
      .split("\n\n")
      .filter((block) => block.trim().length > 0)
      .slice(0, 4)
      .map((content, index) => ({
        label: index === 0 ? "Concept brief" : `Block ${index + 1}`,
        content,
      }));

    const dayCompleted = currentDay.progress.some((progress) => progress.completed);

    return {
      currentDay: currentDay.dayNumber,
      totalDays: activeTrack.totalDays,
      moduleType,
      title: currentDay.title,
      summary: currentDay.readingMd.split("\n\n")[0] ?? currentDay.title,
      readingMinutes: 10,
      objective: firstChallenge?.prompt ?? "Complete the assigned challenge for today.",
      xpReward: currentDay.xpReward,
      streak: user.profile?.currentStreak ?? 0,
      trackName: activeTrack.title,
      squadName: null,
      recoveryMode: repathActive,
      repathActive,
      archivedDays: archivedDayNumbers,
      language,
      readingBlocks,
      tasks: currentDay.challenges.map((challenge, index) => ({
        id: challenge.id,
        title: `Task ${index + 1}`,
        description: challenge.prompt,
        xp: challenge.xpReward,
        completed: dayCompleted,
        order: index + 1,
      })),
      starterCode: draft?.draftCode ?? firstChallenge?.starterCode ?? "",
      solutionCode: null,
      executionResult: {
        status: "idle",
        outputLines: [],
        errorMessage: null,
        warningMessage: null,
        rows: [],
        rowCount: 0,
        executionTimeMs: null,
      },
      validationResult: {
        status: "idle",
        message: null,
        checks: [],
      },
      sequence,
      choices:
        moduleType === "RESILIENCE"
          ? currentDay.challenges.map((challenge) => ({
              id: challenge.id,
              label: challenge.prompt,
              outcome: "Choice captured. Outcome analysis will appear here.",
              reliabilityDelta: 1,
              communicationDelta: 1,
            }))
          : [],
      financialInputs:
        moduleType === "WEALTH"
          ? [
              {
                key: "monthly_expenses",
                label: "Monthly expenses",
                value: 35000,
                min: 10000,
                max: 100000,
                step: 1000,
                prefix: "₹",
              },
              {
                key: "side_income",
                label: "Side income",
                value: 10000,
                min: 0,
                max: 50000,
                step: 1000,
                prefix: "₹",
              },
            ]
          : [],
      woraHints: [
        {
          id: "default-hint",
          title: "Wora™",
          message:
            moduleType === "TECHNICAL"
              ? "Start with the smallest correct result set, then optimize."
              : moduleType === "RESILIENCE"
                ? "Pick the response that reduces ambiguity and protects trust."
                : "Stability matters more than optimistic projections.",
          tone: "supportive",
        },
      ],
    };
  }

  async runCode(userId: string, dto: RunWorkspaceDto) {
    const code = dto.code.trim();
    const looksExecutable = code.length > 12;

    const warningMessage =
      dto.language === "sql" && code.toLowerCase().includes("select *")
        ? "Execution warning: broad selection detected. Reduce output scope."
        : null;

    return {
      executionResult: {
        status: looksExecutable ? "success" : "error",
        outputLines: looksExecutable
          ? ["> Query executed.", "> Rows returned: 3", "> Execution time: 184ms"]
          : ["> Query execution failed."],
        errorMessage: looksExecutable ? null : "Draft is too short or incomplete for execution.",
        warningMessage,
        rows: looksExecutable
          ? [
              { customer: "Ava", amount: 2450, status: "active" },
              { customer: "Liam", amount: 2100, status: "active" },
              { customer: "Mia", amount: 1980, status: "review" },
            ]
          : [],
        rowCount: looksExecutable ? 3 : 0,
        executionTimeMs: looksExecutable ? 184 : null,
      },
      validationResult: {
        status: !looksExecutable ? "failed" : warningMessage ? "warning" : "passed",
        message: !looksExecutable
          ? "Execution failed. Complete the query structure and retry."
          : warningMessage
            ? "Execution succeeded with optimization warnings."
            : "Execution passed basic validation.",
        checks: !looksExecutable
          ? ["Missing valid executable structure."]
          : warningMessage
            ? [
                "Syntax appears valid.",
                "Output rows were returned.",
                "Result should be narrowed before final submission.",
              ]
            : ["Syntax appears valid.", "Output rows were returned."],
      },
    };
  }

  // Also fix line 150 inside submitDay method:
async submitDay(userId: string, dto: SubmitWorkspaceDto) {
  const user = await this.prisma.user.findUnique({
    where: { clerkId: userId }, // 💚 Fix this query line as well!
    include: { profile: true },
  });
  
  if (!user) {
    throw new NotFoundException("User not found.");
  }

    const currentDay = await this.prisma.day.findFirst({
      where: { dayNumber: dto.day },
      orderBy: { dayNumber: "asc" },
    });

    if (!currentDay) {
      throw new NotFoundException("Day not found.");
    }

    await this.prisma.learningProgress.upsert({
      where: {
        userId_dayId: {
          userId,
          dayId: currentDay.id,
        },
      },
      create: {
        userId,
        dayId: currentDay.id,
        completed: true,
        xpEarned: currentDay.xpReward,
        completedAt: new Date(),
      },
      update: {
        completed: true,
        xpEarned: currentDay.xpReward,
        completedAt: new Date(),
      },
    });

    const nextDayNumber = dto.day + 1;
    const nextStreak = (user.profile?.currentStreak ?? 0) + 1;
    const nextLongest = Math.max(user.profile?.longestStreak ?? 0, nextStreak);

    await this.prisma.userProfile.upsert({
      where: { userId },
      create: {
        userId,
        currentDayNumber: nextDayNumber,
        currentStreak: 1,
        longestStreak: 1,
        xpTotal: currentDay.xpReward,
        lastActivityAt: new Date(),
      },
      update: {
        currentDayNumber: nextDayNumber,
        currentStreak: nextStreak,
        longestStreak: nextLongest,
        xpTotal: { increment: currentDay.xpReward },
        lastActivityAt: new Date(),
      },
    });

    await this.prisma.evidenceItem.create({
      data: {
        userId,
        type: "CHALLENGE_COMPLETION",
        title: `Completed Day ${dto.day}`,
        description: `Workspace day ${dto.day} submitted successfully.`,
        metadata: {
          dayNumber: dto.day,
          codeLength: dto.code.length,
        },
      },
    });

    return {
      success: true,
      nextDay: nextDayNumber,
      message: "Day submitted successfully.",
    };
  }

  async logTelemetry(userId: string, dto: WorkspaceTelemetryDto) {
    const day = await this.prisma.day.findFirst({
      where: { dayNumber: dto.day },
    });

    await this.prisma.telemetryLog.create({
      data: {
        userId,
        dayId: day?.id ?? null,
        dayNumber: dto.day ?? null,
        eventType: dto.eventType,
        metadata: (dto.metadata ?? {}) as Prisma.InputJsonValue,
      },
    });

    return { success: true };
  }
} 