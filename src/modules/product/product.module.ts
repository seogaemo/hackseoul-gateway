import { PRODUCT_PACKAGE_NAME } from "@shared/generated/product.proto";
import { grpcClientOptions } from "@shared/options/product.option";

import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { ProductController } from "./product.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: grpcClientOptions.options,
      },
    ]),
  ],
  controllers: [ProductController],
})
export class ProductModule {}
