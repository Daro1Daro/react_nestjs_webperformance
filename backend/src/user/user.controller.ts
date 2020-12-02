import {
  Controller, Get, HttpException, HttpStatus, Param, Res,
} from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('activate/:token')
  public async activateUser(@Param() params, @Res() res) {
    const user = await this.userService.findOneByToken(params.token);
    if (user) {
      await this.userService.activateUser(user);
    } else {
      throw new HttpException({ message: 'User activation failed' }, HttpStatus.BAD_REQUEST);
    }
    res.status(HttpStatus.OK).send();
  }
}
