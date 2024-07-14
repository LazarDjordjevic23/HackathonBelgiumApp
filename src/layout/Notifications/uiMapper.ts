import React from 'react';
import { NotificationType } from '@/stores/ui/types';

import ErrorIcon from '@/assets/svgs/notification-error.svg?react';
import InfoIcon from '@/assets/svgs/notificaiton-info.svg?react';
import SuccessIcon from '@/assets/svgs/notification-success.svg?react';
import WarningIcon from '@/assets/svgs/notification-warning.svg?react';

interface NotificationUiParams {
  Icon: React.FunctionComponent;
  bg: string;
  textColor: string;
  iconColor: string;
}

export const uiMapper: Record<NotificationType, NotificationUiParams> = {
  success: {
    Icon: SuccessIcon,
    bg: 'var(--success-bg)',
    textColor: 'var(--success-text)',
    iconColor: 'black',
  },
  info: {
    Icon: InfoIcon,
    bg: 'var(--info-bg)',
    textColor: 'var(--info-text)',
    iconColor: 'black',
  },
  error: {
    Icon: ErrorIcon,
    bg: 'var(--error-bg)',
    textColor: 'var(--error-text)',
    iconColor: 'black',
  },
  warning: {
    Icon: WarningIcon,
    bg: 'var(--warning-bg)',
    textColor: 'var(--warning-text)',
    iconColor: 'white',
  },
};
