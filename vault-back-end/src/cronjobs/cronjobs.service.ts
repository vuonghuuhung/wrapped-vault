import { Injectable } from '@nestjs/common';
import { SharePriceCrawlerService } from 'src/share-price-crawler/share-price-crawler.service';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class CronjobsService {
  constructor(private sharePriceService: SharePriceCrawlerService) {}

  @Interval(7000)
  async handleCron() {
    await this.sharePriceService.handleCron();
  }
}
