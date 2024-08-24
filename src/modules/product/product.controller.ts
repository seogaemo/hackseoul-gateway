import {
  PRODUCT_PACKAGE_NAME,
  ProductServiceClient,
} from "@shared/generated/product.proto";
import { PRODUCT_SERVICE_NAME } from "@shared/generated/product.proto";
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
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";

import { CreateProductDTO } from "./dto/product.dto";

@Controller("product")
export class ProductController implements OnModuleInit {
  constructor(
    @Inject(PRODUCT_PACKAGE_NAME)
    private readonly productClient: ClientGrpc,
  ) {}

  private productService!: ProductServiceClient;

  onModuleInit() {
    this.productService =
      this.productClient.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  @Post("create")
  @ApiBody({
    type: CreateProductDTO,
  })
  @ApiOperation({ summary: "Create Product" })
  @ApiOkResponse({ description: "Product Created" })
  async createProduct(@Body() dto: CreateProductDTO) {
    return firstValueFrom(this.productService.createProduct(dto));
  }

  @Get("")
  @ApiParam({ name: "id", type: "string" })
  @ApiOperation({ summary: "Get Products" })
  @ApiOkResponse({ description: "Get Products" })
  async getProducts(@Param("id") id: string) {
    return firstValueFrom(this.productService.getProduct({ uid: id }));
  }
}
