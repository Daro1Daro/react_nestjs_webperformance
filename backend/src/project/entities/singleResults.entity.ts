import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WebPageEntity } from './webpage.entity';
import Config from './config.abstract';
import Status from '../enums/status.enum';

@Entity('single_results')
export class SingleResultsEntity extends Config {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  wptTestId: string;

  @Column('timestamp', { precision: 3, default: () => 'CURRENT_TIMESTAMP(3)' })
  created: Date;

  @Column({ nullable: true })
  loadTime: number;

  @Column({ nullable: true })
  ttfb: number;

  @Column({ nullable: true })
  speedIndex: number;

  @Column({ nullable: true })
  startRender: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.Pending,
  })
  status: Status;

  @ManyToOne(type => WebPageEntity, webPage => webPage.singleResults, {
    onDelete: 'CASCADE',
  })
  webPage: WebPageEntity;
}
