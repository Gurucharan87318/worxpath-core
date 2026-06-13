import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

const HOURS_72 = 72 * 60 * 60 * 1000;

@Injectable()
export class RePathService {
  constructor(private readonly prisma: PrismaService) {}

  private buildRecoveryPlan() {
    return {
      message:
        "You have not failed. Momentum broke. RePath™ reduces the load and gets you moving again with a short structured restart.",
      days: [
        {
          day: 1,
          title: "Restart Without Guilt",
          tasks: [
            "Complete one short learning block.",
            "Finish one guided challenge.",
            "Log one visible output."
          ],
          xpTarget: 60,
        },
        {
          day: 2,
          title: "Rebuild Execution Confidence",
          tasks: [
            "Complete one practical workspace task.",
            "Add one evidence item.",
            "Review Wora guidance and next gap."
          ],
          xpTarget: 80,
        },
        {
          day: 3,
          title: "Reconnect to Main Track",
          tasks: [
            "Complete one normal day module.",
            "Mark readiness to return to the main roadmap.",
            "Exit recovery mode."
          ],
          xpTarget: 100,
        },
      ],
    };
  }

  async evaluateRePath(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException("User profile not found");
    }

    if (!profile.lastActivityAt) {
      return {
        active: false,
        reason: "No activity recorded yet",
        session: null,
      };
    }

    const inactiveFor = Date.now() - new Date(profile.lastActivityAt).getTime();

    if (inactiveFor < HOURS_72) {
      const existing = await this.prisma.rePathSession.findUnique({
        where: { userId },
      });

      return {
        active: profile.isRePathActive,
        reason: "Inactivity threshold not reached",
        session: existing,
      };
    }

    if (profile.isRePathActive) {
      const existing = await this.prisma.rePathSession.findUnique({
        where: { userId },
      });

      return {
        active: true,
        reason: "Recovery mode already active",
        session: existing,
      };
    }

    const session = await this.prisma.rePathSession.upsert({
      where: { userId },
      update: {
        status: "ACTIVE",
        triggeredAt: new Date(),
        resolvedAt: null,
        recoveryPlan: this.buildRecoveryPlan(),
      },
      create: {
        userId,
        status: "ACTIVE",
        recoveryPlan: this.buildRecoveryPlan(),
      },
    });

    await this.prisma.userProfile.update({
      where: { userId },
      data: { isRePathActive: true },
    });

    return {
      active: true,
      reason: "Recovery mode triggered",
      session,
    };
  }

  async getStatus(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
    });

    const session = await this.prisma.rePathSession.findUnique({
      where: { userId },
    });

    return {
      active: profile?.isRePathActive ?? false,
      session,
    };
  }

  async resolve(userId: string, resolutionNote?: string) {
    const session = await this.prisma.rePathSession.findUnique({
      where: { userId },
    });

    if (!session) {
      throw new NotFoundException("No active recovery session found");
    }

    const updated = await this.prisma.rePathSession.update({
      where: { userId },
      data: {
        status: "RESOLVED",
        resolvedAt: new Date(),
        recoveryPlan: {
          ...(session.recoveryPlan as Record<string, unknown>),
          resolutionNote: resolutionNote ?? null,
        },
      },
    });

    await this.prisma.userProfile.update({
      where: { userId },
      data: { isRePathActive: false },
    });

    return {
      success: true,
      session: updated,
    };
  }
}