import { Test, TestingModule } from '@nestjs/testing';
import { TxHistoryController } from './tx-history.controller';
import { TxHistoryService } from './tx-history.service';

describe('TxHistoryController', () => {
  let controller: TxHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TxHistoryController],
      providers: [TxHistoryService],
    }).compile();

    controller = module.get<TxHistoryController>(TxHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
