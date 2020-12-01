import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards, Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // The req parameter will contain a user property (populated by Passport during the passport-local authentication flow)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async signUp(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }

  // When our GET /profile route is hit, the Guard will automatically invoke our passport-jwt custom configured logic,
  // validating the JWT, and assigning the user property to the Request object.
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUser(@Request() req) {
    return req.user;
  }
}