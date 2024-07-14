import { create } from 'zustand';
import { SharedAction, SharedState, CampaignType } from './types';
import { _fetch } from '@/utils/fetch';
import { devtools } from 'zustand/middleware';
import { getActiveCampaigns, getUpcomingCampaigns } from '@/services/tweets';
import { getUsersCampaignIds } from '@/services/campaigns';

export const useSharedStore = create<SharedState & SharedAction>()(
  devtools((set) => ({
    userCampaignsIds: [],
    gettingUserCampaignsIds: false,
    fetchUserCampaignsIds: async (twitterHandle: string) => {
      set({ gettingUserCampaignsIds: true });
      const campaignsIds = await getUsersCampaignIds(twitterHandle);
      set({ gettingUserCampaignsIds: false, userCampaignsIds: campaignsIds });
    },
  })),
);
