// src/auth/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// Usage in controllers: @CurrentUser() userId: string
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.clerkUserId as string;
  }
);