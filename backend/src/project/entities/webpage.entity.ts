import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity('web_page')
export class WebPageEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 64 })
  name: string;

  @Column({ type: "varchar", length: 2083 })
  url: string;

  @Column('timestamp', { precision: 3, default: () => 'CURRENT_TIMESTAMP(3)' })
  created: Date;

  @ManyToOne(type => ProjectEntity, project => project.webPages, {
    onDelete: 'CASCADE',
  })
  project: ProjectEntity;
}
