import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, base, mainnet, optimism, polygon, bsc, bscTestnet,rootstockTestnet } from 'wagmi/chains';

export const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID as string;

export const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId,
  chains: [mainnet, bsc, polygon, optimism, arbitrum, base, bscTestnet, rootstockTestnet],
});
