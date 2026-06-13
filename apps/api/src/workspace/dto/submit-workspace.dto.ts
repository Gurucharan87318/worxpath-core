import { IsInt, IsString, Min } from "class-validator";

export class SubmitWorkspaceDto {
  @IsInt()
  @Min(1)
  day!: number;

  @IsString()
  code!: string;
}