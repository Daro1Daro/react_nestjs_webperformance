import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/login-user.dto';
import * as argon2 from 'argon2';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {
  }

  async validateUser({ email, password }: LoginUserDto): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (await argon2.verify(user.password, password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto): Promise<any> {
    // logika
    await this.usersService.create(user);
  }
}