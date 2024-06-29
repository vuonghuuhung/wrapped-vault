import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config/config';
import { CatsModule } from './cats/cats.module';
import { VaultsModule } from './vaults/vaults.module';
import { TxHistoryModule } from './tx-history/tx-history.module';
import { SharePriceCrawlerModule } from './share-price-crawler/share-price-crawler.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HardWorkerModule } from './hard-worker/hard-worker.module';
import { WhiteListModule } from './white-list/white-list.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CronjobsModule } from './cronjobs/cronjobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongoose.uri'),
      }),
      inject: [ConfigService],
    }),
    CatsModule,
    VaultsModule,
    TxHistoryModule,
    SharePriceCrawlerModule,
    ScheduleModule.forRoot(),
    HardWorkerModule,
    WhiteListModule,
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    CronjobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
