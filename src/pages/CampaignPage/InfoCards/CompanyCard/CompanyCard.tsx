import React from 'react';
import InfoCardWrapper from '../InfoCardWrapper/InfoCardWrapper';
import { companyInfoCardsSocialLinks } from './companySocialsList';
import SocialLink from '../SocialLink/SocialLink';
import FollowBtn from '../FollowBtn/FollowBtn';
import { useCampignInfoStore } from '@/stores/campaign';
import ShowAt from '@/components/Common/ShowAt/ShowAt';
import { addHttps } from '@/utils/formatter';

export default function CompanyCard() {
  const { campaignInfo } = useCampignInfoStore();

  return (
    <InfoCardWrapper>
      <div className="flex gap-4 items-start">
        <img src={campaignInfo?.project.logo} className="rounded-lg object-cover w-[60px] h-[60px]" alt="img" />
        <div className="flex flex-col">
          <span className="text-content-primary text-sm font-semibold">{campaignInfo?.project.name}</span>
          <span className="text-white/70 text-xs font-light font-itc-thin block mt-1">
            {campaignInfo?.project.description}
          </span>
        </div>
      </div>
      <div className="mt-4 flex gap-1.5 items-center flex-wrap">
        {companyInfoCardsSocialLinks.map((socialLink) => (
          <ShowAt at={campaignInfo?.project?.[socialLink.dataKey]}>
            <SocialLink {...socialLink} link={addHttps(campaignInfo?.project?.[socialLink.dataKey])} />
          </ShowAt>
        ))}
      </div>
      <FollowBtn />
    </InfoCardWrapper>
  );
}
