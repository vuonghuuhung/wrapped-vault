import { Module } from '@nestjs/common';
import { SharePriceCrawlerService } from './share-price-crawler.service';
import { SharePriceCrawlerController } from './share-price-crawler.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SharePriceCrawler,
  SharePriceCrawlerSchema,
} from './entities/share-price-crawler.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SharePriceCrawler.name, schema: SharePriceCrawlerSchema },
    ]),
  ],
  controllers: [SharePriceCrawlerController],
  providers: [SharePriceCrawlerService],
  exports: [SharePriceCrawlerService],
})
export class SharePriceCrawlerModule {}
