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

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  base64Image!: string;
}

export class ProductResponseDTO {
  @ApiProperty()
  uid!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  companyId!: string;

  @ApiProperty()
  imageUrl!: string;
}
