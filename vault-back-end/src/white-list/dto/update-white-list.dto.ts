import { PartialType } from '@nestjs/swagger';
import { CreateWhiteListDto } from './create-white-list.dto';

export class UpdateWhiteListDto extends PartialType(CreateWhiteListDto) {}
