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

  @Column({
    default: true,
  })
  isSingle: boolean;

  @Column({ type: 'float', nullable: true })
  loadTime: number;

  @Column({ type: 'float', nullable: true })
  ttfb: number;

  @Column({ type: 'float', nullable: true })
  speedIndex: number;

  @Column({ type: 'float', nullable: true })
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
