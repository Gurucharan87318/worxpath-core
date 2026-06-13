import { IsIn, IsInt, IsString, Min } from "class-validator";

export class RunWorkspaceDto {
  @IsInt()
  @Min(1)
  day!: number;

  @IsIn(["sql", "python", "typescript", "text"])
  language!: "sql" | "python" | "typescript" | "text";

  @IsString()
  code!: string;
}