import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository, getRepository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import { validate } from 'class-validator';
import { TokenEntity } from './entities/token.entity';
import { createRandomString } from '../common/utils/functions';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      return null;
    }
    return user;
  }

  async findOneById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      return null;
    }
    return user;
  }

  async findOneByToken(token: string): Promise<UserEntity> {
    const user = await this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.tokens', 'token')
      .where('token.code =(:token)', { token })
      .getOne();
    if (!user) {
      return null;
    }
    return user;
  }

  async activateUser(user: UserEntity): Promise<boolean> {
    if (!user.isActive) {
      user.isActive = true;
      return !!await this.userRepository.save(user);
    }
    return true;
  }

  async checkIfUsernameOrEmailExists(username: string, email: string): Promise<boolean> {
    const user = await this.userRepository.createQueryBuilder('user')
      .where('user.username =(:username)', { username })
      .orWhere('user.email =(:email)', { email })
      .getOne();

    console.log('CHECK IF');
    console.log(user);
    return !!user;
  }

  async create({ username, email, password }: CreateUserDto): Promise<UserEntity> {
    if (await this.checkIfUsernameOrEmailExists(username, email)) {
      UserService.throwValidationError('Username and email must be unique.');
    }

    const newUser = new UserEntity();
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

  async createEmailToken(user: UserEntity): Promise<any> {
    const newToken = new TokenEntity();
    newToken.code = createRandomString(24);
    newToken.user = user;
    return await this.tokenRepository.save(newToken);
  }

  static throwValidationError(message: string) {
    const errors = { username: message };
    throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
  }
}