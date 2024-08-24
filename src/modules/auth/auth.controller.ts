import {
  AUTH_PACKAGE_NAME,
  AuthServiceClient,
} from "@shared/generated/auth.proto";
import { AUTH_SERVICE_NAME } from "@shared/generated/auth.proto";
import { firstValueFrom } from "rxjs";

import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { SignInUserDTO, SignInUserResponseDTO } from "./dto/signin-user.dto";

@Controller("auth")
export class AuthController implements OnModuleInit {
  constructor(
    @Inject(AUTH_PACKAGE_NAME)
    private readonly authClient: ClientGrpc,
  ) {}

  private authService!: AuthServiceClient;

  onModuleInit() {
    this.authService =
      this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post("signin")
  @ApiBody({
    type: SignInUserDTO,
  })
  @ApiOperation({ summary: "User Login" })
  @ApiOkResponse({
    description: "User Login Success",
    type: SignInUserResponseDTO,
  })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async signIn(@Body() dto: SignInUserDTO) {
    try {
      return firstValueFrom(this.authService.signIn(dto));
    } catch (e) {
      throw new UnauthorizedException("Unauthorized");
    }
  }
}
