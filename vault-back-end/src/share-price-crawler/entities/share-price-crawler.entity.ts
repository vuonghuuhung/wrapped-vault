import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SharePriceDocument = HydratedDocument<SharePriceCrawler>;

@Schema()
export class SharePriceCrawler {
  @Prop()
  vault: string;

  @Prop()
  sharePrice: number;

  @Prop()
  timestamp: number;
}

export const SharePriceCrawlerSchema =
  SchemaFactory.createForClass(SharePriceCrawler);
