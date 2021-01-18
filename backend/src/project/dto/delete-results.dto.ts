import { IsNotEmpty, IsInt } from 'class-validator';

class DeleteResultsDto {
  @IsInt()
  @IsNotEmpty()
  readonly id: number;
}

export default DeleteResultsDto;
