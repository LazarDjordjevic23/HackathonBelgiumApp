import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tokensList } from '../Home/TokensList/list';
import CexTable from './CexTable/CexTable';
import { useTokenStore } from '@/stores/token';
import { Skeleton } from '@/components/Common/Skeleton/Skeleton';
import { AnimatePresence, motion } from 'framer-motion';
import DexTable from './DexTable/DexTable';
import Execution from './Execution/Execution';
import { fromResponseToExchanges, submitLoan } from '@/services/tokens';
import FeesTable from './FeesTable/FeesTable';
import AnimatedWrapper from '@/components/AnimatedWrapper/AnimatedWrapper';
import { usePromise } from '@/hooks/usePromise/usePromise';
import clsx from 'clsx';
import { useAccount } from 'wagmi';

export default function Token() {
  const { token: tokenName } = useParams();
  const { address } = useAccount();
  const [value, setValue] = useState();
  const { gettingInfo, info, fetchTokensInfo } = useTokenStore();

  const [borrow, res, loading, error] = usePromise<any, Parameters<typeof submitLoan>>(submitLoan, { showError: true });

  const tokenBasicInfo = useMemo(() => tokensList.find((token) => token.name === tokenName), [tokenName]);
  const exchanges = fromResponseToExchanges(info?.tokens!, 'ethereum');
  const cheeperPrice = exchanges[0]?.price.usd;
  const higherPrice = exchanges[1]?.price.usd;
  console.log({ ex: exchanges[1] });

  const multiplier = higherPrice && cheeperPrice ? higherPrice / cheeperPrice : 0;

  useEffect(() => {
    // fetchTokensInfo();
  }, []);

  if (!tokenBasicInfo || !exchanges?.length) return <Skeleton loading length={2} wrapperClass='flex gap-6 items-center' mockChildren={<div className='min-h-[500px]'></div>}>Token Not Founds</Skeleton>;

  const { icon, name, symbol } = tokenBasicInfo;

  const buyValue = value;
  const sellValue = value ? value * multiplier : 0;
  const profit = sellValue - buyValue!;

  const execute = () => borrow(address!, +value!, profit);

  const sellValueSetter = (value) => multiplier * +value;

  return (
    <div>
      <div className="flex gap-3 items-center mb-10">
        <img src={icon} className="w-10 h-10" />
        <span className="text-3xl text-content-tirtiary">{name}</span>
        <span className="text-sm text-white/90">{symbol}</span>
      </div>
      <div className="w-full flex gap-10 ">
        <div className="flex-[1]   rounded-lg flex flex-col gap-3">
          <AnimatedWrapper delay={0.2}>
            <Execution
              bottomContent={<span className="text-xs text-content-secondary">Amount to borrow</span>}
              textColor="#22c55e"
              action="Buy"
              exchange={exchanges[0]?.exchange}
              tokenName="USDT"
              setter={setValue}
            />
          </AnimatedWrapper>
          <AnimatedWrapper delay={0.4}>
            <Execution
              tokenName="USDT"
              textColor="#ef4444"
              action="Sell"
              exchange={exchanges[1]?.exchange}
              inputProps={{
                disabled: true,
                value: value ? (value * multiplier).toFixed(2) : 0,
                className: 'outline-none border-none p-2 text-2xl bg-inherit placeholder:text-white/40 text-gray-500',
              }}
            />
          </AnimatedWrapper>
          <AnimatedWrapper delay={0.6}>
            <div className="w-full flex flex-col gap-3">
              <FeesTable profit={profit} />
              <button
                className={clsx('button bg-[#2976D3] py-3 px-4 rounded-lg hover:opacity-90 text-content-tirtiary', {
                  'bg-gray-400': !profit,
                })}
                onClick={execute}
                disabled={!profit}
              >
                {loading ? 'Executing...' : 'Execute'}
              </button>
            </div>
          </AnimatedWrapper>
        </div>
        <div className="flex flex-col gap-5">
          <Skeleton loading={gettingInfo} mockChildren={<div className="min-h-[400px]"></div>}>
            <AnimatedWrapper delay={0.3}>
              <DexTable />
            </AnimatedWrapper>
            <AnimatedWrapper delay={0.5}>
              <CexTable />
            </AnimatedWrapper>
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
