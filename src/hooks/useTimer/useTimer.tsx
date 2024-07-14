import { getTimeLeft } from '@/utils/time';
import { useEffect, useState } from 'react';

export interface IUseTimerParams {
  time: number;
  endTime?: number;
  intervalInMs?: number;
  disabled?: boolean;
}

export const useTimer = ({ time = 0, endTime, intervalInMs = 1000, disabled }: IUseTimerParams) => {
  const [seconds, setSeconds] = useState(time);

  const timeLeftInSec = getTimeLeft(time);
  const processedTimeLeft = timeLeftInSec > 0 ? timeLeftInSec : 0;

  useEffect(() => {
    setSeconds(processedTimeLeft);
  }, [processedTimeLeft]);

  const decreasTime = () => {
    if (seconds) setSeconds((sec) => sec - 1);
  };

  useEffect(() => {
    if (!seconds || disabled) return;
    const interval = setInterval(() => {
      if (seconds) decreasTime();
    }, intervalInMs);
    return () => {
      clearInterval(interval);
    };
  }, [seconds, disabled, intervalInMs]);

  useEffect(() => {
    setSeconds(time);
  }, [time]);
  
  return [seconds];
};
