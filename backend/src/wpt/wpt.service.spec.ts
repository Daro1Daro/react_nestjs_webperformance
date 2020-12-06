import { Test, TestingModule } from '@nestjs/testing';
import { WptService } from './wpt.service';

describe('WptService', () => {
  let service: WptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WptService],
    }).compile();

    service = module.get<WptService>(WptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
