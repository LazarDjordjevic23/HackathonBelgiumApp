import React from 'react';
import { metricsList, MetricsRecord } from './metricsList';
import { useCampignInfoStore } from '@/stores/campaign';

export default function TweetMetrics() {

  const { campaignInfo } = useCampignInfoStore();

  const dataSrc: MetricsRecord = {
    comments: campaignInfo?.tweet_info.comments || 0,
    likes: campaignInfo?.tweet_info.likes || 0,
    retweets: campaignInfo?.tweet_info.retweets || 0,
  };
  
  return (
    <div className="border-twitter-gary border-t pt-4 flex gap-8 items-center">
      {metricsList.map((metric) => (
        <div className="flex gap-2">
          <>{metric.icon}</>
          <span className="text-twitter-gary-2 font-light">
            {dataSrc?.[metric.key] ? (dataSrc?.[metric.key] as number).toLocaleString() : 0}
          </span>
        </div>
      ))}
    </div>
  );
}
