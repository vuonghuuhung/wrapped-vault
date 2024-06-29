import { Test, TestingModule } from '@nestjs/testing';
import { SharePriceCrawlerService } from './share-price-crawler.service';

describe('SharePriceCrawlerService', () => {
  let service: SharePriceCrawlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharePriceCrawlerService],
    }).compile();

    service = module.get<SharePriceCrawlerService>(SharePriceCrawlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
