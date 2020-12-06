import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { validate } from 'class-validator';
import CreateProjectDto from './dto/create-project.dto';
import { WptService } from '../wpt/wpt.service';
import { ProjectEntity } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebPageEntity } from './entities/webpage.entity';
import CreateWebPageDto from './dto/create-webpage.dto';

@Injectable()
export class ProjectService {
  constructor(
    private userService: UserService,
    private wptService: WptService,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(WebPageEntity)
    private readonly webPageRepository: Repository<WebPageEntity>,
  ) {}

  async create({ name, description }: CreateProjectDto, userId: number): Promise<ProjectEntity> {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new HttpException({ message: 'User does not exist.' }, HttpStatus.BAD_REQUEST);
    }

    const newProject = new ProjectEntity();
    newProject.name = name;
    newProject.description = description;
    newProject.user = user;

    const validationErrors = await validate(newProject);

    if (validationErrors.length > 0) {
      throw new HttpException({ message: 'Input data validation failed', errors: validationErrors }, HttpStatus.BAD_REQUEST);
    } else {
      return await this.projectRepository.save(newProject);
    }
  }

  async createWebPage({ name, url, projectId }: CreateWebPageDto, userId: number): Promise<WebPageEntity> {

    return null;
  }
}
