import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { validate } from 'class-validator';
import CreateProjectDto from './dto/create-project.dto';
import ReadProjectDto from './dto/read-project.dto';
import ReadWebPageDto from './dto/read-webpage.dto';
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

  async create({ name, description }: CreateProjectDto, userId: number): Promise<ReadProjectDto> {
    const user = await this.userService.findOneById(userId);

    const newProject = new ProjectEntity();
    newProject.name = name;
    newProject.description = description;
    newProject.user = user;

    const validationErrors = await validate(newProject);
    if (validationErrors.length) {
      throw new HttpException({
        message: 'Input data validation failed',
        errors: validationErrors,
      }, HttpStatus.BAD_REQUEST);
    } else {
      const createdProject = await this.projectRepository.save(newProject);
      const { user, ...projectDto} = createdProject;
      return projectDto;
    }
  }

  async findProjectsByUserId(userId: number): Promise<ProjectEntity[]> {
    return await this.projectRepository.createQueryBuilder('project')
      .leftJoin('project.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async findOneByIdAndUserId(projectId: number, userId: number): Promise<ProjectEntity> {
    const projects = await this.findProjectsByUserId(userId);
    return projects.find(project => project.id === projectId)
  }

  async findOneById(id: number): Promise<ProjectEntity> {
    const project = await this.projectRepository.findOne({ where: { id: id }, relations: ['user'] });
    if (!project) {
      return null;
    }
    return project;
  }

  async createWebPage({ name, url, projectId }: CreateWebPageDto, userId: number): Promise<ReadWebPageDto> {
    const project = await this.findOneByIdAndUserId(projectId, userId);

    if (!project) {
      throw new HttpException({ message: `Specified project does not exist.` }, HttpStatus.BAD_REQUEST);
    }

    const newWebPage = new WebPageEntity();
    newWebPage.name = name;
    newWebPage.url = url;
    newWebPage.project = project;

    const validationErrors = await validate(newWebPage);
    if (validationErrors.length) {
      throw new HttpException({
        message: 'Input data validation failed',
        errors: validationErrors,
      }, HttpStatus.BAD_REQUEST);
    } else {
      const createdWebPage = await this.webPageRepository.save(newWebPage);
      const { project, ...webPageDto} = createdWebPage;
      return webPageDto;
    }
  }
}
