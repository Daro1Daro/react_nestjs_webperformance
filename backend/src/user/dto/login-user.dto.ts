import { IsEmail, IsNotEmpty } from 'class-validator';

class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export default LoginUserDto;