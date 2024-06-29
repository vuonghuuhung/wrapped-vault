import { Test, TestingModule } from '@nestjs/testing';
import { HardWorkerController } from './hard-worker.controller';
import { HardWorkerService } from './hard-worker.service';

describe('HardWorkerController', () => {
  let controller: HardWorkerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HardWorkerController],
      providers: [HardWorkerService],
    }).compile();

    controller = module.get<HardWorkerController>(HardWorkerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
