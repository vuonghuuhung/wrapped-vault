import { PartialType } from '@nestjs/swagger';
import { CreateTxHistoryDto } from './create-tx-history.dto';

export class UpdateTxHistoryDto extends PartialType(CreateTxHistoryDto) {}
