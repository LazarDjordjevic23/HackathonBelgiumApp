import React from 'react';
import TimeLeft from '@/components/TimeLeft/TimeLeft';
import TimeRemaining from '@/assets/svgs/time-remaining.svg?react';
import { useCampignInfoStore } from '@/stores/campaign';
import ParticipateBtn from '@/components/Common/ParticipateBtn/ParticipateBtn';

export default function CampaignRemaining() {
  const { campaignInfo } = useCampignInfoStore();

  return (
    <div className="mt-5 p-5 bg-campaign relative flex justify-between items-center">
      <div className="absolute left-[-20%] top-0 w-[20%] h-full z-0 bg-campaign" />
      <div className="absolute right-[-20%] top-0 w-[20%] h-full z-0 bg-campaign" />
      <div className="flex gap-4 items-center">
        <TimeRemaining />
        {campaignInfo?.end_time && (
          <TimeLeft
            endTime={campaignInfo?.end_time!}
            startTime={campaignInfo?.start_time!}
            valueClass="!text-primary"
            endsInText="Time Remaining"
          />
        )}
      </div>
      <div className="">
        <ParticipateBtn campaignId={campaignInfo?.campaign_id!} />
      </div>
    </div>
  );
}
