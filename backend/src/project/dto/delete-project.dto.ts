import { IsNotEmpty, IsInt } from 'class-validator';

class DeleteProjectDto {
  @IsInt()
  @IsNotEmpty()
  readonly id: number;
}

export default DeleteProjectDto;
