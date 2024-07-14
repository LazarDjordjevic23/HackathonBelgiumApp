import { useTimeLeft } from '@/hooks/useTimeLeft/useTimeLeft';
import { useWindowWidth } from '@/hooks/useWidth';
import { fromMsToSecs } from '@/utils/time';
import clsx from 'clsx';
import { useMemo } from 'react';

interface ITimeLeft {
  isLargeView?: boolean;
  startTime: string;
  endTime: string;
  valueClass?: string;
  endsInText?: string;
}

export default function TimeLeft({ valueClass, endsInText, isLargeView = false, endTime, startTime }: ITimeLeft) {
  const windowWidth = useWindowWidth();
  const isMobileView = windowWidth <= 450;

  const now = fromMsToSecs(Date.now());

  const startTs = fromMsToSecs(new Date(startTime).getTime());
  const endTs = fromMsToSecs(new Date(endTime).getTime());
  
  const appliedTime = startTs > now ? startTs : endTs;
  const didntStartYet = startTs > now;

  const { days, hours, minutes, seconds, period, done } = useTimeLeft({
    time: appliedTime,
  });

  const nearToChange = !days && hours < 2;

  const text = done ? 'Ended' : didntStartYet ? 'Starts in' : endsInText || 'Ends in';
  const nearChangeColor = nearToChange
    ? didntStartYet
      ? 'text-success'
      : 'text-error-content'
    : 'text-content-primary';

  const timeUnits = [
    { value: days, label: 'Days', showSeparator: true },
    { value: hours, label: 'Hrs', showSeparator: true },
    { value: minutes, label: 'Mins', showSeparator: true },
    { value: seconds, label: 'Sec', showSeparator: false },
  ];

  const showLarge = !isMobileView && isLargeView;

  const valueFontSize = `${showLarge ? 38 : 20}px`;
  const valueLineHeight = `${showLarge ? 28 : 20}px`;

  const labelFontSize = `${showLarge ? 18 : 12}px`;
  const labelLineHeight = `${showLarge ? 30 : 16}px`;

  const marginLeftLabel = `${showLarge ? -20 : 3}px`;

  return (
    <div className="rounded-tr-[10px] flex flex-col gap-2.5 min-w-[200px]">
      <span className="text-[14px] font-[300] text-content-tertiary">{text}</span>
      <div className="flex gap-3 itc-font">
        {timeUnits.map(({ label, value, showSeparator }) => (
          <div className={clsx('flex flex-col gap-2', showLarge && 'items-center gap-2.5')}>
            <span
              style={{ fontSize: valueFontSize, lineHeight: valueLineHeight }}
              className={clsx(`font-[700] text-er`, nearChangeColor, valueClass)}
            >
              {value.toString().padStart(2, '0')} &nbsp;{showSeparator && ':'}
            </span>
            <span
              style={{ fontSize: labelFontSize, lineHeight: labelLineHeight, marginLeft: marginLeftLabel }}
              className={clsx(`text-content-primary font-[300] text-start `)}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
