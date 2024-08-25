import { Request, Response } from "express";

import { Controller, Get, Param, Req, Res } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiOperation } from "@nestjs/swagger";

@Controller("link")
export class LinkController {
  constructor(private readonly configService: ConfigService) {}

  @Get("item/:itemId")
  @ApiOperation({ summary: "Deep link" })
  async getInviteById(
    @Req() req: Request,
    @Param("itemId") itemId: string,
    @Res() res: Response,
  ) {
    if (req.headers["user-agent"]!.toLocaleLowerCase().includes("kakaotalk")) {
      return res.redirect(
        `kakaotalk://web/openExternal?url=${this.configService.get<string>("GATEWAY_URL")!}/link/item/${itemId}`,
      );
    }

    return res.redirect(`hackseoul-seogaemo://item?id=${itemId}`);
  }
}
