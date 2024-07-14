import { IGetUserInfoResponse } from '@/types/auth';
import { Campaign } from '../auth/tweets';

type CampaignListInfo = { list: Campaign[]; loading: boolean };

export type CampaignType = 'active' | 'upcoming';

type CampaingsList = Record<CampaignType, CampaignListInfo>;

export type SharedState = {
  userCampaignsIds: number[];
  gettingUserCampaignsIds: boolean;
};

export type SharedAction = {
  fetchUserCampaignsIds: (twitterHandle: string) => void;
};
