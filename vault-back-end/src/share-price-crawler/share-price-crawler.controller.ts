import { Controller, Get, Query } from '@nestjs/common';
import { SharePriceCrawlerService } from './share-price-crawler.service';
import { SharePriceCrawler } from './entities/share-price-crawler.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('share-price')
@Controller('share-price-crawler')
export class SharePriceCrawlerController {
  constructor(
    private readonly sharePriceCrawlerService: SharePriceCrawlerService,
  ) {}

  @Get()
  async findAll(@Query('vault') vault: string): Promise<SharePriceCrawler[]> {
    return await this.sharePriceCrawlerService.findAll(vault);
  }
}
