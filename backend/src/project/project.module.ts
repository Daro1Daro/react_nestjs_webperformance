import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { WptModule } from '../wpt/wpt.module';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { WebPageEntity } from './entities/webpage.entity';

@Module({
  imports: [WptModule, UserModule, TypeOrmModule.forFeature([ProjectEntity, WebPageEntity])],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}
