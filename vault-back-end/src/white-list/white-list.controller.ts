import { Controller, Get } from '@nestjs/common';
import { WhiteListService } from './white-list.service';

@Controller('white-list')
export class WhiteListController {
  constructor(private readonly whiteListService: WhiteListService) {}

  @Get()
  findAll() {
    return this.whiteListService.findAll();
  }
}
