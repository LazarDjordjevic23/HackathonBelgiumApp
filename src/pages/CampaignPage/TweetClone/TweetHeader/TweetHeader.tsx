import { useCampignInfoStore } from '@/stores/campaign';
import React from 'react';

export default function TweetHeader() {
  const { campaignInfo } = useCampignInfoStore();

  return (
    <div className="flex gap-4 items-center">
      <img src={campaignInfo?.project.logo} className="rounded-full object-cover w-[56px] h-[56px]" alt="img" />
      <div className="flex flex-col">
        <span className='text-[#171717] font-bold'>{campaignInfo?.project.name}</span>
        <span className='text-twitter-gary-2 font-light'>@{campaignInfo?.project.name}</span>
      </div>
    </div>
  );
}
