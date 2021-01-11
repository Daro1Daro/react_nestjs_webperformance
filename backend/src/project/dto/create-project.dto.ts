import { IsAlphanumeric, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class CreateProjectDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;
}

export default CreateProjectDto;