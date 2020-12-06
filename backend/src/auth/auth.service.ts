import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import LoginUserDto from '../user/dto/login-user.dto';
import * as argon2 from 'argon2';
import CreateUserDto from '../user/dto/create-user.dto';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, `${process.env.NODE_ENV === 'production' ? '' : '../..'}`, `.env.${process.env.NODE_ENV || 'dev'}`) });


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginUserDto): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
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

  async sendVerificationEmail(email: string, token: string): Promise<boolean> {
    const verifyUrl = `${process.env.APP_HOST}/api/user/activate/${token}`;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    let mailOptions = {
      from: 'WebApp',
      to: email,
      subject: 'Verify Email',
      text: 'Verify Email',
      html: `Hi! <br><br> Thanks for your registration<br><br><a href="${verifyUrl}">Click here to activate your account</a>`,
    };

    return await new Promise<boolean>(async function(resolve, reject) {
      return await transporter.sendMail(mailOptions, async (error, info) => {
        if (error) return reject(false);
        resolve(true);
      });
    });
  }

  async register(user: CreateUserDto): Promise<any> {
    const createdUser = await this.userService.create(user);
    const createdToken = await this.userService.createEmailToken(createdUser);
    await this.sendVerificationEmail(createdUser.email, createdToken.code);

    const { password, isActive, ...userData } = createdUser;
    return userData;
  }
}