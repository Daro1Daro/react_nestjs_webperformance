import { IsEmail, IsNotEmpty, Length } from 'class-validator';

class CreateUserDto {
  @IsNotEmpty()
  @Length(3, 64)
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(3, 256)
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 128)
  readonly password: string;
}

export default CreateUserDto;