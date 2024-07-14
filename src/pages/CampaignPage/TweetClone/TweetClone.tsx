import React from 'react';
import TweetHeader from './TweetHeader/TweetHeader';
import TweetBody from './TweetBody/TweetBody';
import TweetInfo from './TweetInfo/TweetInfo';
import TweetMetrics from './TweetMetrics/TweetMetrics';
import { useCampignInfoStore } from '@/stores/campaign';

export default function TweetClone() {
  const { campaignInfo } = useCampignInfoStore();

  return (
    <a className="bg-white rounded-xl p-4 flex flex-col gap-4" href={campaignInfo?.tweet_info.twitter_link} target='_blank'>
      <TweetHeader />
      <TweetBody />
      <TweetInfo time="1:27PM" date="Jul 4 2024" />
      <TweetMetrics />
    </a>
  );
}
