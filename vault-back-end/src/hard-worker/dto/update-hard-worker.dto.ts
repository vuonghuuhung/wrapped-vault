import { PartialType } from '@nestjs/swagger';
import { CreateHardWorkerDto } from './create-hard-worker.dto';

export class UpdateHardWorkerDto extends PartialType(CreateHardWorkerDto) {}
