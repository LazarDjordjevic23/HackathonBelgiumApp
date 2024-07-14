import React from 'react';
import { IOption } from '@/components/Common/Dropdown/Dropdown';
import { Chain } from 'viem';
import { mainnet, bsc, bscTestnet, arbitrum, arbitrumGoerli } from 'viem/chains';

import EthIcon from '@/assets/svgs/EthIcon.svg?react';
import BnbIcon from '@/assets/svgs/BnbIcon.svg?react';
import ArbIcon from '@/assets/svgs/ArbIcon.svg?react';

export type ChainOption = {
  icon: JSX.Element;
  chain: Chain;
};

export const chainOptions: IOption<ChainOption>[] = [
  {
    id: 'eth',
    title: "ethereum",
    info: {
      chain: import.meta.env.VITE_ENV_TYPE.toLowerCase() === 'develop' ? mainnet : mainnet, // TODO: find a testnet ETH chain
      icon: <EthIcon />,
    },
  },
  {
    id: 'bnb',
    title: 'BNB Chain',
    info: {
      chain: import.meta.env.VITE_ENV_TYPE.toLowerCase() === 'develop' ? bscTestnet : bsc, // TODO: find a testnet ETH chain
      icon: <BnbIcon />,
    },
  },
  {
    id: 'arb',
    title: 'Arbitrum',
    info: {
      chain: import.meta.env.VITE_ENV_TYPE.toLowerCase() === 'develop' ? arbitrumGoerli : arbitrum, // TODO: find a testnet ETH chain
      icon: <ArbIcon />,
    },
  },
];
