import StatsIcon from '@/assets/svgs/stats.svg?react';
import CommentIcon from '@/assets/svgs/comments.svg?react';
import RetweetsIcon from '@/assets/svgs/retweets.svg?react';
import LikesIcon from '@/assets/svgs/likes.svg?react';
import ShareIcon from '@/assets/svgs/share.svg?react';

export const metricsList = [
  // {
  //   icon: <StatsIcon width={20} height={20} />,
  //   key: 'reach',
  // },
  {
    icon: <CommentIcon width={20} height={20} />,
    key: 'comments',
  },
  {
    icon: <RetweetsIcon width={20} height={20} />,
    key: 'retweets',
  },
  {
    icon: <LikesIcon width={20} height={20} />,
    key: 'likes',
  },
] as const;

type MetricKey = typeof metricsList[number]["key"];

export type MetricsRecord = Record<MetricKey, number>;

