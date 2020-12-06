import { IsAlphanumeric, IsNotEmpty, IsOptional } from 'class-validator';

class CreateProjectDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  readonly name: string;

  @IsAlphanumeric()
  @IsOptional()
  readonly description: string;
}

export default CreateProjectDto;