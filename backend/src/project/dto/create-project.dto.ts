import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;
}

export default CreateProjectDto;