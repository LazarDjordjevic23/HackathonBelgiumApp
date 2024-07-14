import { mainnet, bsc, polygon, polygonMumbai, bscTestnet, Chain, sepolia, rootstockTestnet } from 'viem/chains';

const env = import.meta.env.VITE_ENV_TYPE;

export type APP_CHAIN = 'BNB' | 'POLYGON' | 'ETH' | 'ROOT';

export const appChains: Record<APP_CHAIN, Chain> = {
  BNB: env === 'develop' ? bscTestnet : bsc,
  POLYGON: env === 'develop' ? polygonMumbai : polygon,
  ETH: env === 'develop' ? mainnet : mainnet,
  ROOT: env === 'develop' ? rootstockTestnet : rootstockTestnet,
};
