export type COINGECKO_ID =
  | 'weth'
  | 'compound-governance-token'
  | 'harvest-finance'
  | 'ifarm'
  | 'curve-dao-token'
  | 'convex-finance'
  | 'usd-coin'
  | 'lp-3pool-curve'
  | 'convex-crv'
  | 'dai'
  | 'idle-dai-yield'
  | 'tether'
  | 'yel-finance';

export const MappingTokenSymbolToCoingeckoId: Record<string, COINGECKO_ID> = {
  ETH: 'weth',
  WETH: 'weth',
  COMP: 'compound-governance-token',
  FARM: 'harvest-finance',
  IFARM: 'ifarm',
  CRV: 'curve-dao-token',
  CVX: 'convex-finance',
  USDC: 'usd-coin',
  '3CRV': 'lp-3pool-curve',
  cvxCRV: 'convex-crv',
  DAI: 'dai',
  IDLE: 'idle-dai-yield',
  USDT: 'tether',
  YEL: 'yel-finance',
};
