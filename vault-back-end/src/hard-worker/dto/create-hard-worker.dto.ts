import { IsString } from 'class-validator';

export class CreateHardWorkerDto {
  @IsString()
  address: string;
}
