import { IsAlphanumeric, IsDate, IsNotEmpty, IsInt, IsUrl } from 'class-validator';

class ReadWebPageDto {
  @IsInt()
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