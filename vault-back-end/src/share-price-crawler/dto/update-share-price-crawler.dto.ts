import { PartialType } from '@nestjs/swagger';
import { CreateSharePriceCrawlerDto } from './create-share-price-crawler.dto';

export class UpdateSharePriceDto extends PartialType(
  CreateSharePriceCrawlerDto,
) {}
