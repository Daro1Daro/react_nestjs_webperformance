import { IsAlphanumeric, IsDate, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

class ReadProjectDto {
  @IsInt()
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