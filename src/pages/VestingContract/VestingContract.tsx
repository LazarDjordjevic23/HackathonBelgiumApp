import { usePromise } from '@/hooks/usePromise/usePromise';
import {
  getEarnedToken,
  getEndTime,
  getTotalRewardsAmount,
  getTotalWithdrawn,
  withdrawRewards,
} from '@/services/vesting';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function VestingContract() {
  const { address } = useAccount();
  const [getEarnedTokens, earned, gettingEarnedTokens] = usePromise<string, Parameters<typeof getEarnedToken>>(
    getEarnedToken,
  );

  const [withdraw, , withdrawing] = usePromise(withdrawRewards);

  const [getTotalRewards, totalRewards = 0, gettingTotalRewards] = usePromise<
    string,
    Parameters<typeof getTotalRewardsAmount>
  >(getTotalRewardsAmount);

  const [getWithdrawn, totalWithdraw = 0, gettingTotalWithdrawn] = usePromise<
    string,
    Parameters<typeof getTotalWithdrawn>
  >(getTotalWithdrawn);

  const [, endTime, gettingEndTime] = usePromise<string>(getEndTime, { initReq: true });

  const handleWithdraw = () => {
    withdraw().then(() => {
      getEarnedTokens('0xf06EBdA210678685F635f56d76417603D98d6D45');
      getTotalRewards('0xf06EBdA210678685F635f56d76417603D98d6D45');
      getWithdrawn('0xf06EBdA210678685F635f56d76417603D98d6D45');
    });
  };

  console.log({ earned, totalRewards, endTime });

  useEffect(() => {
    if (!address) return;
    getEarnedTokens('0xf06EBdA210678685F635f56d76417603D98d6D45');
    getTotalRewards('0xf06EBdA210678685F635f56d76417603D98d6D45');
    getWithdrawn('0xf06EBdA210678685F635f56d76417603D98d6D45');
  }, [address]);

  return (
    <div className="max-w-[900px] mx-auto flex mt-[200px]">
      <div className="bg-nuetral rounded-lg p-4 w-full mt-auto">
        <div className="flex justify-center flex-col items-center gap-3">
          <span className="text-2xl text-center text-content-tirtiary">Vesting Contract</span>
          <span className="text-sm text-content-secondary">Withdraw your tokens from this vesting contract</span>
        </div>
        <div className="mt-3 flex gap-4">
          <div className="p-3 flex flex-col gap-2 bg-hovered-nuetral flex-[1] rounded-lg justify-center items-center">
            {gettingTotalRewards ? (
              <span className="loading loading-dots loading-xs text-white"></span>
            ) : (
              <span className="text-content-tirtiary text-sm">{(+totalRewards).toLocaleString()} USDT</span>
            )}
            <span className="text-content-secondary text-xs">Total Amount</span>
          </div>
          <div className="p-3 flex flex-col gap-2 bg-hovered-nuetral flex-[1] rounded-lg justify-center items-center">
            {gettingEndTime ? (
              <span className="loading loading-dots loading-xs text-white"></span>
            ) : (
              <>
                <span className="text-content-tirtiary text-sm">Farm Ends at</span>
                <span className="text-content-tirtiary text-sm">
                  {endTime ? new Date(+endTime * 1000).toGMTString() : ''}
                </span>
              </>
            )}
            <span className="text-content-secondary text-xs">Tokens released every second</span>
          </div>
          <div className="p-3 flex flex-col gap-2 bg-hovered-nuetral flex-[1] rounded-lg justify-center items-center">
            {gettingTotalWithdrawn ? (
              <span className="loading loading-dots loading-xs text-white"></span>
            ) : (
              <span className="text-content-tirtiary text-sm">{(+totalWithdraw).toLocaleString()} USDT</span>
            )}
            <span className="text-content-secondary text-xs">Withdrawn</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <span className="text-content-secondary textarea-xs">Unlocked tokens</span>
          <div className="bg-hovered-nuetral flex justify-between items-center p-4 rounded-lg">
            {gettingEarnedTokens ? (
              <span className="loading loading-dots loading-xs text-white"></span>
            ) : (
              <span className="text-content-tirtiary">{earned ? (+earned).toFixed(4) : 0}</span>
            )}
            <span className="text-content-secondary">USDT</span>
          </div>
          <button
            disabled={!earned}
            onClick={handleWithdraw}
            className={clsx('button bg-[#2976D3] py-3 px-4 rounded-lg hover:opacity-90 text-content-tirtiary mt-5', {
              'bg-gray-400': !earned,
            })}
          >
            {withdrawing ? 'Withdrawing' : 'Withdraw All'}
          </button>
        </div>
      </div>
    </div>
  );
}
