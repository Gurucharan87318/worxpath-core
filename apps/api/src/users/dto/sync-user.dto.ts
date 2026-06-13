// src/users/dto/sync-user.dto.ts
import { IsEmail, IsOptional, IsString } from "class-validator";

export class SyncUserDto {
  @IsString()
  clerkId!: string; // Added ! operator

  @IsEmail()
  email!: string; // Added ! operator

  @IsOptional()
  @IsString()
  name?: string; // Suffix ? is fine because it is genuinely optional

  @IsOptional()
  @IsString()
  avatarUrl?: string; // Suffix ? is fine because it is genuinely optional
}