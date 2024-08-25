import {
  AUTH_PACKAGE_NAME,
  AuthServiceClient,
} from "@shared/generated/auth.proto";
import { AUTH_SERVICE_NAME } from "@shared/generated/auth.proto";
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
  Headers,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";

import { CompanyResponseDTO, CreateCompanyDTO } from "./dto/company.dto";

@Controller("company")
export class CompanyController implements OnModuleInit {
  constructor(
    @Inject(COMPANY_PACKAGE_NAME)
    private readonly companyClient: ClientGrpc,
    @Inject(AUTH_PACKAGE_NAME)
    private readonly authClient: ClientGrpc,
  ) {}

  private companyService!: CompanyServiceClient;
  private authService!: AuthServiceClient;

  onModuleInit() {
    this.companyService =
      this.companyClient.getService<CompanyServiceClient>(COMPANY_SERVICE_NAME);
    this.authService =
      this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post("create")
  @ApiBearerAuth()
  @ApiBody({
    type: CreateCompanyDTO,
  })
  @ApiOperation({ summary: "Create Company" })
  @ApiOkResponse({ description: "Company Created" })
  async createCompany(
    @Body() dto: CreateCompanyDTO,
    @Headers("Authorization") token: string,
  ) {
    return await firstValueFrom(
      this.authService.validateToken({ token: token.split(" ")[1] }),
    ).then((res) =>
      firstValueFrom(
        this.companyService.createCompany({ ...dto, userId: res.uid }),
      ),
    );
  }

  @Get("")
  @ApiBearerAuth()
  @ApiParam({ name: "id", type: "string" })
  @ApiOperation({ summary: "Get Companys" })
  @ApiOkResponse({ description: "Get Companys", type: CompanyResponseDTO })
  async getCompanys(@Param("id") id: string) {
    return await firstValueFrom(this.companyService.getCompany({ uid: id }));
  }
}
