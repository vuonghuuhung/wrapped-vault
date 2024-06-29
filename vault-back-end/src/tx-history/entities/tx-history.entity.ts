import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type TxHistoryDocument = HydratedDocument<TxHistory>;

@Schema()
export class TxHistory {
  @ApiProperty({
    example: '129030129',
    description: 'The block number has transaction',
  })
  @Prop()
  block: number;

  @ApiProperty({
    example: 'Deposit',
    description: 'The event name',
  })
  @Prop()
  eventName: string;

  @ApiProperty({
    example:
      '0x7fa9fa510ab02680de93357a0776d1d480691e42f595d5c851eac332afb7c134',
    description: 'Transaction hash',
  })
  @Prop()
  txHash: string;

  @ApiProperty({
    example: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    description: 'Transaction creator',
  })
  @Prop()
  from: string;

  @ApiProperty({
    example: '0xb5d29d839869Dff1E00b7F96b12fB275179AEeD2',
    description: 'Target address of transaction',
  })
  @Prop()
  to: string;

  @ApiProperty({
    example: '2024-05-07T20:54:04.000Z',
    description: 'Date of transaction',
  })
  @Prop()
  date: Date;

  @ApiProperty({
    example:
      '{"sender":"0x70997970C51812dc3A010C7d01b50e0d17dc79C8","receiver":"0x70997970C51812dc3A010C7d01b50e0d17dc79C8","owner":"0x70997970C51812dc3A010C7d01b50e0d17dc79C8","assets":"90","shares":"90"}',
    description: 'Logs of transaction',
  })
  @Prop()
  logs: string;
}

export const TxHistorySchema = SchemaFactory.createForClass(TxHistory);
