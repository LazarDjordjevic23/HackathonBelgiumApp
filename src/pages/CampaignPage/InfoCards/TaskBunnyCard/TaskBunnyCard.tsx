import React from 'react';
import InfoCardWrapper from '../InfoCardWrapper/InfoCardWrapper';
import MiniLogo from '@/assets/svgs/mini-logo.svg?react';
import XLogo from '@/assets/svgs/x.svg?react';
import Link from '@/assets/svgs/link.svg?react';
import Contract from '@/assets/svgs/contract.svg?react';
import { taskBunyContractAddress } from '@/constatnts/abi/taskbunnyContract';
import { bsc, bscTestnet } from 'wagmi/chains';
import InfoLink from './InfoLink/InfoLink';
import { infoCardsSocialLinks } from '../SocialLink/socialList';
import SocialLink from '../SocialLink/SocialLink';
import FollowBtn from '../FollowBtn/FollowBtn';
import { useCampignInfoStore } from '@/stores/campaign';

const currentBscChain = import.meta.env.VITE_ENV_TYPE.toLowerCase() === 'develop' ? bscTestnet : bsc;
const currentBlockExploere = currentBscChain.blockExplorers.default.url;
const contractOnBlockExplorer = `${currentBlockExploere}/address/${taskBunyContractAddress}`;

export default function TaskBunnyCard() {
  return (
    <InfoCardWrapper>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <MiniLogo />
          <div className="flex flex-col justify-between">
            <span className="font-semibold text-content-primary">Task Bunny</span>
            <span className="text-sm font-light text-content-primary opacity-70">@TaskBNY</span>
          </div>
        </div>
        <XLogo />
      </div>
      <div className="w-full  relative mt-4 min-h-1">
        <div className="absolute left-[-20%] w-[150%] min-h-[1px] bg-white opacity-70"></div>
      </div>

      <div className="mt-5 flex flex-col gap-2.5 text-xs text-link">
        <InfoLink icon={<Link />} link="https://www.taskbunny.io" text="https://www.taskbunny.io" />
        <InfoLink
          icon={<Contract />}
          link={contractOnBlockExplorer}
          text="Campaign Manager Contract"
        />
      </div>

      <div className="mt-5 flex gap-2 flex-wrap">{infoCardsSocialLinks.map(SocialLink)}</div>
      <FollowBtn />
    </InfoCardWrapper>
  );
}
