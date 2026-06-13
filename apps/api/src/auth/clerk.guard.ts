import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { createClerkClient } from "@clerk/clerk-sdk-node";

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private clerkClient;

  constructor() {
    const secretKey = process.env.CLERK_SECRET_KEY;
    const publishableKey = process.env.CLERK_PUBLISHABLE_KEY;

    if (!secretKey) {
      throw new Error("ClerkAuthGuard Initialization Failed: CLERK_SECRET_KEY is missing from environment variables.");
    }

    this.clerkClient = createClerkClient({
      secretKey: secretKey,
      publishableKey: publishableKey,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // 1. Verify and extract the raw Authorization header layout safely
    const authHeader = request.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing or malformed Authorization Bearer header token.");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Bearer tracking token parameter evaluates to empty string.");
    }

    // apps/api/src/auth/clerk.guard.ts

try {
  // 💚 Add a 5-minute (300 seconds) clock leeway tolerance 
  // This gracefully bypasses the strict 'nbf' (Not Before) clock drift crashes
  const verifiedToken = await this.clerkClient.verifyToken(token, {
    leeway: 300, 
  });

  if (!verifiedToken || !verifiedToken.sub) {
    throw new UnauthorizedException("Invalid Clerk token: Token verification payload mapping failed.");
  }

  const userId = verifiedToken.sub;
  
  // ... remaining request binding code layout remains identical

      // 3. Bind the cleanly resolved user payload directly to the request object context
     (request as any).user = {
  id: userId,            // Fallback
  sub: userId,           // Fallback
  clerkId: userId,       // 💚 Matches where: { clerkId }
  clerkUserId: userId,   // 💚 Matches where: { clerkUserId }
  userId: userId,        // Fallback
};

      return true;
    } catch (error: any) {
      console.error("🔒 [Clerk Guard Authentication Crash]:", error.message);
      
      // Provide actionable, concise feedback if the error is due to a local system time drift
      if (error.message?.includes("expired")) {
        throw new UnauthorizedException("Your Clerk session token has expired. Please log out and sign back in.");
      }
      
      throw new UnauthorizedException(`Clerk token verification failed: ${error.message}`);
    }
  }
}