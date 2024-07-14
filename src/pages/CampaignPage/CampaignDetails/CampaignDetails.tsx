import React from 'react';
import InfoLink from '../InfoCards/TaskBunnyCard/InfoLink/InfoLink';
import Link from '@/assets/svgs/link.svg?react';
import Contract from '@/assets/svgs/contract.svg?react';
import { bsc, bscTestnet } from 'viem/chains';
import { taskBunyContractAddress } from '@/constatnts/abi/taskbunnyContract';
import CampaignStats from './CampaignStats/CampaignStats';
import CampaignRemaining from './CampaignRemaining/CampaignRemaining';
import { useCampignInfoStore } from '@/stores/campaign';

const currentBscChain = import.meta.env.VITE_ENV_TYPE.toLowerCase() === 'develop' ? bscTestnet : bsc;
const currentBlockExploere = currentBscChain.blockExplorers.default.url;

export default function CampaignDetails() {
  const { campaignInfo } = useCampignInfoStore();
  const contractOnBlockExplorer = `${currentBlockExploere}/address/${campaignInfo?.manager_address}`;

  return (
    <div className="rounded-xl p-5 bg-past-campain overflow-hidden">
      <span className="text-content-primary font-bold block">Campaign Details</span>

      <p className="mt-2.5 text-sm font-itc-thin font-light text-content-primary">
        {campaignInfo?.project.description}
      </p>

      <div className="mt-3 flex flex-col gap-2.5 text-xs text-link">
        <InfoLink icon={<Link />} link={campaignInfo?.project.website!} text={campaignInfo?.project.website!} />
        <InfoLink icon={<Contract />} link={contractOnBlockExplorer!} text="Campaign Manager Contract" />
      </div>
      <CampaignStats />
      <CampaignRemaining />
    </div>
  );
}
