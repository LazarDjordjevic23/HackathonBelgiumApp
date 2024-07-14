type IsParticipared = boolean;
type IsClaimed = boolean;
type IsPaid = boolean;
type RewardsAmt = BigInt;

export type UserStats = [IsParticipared, IsClaimed, IsPaid, RewardsAmt];

export interface CreateCampaignPayload {
  project: {
    name: string;
    logo: string | null;
    description: string;
    urls: {
      website: string | null;
      twitter: string | null;
      instagram: string | null;
      facebook: string | null;
    };
  };
  chain_id: number;
  tweet_id: string;
  start_time: string;
  end_time: string;
  total_rewards: number;
}

export interface ParticiaptionResponse {
  participant: {
    user_id: number;
    twitter_handle: string;
    address: string;
    campaign_id: number;
    is_liked: boolean;
    is_retweeted: boolean;
    is_commented: boolean;
  };
}

export type STATUS_RESPONSE_TYPES = 'ok' | 'error';

export interface WithStatus {
  status: STATUS_RESPONSE_TYPES;
}

export interface ProjectInfo {
  id: number;
  company: any;
  name: string;
  logo: string;
  description: string;
  website: string;
  twitter: string;
  instagram: any;
  facebook: any;
}

export interface ProjectInfoByNameRes extends WithStatus {
  projects: ProjectInfo;
}
