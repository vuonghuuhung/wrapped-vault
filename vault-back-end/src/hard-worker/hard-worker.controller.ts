import { Controller, Get } from '@nestjs/common';
import { HardWorkerService } from './hard-worker.service';

@Controller('hard-worker')
export class HardWorkerController {
  constructor(private readonly hardWorkerService: HardWorkerService) {}

  @Get()
  async findAll() {
    return await this.hardWorkerService.findAll();
  }
}
