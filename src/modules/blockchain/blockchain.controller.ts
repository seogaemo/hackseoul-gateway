import {
  BLOCKCHAIN_PACKAGE_NAME,
  BLOCKCHAIN_SERVICE_NAME,
  BlockchainServiceClient,
} from "@shared/generated/blockchain.proto";
import { firstValueFrom } from "rxjs";

import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { ApiBody, ApiOkResponse } from "@nestjs/swagger";

import {
  CreatePipelineDTO,
  CreateProdItemDTO,
  GetPipelineResponse,
  GetProdItemResponse,
} from "./dto/blockchain.dto";

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

  @Get("pipelines/:prodItemId")
  @ApiOkResponse({
    description: "Get pipelines by prod item id",
    type: GetPipelineResponse,
  })
  async getPipelineByProdItemId(@Param("prodItemId") prodItemId: string) {
    return await firstValueFrom(
      this.blockchainService.getPipelines({
        uid: prodItemId,
      }),
    );
  }

  @Post("pipeline")
  @ApiBody({ type: CreatePipelineDTO })
  @ApiOkResponse({ description: "Create a pipeline" })
  async createPipeline(@Body() body: CreatePipelineDTO) {
    return await firstValueFrom(this.blockchainService.createPipeline(body));
  }

  @Get("proditem/:prodItemId")
  @ApiOkResponse({ description: "Get a prod item", type: GetProdItemResponse })
  async getProdItemByProdItemId(@Param("prodItemId") prodItemId: string) {
    return await firstValueFrom(
      this.blockchainService.getProdItem({
        uid: prodItemId,
      }),
    );
  }

  @Post("proditem")
  @ApiBody({ type: CreateProdItemDTO })
  async createProdItem(@Body() body: CreateProdItemDTO) {
    return await firstValueFrom(this.blockchainService.createProdItem(body));
  }
}
