import { IsIn, IsInt, IsObject, IsOptional, Min } from "class-validator";

export class WorkspaceTelemetryDto {
  @IsInt()
  @Min(1)
  day!: number;

  @IsIn([
    "RUN_CODE",
    "RUN_WARNING",
    "RUN_ERROR",
    "SUBMIT_SUCCESS",
    "SUBMIT_FAIL",
    "REPATH_TRIGGER",
    "CHOICE_SELECTED",
    "FINANCIAL_INPUT_CHANGED",
  ])
  eventType!:
    | "RUN_CODE"
    | "RUN_WARNING"
    | "RUN_ERROR"
    | "SUBMIT_SUCCESS"
    | "SUBMIT_FAIL"
    | "REPATH_TRIGGER"
    | "CHOICE_SELECTED"
    | "FINANCIAL_INPUT_CHANGED";

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}