import { IsDecimal, IsInt, IsString } from 'class-validator';

export class CreateSharePriceCrawlerDto {
  @IsString()
  vault: string;

  @IsDecimal()
  sharePrice: number;

  @IsInt()
  timestamp: number;
}
