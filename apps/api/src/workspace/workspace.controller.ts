import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { Request } from "express";
import { WorkspaceService } from "./workspace.service";
import { ClerkAuthGuard } from "../auth/clerk.guard";
import { RunWorkspaceDto } from "./dto/run-workspace.dto";
import { SubmitWorkspaceDto } from "./dto/submit-workspace.dto";
import { WorkspaceTelemetryDto } from "./dto/workspace-telemetry.dto";

type AuthenticatedRequest = Request & {
  user?: {
    id?: string;
    sub?: string;
    clerkId?: string;
  };
};

@UseGuards(ClerkAuthGuard)
@Controller("workspace")
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  private getUserId(req: AuthenticatedRequest) {
    const userId = req.user?.id ?? req.user?.sub ?? req.user?.clerkId;

    if (!userId) {
      throw new UnauthorizedException("User not authenticated.");
    }

    return userId;
  }

  @Get("current-day")
  getCurrentDay(@Req() req: AuthenticatedRequest) {
    return this.workspaceService.getCurrentDay(this.getUserId(req));
  }

  @Post("run")
  runCode(@Req() req: AuthenticatedRequest, @Body() dto: RunWorkspaceDto) {
    return this.workspaceService.runCode(this.getUserId(req), dto);
  }

  @Post("submit")
  submitDay(@Req() req: AuthenticatedRequest, @Body() dto: SubmitWorkspaceDto) {
    return this.workspaceService.submitDay(this.getUserId(req), dto);
  }

  @Post("telemetry")
  logTelemetry(
    @Req() req: AuthenticatedRequest,
    @Body() dto: WorkspaceTelemetryDto,
  ) {
    return this.workspaceService.logTelemetry(this.getUserId(req), dto);
  }
}