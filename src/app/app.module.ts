import importToArray from "import-to-array";

import { Module } from "@nestjs/common";

import * as providers from "src/common/providers";
import * as modules from "src/modules";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [...importToArray(providers), ...importToArray(modules)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
