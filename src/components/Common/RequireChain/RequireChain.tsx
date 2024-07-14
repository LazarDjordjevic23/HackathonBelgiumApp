import { APP_CHAIN } from '@/constatnts/chains';
import { getChainById } from '@/utils/contracts';
import React, { useState } from 'react';
import { createWalletClient } from 'viem';
import { custom, useAccount } from 'wagmi';

interface IRequireChain {
  requiredChain: APP_CHAIN;
  children: React.ReactNode;
}
export default function RequireChain({ children, requiredChain }: IRequireChain) {
  const [hasPendingClick, setHasPendingClick] = useState(false);
  const { chainId: appChain, chain } = useAccount();

  const requireChainObj = getChainById(requiredChain);

  const handleClick = () => {
    //@ts-ignore
    const currentProvider = window.provider;

    const walletClient = createWalletClient({
      chain,
      transport: custom(currentProvider),
    });

    if (requireChainObj.id !== appChain) {
      walletClient.switchChain({ id: requireChainObj.id });
    }
  };

  return <div onClick={handleClick}>{children}</div>;
}
