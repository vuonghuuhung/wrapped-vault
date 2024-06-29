import { Module } from '@nestjs/common';
import { WhiteListService } from './white-list.service';
import { WhiteListController } from './white-list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WhiteList, WhiteListSchema } from './entities/white-list.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WhiteList.name, schema: WhiteListSchema },
    ]),
  ],
  controllers: [WhiteListController],
  providers: [WhiteListService],
})
export class WhiteListModule {}
