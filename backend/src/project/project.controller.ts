import { Body, Controller, Get, Param, Post, Req, Request, UseGuards } from '@nestjs/common';
import CreateProjectDto from './dto/create-project.dto';
import CreateWebPageDto from './dto/create-webpage.dto';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import RunSingleTestDto from './dto/run-single-test.dto';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() data: CreateProjectDto, @Req() req) {
    const userId = req.user.id;
    return await this.projectService.create(data, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('webpage/create')
  async createWebPage(@Body() data: CreateWebPageDto, @Req() req) {
    const userId = req.user.id;
    return await this.projectService.createWebPage(data, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('webpage/:webPageId/run-test')
  async runSingleTest(@Body() data: RunSingleTestDto, @Param('webPageId') webPageId, @Req() req) {
    const userId = req.user.id;
    const test = await this.projectService.createSingleResults(data, parseInt(webPageId), userId);
    const { testId } = await this.projectService.runSingleTest(test);
    await this.projectService.updateSingleResultsWithWptTestId(test, testId);
  }
}
