import { Controller, Get, Post, Body, Req, UseGuards } from "@nestjs/common";
import { RePathService } from "./repath.service";
import { ResolveRePathDto } from "./dto/resolve-repath.dto";
import { ClerkAuthGuard } from "../common/guards/clerk-auth.guard";

@Controller("repath")
@UseGuards(ClerkAuthGuard)
export class RePathController {
  constructor(private readonly repathService: RePathService) {}

  @Get("status")
  async getStatus(@Req() req: any) {
    return this.repathService.getStatus(req.user.internalUserId);
  }

  @Post("check")
  async check(@Req() req: any) {
    return this.repathService.evaluateRePath(req.user.internalUserId);
  }

  @Post("resolve")
  async resolve(@Req() req: any, @Body() body: ResolveRePathDto) {
    return this.repathService.resolve(req.user.internalUserId, body.resolutionNote);
  }
}