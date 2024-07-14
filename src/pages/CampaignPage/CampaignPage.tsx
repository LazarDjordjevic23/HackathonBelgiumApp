import { useParams } from 'react-router-dom';
import { usePromise } from '@/hooks/usePromise/usePromise';
import { getCampaignById } from '@/services/campaigns';
import { useEffect } from 'react';
import { Campaign } from '@/stores/auth/tweets';
import { Skeleton } from '@/components/Common/Skeleton/Skeleton';
import { fromMsToSecs } from '@/utils/time';
import InfoCards from './InfoCards/InfoCards';
import TweetClone from './TweetClone/TweetClone';
import CampaignDetails from './CampaignDetails/CampaignDetails';
import { useCampignInfoStore } from '@/stores/campaign';

const CampaignPage = () => {
  const { campainId } = useParams();
  const { fetchUserCampaignInfo, gettingCampaignInfo } = useCampignInfoStore();
  // const [getCampaignInfo, campaignInfo, gettingCamapaign] = usePromise<Campaign | undefined, [string | number]>(
  //   getCampaignById,
  // );

  // const endTime = campaignInfo ? fromMsToSecs(new Date(campaignInfo?.end_time).getTime()) : 0;

  useEffect(() => {
    if (!campainId) return;
    fetchUserCampaignInfo(campainId);
  }, [campainId]);

  return (
    <div className="flex gap-5">
      <div className="flex-[2] flex flex-col gap-5">
        {gettingCampaignInfo ? (
          <>
            <Skeleton loading className="rounded-xl w-full h-[312px]" />
            <Skeleton loading className="rounded-xl w-full h-[312px]" />
          </>
        ) : (
          <InfoCards />
        )}
      </div>
      <div className="flex-[5] flex flex-col gap-5 ">
        {gettingCampaignInfo ? (
          <>
            <Skeleton loading className="rounded-xl w-full h-[220px]" />
            <Skeleton loading className="rounded-xl w-full h-[450px]" />
          </>
        ) : (
          <>
            <TweetClone />
            <CampaignDetails />
          </>
        )}
      </div>
    </div>
  );
};

export default CampaignPage;
