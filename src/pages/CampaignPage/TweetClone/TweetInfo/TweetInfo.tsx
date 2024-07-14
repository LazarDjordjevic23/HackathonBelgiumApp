import React from 'react';

export default function TweetInfo({ date, time }: { date: string; time: string }) {
  return (
    <div className="flex gap-1 items-center text-twitter-gary-2 font-light">
      <span>{time}</span>
      <span>.</span>
      <span>{date}</span>
    </div>
  );
}
