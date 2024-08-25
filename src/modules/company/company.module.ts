import { AUTH_PACKAGE_NAME } from "@shared/generated/auth.proto";
import { COMPANY_PACKAGE_NAME } from "@shared/generated/company.proto";
import { grpcClientOptions as authGrpcClientOptions } from "@shared/options/auth.option";
import { grpcClientOptions as companyGrpcClientOptions } from "@shared/options/company.option";

import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { CompanyController } from "./company.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: COMPANY_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: companyGrpcClientOptions.options,
      },
    ]),
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: authGrpcClientOptions.options,
      },
    ]),
  ],
  controllers: [CompanyController],
})
export class CompanyModule {}
