import React from 'react';
import { useUiStore } from '@/stores/ui';
import { uiMapper } from './uiMapper';
import './Notifications.scss';

export default function Notifications() {
  const { notification } = useUiStore();

  if (!notification) return <></>;

  const { text, type } = notification;
  const { Icon, bg, textColor, iconColor } = uiMapper?.[type];

  return (
    <div
      className={`notification-wrapper absolute left-[5%] top-[5%] w-fit h-fit   rounded-md p-5 py-10 animate-fadeIn`}
      style={{ backgroundColor: bg, color: textColor }}
    >
      <div className={`flex gap-3 items-center justify-center  whitespace-pre fill-${iconColor}`}>
        {/* <Icon /> */}
        <span>{text}</span>
      </div>
    </div>
  );
}
