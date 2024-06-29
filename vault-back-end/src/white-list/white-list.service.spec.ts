import { Test, TestingModule } from '@nestjs/testing';
import { WhiteListService } from './white-list.service';

describe('WhiteListService', () => {
  let service: WhiteListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhiteListService],
    }).compile();

    service = module.get<WhiteListService>(WhiteListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
