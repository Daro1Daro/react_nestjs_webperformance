import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { validate } from 'class-validator';
import CreateProjectDto from './dto/create-project.dto';
import ReadProjectDto from './dto/read-project.dto';
import ReadWebPageDto from './dto/read-webpage.dto';
import DeleteProjectDto from './dto/delete-project.dto';
import { WptService } from '../wpt/wpt.service';
import { ProjectEntity } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WebPageEntity } from './entities/webpage.entity';
import CreateWebPageDto from './dto/create-webpage.dto';
import { SingleResultsEntity } from './entities/singleResults.entity';
import RunSingleTestDto from './dto/run-single-test.dto';
import { delay } from '../common/utils/functions';
import Status from './enums/status.enum';

@Injectable()
export class ProjectService {
  constructor(
    private userService: UserService,
    private wptService: WptService,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(WebPageEntity)
    private readonly webPageRepository: Repository<WebPageEntity>,
    @InjectRepository(SingleResultsEntity)
    private readonly singleResultsRepository: Repository<SingleResultsEntity>,
  ) {}

  private readonly POLL_INTERVAL = 10 * 1000;
  private readonly POLL_TIMEOUT = 15 * 60 * 1000;

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
      const { user, ...projectDto } = createdProject;
      return projectDto;
    }
  }

  async delete({ id }: DeleteProjectDto, userId: number): Promise<any> {
    const project = await this.projectRepository.createQueryBuilder('project')
      .leftJoin('project.user', 'user')
      .where('project.id = :id', { id })
      .andWhere('user.id = :userId', { userId })
      .getOne();

    if(project) {
      await this.projectRepository.delete(project);
    }

    return project;
  }

  async findAll(userId: number): Promise<any> {
    return this.projectRepository.find({ where: { user: { id: userId }}});
  }

  private async findOneById(id: number): Promise<ProjectEntity> {
    const project = await this.projectRepository.findOne({ where: { id }});
    if (!project) {
      return null;
    }
    return project;
  }

  private async findProjectsByUserId(userId: number): Promise<ProjectEntity[]> {
    return await this.projectRepository.createQueryBuilder('project')
      .leftJoin('project.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  private async findOneByIdAndUserId(projectId: number, userId: number): Promise<ProjectEntity> {
    const projects = await this.findProjectsByUserId(userId);
    return projects.find(project => project.id === projectId);
  }

  async findAllWebPages(userId: number): Promise<any> {
    return await this.webPageRepository.createQueryBuilder('webPage')
      .addSelect('project.id')
      .addSelect('project.name')
      .leftJoin('webPage.project', 'project')
      .leftJoin('project.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  private async findWebPagesByUserId(userId: number): Promise<WebPageEntity[]> {
    return await this.webPageRepository.createQueryBuilder('webpage')
      .leftJoin('webpage.project', 'project')
      .leftJoin('project.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  private async findOneWebPageByIdAndUserId(webPageId: number, userId: number): Promise<WebPageEntity> {
    const webPages = await this.findWebPagesByUserId(userId);
    return webPages.find(webPage => webPage.id === webPageId);
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
      const { project, ...webPageDto } = createdWebPage;
      return webPageDto;
    }
  }

  async findAllSingleResults(userId: number): Promise<any> {
    return await this.singleResultsRepository.createQueryBuilder('results')
      .addSelect('webPage.id')
      .addSelect('webPage.url')
      .addSelect('webPage.name')
      .addSelect('project.id')
      .addSelect('project.name')
      .leftJoin('results.webPage', 'webPage')
      .leftJoin('webPage.project', 'project')
      .leftJoin('project.user', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('results.isSingle = true')
      .getMany();
  }

  async createSingleResults({ connectivity, browser, runs, isMobile }: RunSingleTestDto, webPageId: number, userId: number): Promise<SingleResultsEntity> {
    const webPage = await this.findOneWebPageByIdAndUserId(webPageId, userId);

    if (!webPage) {
      throw new HttpException({ message: `Specified web page does not exist.` }, HttpStatus.BAD_REQUEST);
    }

    const newSingleResults = new SingleResultsEntity();
    newSingleResults.connectivity = connectivity;
    newSingleResults.browser = browser;
    newSingleResults.runs = runs;
    newSingleResults.isMobile = isMobile;
    newSingleResults.webPage = webPage;

    const validationErrors = await validate(newSingleResults);
    if (validationErrors.length) {
      throw new HttpException({
        message: 'Input data validation failed',
        errors: validationErrors,
      }, HttpStatus.BAD_REQUEST);
    } else {
      return await this.singleResultsRepository.save(newSingleResults);
    }
  }

  pollWptServerForResults(testId, interval, timeout) {
    let start = Date.now();
    const run = (testId) => {
      return this.wptService.checkStatus(testId)
        .then(res => {
          const { data: { data } } = res;
          if (data.statusCode === 200) {
            return data.id;
          } else if (timeout !== 0 && Date.now() - start > timeout) {
            throw new Error('Timeout error');
          } else {
            return delay(interval).then(() => run(testId));
          }
        });
    };

    return run(testId);
  }

  async updateSingleTest(testId) {
    const resultsToUpdate = await this.singleResultsRepository.findOne({ where: { wptTestId: testId } });
    const { data: { data: { average: { firstView } } } } = await this.wptService.getResults(testId);

    resultsToUpdate.loadTime = firstView?.loadTime;
    resultsToUpdate.ttfb = firstView?.TTFB;
    resultsToUpdate.startRender = firstView?.render;
    resultsToUpdate.speedIndex = firstView?.SpeedIndex;
    resultsToUpdate.status = Status.Success;

    await this.singleResultsRepository.save(resultsToUpdate);
  }

  async runSingleTest(test: SingleResultsEntity): Promise<any> {
    const { webPage, browser, connectivity, runs, isMobile } = test;
    const { data } = await this.wptService.runTest(webPage.url, browser, connectivity, runs, isMobile);

    if (data.statusCode !== 200) {
      await this.singleResultsRepository.delete(test);
      throw new HttpException({
        message: 'WPT server error',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    this.pollWptServerForResults(data.data.testId, this.POLL_INTERVAL, this.POLL_TIMEOUT)
      .then(result => this.updateSingleTest(result))
      .catch(err => console.log(err));

    return data.data;
  }

  async updateSingleResultsWithWptTestId(test: SingleResultsEntity, wptTestId: string): Promise<SingleResultsEntity> {
    test.wptTestId = wptTestId;
    return await this.singleResultsRepository.save(test);
  }
}
