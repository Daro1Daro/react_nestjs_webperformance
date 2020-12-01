import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository, getRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
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

  async create({ username, email, password }: CreateUserDto): Promise<UserEntity> {
    if (await this.checkIfUsernameOrEmailExists(username, email)) {
      UserService.throwValidationError('Username and email must be unique.')
    }

    let newUser = new UserEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    const validationErrors = await validate(newUser);
    if (validationErrors.length > 0) {
      UserService.throwValidationError('User input is not valid.');
    } else {
      return await this.userRepository.save(newUser);
    }
  }

  static throwValidationError(message: string) {
    const errors = { username: message };
    throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
  }
}