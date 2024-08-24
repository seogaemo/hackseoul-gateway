import { AUTH_PACKAGE_NAME } from "@shared/generated/auth.proto";
import { grpcClientOptions } from "@shared/options/auth.option";

import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { AuthController } from "./auth.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: grpcClientOptions.options,
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
