import { Module } from "@nestjs/common";
import { RePathController } from "./repath.controller";
import { RePathService } from "./repath.service";
import { PrismaService } from "../../prisma/prisma.service";

@Module({
  controllers: [RePathController],
  providers: [RePathService, PrismaService],
})
export class RePathModule {}