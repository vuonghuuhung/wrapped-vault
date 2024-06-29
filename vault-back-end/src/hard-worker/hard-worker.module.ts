import { Module } from '@nestjs/common';
import { HardWorkerService } from './hard-worker.service';
import { HardWorkerController } from './hard-worker.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HardWorker, HardWorkerSchema } from './entities/hard-worker.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HardWorker.name, schema: HardWorkerSchema },
    ]),
  ],
  controllers: [HardWorkerController],
  providers: [HardWorkerService],
})
export class HardWorkerModule {}
