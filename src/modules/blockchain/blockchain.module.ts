import { BLOCKCHAIN_PACKAGE_NAME } from "@shared/generated/blockchain.proto";
import { grpcClientOptions } from "@shared/options/blockchain.option";

import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { BlockchainController } from "./blockchain.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: BLOCKCHAIN_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: grpcClientOptions.options,
      },
    ]),
  ],
  controllers: [BlockchainController],
})
export class BlockchainModule {}
