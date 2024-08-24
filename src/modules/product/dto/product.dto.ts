import { IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  companyId!: string;
}

export class ProductResponseDTO {
  @ApiProperty()
  uid!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  companyId!: string;
}
