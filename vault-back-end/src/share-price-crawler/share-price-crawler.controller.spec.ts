import { Test, TestingModule } from '@nestjs/testing';
import { SharePriceCrawlerController } from './share-price-crawler.controller';
import { SharePriceCrawlerService } from './share-price-crawler.service';

describe('SharePriceCrawlerController', () => {
  let controller: SharePriceCrawlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharePriceCrawlerController],
      providers: [SharePriceCrawlerService],
    }).compile();

    controller = module.get<SharePriceCrawlerController>(
      SharePriceCrawlerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
