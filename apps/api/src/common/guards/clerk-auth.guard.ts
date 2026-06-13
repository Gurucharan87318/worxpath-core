import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const clerkId = request.headers["x-clerk-user-id"] as string | undefined;
    const emailHeader = request.headers["x-clerk-user-email"] as string | undefined;
    const nameHeader = request.headers["x-clerk-user-name"] as string | undefined;
    const avatarHeader = request.headers["x-clerk-user-avatar"] as string | undefined;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing or invalid authorization header");
    }

    const token = authHeader.replace("Bearer ", "").trim();

    if (!token) {
      throw new UnauthorizedException("Missing Clerk token");
    }

    if (!clerkId) {
      throw new UnauthorizedException("Missing Clerk user id header");
    }

    let user = await this.prisma.user.findUnique({
      where: { clerkId },
      select: { id: true, clerkId: true, email: true },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          clerkId,
          email: emailHeader ?? `${clerkId}@local.dev`,
          name: nameHeader ?? null,
          avatarUrl: avatarHeader ?? null,
          profile: {
            create: {
              onboardingComplete: false,
              isRePathActive: false,
              xpTotal: 0,
              currentStreak: 0,
              longestStreak: 0,
            },
          },
        },
        select: { id: true, clerkId: true, email: true },
      });
    }

    request.user = {
      clerkId: user.clerkId,
      internalUserId: user.id,
      email: user.email,
    };

    return true;
  }
}