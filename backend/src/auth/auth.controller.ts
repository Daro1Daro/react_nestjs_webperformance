import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards, Body, HttpCode, Res,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import CreateUserDto from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res) {
    const { user } = req;
    const { access_token } = this.authService.login(user);
    res.cookie('Authentication', access_token, { httpOnly: true });
    return res.send({ access_token });
  }

  @Post('register')
  async signUp(@Body() data: CreateUserDto) {
    return await this.authService.register(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUser(@Request() req) {
    return req.user;
  }
}