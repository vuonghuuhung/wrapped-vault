import { Module } from '@nestjs/common';
import { VaultsService } from './vaults.service';
import { VaultsController } from './vaults.controller';
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
  controllers: [VaultsController],
  providers: [VaultsService, SharePriceCrawlerService],
  exports: [VaultsService],
})
export class VaultsModule {}
