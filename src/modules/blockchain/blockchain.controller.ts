import {
  BLOCKCHAIN_PACKAGE_NAME,
  BLOCKCHAIN_SERVICE_NAME,
  BlockchainServiceClient,
} from "@shared/generated/blockchain.proto";

import { Controller, Inject, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";

@Controller("blockchain")
export class BlockchainController implements OnModuleInit {
  constructor(
    @Inject(BLOCKCHAIN_PACKAGE_NAME)
    private readonly blockchainClient: ClientGrpc,
  ) {}

  private blockchainService!: BlockchainServiceClient;

  onModuleInit() {
    this.blockchainService =
      this.blockchainClient.getService<BlockchainServiceClient>(
        BLOCKCHAIN_SERVICE_NAME,
      );
  }
}
