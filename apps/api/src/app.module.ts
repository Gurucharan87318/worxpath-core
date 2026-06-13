import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { PrismaService } from "../prisma/prisma.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { RePathModule } from "./repath/repath.module";
import { WorkspaceModule } from "./workspace/workspace.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        name: "default",
        ttl: 60_000,
        limit: 60,
      },
    ]),
    AuthModule,
    UsersModule,
    RePathModule,
    WorkspaceModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}