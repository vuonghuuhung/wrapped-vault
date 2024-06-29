import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @ApiProperty({
    example: 'Kitty',
    description: 'The name of the Cat',
  })
  @Prop()
  name: string;

  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  @Prop()
  age: number;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  @Prop()
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
