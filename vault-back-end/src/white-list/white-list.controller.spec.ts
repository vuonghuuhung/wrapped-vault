import { Test, TestingModule } from '@nestjs/testing';
import { WhiteListController } from './white-list.controller';
import { WhiteListService } from './white-list.service';

describe('WhiteListController', () => {
  let controller: WhiteListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhiteListController],
      providers: [WhiteListService],
    }).compile();

    controller = module.get<WhiteListController>(WhiteListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
