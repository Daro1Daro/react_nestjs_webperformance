import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('token')
export class TokenEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 24 })
  code: string;

  @Column('timestamp', { precision: 3, default: () => 'CURRENT_TIMESTAMP(3)' })
  created: Date;

  @ManyToOne(type => UserEntity, user => user.tokens, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}
