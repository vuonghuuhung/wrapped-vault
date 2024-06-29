import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HardWorkerDocument = HydratedDocument<HardWorker>;

@Schema()
export class HardWorker {
  @Prop()
  address: string;
}

export const HardWorkerSchema = SchemaFactory.createForClass(HardWorker);
