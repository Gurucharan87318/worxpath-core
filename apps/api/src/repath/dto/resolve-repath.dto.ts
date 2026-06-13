import { IsOptional, IsString } from "class-validator";

export class ResolveRePathDto {
  @IsOptional()
  @IsString()
  resolutionNote?: string;
}