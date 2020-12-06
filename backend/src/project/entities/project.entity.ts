import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { WebPageEntity } from './webpage.entity';

@Entity('project')
export class ProjectEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('timestamp', { precision: 3, default: () => 'CURRENT_TIMESTAMP(3)' })
  created: Date;

  @ManyToOne(type => UserEntity, user => user.tokens, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @OneToMany(type => WebPageEntity, url => url.project)
  webPages: WebPageEntity[];
}
