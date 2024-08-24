import { COMPANY_PACKAGE_NAME } from "@shared/generated/company.proto";
import { grpcClientOptions } from "@shared/options/company.option";

import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { CompanyController } from "./company.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: COMPANY_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: grpcClientOptions.options,
      },
    ]),
  ],
  controllers: [CompanyController],
})
export class CompanyModule {}
