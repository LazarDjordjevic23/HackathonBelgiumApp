export const getTimeLeft = (
  startTime = 0,
  endTime = +(Date.now() / 1000).toFixed(0),
): number=> {
  return startTime - endTime;
};

export const fromMsToSecs = (timeInMs: number) => +(timeInMs / 1000).toFixed(0);

export const wait = (ms = 300) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res(null);
    }, ms);
  });

export const formatDuration = (
  seconds: number,
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} => {
  const days = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return { days, hours, minutes, seconds: remainingSeconds };
};

export const getTimeLeftOrComing = (timestamp: number): { result: number; period: 'past' | 'future' } => {
  const now: number = +(Date.now() / 1000).toFixed(0);
  const inPast = now > timestamp;

  const period = inPast ? 'past' : 'future';
  return { result: Math.max(timestamp - now), period };
};

// const daysStr = days > 0 ? `${days} day${days > 1 ? 's' : ''}, ` : '';
// const hoursStr = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}, ` : '';
// const minutesStr =
//   minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}, ` : '';
// const secondsStr =
//   remainingSeconds > 0
//     ? `${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`
//     : '';
