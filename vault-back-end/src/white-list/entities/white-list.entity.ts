import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WhiteListDocument = HydratedDocument<WhiteList>;

@Schema()
export class WhiteList {
  @Prop()
  address: string;
}

export const WhiteListSchema = SchemaFactory.createForClass(WhiteList);
