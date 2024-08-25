import { IsArray, IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateProdItemDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  modelNumber!: string;
}

export class CreatePipelineDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  companyId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productItemId!: string;
}

export class GetProdItemResponse {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uid!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  modelNumber!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  createdAt!: Date | undefined;
}

export class Pipeline {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uid!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  companyId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productItemId!: string;
}

export class GetPipelineResponse {
  @ApiProperty({
    type: [Pipeline],
  })
  @IsArray()
  pipelines!: Pipeline[];
}
