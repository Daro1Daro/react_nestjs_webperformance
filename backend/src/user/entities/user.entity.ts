import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { TokenEntity } from './token.entity';

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  isActive: boolean;

  @OneToMany(type => TokenEntity, token => token.user)
  tokens: TokenEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
