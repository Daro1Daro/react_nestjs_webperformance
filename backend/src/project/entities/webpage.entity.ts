import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { SingleResultsEntity } from './singleResults.entity';

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

  @Column({
    default: false,
  })
  isCyclical: boolean;

  @ManyToOne(type => ProjectEntity, project => project.webPages, {
    onDelete: 'CASCADE',
  })
  project: ProjectEntity;

  @OneToMany(type => SingleResultsEntity, singleResults => singleResults.webPage)
  singleResults: SingleResultsEntity[];
}
