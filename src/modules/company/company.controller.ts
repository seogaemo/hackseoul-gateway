import { COMPANY_SERVICE_NAME } from "@shared/generated/company.proto";
import {
  COMPANY_PACKAGE_NAME,
  CompanyServiceClient,
} from "@shared/generated/company.proto";
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

import { CreateCompanyDTO } from "./dto/company.dto";

@Controller("company")
export class CompanyController implements OnModuleInit {
  constructor(
    @Inject(COMPANY_PACKAGE_NAME)
    private readonly companyClient: ClientGrpc,
  ) {}

  private companyService!: CompanyServiceClient;

  onModuleInit() {
    this.companyService =
      this.companyClient.getService<CompanyServiceClient>(COMPANY_SERVICE_NAME);
  }

  @Post("create")
  @ApiBody({
    type: CreateCompanyDTO,
  })
  @ApiOperation({ summary: "Create Company" })
  @ApiOkResponse({ description: "Company Created" })
  async createCompany(@Body() dto: CreateCompanyDTO) {
    return firstValueFrom(this.companyService.createCompany(dto));
  }

  @Get("")
  @ApiParam({ name: "id", type: "string" })
  @ApiOperation({ summary: "Get Companys" })
  @ApiOkResponse({ description: "Get Companys" })
  async getCompanys(@Param("id") id: string) {
    return firstValueFrom(this.companyService.getCompany({ uid: id }));
  }
}
