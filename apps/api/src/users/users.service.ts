// src/users/users.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { SyncUserDto } from "./dto/sync-user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Called once on first login — idempotent (safe to call multiple times)
  async syncUser(dto: SyncUserDto) {
    const user = await this.prisma.user.upsert({
      where: { clerkId: dto.clerkId },
      update: {
        email: dto.email,
        name: dto.name,
        avatarUrl: dto.avatarUrl,
      },
      create: {
        clerkId: dto.clerkId,
        email: dto.email,
        name: dto.name,
        avatarUrl: dto.avatarUrl,
        profile: {
          create: {
            xpTotal: 0,
            currentStreak: 0,
            longestStreak: 0,
            onboardingComplete: false,
          },
        },
      },
      include: { profile: true },
    });

    return user;
  }

  async findByClerkId(clerkId: string) {
    return this.prisma.user.findUnique({
      where: { clerkId },
      include: { profile: true },
    });
  }

  async getMe(clerkId: string) {
    const user = await this.prisma.user.findUnique({
      where: { clerkId },
      include: {
        profile: true,
        _count: {
          select: { evidenceItems: true, progress: true },
        },
      },
    });
    return user;
  }
}