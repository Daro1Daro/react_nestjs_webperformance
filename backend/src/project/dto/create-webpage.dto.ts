import { IsAlphanumeric, IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

class CreateWebPageDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  readonly url: string;

  @IsNumber()
  readonly projectId: number;
}

export default CreateWebPageDto;