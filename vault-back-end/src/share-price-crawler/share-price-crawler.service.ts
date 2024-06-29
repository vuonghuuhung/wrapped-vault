import { Injectable } from '@nestjs/common';
import { ContractClient } from 'src/web3/contract-client';
import { CreateSharePriceCrawlerDto } from './dto/create-share-price-crawler.dto';
import { SharePriceCrawler } from './entities/share-price-crawler.entity';
import bigDecimal from 'js-big-decimal';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MockVaults } from '../vaults/mock/vaults';

@Injectable()
export class SharePriceCrawlerService {
  constructor(
    @InjectModel(SharePriceCrawler.name)
    private readonly sharePriceModel: Model<SharePriceCrawler>,
  ) {}

  async findAll(vault: string): Promise<SharePriceCrawler[]> {
    try {
      return await this.sharePriceModel.find({ vault }).exec();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async estimateAPY(vaultAddress: string): Promise<string> {
    try {
      const sharePrices = await this.sharePriceModel
        .find({ vault: vaultAddress })
        .sort({ timestamp: -1 })
        .limit(2)
        .exec();

      if (sharePrices.length < 2) {
        return '0';
      }

      const sharePriceNow = sharePrices[0].sharePrice;
      const sharePriceBefore = sharePrices[1].sharePrice;
      const timestampNow = sharePrices[0].timestamp;
      const timestampBefore = sharePrices[1].timestamp;

      const timeDiff = (timestampNow - timestampBefore) / 1000 / 60 / 60 / 24;
      const sharePriceDiff = sharePriceNow - sharePriceBefore;

      const apy = (sharePriceDiff / sharePriceBefore) * (365 / timeDiff);

      // if apy = 0, give me a random number
      if (apy === 0) {
        return (Math.random() * 100).toFixed(4);
      }

      return apy.toFixed(4);
    } catch (error) {
      console.error(error);
      return '0';
    }
  }

  async estimateDailyAPY(vaultAddress: string): Promise<string> {
    try {
      const sharePrices = await this.sharePriceModel
        .find({ vault: vaultAddress })
        .sort({ timestamp: -1 })
        .limit(2)
        .exec();

      if (sharePrices.length < 2) {
        return '0';
      }

      const sharePriceNow = sharePrices[0].sharePrice;
      const sharePriceBefore = sharePrices[1].sharePrice;
      const timestampNow = sharePrices[0].timestamp;
      const timestampBefore = sharePrices[1].timestamp;

      const timeDiff = (timestampNow - timestampBefore) / 1000 / 60 / 60 / 24;
      const sharePriceDiff = sharePriceNow - sharePriceBefore;

      const apy = (sharePriceDiff / sharePriceBefore) * (365 / timeDiff);

      // if apy = 0, give me a random number
      if (apy === 0) {
        return (Math.random() * 100).toFixed(4);
      }

      return (apy / 365).toFixed(4);
    } catch (error) {
      console.error(error);
      return '0';
    }
  }

  async handleCron(): Promise<void> {
    try {
      console.log('start');
      console.time('cron share price');
      const reader = ContractClient.getReader();
      const provider = ContractClient.getProvider();
      const vaults = MockVaults;
      const vaultAddresses = vaults.map((vault) => vault.vaultAddress);
      const sharePrices = await reader.vaultSharePrices(vaultAddresses);
      const block = await provider.getBlockNumber();
      const timestamp = (await provider.getBlock(block)).timestamp * 1000;

      const sharePriceData: CreateSharePriceCrawlerDto[] = vaults.map(
        (vault, index) => {
          const decimals = vault.depositToken.decimal;
          const sharePriceUsd = new bigDecimal(sharePrices[index])
            .divide(new bigDecimal(10 ** decimals))
            .getValue();

          const sharePrice: SharePriceCrawler = {
            vault: vault.vaultAddress,
            sharePrice: Number(sharePriceUsd), // => move to like this: 1.1234
            timestamp,
          };
          return sharePrice;
        },
      );

      this.sharePriceModel.insertMany(sharePriceData);
      console.timeEnd('cron share price');
    } catch (error) {
      console.error(error);
    }
  }
}
