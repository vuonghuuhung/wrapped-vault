export class VaultInfoResponseDto {
  id: string;
  chain: string;
  name: string;
  logoUrl: string[];
  apyIconUrls: string[];
  apyTokenSymbols: string[];
  tokenNames: string[];
  platform: string[];
  tags: string[];
  tokenAddress: string;
  decimals: string;
  vaultAddress: string;
  strategyAddress: string;
  cmcRewardTokenSymbols: string[];
  pricePerFullShare: string;
  estimatedAPY: string;
  estimatedAPYBreakdown: string[];
  dailyAPY: string;
  boostedEstimatedAPY: string | null;
  underlyingBalanceWithInvestment: string;
  usdPrice: string;
  totalSupply: string;
  totalValueLocked: string;
  uniswapV3PositionId: string | null;
  uniswapV3UnderlyingTokenPrices: string[];
  uniswapV3ManagedData: string | null;
  inactive: boolean;
  rewardPool: string;
  underlyingGeckoId: string;
  depositToken: {
    name: string;
    address: string;
    decimal: number;
    usdPrice: string;
    imgUrl: string | null;
  };
  description: string;
}
