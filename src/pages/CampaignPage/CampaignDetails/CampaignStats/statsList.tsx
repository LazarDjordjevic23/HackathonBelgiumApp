import Users from '@/assets/svgs/users.svg?react';
import Reach from '@/assets/svgs/reach-growth.svg?react';
import Rewards from '@/assets/svgs/rewards.svg?react';
import Duration from '@/assets/svgs/duration.svg?react';
import EndDate from '@/assets/svgs/end-date.svg?react';

export const campaignStatsList = [
  {
    icon: <Users />,
    key: 'users',
    showUpArrow: true,
    title: 'Total Users',
  },
  {
    icon: <Reach />,
    key: 'reach',
    showUpArrow: true,
    title: 'Total Reach',
  },
  {
    icon: <Rewards />,
    key: 'rewards',
    showUpArrow: true,
    title: 'Total Rewards',
  },
  {
    icon: <Duration />,
    key: 'duration',
    showUpArrow: false,
    title: 'Total Duration',
  },
  {
    icon: <Users />,
    key: 'end-date',
    showUpArrow: false,
    title: 'End Date',
  },
] as const;

export type CampaignStat = (typeof campaignStatsList)[number];

export type CampaignStatDataSrc = Record<(typeof campaignStatsList)[number]['key'], any>;
