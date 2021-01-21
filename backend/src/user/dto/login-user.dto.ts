import { IsEmail, IsNotEmpty, Length } from 'class-validator';

class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @Length(8, 128)
  readonly password: string;
}

export default LoginUserDto;