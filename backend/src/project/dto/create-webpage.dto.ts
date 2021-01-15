import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

// TODO: dodaj isCyclical
class CreateWebPageDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  readonly url: string;

  @IsNumber()
  readonly projectId: number;
}

export default CreateWebPageDto;