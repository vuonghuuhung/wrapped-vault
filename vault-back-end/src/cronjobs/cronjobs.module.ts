import { Module } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { CronjobsController } from './cronjobs.controller';
import { SharePriceCrawlerService } from 'src/share-price-crawler/share-price-crawler.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SharePriceCrawler,
  SharePriceCrawlerSchema,
} from 'src/share-price-crawler/entities/share-price-crawler.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SharePriceCrawler.name, schema: SharePriceCrawlerSchema },
    ]),
  ],
  controllers: [CronjobsController],
  providers: [CronjobsService, SharePriceCrawlerService],
})
export class CronjobsModule {}
