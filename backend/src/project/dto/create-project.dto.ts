import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength( 64)
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;
}

export default CreateProjectDto;