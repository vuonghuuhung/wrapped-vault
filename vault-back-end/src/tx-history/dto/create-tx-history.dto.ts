import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateTxHistoryDto {
  @IsInt()
  block: number;

  @IsString()
  eventName: string;

  @IsString()
  txHash: string;

  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsDate()
  date: Date;

  @IsString()
  logs: string;
}
