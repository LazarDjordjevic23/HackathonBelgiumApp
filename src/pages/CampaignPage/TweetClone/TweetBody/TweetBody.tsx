import { useCampignInfoStore } from '@/stores/campaign';
import React from 'react';

export default function TweetBody() {
  const { campaignInfo } = useCampignInfoStore();

  return <p className="text-content-secondary font-light">{campaignInfo?.tweet_info.text}</p>;
}
