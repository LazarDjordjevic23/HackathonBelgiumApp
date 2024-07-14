import React, { useMemo } from 'react';
import { campaignStatsList, CampaignStatDataSrc, CampaignStat } from './statsList';
import Growth from '@/assets/svgs/growth.svg?react';
import { useCampignInfoStore } from '@/stores/campaign';
import { fromMsToSecs } from '@/utils/time';
import { useTimeLeft } from '@/hooks/useTimeLeft/useTimeLeft';

export default function CampaignStats() {
  const { campaignInfo } = useCampignInfoStore();

  const endTs = new Date(campaignInfo?.end_time!).getTime();
  const startTs = new Date(campaignInfo?.start_time!).getTime();

  const diff = Math.floor(endTs - startTs);

  const duration = fromMsToSecs(diff);

  const { period, done, ...dateValueCompined } = useTimeLeft({
    time: duration,
    disabled: true,
  });

  const largestDateValue = useMemo(() => {
    let max = 0;
    let maxKey = '';
    Object.entries(dateValueCompined).forEach(([key, value]) => {
      if (maxKey) return;
      if (value > max) {
        max = value;
        maxKey = key;
      }
    });
    return { max, maxKey };
  }, [dateValueCompined, duration]);

  const dataSrc: CampaignStatDataSrc = {
    reach: campaignInfo?.reach,
    'end-date': new Date(campaignInfo?.end_time!).toDateString(),
    duration: (largestDateValue && `${largestDateValue.max} ${largestDateValue.maxKey}`) || '',
    rewards: campaignInfo?.total_rewards,
    users: 100, // TODO: lazar
  };
  return (
    <div className="mt-5 pt-5 flex flex-wrap items-center gap-y-4 border-t border-dashed border-white/70 border-spacing-6">
      {campaignStatsList.map((stat: CampaignStat) => (
        <div className="flex justify-start items-center gap-2.5 min-w-[213px]">
          <div className="bg-campaign  min-w-9 min-h-9 rounded-full flex justify-center items-center">{stat.icon}</div>
          <div className="flex flex-col gap-1">
            <span className="font-light text-xs text-white/70 font-itc-thin">{stat.title}</span>
            <div className="flex gap2 items-center gap-1">
              <span className="text-content-primary font-semibold text-xl">{dataSrc[stat.key]}</span>
              {stat?.showUpArrow && <Growth />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
