import { Test, TestingModule } from '@nestjs/testing';
import { HardWorkerService } from './hard-worker.service';

describe('HardWorkerService', () => {
  let service: HardWorkerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HardWorkerService],
    }).compile();

    service = module.get<HardWorkerService>(HardWorkerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
