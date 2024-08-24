import { IsNotEmpty, IsNumber, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateCompanyDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  owner!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  licenseNumber!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  businessNumber!: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  type!: number;
}

export class CompanyResponseDTO {
  @ApiProperty()
  uid!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  owner!: string;

  @ApiProperty()
  ownerPhoto!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  address!: string;

  @ApiProperty()
  licenseNumber!: string;

  @ApiProperty()
  businessNumber!: string;

  @ApiProperty()
  type!: number;
}
