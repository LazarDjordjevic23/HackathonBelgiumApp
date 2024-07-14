import { formatDuration, getTimeLeftOrComing } from '@/utils/time';
import { IUseTimerParams, useTimer } from '../useTimer/useTimer';

export const useTimeLeft = ({ time, ...rest }: IUseTimerParams) => {
  const [secondsLeft] = useTimer({ time, ...rest });
  const { days, hours, minutes, seconds } = formatDuration(secondsLeft);
  const { period } = getTimeLeftOrComing(time);

  return {
    days,
    hours,
    minutes,
    seconds,
    period,
    done: !secondsLeft,
  };
};
