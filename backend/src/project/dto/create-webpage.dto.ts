import { IsAlphanumeric, IsNotEmpty, IsNumber } from 'class-validator';

class CreateWebPageDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly url: string;

  @IsNumber()
  readonly projectId: number;
}

export default CreateWebPageDto;