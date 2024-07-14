import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function WalletObserver() {
  const { connector } = useAccount();

  const storeProvider = async () => {
    if (!connector) throw new Error('No Connector found');
    try {
      const provider = await connector.getProvider();
      // @ts-ignore
      window.provider = provider;
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (!connector?.getProvider) return;
    storeProvider();
  }, [connector]);
  return <></>;
}
