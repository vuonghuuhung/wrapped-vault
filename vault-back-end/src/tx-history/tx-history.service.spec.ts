import { Test, TestingModule } from '@nestjs/testing';
import { TxHistoryService } from './tx-history.service';

describe('TxHistoryService', () => {
  let service: TxHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TxHistoryService],
    }).compile();

    service = module.get<TxHistoryService>(TxHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
