import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TxHistoryService } from './tx-history.service';
import { CreateTxHistoryDto } from './dto/create-tx-history.dto';
import { TxHistory } from './entities/tx-history.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tx-history')
@Controller('tx-history')
export class TxHistoryController {
  constructor(private readonly txHistoryService: TxHistoryService) {}

  @Post()
  create(@Body() createTxHistoryDto: CreateTxHistoryDto) {
    return this.txHistoryService.create(createTxHistoryDto);
  }

  @Get('user-history')
  async findAll(
    @Query('vaullt') vault: string,
    @Query('address') address: string,
  ): Promise<TxHistory[]> {
    return this.txHistoryService.findAll(vault, address);
  }

  @Get('invest-history')
  async findInvestHistory(@Query('vault') vault: string): Promise<TxHistory[]> {
    return this.txHistoryService.findInvestHistory(vault);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.txHistoryService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.txHistoryService.remove(+id);
  }
}
