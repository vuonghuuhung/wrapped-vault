import { Module } from '@nestjs/common';
import { TxHistoryService } from './tx-history.service';
import { TxHistoryController } from './tx-history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TxHistory, TxHistorySchema } from './entities/tx-history.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TxHistory.name, schema: TxHistorySchema },
    ]),
  ],
  controllers: [TxHistoryController],
  providers: [TxHistoryService],
})
export class TxHistoryModule {}
