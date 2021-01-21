import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

class CreateWebPageDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength( 64)
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @MaxLength( 2083)
  readonly url: string;

  @IsNumber()
  readonly projectId: number;

  @IsBoolean()
  @IsOptional()
  readonly isCyclical: boolean;
}

export default CreateWebPageDto;