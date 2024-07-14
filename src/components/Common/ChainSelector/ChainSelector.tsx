import React, { useEffect, useMemo, useState } from 'react';
import Dropdown, { IOption } from '../Dropdown/Dropdown';
import { ChainOption, chainOptions } from '@/constatnts/chain-selector/list';
import { useAccount, useSwitchChain } from 'wagmi';
import clsx from 'clsx';
import ShowAt from '../ShowAt/ShowAt';

export default function ChainSelector() {
  const [selectedChain, setSelectedChain] = useState<IOption<ChainOption>>();
  const { chainId: appChainId } = useAccount();
  const { switchChain, error } = useSwitchChain();

  const matchedChain = useMemo(
    () => chainOptions.find((chain) => chain.info?.chain.id === appChainId),
    [appChainId, error],
  );

  useEffect(() => {
    setSelectedChain(matchedChain);
  }, [matchedChain?.id]);

  useEffect(() => {
    if (!selectedChain?.info?.chain.id || selectedChain?.info?.chain.id === appChainId || !appChainId) return;

    switchChain({ chainId: selectedChain?.info?.chain.id });
  }, [selectedChain]);

  return (
    <ShowAt at={!!matchedChain}>
      <div>
        <Dropdown<ChainOption>
          list={chainOptions}
          selectedClass=""
          selectedOption={matchedChain}
          renderSelected={(option) => <>{option.info?.icon}</>}
          renderOptions={(option, selectedOptionId) => (
            <div className="flex gap-2 items-center">
              <>{option.info?.icon}</>
              <span
                className={clsx('font-itc-thin whitespace-pre text-sm h-fit', {
                  'font-itc text-xs text-white': option.id === selectedOptionId,
                  'text-[#CABBC8]': option.id !== selectedOptionId,
                })}
              >
                {option.title}
              </span>
            </div>
          )}
          dropdownClassName="blured-gray-bg h-full rounded-lg flex flex-col justify-center items-center px-2"
          setter={(option) => setSelectedChain(option)}
          trustParent
        />
      </div>
    </ShowAt>
  );
}
