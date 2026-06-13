import { Module } from "@nestjs/common";
import { WorkspaceController } from "./workspace.controller";
import { WorkspaceService } from "./workspace.service";
import { PrismaService } from "../../prisma/prisma.service";
import { ClerkAuthGuard } from "../auth/clerk.guard";

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService, PrismaService, ClerkAuthGuard],
})
export class WorkspaceModule {}