import { Controller, Get, Param } from '@nestjs/common';
import { VaultsService } from './vaults.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('vaults')
@Controller('vaults')
export class VaultsController {
  constructor(private readonly vaultsService: VaultsService) {}

  @Get()
  async findAll() {
    return await this.vaultsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.vaultsService.findOne(id);
  }
}
