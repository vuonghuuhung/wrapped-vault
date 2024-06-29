import { IsString } from 'class-validator';

export class CreateWhiteListDto {
  @IsString()
  address: string;
}
