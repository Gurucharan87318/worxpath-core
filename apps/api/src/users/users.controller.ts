// src/users/users.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ClerkAuthGuard } from "../auth/clerk.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorated";
import { UsersService } from "./users.service";
import { SyncUserDto } from "./dto/sync-user.dto";

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Called by frontend on every sign-in — creates user if not exists
  @Post("auth/sync")
  @UseGuards(ClerkAuthGuard)
  @HttpCode(HttpStatus.OK)
  async syncUser(
    @CurrentUser() clerkUserId: string,
    @Body() dto: SyncUserDto
  ) {
    // Enforce that the token's clerkId matches the body payload
    const safeDto: SyncUserDto = { ...dto, clerkId: clerkUserId };
    const user = await this.usersService.syncUser(safeDto);
    return { success: true, user };
  }

  @Get("users/me")
  @UseGuards(ClerkAuthGuard)
  async getMe(@CurrentUser() clerkUserId: string) {
    const user = await this.usersService.getMe(clerkUserId);
    return { user };
  }
}