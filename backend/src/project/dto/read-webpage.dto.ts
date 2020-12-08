import { IsAlphanumeric, IsDate, IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

class ReadWebPageDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsAlphanumeric()
  @IsNotEmpty()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  readonly url: string;

  @IsDate()
  @IsNotEmpty()
  readonly created: Date;
}

export default ReadWebPageDto;