import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository, getRepository } from 'typeorm';
import * as argon2 from 'argon2';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';
import { UserRO } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
  }

  async findOne(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      return null;
    }
    return user;
  }

  async checkIfUsernameOrEmailExists(username: string, email: string): Promise<boolean> {
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email });

    return !!await qb.getOne();
  }

  async create({ username, email, password }: CreateUserDto): Promise<UserRO> {
    if (await this.checkIfUsernameOrEmailExists(username, email)) {
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
    }

    let newUser = new UserEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'User input is not valid.' };
      throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);
    } else {
      const createdUser = await this.userRepository.save(newUser);
      return UserService.buildUserRO(createdUser);
    }
  }

  private static buildUserRO(user: UserEntity) {
    const userRO = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    return { user: userRO };
  }
}