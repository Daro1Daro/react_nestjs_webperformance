import { IsEmail, IsNotEmpty } from 'class-validator';

class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export default CreateUserDto;