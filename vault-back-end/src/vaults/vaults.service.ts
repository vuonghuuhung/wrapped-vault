import { Injectable } from '@nestjs/common';
import { MockVaults } from './mock/vaults';
import { VaultInfoResponseDto } from './dto/vault-info-response.dto';
import { SharePriceCrawlerService } from 'src/share-price-crawler/share-price-crawler.service';

@Injectable()
export class VaultsService {
  constructor(private sharePriceCrawlerService: SharePriceCrawlerService) {}

  async findAll(): Promise<VaultInfoResponseDto[]> {
    const vaults = await Promise.all(
      MockVaults.map(async (vault) => {
        const apy = await this.sharePriceCrawlerService.estimateAPY(vault.id);
        const dailyAPY = await this.sharePriceCrawlerService.estimateDailyAPY(
          vault.id,
        );
        vault.estimatedAPY = apy;
        vault.dailyAPY = dailyAPY;
        return vault;
      }),
    );

    return vaults;
  }

  async findOne(id: string): Promise<VaultInfoResponseDto> {
    const vault = MockVaults.find((vault) => vault.id === id);

    const apy = await this.sharePriceCrawlerService.estimateAPY(vault.id);
    const dailyAPY = await this.sharePriceCrawlerService.estimateDailyAPY(
      vault.id,
    );
    vault.estimatedAPY = apy;
    vault.dailyAPY = dailyAPY;

    return vault;
  }
}
