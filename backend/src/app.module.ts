import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from "path";
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WptModule } from './wpt/wpt.module';
import { ProjectModule } from './project/project.module';

dotenv.config({ path: join(__dirname, `${process.env.NODE_ENV === 'production' ? '' : '..'}`, `.env.${process.env.NODE_ENV || 'dev'}`) });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [`${__dirname}/**/entities/**.entity{.ts,.js}`],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    WptModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
