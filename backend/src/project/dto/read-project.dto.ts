import { IsAlphanumeric, IsDate, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

class ReadProjectDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsAlphanumeric()
  @IsNotEmpty()
  readonly name: string;

  @IsAlphanumeric()
  @IsOptional()
  readonly description: string;

  @IsDate()
  @IsNotEmpty()
  readonly created: Date;
}

export default ReadProjectDto;